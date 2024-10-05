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
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const inputFields = [
    {
      id: "username",
      label: "Username",
      type: "text",
      autoComplete: "username",
    },
    {
      id: "password",
      label: "Password",
      type: passwordVisible ? "text" : "password",
      autoComplete: "password",
    },
  ];

  const socialButtons = [
    { icon: Icons.google, label: "Google" },
    { icon: Icons.apple, label: "Apple" },
    { icon: Icons.gitHub, label: "GitHub" },
  ];

  return (
    <div className={cn("grid gap-3", className)} {...props}>
      <form onSubmit={onSubmit}>
        <div className="grid gap-3">
          <div className="grid gap-1">
            {inputFields.map((field) => (
              <React.Fragment key={field.id}>
                <Label htmlFor={field.id}>{field.label}</Label>
                <div className="relative">
                  <Input
                    id={field.id}
                    placeholder=""
                    type={field.type}
                    autoCapitalize="none"
                    autoComplete={field.autoComplete}
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                  {field.id === "password" && (
                    <button
                      type="button"
                      onClick={togglePasswordVisibility}
                      className="absolute inset-y-0 right-0 flex items-center px-2 text-sm text-gray-600"
                    >
                      {passwordVisible ? (
                        <Icons.eyeSlash className="h-5 w-5" />
                      ) : (
                        <Icons.eye className="h-5 w-5" />
                      )}
                    </button>
                  )}
                </div>
              </React.Fragment>
            ))}
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
        {socialButtons.map((button, index) => (
          <Button
            key={index}
            variant="outline"
            type="button"
            disabled={isLoading}
            className="p-2 flex items-center justify-center"
          >
            {isLoading ? (
              <Icons.spinner className="m-2 h-4 w-4 animate-spin" />
            ) : (
              <button.icon className="m-2 h-4 w-4" />
            )}
          </Button>
        ))}
      </div>
    </div>
  );
}
