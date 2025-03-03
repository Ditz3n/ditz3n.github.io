// MeteorEffect.tsx | A component that creates a meteor effect in the background of the emoji in the IntroductionSection.tsx component
import { useEffect, useState } from "react";

// interface for MeteorProps
interface MeteorProps {
  number?: number;
}

// interface for MeteorData
interface MeteorData {
  id: number;
  top: string;
  left: string;
  delay: string;
  duration: string;
  size: number;
}

export function Meteor({ number = 20 }: MeteorProps) {
  const [meteors, setMeteors] = useState<MeteorData[]>([]);

  useEffect(() => {
    // Generate meteors with different positions and delays
    // This function generates random meteors
    const generateMeteors = (): MeteorData[] => {
      return Array.from({ length: number }, (_, i) => ({
        id: i,
        top: Math.floor(Math.random() * 100) + "%",
        left: Math.floor(Math.random() * 100) + "%",
        delay: Math.random() * 5 + "s", // Random delay between 0-5 seconds
        duration: Math.random() * 2 + 2 + "s", // Duration between 2-4 seconds
        size: Math.floor(Math.random() * 2) + 1, // Size 1 or 2
      }));
    };

    setMeteors(generateMeteors());
    
    // Generate meteors periodically
    const intervalId = setInterval(() => {
      setMeteors(generateMeteors());
    }, 10000); // Every 10 seconds (10000ms)
    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [number]);

  return (
    <>
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className="absolute h-0.5 w-0.5 rounded-full bg-white pointer-events-none"
          style={{
            top: meteor.top,
            left: meteor.left,
            boxShadow: "0 0 0 1px #ffffff10",
            transform: "rotate(-45deg)",
            animation: `meteor ${meteor.duration} ${meteor.delay} linear infinite`,
          }}
        >
          <div
            className="absolute top-0 left-0 h-0.5 bg-gradient-to-r from-white via-white to-transparent pointer-events-none"
            style={{
              width: meteor.size === 1 ? "100px" : "150px",
            }}
          ></div>
        </div>
      ))}
    </>
  );
}