"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/new-york/card";
import { RecentOpponents } from "@/app/profile/RecentOpponents";
import { Button } from "@/components/ui/new-york/button";
import { getCardData } from "@/components/cardData";
import { UserProfile } from "@/components/types";
import * as Tooltip from "@radix-ui/react-tooltip";
import Link from "next/link";
import { getUserProfile } from "@/services/userAPI"; // Import the API function
import { useUserContext } from "@/context/UserContext"; // Import the useUserContext hook
import ImageUploader from "./upload/ImageUploader";

interface ProfilePageProps {
  username: string;
}

const ProfilePage: React.FC<ProfilePageProps> = ({ username }) => {
  const { user: loggedInUser } = useUserContext(); // Get the logged-in user from context
  const [user, setUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [profilePicture, setProfilePicture] = useState("/assets/images/default_profile.png");
  
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserProfile(username);
        setUser(data);  // Set the fetched user data to state
        if (data.profileImageUrl && data.profileImageUrl.startsWith("http")) {
          setProfilePicture(data.profileImageUrl);
        }
      } catch (err) {
        setError("Failed to fetch user data");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  if (loading) {
    return <div className="text-center p-4 mt-10">Loading user data...</div>;
  }

  if (error || !user) {
    return (
      <main className="flex flex-col justify-center items-center mt-[60px] w-full min-h-full p-60">
        <div className="text-lg p-4">No Profile found.</div>
        <Link href={`/`}>
          <Button>Back to Home</Button>
        </Link>
      </main>
    );
  }

  const cardData = getCardData(user); // Pass the fetched user data to getCardData
  const userDetails = [{ label: "Email", value: user?.email }];

  return (
    <Tooltip.Provider>
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center p-6">
              <div className="w-1/3 flex flex-col items-center">
                <Image
                  src={
                    profilePicture
                  }
                  alt={`${user?.username}'s Profile Picture`}
                  width={256} // Increased width
                  height={256} // Increased height
                  className="rounded-full border-4 border-gray-200 shadow-lg rounded-full w-64 h-64 object-cover"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGg...AA"
                />
                {loggedInUser?.username === username && ( // Conditional rendering
                  <div className="flex justify-between items-center gap-2 mt-4">
                    <Link href="/editprofile">
                      <Button className="bg-blue-500 text-white hover:bg-blue-600 px-8 py-2">
                        Edit Profile
                      </Button>
                    </Link>
                    <ImageUploader label={"Profile Picture"} setPicture={setProfilePicture} />
                  </div>
                )}
              </div>
              <div className="w-2/3 pl-6">
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {user?.username}
                  </h2>
                </div>
                {userDetails.map((detail, index) => (
                  <div key={index} className="border-b pb-4 mb-4">
                    <p className="text-lg font-semibold text-gray-700">
                      {detail.label}
                    </p>
                    <p className="text-lg text-gray-500">{detail.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </Card>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {cardData.map((card, index) => (
              <Card key={index}>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {card.title}
                  </CardTitle>
                  {card.icon}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{card.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          {/* Commenting out Recent Opponents and Recent Tournaments */}
          {/* <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Recent Opponents</CardTitle>
              </CardHeader>
              <CardContent>{<RecentOpponents />}</CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Recent Tournaments</CardTitle>
              </CardHeader>
              <CardContent>{<RecentOpponents />}</CardContent>
            </Card>
          </div> */}
        </div>
      </div>
    </Tooltip.Provider>
  );
};

export default ProfilePage;
