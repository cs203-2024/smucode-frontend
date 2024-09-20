import { LoginForm } from "@/components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Login</h1>
          <p className="text-sm text-muted-foreground">
            to continue to SMUcode
          </p>
        </div>
        <LoginForm />
      </div>
    </>
  );
}