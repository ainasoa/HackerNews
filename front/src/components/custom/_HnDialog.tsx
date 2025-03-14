import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import Favorite from "./_Favorite";
import IconLabel from "./_IconLabel";
import { Calendar, User2 } from "lucide-react";
import formatDate from "@/lib/formatDate";

type PropType = {
  data?: StoryType;
  onClose?: (v: undefined) => void;
};
export default function HnDialog({ data, onClose }: PropType) {
  const onOpenChange = () => onClose && onClose(undefined);

  return (
    <Dialog open={!!data} modal onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{data?.story_title}</DialogTitle>
        </DialogHeader>
        <div className="flex justify-between mb-1">
          <Favorite isActive />
          {data?.updated_at && (
            <DialogDescription
              className="text-right text-xs underline"
              title={data?.updated_at}
            >
              Updated
            </DialogDescription>
          )}
        </div>
        <DialogDescription className="text-gray-800 max-h-[350px] overflow-y-auto">
          <span
            dangerouslySetInnerHTML={{
              __html: data?.comment_text || "",
            }}
          />
        </DialogDescription>
        <DialogFooter>
          <div className="flex justify-between gap-3 w-full">
            <IconLabel
              Icon={Calendar}
              label={formatDate(data?.created_at || "")}
            />
            <IconLabel Icon={User2} label={"by ".concat(data?.author || "")} />
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
