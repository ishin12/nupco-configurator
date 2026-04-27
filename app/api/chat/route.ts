import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { messages, context } = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey || apiKey === "sk-ant-placeholder") {
    return NextResponse.json({
      reply: "AI assistant not configured. Please add your ANTHROPIC_API_KEY to .env.local to enable real AI responses.",
    });
  }

  try {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    const client = new Anthropic({ apiKey });

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

    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 500,
      system,
      messages: messages.map((m: { role: string; content: string }) => ({
        role: m.role as "user" | "assistant",
        content: m.content,
      })),
    });

    const reply = response.content[0].type === "text" ? response.content[0].text : "Sorry, I could not process that.";
    return NextResponse.json({ reply });
  } catch (err) {
    console.error("Claude API error:", err);
    return NextResponse.json({ reply: "AI temporarily unavailable. Please try again." });
  }
}
