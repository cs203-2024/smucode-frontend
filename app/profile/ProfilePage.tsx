"use client";

import Image from "next/image";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/new-york/card";
import { RecentOpponents } from "@/app/profile/RecentOpponents";
import { Button } from "@/components/ui/new-york/button";

import { useUserContext } from "@/context/UserContext";
import { getCardData } from "./cardData";
import { User } from "@/components/types";


const ProfilePage: React.FC = () => {
  const { user, loading, error } = useUserContext();
  console.log("User from context:", user);
  if (loading) {
    return <div className="text-center p-4 mt-10">Loading user data...</div>;
  }

  if (error) {
    return <div className="text-center p-4 text-red-500 mt-10">{error}</div>;
  }

  if (!user) {
    return <div className="text-center p-4 mt-10">No user data available</div>;
  }

  const cardData = getCardData(user);

  const userDetails = [
    { label: "Email", value: user.email },
  ];

  return (
    <>
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Card className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="flex items-center p-6">
              <div className="w-1/3 flex flex-col items-center">
                <Image
                    src={user.profileImageUrl || /*default img*/ '/assets/images/avatar.png'}
                    alt={`${user.username}'s Profile Picture`}
                  width={256} // Increased width
                  height={256} // Increased height
                  className="rounded-full border-4 border-gray-200 shadow-lg"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGg...AA"
                />
                <Button className="bg-blue-500 text-white hover:bg-blue-600 px-8 py-2 mt-4">
                  Edit Profile
                </Button>
              </div>
              <div className="w-2/3 pl-6">
                <div className="border-b pb-4 mb-4">
                  <h2 className="text-2xl font-bold text-gray-800">
                    {user.username}
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
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Recent Opponents</CardTitle>
              </CardHeader>
              <CardContent>
                <RecentOpponents />
              </CardContent>
            </Card>
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Recent Tournaments</CardTitle>
              </CardHeader>
              <CardContent>{/* <RecentOpponents /> */}</CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
