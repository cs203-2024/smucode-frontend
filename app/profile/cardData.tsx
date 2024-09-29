import { UserStats } from "@/components/types";

export const getCardData = (userData: UserStats) => [
  {
    title: "ELO",
    value: userData.elo,
    icon: (
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
    ),
    description: `Last updated: ${new Date(userData.eloDate)
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/(\d{2}) (\w{3}) (\d{4})/, "$1 $2, $3")}`,
  },
  {
    title: "Matches Played",
    value: userData.matchesPlayed,
    icon: (
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
        <circle cx="12" cy="12" r="9" fill="none" stroke="currentColor" />
        <line x1="12" y1="12" x2="12" y2="6" stroke="currentColor" />
        <line x1="12" y1="12" x2="9" y2="15" stroke="currentColor" />
      </svg>
    ),
    description: "",
  },
  {
    title: "Wins",
    value: userData.wins,
    icon: (
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
    ),
    description: "",
  },
  {
    title: "Losses",
    value: userData.losses,
    icon: (
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
    ),
    description: "",
  },
];
