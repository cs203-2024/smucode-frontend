"use client";
import * as React from "react";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/new-york/button";
import { Input } from "@/components/ui/new-york/input";
import { Label } from "@/components/ui/new-york/label";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  return (
    <div className={cn("grid gap-3", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            <Label className="" htmlFor="username">
              Username
            </Label>
            <Input
              id="username"
              placeholder=""
              type="text"
              autoCapitalize="none"
              autoComplete="username"
              autoCorrect="off"
              disabled={isLoading}
            />
            <Label className="" htmlFor="password">
              Password
            </Label>
            <Input
              id="password"
              placeholder=""
              type="password"
              autoCapitalize="none"
              autoComplete="password"
              autoCorrect="off"
              disabled={isLoading}
            />
          </div>
          <Button disabled={isLoading}>
            {isLoading && (
              <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
            )}
            Next
          </Button>
        </div>
      </form>
      <div className="relative">
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
          )}{" "}
          {/* Google */}
        </Button>
        {/* <Button variant="outline" size="icon" type="button" disabled={isLoading}> */}
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
          )}{" "}
          {/* Apple */}
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
          )}{" "}
          {/* GitHub */}
        </Button>
      </div>
    </div>
  );
}