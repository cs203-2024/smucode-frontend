import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MedalIcon, MapIcon, PlaneIcon, GiftIcon } from "@/components/IconsHowItWorks";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <MedalIcon />,
    title: "Accessibility",
    description:
      "View available tournaments with ease. Everyone can see open tournaments and track ongoing events.",
  },
  {
    icon: <MapIcon />,
    title: "Community",
    description:
      "Admins create tournaments, while participants join and compete. SMUCode fosters a collaborative and competitive community.",
  },
  {
    icon: <PlaneIcon />,
    title: "Scalability",
    description:
      "Easily manage tournaments of any size, from small competitions to large-scale events.",
  },
  {
    icon: <GiftIcon />,
    title: "Participation",
    description:
      "Join tournaments seamlessly and track your progress as you compete for the top spot.",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        How It{" "}
        <span style={{ color: '#16a34a' }}>
          Works{" "}
        </span>
        Step-by-Step Guide
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
      Discover how to create, join, and manage tournaments effortlessly.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center text-2xl md:text-2xl">
                <span style={{ color: '#16a34a' }}>{icon}</span>
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};