"use client";

import { useState } from "react";
import { Button } from "@/components/ui/new-york/button";
import { Input } from "@/components/ui/new-york/input";
import { Label } from "@/components/ui/new-york/label";
import { deleteAccount } from "@/services/authAPI";
import { useUserContext } from "@/context/UserContext"; // Import useUserContext
import { Icons } from "@/components/icons"; // Import Icons

const DeleteAccountForm: React.FC = () => {
  const { user } = useUserContext(); // Get the user from the context
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false); // Add state for password visibility
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Add state for success message

  const handleDeleteAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error message
    setSuccess(null); // Reset success message

    if (!password) {
      setError("Password cannot be empty");
      return;
    }

    if (!user) {
      setError("User is not logged in");
      return;
    }

    console.log("Username:", user.username); // Log the username to ensure it's being captured
    console.log("Password:", password); // Log the password to ensure it's being captured

    try {
      await deleteAccount(user.username, password); // Include the username when calling deleteAccount
      setSuccess("Account deleted successfully"); // Set success message
      setPassword(""); // Reset password field
    } catch (err) {
      if (err instanceof Error) {
        if ((err as any).response) {
          // Server responded with a status other than 200 range
          console.error("Server response:", (err as any).response.data);
          setError(
            (err as any).response.data.message || "Failed to delete account"
          );
        } else if ((err as any).request) {
          // Request was made but no response received
          console.error("Request error:", (err as any).request);
          setError("No response from server");
        } else {
          // Something else happened
          console.error("Error:", err.message);
          setError(err.message);
        }
      } else {
        console.error("Unexpected error:", err);
      }
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
        Use the form below to delete your account.
      </p>
      <form onSubmit={handleDeleteAccount} className="space-y-4">
        <div>
          <Label htmlFor="password">Password</Label>
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
        {error && <div className="text-red-500">{error}</div>}
        {success && <div className="text-green-500">{success}</div>}{" "}
        {/* Display success message */}
        <Button
          type="submit"
          className="bg-red-500 text-white hover:bg-red-600 px-8 py-2 mt-4"
        >
          Delete Account
        </Button>
      </form>
    </div>
  );
};

export default DeleteAccountForm;
