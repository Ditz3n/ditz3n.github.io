// MeteorEffect.tsx | A component that creates a meteor effect with a specified number of meteors (used in SpaceBackground.tsx)
import clsx from "clsx";

export const MeteorEffect = ({ number }: { number?: number }) => {
  const meteors = new Array(number || 20).fill(true);
  
  // Defining minimum and maximum values for meteor animation
  const MIN_DURATION = 8; // Minimum animation duration in seconds
  const MAX_DURATION = 14; // Maximum animation duration in seconds
  const MIN_DELAY = 0.2; // Minimum animation delay in seconds
  const MAX_DELAY = 0.8; // Maximum animation delay in seconds
  const MIN_TRAVEL = -400; // Minimum starting position (pixels)
  const MAX_TRAVEL = 400; // Maximum starting position (pixels)
  
  return (
    <>
      {meteors.map((_, index) => {
        // Calculate random values with minimum thresholds
        const duration = Math.floor(Math.random() * (MAX_DURATION - MIN_DURATION) + MIN_DURATION);
        const delay = Math.random() * (MAX_DELAY - MIN_DELAY) + MIN_DELAY;
        const leftPosition = Math.floor(Math.random() * (MAX_TRAVEL - MIN_TRAVEL) + MIN_TRAVEL);
        
        return (
          <span
            key={`meteor-${index}`}
            className={clsx(
              "absolute h-0.5 w-0.5 rounded-full bg-white shadow-[0_0_0_3px_#ffffff10] rotate-[195deg]",
              "before:content-[''] before:absolute before:top-1/2 before:transform before:-translate-y-[50%] before:w-[50px] before:h-[3px] before:bg-gradient-to-r before:from-[#ffffff] before:to-transparent"
            )}
            style={{
              top: -10, // Initial position (pixels) (above the container so it's not visible on load)
              left: `${leftPosition}px`,
              animationDelay: `${delay}s`,
              animationDuration: `${duration}s`,
              animation: `meteor ${duration}s linear ${delay}s infinite`,
            }}
          ></span>
        );
      })}
    </>
  );
};