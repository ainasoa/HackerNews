import React from "react";
import { Button } from "../ui/button";
import ClipLoader from "react-spinners/ClipLoader";

type PropType = {
  isShow?: boolean;
  isLoading?: boolean;
  onClick: () => void;
};
export default function HnNextPageButton(props: PropType) {
  if (!props.isShow) return;

  return (
    <div className="text-center">
      <Button
        className="rounded-full w-[200px]"
        role="button"
        disabled={props.isLoading}
        variant={props.isLoading ? "outline" : "default"}
        onClick={props.onClick}
      >
        {props.isLoading ? <ClipLoader size={18} /> : <>Charger plus</>}
      </Button>
    </div>
  );
}
