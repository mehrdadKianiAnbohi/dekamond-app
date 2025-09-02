"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/Input";
import { Button } from "@/components/Button";
import { validateIranianMobileNumber, saveUser } from "@/lib/utils";

export default function Login() {
  const router = useRouter();
  const [mobileNumber, setMobileNumber] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const mobileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (mobileInputRef.current) {
      mobileInputRef.current.focus();
    }
  }, []); 

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!validateIranianMobileNumber(mobileNumber)) {
      setError("Please enter a valid Iranian mobile number.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch("https://randomuser.me/api/?results=1&nat=us");
      const data = await response.json();
      const user = data.results[0];

      if (user) {
        saveUser({
          name: `${user.name.first} ${user.name.last}`,
          email: user.email,
          picture: user.picture.large,
        });
        router.push("/dashboard");
      }
    } catch (err) {
      setError("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-sm rounded-lg shadow-md bg-white p-6">
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>
        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <Input
            id="mobile"
            type="tel"
            label="Mobile Number (e.g., 09123456789)"
            placeholder="09xxxxxxxxx"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            error={error}
            // 3. Attach the ref to the Input component
            ref={mobileInputRef}
          />
          <Button type="submit" isLoading={isLoading} disabled={isLoading}>
            Login
          </Button>
        </form>
      </div>
    </div>
  );
}