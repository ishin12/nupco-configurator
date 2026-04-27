import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { EquipmentAdmin } from "@/components/EquipmentAdmin";

export default async function EquipmentPage() {
  const session = await auth();
  if (session?.user.role !== "ADMIN") redirect("/dashboard");
  return <EquipmentAdmin />;
}
