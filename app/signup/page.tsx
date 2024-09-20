import { SignupForm } from "@/components/SignupForm";

export default function SignupPage() {
  return (
    <>
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">Sign Up</h1>
          <p className="text-sm text-muted-foreground">to explore SMUcode</p>
        </div>
        <SignupForm />
      </div>
    </>
  );
}
