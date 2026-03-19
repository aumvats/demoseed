"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const { signIn, signUp } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const { error } =
      mode === "signin"
        ? await signIn(email, password)
        : await signUp(email, password);

    setLoading(false);

    if (error) {
      setError(error);
    } else {
      router.push("/generate");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-ds-bg-primary">
      <div className="w-full max-w-sm px-6">
        <h1 className="text-xl font-semibold text-ds-text-primary mb-6">
          {mode === "signin" ? "Sign in to DemoSeed" : "Create your account"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="email" className="text-ds-text-secondary text-sm">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              className="bg-ds-bg-secondary border-ds-border text-ds-text-primary"
            />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="password" className="text-ds-text-secondary text-sm">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              className="bg-ds-bg-secondary border-ds-border text-ds-text-primary"
            />
          </div>

          {error && (
            <p className="text-ds-destructive text-sm">{error}</p>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-ds-accent hover:bg-ds-accent-hover text-white"
          >
            {loading
              ? "Please wait…"
              : mode === "signin"
              ? "Sign in"
              : "Create account"}
          </Button>
        </form>

        <p className="mt-4 text-sm text-ds-text-secondary text-center">
          {mode === "signin" ? (
            <>
              No account?{" "}
              <button
                type="button"
                onClick={() => { setMode("signup"); setError(null); }}
                className="text-ds-accent hover:underline"
              >
                Sign up
              </button>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => { setMode("signin"); setError(null); }}
                className="text-ds-accent hover:underline"
              >
                Sign in
              </button>
            </>
          )}
        </p>
      </div>
    </div>
  );
}
