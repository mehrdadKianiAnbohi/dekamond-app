// /app/dashboard/page.tsx

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { clearUser, getUser } from "@/lib/utils";
import { Button } from "@/components/Button";
import { User } from "@/shared/types";
import Image from "next/image"

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<User|null>(null);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const storedUser = getUser();
    if (!storedUser) {
      router.push("/");
    } else {
      setUser(storedUser);
    }
  }, [router]);

  const handleLogout = () => {
    clearUser();
    router.push("/");
  };

  if (!isClient) {
    return null; // Don't render anything on the server
  }

  if (!user) {
    return null; // Redirecting...
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50 text-center">
      <div className="w-full max-w-sm rounded-lg shadow-md bg-white p-6">
        {user.picture && (
          <Image
            src={user.picture}
            alt="User profile"
            className="w-24 h-24 rounded-full mx-auto mb-4"
            width={24}
            height={24}
          />
        )}
        <h1 className="text-3xl font-bold mb-2">Welcome, {user.name}!</h1>
        <p className="text-gray-600 mb-6">{user.email}</p>
        <Button onClick={handleLogout}>
          Logout
        </Button>
      </div>
    </div>
  );
}