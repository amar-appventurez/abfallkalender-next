
import { Endpoints } from "../constants/Endpoint";
import { redirect } from "next/navigation";
export default async function Home() {
  console.log("Redirecting to oauth server")
  redirect(`${Endpoints.baseUrl}/auth/login`);
}
