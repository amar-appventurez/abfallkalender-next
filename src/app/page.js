
import { Endpoints } from "../constants/Endpoint";
import { redirect } from "next/navigation";
export default async function Home() {
  return redirect(`${Endpoints.baseUrl}/login`);
}
