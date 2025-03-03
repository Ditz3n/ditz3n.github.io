// SpaceBackground.tsx |A component that combines the MeteorEffect.tsx and Stars.tsx components to create a space background with stars and meteors
import { Stars } from "./Stars";
import { Meteor } from "./MeteorEffect";

export const SpaceBackground = ({ meteorCount = 20, starCount = 100 }) => {
    return (
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <Stars count={starCount} />
        <Meteor number={meteorCount} />
      </div>
    );
  };