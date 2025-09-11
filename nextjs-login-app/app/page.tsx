import { redirect } from "next/navigation";

export default function Page() {
  // redirect root to /login
  redirect("/login");
}
