"use client";
import * as React from "react";
import { useUserContext } from '@/context/UserContext';
import { login } from '@/services/userApi';
import { User } from '@/components/types';
import { useRouter } from 'next/navigation';
import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { Button } from "@/components/ui/new-york/button";
import { Input } from "@/components/ui/new-york/input";
import { Label } from "@/components/ui/new-york/label";

interface LoginFormProps extends React.HTMLAttributes<HTMLDivElement> {}

export function LoginForm({ className, ...props }: LoginFormProps) {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [passwordVisible, setPasswordVisible] = React.useState<boolean>(false);
  const { setUser } = useUserContext();
  const [errorMessage, setErrorMessage] = React.useState<string>("");
  const router = useRouter();

  async function onSubmit(event: React.SyntheticEvent) {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    const form = event.target as HTMLFormElement;
    const formData = new FormData(form);

    const credentials = {
      username: formData.get('username') as string,
      password: formData.get('password') as string,
    };
    try {
      const response = await login(credentials);
      console.log('Response from login:', response);

      if (response && response.userDTO) {
        const user: User = {
          username: response.userDTO.username,
          email: response.userDTO.email,
          profileImageUrl: response.userDTO.profileImageUrl,
          role: response.userDTO.role,
          mu: response.userDTO.mu,
          sigma: response.userDTO.sigma,
          skillIndex: response.userDTO.skillIndex,
        };
        console.log('Mapped user object:', user);
        setUser(user);
        router.push('/dashboard'); //TODO: redirect to relevant home page
      } else {
        console.error('Unexpected response structure:', response);
        setErrorMessage('Unexpected response structure');
      }
    } catch (error: any) {
      console.error('Error logging in:', error);
      setErrorMessage(
          error.response?.data?.message ||
          error.message ||
          'Login failed. Please try again.'
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
      name: "username",
      label: "Username",
      type: "text",
      autoComplete: "username",
    },
    {
      id: "password",
      name: "password",
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
                    name={field.name}
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
          {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}
          <Button type="submit" disabled={isLoading}>
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
