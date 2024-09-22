import { Metadata } from "next";
import Image from "next/image";
import profilePicture from "./profile-picture.jpg";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/new-york/card";
import { RecentSales } from "@/app/profile/components/recent-sales";
import { Button } from "@/components/ui/new-york/button";

export const metadata: Metadata = {
  title: "Profile",
  description: "Example dashboard app built using the components.",
};

export default function DashboardPage() {
  return (
    <>
      <div className="container mx-auto p-4 md:p-6 lg:p-8">
        <div className="flex-1 space-y-4 p-8 pt-6">
          <Card>
            <div className="bg-white rounded-lg shadow-md p-4">
              <div className="flex flex-col items-center space-y-4">
                <Image
                  src={profilePicture}
                  alt="Profile Picture"
                  width={96} // 24px * 4 (device pixel ratio)
                  height={96} // 24px * 4 (device pixel ratio)
                  className="rounded-full"
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGg...AA"
                />
                <h2 className="text-3xl font-bold tracking-tight">
                  AdrianLooLovesCoding
                </h2>
                <p className="text-lg text-muted-foreground">
                  adrianloo@gmail.com
                </p>
                <Button>Edit Profile</Button>
              </div>
            </div>
          </Card>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Email</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold break-all">
                  adrianloo@gmail.com
                </div>
                <p className="text-xs text-muted-foreground">
                  Joined: 1 August 2024
                </p>
              </CardContent>
            </Card> */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">ELO</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 19.59 21.15 12 17.96 4.41 21.15 7 14.14 2 9.27 8.91 8.26" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2350</div>
                <p className="text-xs text-muted-foreground">
                  Last updated: 5 September 2024
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Matches Played
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <circle
                    cx="12"
                    cy="12"
                    r="9"
                    fill="none"
                    stroke="currentColor"
                  />
                  <line x1="12" y1="12" x2="12" y2="6" stroke="currentColor" />
                  <line x1="12" y1="12" x2="9" y2="15" stroke="currentColor" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">256</div>
                <p className="text-xs text-muted-foreground">
                  +20 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Wins</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 19V5M12 5L7 10M12 5L17 10" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">154</div>
                <p className="text-xs text-muted-foreground">
                  +10 from last month
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Losses</CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 5V19M12 19L7 14M12 19L17 14" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">102</div>
                <p className="text-xs text-muted-foreground">
                  +10 since last month
                </p>
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Recent Opponents</CardTitle>
                <CardDescription>
                  You played 20 matches this month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
