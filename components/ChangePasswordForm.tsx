"use client";

import { useState } from "react";
import { Button } from "@/components/ui/new-york/button";
import { Input } from "@/components/ui/new-york/input";
import { Label } from "@/components/ui/new-york/label";
import { Icons } from "@/components/icons";
import { changePassword } from "@/services/authAPI";

const ChangePasswordForm: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await changePassword(password);
      alert("Password changed successfully");
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <form onSubmit={handleChangePassword} className="space-y-4">
      <div>
        <Label htmlFor="password">New Password</Label>
        <div className="relative">
          <Input
            id="password"
            name="password"
            type={passwordVisible ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
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
        </div>
      </div>
      <div>
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <div className="relative">
          <Input
            id="confirmPassword"
            name="confirmPassword"
            type={confirmPasswordVisible ? "text" : "password"}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            required
          />
          <button
            type="button"
            onClick={toggleConfirmPasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-2 text-sm text-gray-600"
          >
            {confirmPasswordVisible ? (
              <Icons.eyeSlash className="h-5 w-5" />
            ) : (
              <Icons.eye className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
      {error && <div className="text-red-500">{error}</div>}
      <Button
        type="submit"
        className="bg-blue-500 text-white hover:bg-blue-600 px-8 py-2 mt-4"
      >
        Change Password
      </Button>
    </form>
  );
};

export default ChangePasswordForm;