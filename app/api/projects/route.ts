import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const where = session.user.role === "ADMIN" ? {} : { userId: session.user.id };
  const projects = await prisma.project.findMany({
    where,
    include: { user: { select: { name: true, email: true } } },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json(projects);
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const name = typeof body.name === "string" ? body.name.trim() : "";
    const roomType = typeof body.roomType === "string" ? body.roomType.trim() : "";
    const purpose = typeof body.purpose === "string" ? body.purpose.trim() : "";
    const parsedBudget = Number.parseInt(String(body.budget), 10);
    const budget = Number.isFinite(parsedBudget) && parsedBudget >= 1000 ? parsedBudget : 250000;

    if (!name || !roomType || !purpose) {
      return NextResponse.json({ error: "Please complete all required fields." }, { status: 400 });
    }

    const project = await prisma.project.create({
      data: {
        name,
        roomType,
        purpose,
        budget,
        userId: session.user.id,
      },
    });

    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    console.error("Failed to create project", error);
    return NextResponse.json({ error: "Failed to create project. Please try again." }, { status: 500 });
  }
}
