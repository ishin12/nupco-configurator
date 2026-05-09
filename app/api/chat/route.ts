import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { messages, context } = await req.json();

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return NextResponse.json({
      reply: "AI assistant not configured. Please add your GEMINI_API_KEY to environment variables.",
    });
  }

  const system = `You are an expert medical equipment planner for NUPCO (National Unified Procurement Company of Saudi Arabia).
You help hospital planners configure rooms according to iHFG (Australasian Health Facility Guidelines) standards.

Current room context:
${JSON.stringify(context, null, 2)}

You can help with:
- Adding equipment: say "ADD: [EQUIPMENT NAME]" anywhere in your reply to trigger an add
- Answering questions about iHFG compliance
- Budget analysis
- Suggesting missing critical items
- Explaining why equipment is needed

Keep replies concise and actionable. Use SAR for currency.`;

  try {
    // Build Gemini message history
    const geminiMessages = messages.map((m: { role: string; content: string }) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: system }] },
          contents: geminiMessages,
          generationConfig: { maxOutputTokens: 500, temperature: 0.7 },
        }),
      }
    );

    const data = await res.json();
    console.log("GEMINI RESPONSE:", JSON.stringify(data, null, 2)); // 👈 added
    const reply = data.candidates?.[0]?.content?.parts?.[0]?.text ?? "Sorry, I could not process that.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Gemini API error:", err);
    return NextResponse.json({ reply: "AI temporarily unavailable. Please try again." });
  }
}
