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
import Link from "next/link";
import ChangePasswordForm from "@/components/ChangePasswordForm";
import DeleteAccountForm from "@/components/DeleteAccountForm"; // Import DeleteAccountForm

const EditProfilePage: React.FC = () => {
  const { user } = useUserContext();

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
    <div className="pt-10">
      {/* Add padding-top to push content below the navbar */}
      <div className="container mx-auto p-4 md:p-6 lg:p-8 max-w-lg">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Link href={`/profile`}>
            <Button className="bg-gray-500 text-white hover:bg-gray-600 px-8 py-2 mb-2">
              Back to Profile
            </Button>
          </Link>
          <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
              <CardTitle className="text-2xl font-bold text-gray-800">
                Edit Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                <hr className="my-6" />
                <ChangePasswordForm />
                <hr className="my-6" />
                <DeleteAccountForm />
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default EditProfilePage;
