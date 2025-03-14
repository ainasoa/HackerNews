import { IsNotEmpty, IsNumber, IsEnum } from "class-validator";

enum ActionEnum {
  add = "add",
  remove = "remove",
}

export default class FavoriteStoryDto {
  @IsNotEmpty()
  @IsNumber()
  storyId!: number;

  @IsNotEmpty()
  @IsEnum(ActionEnum)
  action!: ActionEnum;
}
