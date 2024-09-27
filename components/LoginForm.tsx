"use client";
import * as React from "react";
import { useRouter } from "next/navigation";
import { login } from "@/app/services/userApi";
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/new-york/button";
import { Input } from "@/components/ui/new-york/input";
import { Label } from "@/components/ui/new-york/label";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [username, setUsername] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [errorMessage, setErrorMessage] = React.useState<string>("");

  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    if (!username || !password) {
      setErrorMessage("Please enter both username and password.");
      setIsLoading(false);
      return;
    }

    //prepare credentials
    const credentials = {
      username: username,
      password: password,
    };

    try {
      const response = await login(credentials);
      console.log("Login successful:", response);

      //store jwt token
      localStorage.setItem("token", response.token);

      //TODO: redirect to relevant page
      router.push("/");
    } catch (error: any) {
      console.error("Login failed:", error);
      setErrorMessage(
          error.response?.data?.message ||
          error.message ||
          "Login failed. Please try again."
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

              <Label htmlFor="password">Password</Label>
              <Input
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  autoCapitalize="none"
                  autoComplete="current-password"
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
              Log In
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
