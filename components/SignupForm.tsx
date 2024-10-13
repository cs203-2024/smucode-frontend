"use client";
import * as React from "react";
// import { useUserContext } from '@/app/context/UserContext';
import { signup } from '@/services/userAPI';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/new-york/button";
import { Input } from "@/components/ui/new-york/input";
import { Label } from "@/components/ui/new-york/label";

interface SignupFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function SignupForm({ className, ...props }: SignupFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  // const { setUser } = useUserContext();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const router = useRouter();
  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const form = event.target as HTMLFormElement;
    const formData = {
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
      verifyPassword: form.verifyPassword.value,
      role: form.role?.value,
    };

    if (formData.password !== formData.verifyPassword) {
      setErrorMessage("Passwords do not match.");
      setIsLoading(false);
      return;
    }

    try {
      const response = await signup(formData);
      //TODO: link to adr's context
      //setUser(response.userDTO);
      //redirect to login
      router.push("/login");
    } catch (error: any) {
      console.error('Error signing up:', error);
      setErrorMessage(
          error.response?.data?.message ||
          error.message ||
          "Signup failed. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
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
    { id: "email", label: "Email", type: "email", autoComplete: "email" },
    {
      id: "password",
      label: "Password",
      type: passwordVisible ? "text" : "password",
      autoComplete: "password",
    },
    {
      id: "verifyPassword",
      label: "Verify Password",
      type: passwordVisible ? "text" : "password",
      autoComplete: "verifyPassword",
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
                    name={field.id}
                    placeholder=""
                    type={field.type}
                    autoCapitalize="none"
                    autoComplete={field.autoComplete}
                    autoCorrect="off"
                    disabled={isLoading}
                  />
                  {field.id === "password" || field.id === "verifyPassword" ? (
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
                  ) : null}
                </div>
              </React.Fragment>
            ))}
            <Label htmlFor="role">Role</Label>
            <div className="relative">
              <select
                id="role"
                name="role"
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-white"
                disabled={isLoading}
              >
                <option value="PLAYER">Participant</option>
                <option value="ADMIN">Admin</option>
              </select>
            </div>
          </div>
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
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