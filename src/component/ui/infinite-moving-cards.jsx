import { cn } from "../lib/utils";
import React, { useEffect, useState } from "react";

export const InfiniteMovingCards = ({
  items,
  direction = "left",
  speed = "fast",
  pauseOnHover = true,
  className
}) => {
  const containerRef = React.useRef(null);
  const scrollerRef = React.useRef(null);

  const [start, setStart] = useState(false);

  useEffect(() => {
    addAnimation();
  }, []);
  const truncateText = (text) => {
    const maxCharacters = 90; 

    if (text.length > maxCharacters) {
        return text.substring(0, maxCharacters) + '...';
    }
    return text;
};

const NameText = (text) => {
    const maxCharacters = 15; 

    if (text.length > maxCharacters) {
        return text.substring(0, maxCharacters) + '...';
    }
    return text;
};

function addAnimation() {
  if (containerRef.current && scrollerRef.current) {
    const scrollerContent = Array.from(scrollerRef.current.children);

    scrollerContent.forEach((item) => {
      const duplicatedItem = item.cloneNode(true);
      if (scrollerRef.current) {
        scrollerRef.current.appendChild(duplicatedItem);
      }
    });

    getDirection();
    getSpeed();
    setStart(true);
  }
}

const getDirection = () => {
  if (containerRef.current) {
    if (direction === "left") {
      containerRef.current.style.setProperty("--animation-direction", "forwards");
    } else {
      containerRef.current.style.setProperty("--animation-direction", "reverse");
    }
  }
};
const getSpeed = () => {
  if (containerRef.current) {
    if (speed === "fast") {
      containerRef.current.style.setProperty("--animation-duration", "20s");
    } else if (speed === "normal") {
      containerRef.current.style.setProperty("--animation-duration", "40s");
    } else {
      containerRef.current.style.setProperty("--animation-duration", "80s");
    }
  }
};


  return (
    <div
      ref={containerRef}
      className={cn(
        "scroller relative -mt-10 z-20 max-w-7xl overflow-hidden ",
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          "flex min-w-full shrink-0 gap-4  w-max flex-nowrap",
          start && "animate-scroll",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
      >
        {items.map((item, idx) => (
          <li
            className="w-[350px] max-w-full relative  flex-shrink-0  px-8  md:w-[450px]"

            key={item.name}
          >
            <blockquote>
              <div className="bg-gray-100 shadow-lg p-6 rounded-2xl border border-gray-400 shadow-lg text-center">
                <img
                  src={item.user?.profileimage ? `https://admin.kahanify.com/storage/app/public/${item.user.profileimage}` : asset34}
                  alt={item.user?.username || "Profile"}
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                />
                <p className="text-lg italic mb-2 overflow-hidden h-[120px] text-ellipsis display-webkit-box -webkit-box-orient-vertical -webkit-line-clamp-4">
                  &quot;{truncateText(item.description)}&quot;
                </p>
                <h3 className="mt-4 font-semibold text-xl">
                  {NameText(item.user?.username)}
                </h3>
              </div>
            </blockquote>
          </li>
        ))}
      </ul>
    </div>
  );
};
