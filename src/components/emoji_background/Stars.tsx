// Stars.tsx | A component that creates a starry background with random generated twinkling stars
import { useState, useEffect } from "react";

// interface for StarProps
interface StarProps {
  count?: number;
}

// interface for StarData
interface StarData {
  id: number;
  top: string;
  left: string;
  size: string;
  animationDuration: string;
  animationDelay: string;
  opacity: number;
}

export function Stars({ count = 100 }: StarProps) {
  const [stars, setStars] = useState<StarData[]>([]);

  useEffect(() => {
    // Create stars with different positions, sizes, and animation speeds
    const starArray = Array.from({ length: count }, (_, i) => ({
      id: i,
      top: Math.random() * 100 + "%",
      left: Math.random() * 100 + "%",
      size: Math.random() * 2 + 1 + "px", // Size between 1-3px
      animationDuration: Math.random() * 10 + 10 + "s", // Between 10-20 seconds
      animationDelay: Math.random() * 10 + "s", // Delay up to 10 seconds
      opacity: Math.random() * 0.5 + 0.5, // Opacity between 0.5-1
    }));
    
    setStars(starArray);
  }, [count]);

  return (
    <>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute rounded-full bg-white pointer-events-none"
          style={{
            top: star.top,
            left: star.left,
            width: star.size,
            height: star.size,
            opacity: star.opacity,
            animation: `twinkle ${star.animationDuration} ${star.animationDelay} infinite ease-in-out`,
          }}
        ></div>
      ))}
    </>
  );
}