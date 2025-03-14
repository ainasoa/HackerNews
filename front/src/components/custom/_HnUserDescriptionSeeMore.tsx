import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

type PropType = {
  longText: string;
};

export default function HnUserDescriptionSeeMore(props: PropType) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <span className="text-xs font-bold" role="button">
          See more
        </span>
      </PopoverTrigger>
      <PopoverContent className="border-2 border-gray-300 shadow-2xl bg-white text-gray-700 text-justify p-3 rounded-lg italic">
        {props.longText}
      </PopoverContent>
    </Popover>
  );
}
