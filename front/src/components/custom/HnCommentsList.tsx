import React from "react";
import { User, Clock, MessageCircle } from "lucide-react";
import formatDate from "@/lib/formatDate";
import IconLabel from "@/components/custom/_IconLabel";
import HnEmpty from "./HnEmpty";

type PropType = {
  data: CommentType[];
};

export default function HnCommentsList({ data }: PropType) {
  const renderCommentItem = (comment: CommentType, key: number) => (
    <div key={key} className="bg-gray-200 rounded-lg p-4">
      <div className="flex justify-between mb-2">
        <IconLabel Icon={User} label={"by ".concat(comment.author)} />
        <IconLabel Icon={Clock} label={formatDate(comment.updated_at)} />
      </div>
      <div dangerouslySetInnerHTML={{ __html: comment.comment_text }} />
    </div>
  );

  return (
    <>
      {data.length > 0 ? (
        <div className="flex flex-col gap-6">{data.map(renderCommentItem)}</div>
      ) : (
        <HnEmpty Icon={MessageCircle} label="No comment yet" />
      )}
    </>
  );
}
