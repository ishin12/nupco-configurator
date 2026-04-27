import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { UsersClient } from "@/components/UsersClient";

export default async function UsersPage() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/dashboard");

  const rawUsers = await prisma.user.findMany({
    select: { id: true, email: true, name: true, role: true, active: true, createdAt: true, _count: { select: { projects: true } } },
    orderBy: { createdAt: "desc" },
  });

  const users = rawUsers.map((u) => ({ ...u, createdAt: u.createdAt.toISOString() }));

  return <UsersClient initialUsers={users} currentUserId={session.user.id} />;
}
