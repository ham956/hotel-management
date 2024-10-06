import { FC, useEffect, useState } from "react";

type props = {
  endValue: number;
  duration: number; // this duration in miliseconds
};

const CountUpNumber: FC<props> = ({ endValue, duration }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime: number;
    let animationFrameId: number;

    const updateCount = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;

      if (progress < duration) {
        setCount(Math.min(endValue, (progress / duration) * endValue));
        animationFrameId = requestAnimationFrame(updateCount);
      } else {
        setCount(endValue);
      }
    };

    animationFrameId = requestAnimationFrame(updateCount);

    return () => cancelAnimationFrame(animationFrameId); // Clean-up/cancel animation while number reached to the end value
  }, [endValue, duration]);

  return (
    <p className="font-medium md:font-bold text-lg xl:text-5xl">
      {Math.round(count)}
    </p>
  );
};

export default CountUpNumber;
