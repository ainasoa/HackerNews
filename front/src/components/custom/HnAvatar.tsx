/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AvatarProps } from "@radix-ui/react-avatar";
import { Button } from "../ui/button";
import { Pencil } from "lucide-react";

type PropType = {
  src?: string;
  fallbackText?: string;
  onChangePhoto?: (f: File) => void;
} & AvatarProps;

export default function HnAvatar(props: PropType) {
  const { src, fallbackText, onChangePhoto, ...avatarProps } = props;
  const [photo, setPhoto] = useState("");

  const handleClick = async () => {
    const [fileHandle] = await (window as any).showOpenFilePicker({
      types: [
        {
          description: "Imag file",
          accept: {
            "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"],
          },
        },
      ],
      excludeAcceptAllOption: true,
      multiple: false,
    });
    const file = (await fileHandle.getFile()) as File;
    console.log("file", file);

    setPhoto(URL.createObjectURL(file));
    if (onChangePhoto) onChangePhoto(file);
  };

  return (
    <div className="relative w-fit h-fit">
      <Avatar className="border" {...avatarProps}>
        <AvatarImage src={photo || src} alt="PH" />
        <AvatarFallback>{fallbackText}</AvatarFallback>
      </Avatar>
      {onChangePhoto && (
        <Button
          size="icon"
          className="absolute bottom-0 right-0 rounded-full border-2 border-white"
          onClick={handleClick}
          role="button"
        >
          <Pencil />
        </Button>
      )}
    </div>
  );
}
