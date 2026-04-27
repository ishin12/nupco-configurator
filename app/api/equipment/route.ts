import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const search = searchParams.get("search") || "";
  const cat = searchParams.get("cat") || "";
  const subcat = searchParams.get("subcat") || "";
  const page = parseInt(searchParams.get("page") || "1");
  const limit = 50;

  const where = {
    ...(search ? {
      OR: [
        { name: { contains: search, mode: "insensitive" as const } },
        { id: { contains: search } },
      ],
    } : {}),
    ...(cat ? { cat } : {}),
    ...(subcat ? { subcat } : {}),
  };

  const [items, total] = await Promise.all([
    prisma.equipment.findMany({
      where,
      orderBy: { name: "asc" },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.equipment.count({ where }),
  ]);

  return NextResponse.json({ items, total, page, pages: Math.ceil(total / limit) });
}

export async function POST(req: NextRequest) {
  const session = await auth();
  if (session?.user.role !== "ADMIN") return NextResponse.json({ error: "Forbidden" }, { status: 403 });

  const body = await req.json();
  const item = await prisma.equipment.create({
    data: { id: body.id, name: body.name, cat: body.cat, subcat: body.subcat, price: body.price || 0 },
  });
  return NextResponse.json(item, { status: 201 });
}
