"use client";

import { useState } from "react";
import { Button } from "@/components/ui/new-york/button";
import { Icons } from "@/components/icons";
import { deleteAccount } from "@/services/authAPI";
import { useUserContext } from "@/context/UserContext";

const DeleteAccountForm: React.FC = () => {
  const { user } = useUserContext();
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState<string>("");
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false);

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount(user.username, password);
      alert("Account deleted successfully");
      // Redirect to login page after account deletion
      window.location.href = "/login";
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Delete Account
      </h2>
      <p className="text-gray-600 mb-4">
        Enter your password below to delete your account. This action is
        irreversible.
      </p>
      <div className="relative">
        <input
          type={passwordVisible ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
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
      {error && <div className="text-red-500">{error}</div>}
      <Button
        onClick={handleDeleteAccount}
        className="bg-red-500 text-white hover:bg-red-600 px-8 py-2 mt-4"
      >
        Delete Account
      </Button>
    </div>
  );
};

export default DeleteAccountForm;
