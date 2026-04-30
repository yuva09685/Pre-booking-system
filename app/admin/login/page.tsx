"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import Link from "next/link";
import { ChefHat, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ADMIN_USER = "admin";
  const ADMIN_PASS = "atchayas123";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    await new Promise((resolve) => setTimeout(resolve, 500));

    const u = username.trim().toLowerCase();
    const p = password.trim().toLowerCase();

    if (u === ADMIN_USER && p === ADMIN_PASS) {
      login("admin");
      router.push("/admin");
    } else {
      setError("Incorrect username or password");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fdfbf7] flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-[#2a2a20] rounded-full flex items-center justify-center mx-auto mb-4">
            <ChefHat className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-serif font-bold text-[#2a2a20]">
            Kitchen Panel Login
          </h1>
          <p className="text-sm text-[#8e8e7a] mt-2">
            Enter your credentials to access orders
          </p>
        </div>

        <div className="bg-white p-8 rounded-[24px] border border-[#e5e0d5] shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#8e8e7a] mb-2">
                Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full px-4 py-3 bg-[#f5f5f0] rounded-xl border border-[#e5e0d5] text-[#2a2a20] placeholder-[#8e8e7a] focus:outline-none focus:border-[#5a5a40] transition-colors"
                placeholder="admin"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-widest text-[#8e8e7a] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 bg-[#f5f5f0] rounded-xl border border-[#e5e0d5] text-[#2a2a20] placeholder-[#8e8e7a] focus:outline-none focus:border-[#5a5a40] transition-colors pr-12"
                  placeholder="atchayas123"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8e8e7a] hover:text-[#5a5a40]"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {error && (
              <p className="text-red-600 text-sm text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 bg-[#5a5a40] text-white rounded-xl font-bold uppercase tracking-widest text-sm hover:bg-[#4a4a35] transition-colors disabled:opacity-50"
            >
              {isLoading ? "Signing in..." : "Login"}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-[#e5e0d5]">
            <p className="text-xs text-[#8e8e7a] text-center">
              Demo login: <br />
              <span className="font-bold text-[#5a5a40]">admin / atchayas123</span>
            </p>
          </div>
        </div>

        <p className="text-center mt-6">
          <Link
            href="/"
            className="text-xs font-bold uppercase tracking-widest text-[#8e8e7a] hover:text-[#5a5a40]"
          >
            ← Back to Restaurant
          </Link>
        </p>
      </div>
    </div>
  );
}