"use client";

import { useState } from "react";
import { Button } from "@/components/ui/new-york/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/new-york/card";
import { useUserContext } from "@/context/UserContext";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import { deleteAccount } from "@/services/authAPI";

const EditProfilePage: React.FC = () => {
  const { user } = useUserContext();
  const [error, setError] = useState<string | null>(null);

  const handleDeleteAccount = async () => {
    try {
      await deleteAccount();
      alert("Account deleted successfully");
      // Redirect to login page after account deletion
      window.location.href = "/login";
    } catch (err) {
      setError((err as Error).message);
    }
  };

  if (!user) {
    return (
      <main className="flex flex-col justify-center items-center mt-[60px] w-full min-h-full p-60">
        <div className="text-lg p-4">401 | You need to login dude.</div>
        <Link href={`/login`}>
          <Button>Login</Button>
        </Link>
      </main>
    );
  }

  return (
    <Tooltip.Provider>
      <div className="pt-10">
        {/* Add padding-top to push content below the navbar */}
        <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-lg">
          <div className="flex-1 space-y-4 p-8 pt-6">
            <Link href={`/profile`}>
              <Button className="bg-gray-500 text-white hover:bg-gray-600 px-8 py-2 mb-4">
                Back to Profile
              </Button>
            </Link>
            <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-2xl font-bold text-gray-800">
                  Edit Profile
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <ChangePasswordForm />
                  <div className="mt-8">
                    <Button
                      onClick={handleDeleteAccount}
                      className="bg-red-500 text-white hover:bg-red-600 px-8 py-2"
                    >
                      Delete Account
                    </Button>
                  </div>
                  {error && <div className="text-red-500">{error}</div>}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Tooltip.Provider>
  );
};

export default EditProfilePage;