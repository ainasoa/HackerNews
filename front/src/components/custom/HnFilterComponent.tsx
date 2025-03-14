/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ChangeEvent, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Filter, LucideIcon, SortAsc, SortDesc } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import HnFilterWrapper from "./_HnFilterWrapper";
import { useFormik } from "formik";

type PropType = {
  sort: SortType;
  onSort: () => void;
  onFilter: (params: NumericFilterType) => void;
  onSearch: (text: string) => void;
};

const sortDictionary = {
  search: {
    title: "Sorted by relevance, then points, then number of comments",
    SortIcon: SortAsc,
  },
  search_by_date: {
    title: "Sorted by date, more recent first",
    SortIcon: SortDesc,
  },
} as Record<SortType, { title: string; SortIcon: LucideIcon }>;

const initialValues = {
  created_at_i: "",
  created_at_i2: "",
  num_comments: "",
  points: "",
} as NumericFilterType;

export default function HnFilterComponent(props: PropType) {
  let timeout: NodeJS.Timeout;
  const { title, SortIcon } = sortDictionary[props.sort];
  const [show, setShow] = useState(false);

  const toggleShow = async () => setShow((v) => !v);

  const { values, handleChange, handleSubmit, handleReset } =
    useFormik<NumericFilterType>({
      initialValues,
      onSubmit: async (values) => {
        await toggleShow();
        await props.onFilter(values);
      },
      onReset: async () => {
        await toggleShow();
        await props.onFilter(initialValues);
      },
    });

  const handleSearch = async (event: ChangeEvent) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      props.onSearch((event.target as any).value);
    }, 500);
  };

  return (
    <form
      className="flex items-center sm:max-w-[300px] w-full shadow-xl"
      onSubmit={handleSubmit}
      onReset={handleReset}
    >
      <Input
        placeholder="Search"
        type="search"
        className="w-full rounded-r-none"
        onChange={handleSearch}
      />
      <Button
        type="button"
        variant="outline"
        className="rounded-none"
        onClick={props.onSort}
        title={title}
      >
        <SortIcon />
      </Button>
      <Popover open={show} onOpenChange={toggleShow}>
        <PopoverTrigger asChild>
          <Button className="rounded-l-none">
            <Filter />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="border-2 shadow-2xl bg-white p-3 rounded-lg">
          <HnFilterWrapper label="Date" className="mb-3">
            <Input
              type="date"
              name="created_at_i"
              value={values.created_at_i}
              onChange={handleChange}
            />
            -
            <Input
              type="date"
              name="created_at_i2"
              value={values.created_at_i2}
              onChange={handleChange}
            />
          </HnFilterWrapper>
          <HnFilterWrapper label="Points" className="mb-3">
            <Input
              type="text"
              name="points"
              placeholder="=, <, >, <=, >= NUMBER"
              value={values.points}
              onChange={handleChange}
            />
          </HnFilterWrapper>
          <HnFilterWrapper label="Number of comments" className="mb-3">
            <Input
              type="text"
              placeholder="=, <, >, <=, >= NUMBER"
              name="num_comments"
              value={values.num_comments}
              onChange={handleChange}
            />
          </HnFilterWrapper>
          <div className="w-full border-t my-3" />
          <div className="flex justify-between">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button type="submit">Filter</Button>
          </div>
        </PopoverContent>
      </Popover>
    </form>
  );
}
