import { redirect } from "next/navigation";

export default function AgentXRedirect() {
  redirect("/?agent-x=open");
}
