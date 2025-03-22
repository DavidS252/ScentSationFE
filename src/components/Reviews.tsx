"use client";

import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";

export default function Reviews() {
  return (
    <div className="h-[25rem] rounded-md flex flex-col antialiased bg-transparent dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="slow"
      />
    </div>
  );
}

const testimonials = [
  {
    quote:
      "An outstanding website! User-friendly with plenty of amazing fragrances to explore comfortably..",
    name: "John Doe",
    title: "",
  },
  {
    quote:
      "I was amazed to find such fantastic fragrances so quickly and effortlessly.",
    name: "Emily Clark",
    title: "",
  },
  {
    quote: "Every fragrance I discover here feels like a dream within a dream, thanks to the wonderful reviews.",
    name: "Alex Johnson",
    title: "",
  },
  {
    quote:
      "There’s no doubt Scentsation is the best website for discovering new aromatic experiences.",
    name: "Sarah Brown",
    title: "",
  },
  {
    quote:
      "You might call me a fanatic, but I absolutely adore this sleek and modern fragrance-review website.",
    name: "Michael Reed",
    title: "",
  },
];
