type PasswordType = {
  password: string;
};

type LoginType = {
  email: string;
} & PasswordType;

type ProfilType = {
  photo: string;
  username: string;
  description: string;
  visibility: boolean;
  age: number;
};

type RegisterType = ProfilType & LoginType;

type FavoriteType = {
  storyId: number;
  action: "add" | "remove";
};
