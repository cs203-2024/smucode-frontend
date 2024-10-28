"use client";

import ProfilePage from "@/components/ProfilePage";
import { useParams } from "next/navigation";
import React from "react";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const params = useParams();
  const username = Array.isArray(params.username)
    ? params.username[0]
    : params.username;
  return (
    <>
      <div className="pt-10">
        {" "}
        {/* Add padding-top to push content below the navbar */}
        <ProfilePage username={username} />
      </div>
      {/* <div className="mt-20">{username}</div> */}
    </>
  );
};

export default page;
