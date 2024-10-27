// import ProfilePage from "./ProfilePage";

// const Profile = () => {
//   return (
//     <div className="pt-10">
//       {" "}
//       {/* Add padding-top to push content below the navbar */}
//       <ProfilePage />
//     </div>
//   );
// };

// export default Profile;

"use client";
import { useEffect } from "react";
import { useUserContext } from "@/context/UserContext";

const ProfileRedirect = () => {
  const { user } = useUserContext();

  // If the user is logged in, redirect to their profile page
  // If not, redirect to the login page
  useEffect(() => {
    if (user) {
      window.location.href = `/profile/${user.username}`;
    } else {
      window.location.href = `/login`;
    }
  }, [user]);

  return <div>Loading...</div>;
};

export default ProfileRedirect;
