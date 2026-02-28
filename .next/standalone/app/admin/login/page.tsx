"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useToast } from "@/lib/toast-context";

export default function AdminLoginPage() {
  const router = useRouter();
  const { showSuccess, showError } = useToast();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Login failed");
      }

      // Check if user is admin
      if (data.user.role !== "admin") {
        throw new Error("Access denied. Admin only.");
      }
      console.log(data, "Login Data");

      // Store tokens in localStorage
      if (data.accessToken && data.refreshToken) {
        localStorage.setItem("horizon_accessToken", data.accessToken);
        localStorage.setItem("horizon_refreshToken", data.refreshToken);
        localStorage.setItem("horizon_user", JSON.stringify(data.user));
      }

      showSuccess("Login successful! Redirecting...");

      // Redirect to dashboard
      setTimeout(() => {
        window.location.href = "/admin/dashboard";
      }, 500);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Invalid credentials";
      showError(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background:
          "linear-gradient(to bottom right, #111827, #000000, #111827)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "1rem",
      }}
    >
      <div style={{ width: "100%", maxWidth: "28rem" }}>
        {/* Logo and title */}
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              background: "linear-gradient(to right, #c084fc, #db2777)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              marginBottom: "0.5rem",
            }}
          >
            HorizonVFX
          </h1>
          <p style={{ color: "#9ca3af" }}>Admin Panel Login</p>
        </div>

        {/* Login form */}
        <div
          style={{
            background: "rgba(0, 0, 0, 0.5)",
            backdropFilter: "blur(24px)",
            border: "1px solid #1f2937",
            borderRadius: "1rem",
            padding: "2rem",
          }}
        >
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}
          >
            {/* Email field */}
            <div>
              <label
                htmlFor="email"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#d1d5db",
                  marginBottom: "0.5rem",
                }}
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white outline-none placeholder:text-black"
                placeholder="admin@horizonvfx.com"
              />
            </div>

            {/* Password field */}
            <div>
              <label
                htmlFor="password"
                style={{
                  display: "block",
                  fontSize: "0.875rem",
                  fontWeight: "500",
                  color: "#d1d5db",
                  marginBottom: "0.5rem",
                }}
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white outline-none placeholder:text-black"
                placeholder="••••••••"
              />
            </div>

            {/* Remember me & Forgot password */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.875rem",
              }}
            >
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: "#9ca3af",
                  cursor: "pointer",
                }}
              >
                <input
                  type="checkbox"
                  style={{
                    width: "1rem",
                    height: "1rem",
                    borderRadius: "0.25rem",
                    border: "1px solid #374151",
                    background: "rgba(0, 0, 0, 0.5)",
                  }}
                />
                <span>Remember me</span>
              </label>
              <Link
                href="/admin/forgot-password"
                style={{ color: "#c084fc", textDecoration: "none" }}
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: "100%",
                padding: "0.75rem 1rem",
                background: "linear-gradient(to right, #a855f7, #ec4899)",
                color: "#ffffff",
                fontWeight: "500",
                borderRadius: "0.5rem",
                border: "none",
                cursor: isLoading ? "not-allowed" : "pointer",
                opacity: isLoading ? 0.5 : 1,
              }}
            >
              {isLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>

          {/* Back to site link */}
          <div
            style={{
              marginTop: "1.5rem",
              textAlign: "center",
              fontSize: "0.875rem",
              color: "#9ca3af",
            }}
          >
            <Link href="/" style={{ color: "#c084fc", textDecoration: "none" }}>
              ← Back to website
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: "2rem",
            textAlign: "center",
            fontSize: "0.875rem",
            color: "#6b7280",
          }}
        >
          <p>© 2025 HorizonVFX. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
}
