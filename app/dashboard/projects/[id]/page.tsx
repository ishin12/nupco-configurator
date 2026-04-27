import { auth } from "@/lib/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { RoomConfigurator } from "@/components/RoomConfigurator";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (!session) redirect("/login");

  const { id } = await params;
  const project = await prisma.project.findUnique({ where: { id } });
  if (!project) notFound();

  if (session.user.role !== "ADMIN" && project.userId !== session.user.id) redirect("/dashboard");

  return <RoomConfigurator project={project} sessionRole={session.user.role} />;
}
