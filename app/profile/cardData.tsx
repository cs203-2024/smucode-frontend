import { UserStats } from "@/components/types"; //for temp hardcode
import {User} from "@/components/types";
import {isToday} from "date-fns";
import * as Tooltip from "@radix-ui/react-tooltip";

const getRank = (rating: number) => {
  if (rating < 20) {
    return { name: "Bronze", image: "/assets/rank/00_Bronze.png" };
  } else if (rating < 30) {
    return { name: "Silver", image: "/assets/rank/01_Silver.png" };
  } else if (rating < 40) {
    return { name: "Gold", image: "/assets/rank/02_Gold.png" };
  } else {
    return { name: "Immortal", image: "/assets/rank/03_Immortal.png" };
  }
};

export const getCardData = (userData: User) => {
  const rank = getRank(userData.mu);

  return [
    {
      title: "Rating",
      value: (
        <div className="flex items-center">
          <Tooltip.Root>
            <Tooltip.Trigger asChild>
              <img src={rank.image} alt={rank.name} className="h-8 w-8 mr-2 cursor-pointer" />
            </Tooltip.Trigger>
            <Tooltip.Content
              side="top"
              align="center"
              className="bg-white p-2 rounded shadow-lg text-sm text-gray-700"
            >
              <p>Rank Progression:</p>
              <ul>
                <li><img src="/assets/rank/00_Bronze.png" alt="Bronze" className="inline-block h-4 w-4 mr-1" /> Bronze: 0 - 19</li>
                <li><img src="/assets/rank/01_Silver.png" alt="Silver" className="inline-block h-4 w-4 mr-1" /> Silver: 20 - 29</li>
                <li><img src="/assets/rank/02_Gold.png" alt="Gold" className="inline-block h-4 w-4 mr-1" /> Gold: 30 - 39</li>
                <li><img src="/assets/rank/03_Immortal.png" alt="Immortal" className="inline-block h-4 w-4 mr-1" /> Immortal: 40+</li>
              </ul>
            </Tooltip.Content>
          </Tooltip.Root>
          <span>{rank.name}</span>
        </div>
      ),
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
    description: `Last updated: ${new Date(2024, 9,7,0)
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      })
      .replace(/(\d{2}) (\w{3}) (\d{4})/, "$1 $2, $3")}`,
  },
  {
    title: "Matches Played",
    value: 0,
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
    value: 0,
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
    value: 0,
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
};