"use client";

import { useState } from "react";
import { Button } from "@/components/ui/new-york/button";
import { Input } from "@/components/ui/new-york/input";
import { Label } from "@/components/ui/new-york/label";
import { Icons } from "@/components/icons";
import { changePassword } from "@/services/authAPI";
import { useUserContext } from "@/context/UserContext"; // Import useUserContext

const ChangePasswordForm: React.FC = () => {
  const { user } = useUserContext(); // Get the user from the context
  const [oldPassword, setOldPassword] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [oldPasswordVisible, setOldPasswordVisible] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null); // Add state for success message

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null); // Reset error message
    setSuccess(null); // Reset success message

    if (!oldPassword) {
      setError("Old password cannot be empty");
      return;
    }
    if (!password) {
      setError("New password cannot be empty");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // console.log("Username:", user?.username); // Log the username to ensure it's being captured
    // console.log("Old Password:", oldPassword); // Log the old password to ensure it's being captured
    // console.log("New Password:", password); // Log the new password to ensure it's being captured

    try {
      await changePassword(user?.username, oldPassword, password); // Include the username when calling changePassword
      setSuccess("Password changed successfully"); // Set success message
      setOldPassword(""); // Reset old password field
      setPassword(""); // Reset new password field
      setConfirmPassword(""); // Reset confirm password field
    } catch (err) {
      if (err.response) {
        // Server responded with a status other than 200 range
        console.error("Server response:", err.response.data);
        setError(err.response.data.message || "Failed to change password");
      } else if (err.request) {
        // Request was made but no response received
        console.error("Request error:", err.request);
        setError("No response from server");
      } else {
        // Something else happened
        console.error("Error:", err.message);
        setError(err.message);
      }
    }
  };

  const toggleOldPasswordVisibility = () => {
    setOldPasswordVisible(!oldPasswordVisible);
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Change Password
      </h2>
      <p className="text-gray-600 mb-4">
        Use the form below to change your password.
      </p>
      <form onSubmit={handleChangePassword} className="space-y-4">
        <div>
          <Label htmlFor="oldPassword">Old Password</Label>
          <div className="relative">
            <Input
              id="oldPassword"
              name="oldPassword"
              type={oldPasswordVisible ? "text" : "password"}
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
            <button
              type="button"
              onClick={toggleOldPasswordVisibility}
              className="absolute inset-y-0 right-0 flex items-center px-2 text-sm text-gray-600"
            >
              {oldPasswordVisible ? (
                <Icons.eyeSlash className="h-5 w-5" />
              ) : (
                <Icons.eye className="h-5 w-5" />
              )}
            </button>
          </div>
        </div>
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
        {success && <div className="text-green-500">{success}</div>}{" "}
        {/* Display success message */}
        <Button
          type="submit"
          className="bg-blue-500 text-white hover:bg-blue-600 px-8 py-2 mt-4"
        >
          Change Password
        </Button>
      </form>
    </div>
  );
};

export default ChangePasswordForm;
