"use client";
import HnUserDescriptionSeeMore from "@/components/custom/_HnUserDescriptionSeeMore";
import HnAvatar from "@/components/custom/HnAvatar";
import HnEmpty from "@/components/custom/HnEmpty";
import HnError from "@/components/custom/HnError";
import HnLoader from "@/components/custom/HnLoader";

import { Card, CardContent } from "@/components/ui/card";
import useUsersSWR from "@/hooks/useUsersSWR";
import truncateText from "@/lib/truncateText";
import { User } from "lucide-react";
import React from "react";

export default function UsersPage() {
  const swr = useUsersSWR();

  const renderUserItem = (user: UserType, key: number) => (
    <Card key={key} className="w-full hover:shadow-2xl hover:shadow-chart-4">
      <CardContent>
        <div className="flex gap-2 items-center mb-2">
          <HnAvatar fallbackText="PH" style={{ width: 70, height: 70 }} />
          <div>
            <h4 className="font-bold">{user.username}</h4>
            <p className="text-gray-600 text-xs">{user.age} years old</p>
          </div>
        </div>
        {user.description && (
          <p className="text-gray-600 italic">
            {truncateText(user.description, 20)}
            <HnUserDescriptionSeeMore longText={user.description} />
          </p>
        )}
      </CardContent>
    </Card>
  );

  return (
    <>
      <HnError error={swr.error} />
      <HnLoader isLoading={swr.isLoading} />
      {swr.data && (
        <>
          {swr.data.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {swr.data.map(renderUserItem)}
            </div>
          ) : (
            <HnEmpty Icon={User} label="No visible user" />
          )}
        </>
      )}
    </>
  );
}
