"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { signup } from "@/app/services/userAPI";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/new-york/button";
import { Input } from "@/components/ui/new-york/input";
import { Label } from "@/components/ui/new-york/label";

interface SignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignupForm({ className, ...props }: SignupFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [verifyPassword, setVerifyPassword] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (password !== verifyPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    const userData = {
      username: username,
      password: password,
      email: email,
      profileImageUrl: "https://example.com/default-profile.png",
      role: "PLAYER",
      mu: 0.0,
      sigma: 0.0,
      skillIndex: 0.0,
    };

    try {
      const response = await signup(userData);
      console.log("Signup successful:", response);

      //store the token (if returned)
      if (response.token) {
        localStorage.setItem("token", response.token);
      }

      //redirect to login
      router.push("/login");
    } catch (error: any) {
      console.error("Signup failed:", error);
      setErrorMessage(
          error.message || "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
      <div className={cn("grid gap-3", className)} {...props}>
        <form onSubmit={onSubmit}>
          <div className="grid gap-3">
            <div className="grid gap-1">
              <Label htmlFor="username">Username</Label>
              <Input
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  type="text"
                  autoCapitalize="none"
                  autoComplete="username"
                  autoCorrect="off"
                  disabled={isLoading}
              />

              <Label htmlFor="email">Email</Label>
              <Input
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  autoCapitalize="none"
                  autoComplete="email"
                  autoCorrect="off"
                  disabled={isLoading}
              />

              <Label htmlFor="password">Password</Label>
              <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  autoCorrect="off"
                  disabled={isLoading}
              />

              <Label htmlFor="verifyPassword">Verify Password</Label>
              <Input
                  id="verifyPassword"
                  value={verifyPassword}
                  onChange={(e) => setVerifyPassword(e.target.value)}
                  type="password"
                  autoCapitalize="none"
                  autoComplete="new-password"
                  autoCorrect="off"
                  disabled={isLoading}
              />
            </div>
            {errorMessage && (
                <p className="text-red-500 text-sm">{errorMessage}</p>
            )}
            <Button type="submit" disabled={isLoading}>
              {isLoading && (
                  <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
              )}
              Next
            </Button>
          </div>
        </form>
        <div className="relative mt-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
          </div>
        </div>
        <div className="flex justify-center space-x-2">
          <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              className="p-2 flex items-center justify-center"
          >
            {isLoading ? (
                <Icons.spinner className="m-2 h-4 w-4 animate-spin" />
            ) : (
                <Icons.google className="m-2 h-4 w-4" />
            )}
          </Button>
          <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              className="p-2 flex items-center justify-center"
          >
            {isLoading ? (
                <Icons.spinner className="m-2 h-4 w-4 animate-spin" />
            ) : (
                <Icons.apple className="m-2 h-4 w-4" />
            )}
          </Button>
          <Button
              variant="outline"
              type="button"
              disabled={isLoading}
              className="p-2 flex items-center justify-center"
          >
            {isLoading ? (
                <Icons.spinner className="m-2 h-4 w-4 animate-spin" />
            ) : (
                <Icons.gitHub className="m-2 h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
  );
}
