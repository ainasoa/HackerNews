import React from "react";
import { Button } from "../ui/button";
import ClipLoader from "react-spinners/ClipLoader";

type PropType = {
  isSubmitting: boolean;
  className?: string;
  onClick?: () => void;
};

export default function HnSubmitButton({
  isSubmitting,
  className,
  onClick,
}: PropType) {
  return (
    <Button
      type="submit"
      disabled={isSubmitting}
      variant={isSubmitting ? "outline" : "default"}
      className={className}
      role="button"
      onClick={onClick}
    >
      {isSubmitting ? <ClipLoader /> : <>Submit</>}
    </Button>
  );
}
