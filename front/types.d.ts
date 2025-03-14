/* eslint-disable @typescript-eslint/no-explicit-any */
type StoryType = {
  author: string;
  created_at: string;
  created_at_i: number;
  num_comments: number;
  objectID: sstring;
  points: number;
  story_id: number;
  title: sstring;
  updated_at: string;
  url?: string;
};

type CommentType = {
  author: string;
  comment_text: string;
  created_at: string;
  created_at_i: number;
  objectID: string;
  parent_id: number;
  story_id: number;
  story_title: string;
  story_url: string;
  updated_at: string;
};

type UserType = {
  photo?: string;
  username: string;
  email: string;
  age: number;
  description?: string;
  visibility?: boolean;
};

type NavItemType = { href: string; label: string; Icon: LucideIcon };

type StoryHnApiType<T> = {
  hits: T[];
  hitsPerPage: number;
  nbHits: number;
  nbPages: 50;
  page: number;
};

type SortType = "search_by_date" | "search";

type NumericFilterType = {
  created_at_i: string;
  created_at_i2?: string;
  points: string;
  num_comments: string;
};

type FilterType = {
  query: string;
} & NumericFilterType;

type TokenType = {
  accessToken: string;
};

declare global {
  interface Window {
    showOpenFilePicker(options: any): any;
  }
}
