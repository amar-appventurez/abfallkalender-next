
import { Endpoints } from "../constants/Endpoint";
import { redirect } from "next/navigation";
export default async function Home() {
  redirect(`${Endpoints.baseUrl}/auth/login`);
}
