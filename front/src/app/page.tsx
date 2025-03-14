"use client";
import { Button } from "@/components/ui/button";

export default function Home() {
  const handleClick = () => alert("clicked");

  return <Button onClick={handleClick}>click</Button>;
}
