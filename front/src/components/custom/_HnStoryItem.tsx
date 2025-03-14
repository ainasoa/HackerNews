import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import formatDate from "@/lib/formatDate";
import {
  User2,
  Calendar,
  Eye,
  MessageCircle,
  Chrome,
  Heart,
} from "lucide-react";

import IconLabel from "./_IconLabel";
import ButtonIcon from "./_ButtonIcon";
import { Button } from "../ui/button";

type PropType = {
  data: StoryType;
  isMyFavorite?: boolean;
  onClickSeeMore?: (v: StoryType) => void;
  onToggleFavorite?: (id: number) => void;
};
export default function HnStoryItem(props: PropType) {
  const { data, isMyFavorite, onClickSeeMore, onToggleFavorite } = props;

  const handleClickSeeMore = () => onClickSeeMore && onClickSeeMore(data);
  const handleToggleFavorite = () =>
    onToggleFavorite && onToggleFavorite(data.story_id);

  return (
    <Card className="py-0 overflow-hidden justify-between gap-2 shadow-xl hover:shadow-2xl hover:shadow-chart-4">
      <CardHeader className="border-b bg-gray-100 py-3 flex flex-row flex-nowrap justify-between items-center gap-2">
        <CardTitle className="text-wrap" style={{ lineHeight: 1.25 }}>
          {data.title}
        </CardTitle>
        <Button
          variant={isMyFavorite ? "destructive" : "outline"}
          className="hover:scale-105"
          role="button"
          size="icon"
          onClick={handleToggleFavorite}
          title="toggle favorite"
        >
          <Heart />
        </Button>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between gap-3 mb-1">
          <IconLabel Icon={Eye} label={`${data.points || 0} points`} />
          <IconLabel
            Icon={MessageCircle}
            label={`${data.num_comments || 0} comments`}
          />
        </div>
        <div className="flex justify-between gap-3">
          <IconLabel Icon={Calendar} label={formatDate(data.created_at)} />
          <IconLabel Icon={User2} label={"by ".concat(data.author)} />
        </div>
      </CardContent>
      <CardFooter className="py-3 border-t bg-gray-50 block">
        <div className="flex justify-between items-center">
          {data.url ? (
            <Link href={data.url} target="_blank">
              <ButtonIcon
                variant="outline"
                Icon={Chrome}
                label="Source"
                title={data.url}
                role="button"
              />
            </Link>
          ) : (
            <div />
          )}
          <ButtonIcon
            Icon={Eye}
            label="See more"
            role="button"
            onClick={handleClickSeeMore}
          />
        </div>
      </CardFooter>
    </Card>
  );
}
