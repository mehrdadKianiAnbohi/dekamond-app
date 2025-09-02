import Login from "@/components/Login";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Login | Auth System",
  description: "Login to the dashboard",
};

export default function LoginPage() {
  return <Login />;
}