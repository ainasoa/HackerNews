import { Model, DataTypes, Optional } from "sequelize";
import sequelize from "./index";
import bcrypt from "bcrypt-ts";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    photo: {
      type: DataTypes.STRING,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    age: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(val: string) {
        const salt = bcrypt.genSaltSync();
        const hashedPassword = bcrypt.hashSync(val, salt);

        this.setDataValue("password", hashedPassword);
      },
    },
    visibility: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  },
  {
    timestamps: true,
  }
);

export const FavoriteStory = sequelize.define(
  "FavoriteStory",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    storyId: {
      type: DataTypes.NUMBER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

FavoriteStory.belongsTo(User);
User.hasMany(FavoriteStory);
