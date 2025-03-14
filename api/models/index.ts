import { Sequelize } from "sequelize";
import logger from "../services/logger";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./database.db",
  logging: (msg) => logger.debug(msg),
  sync: {
    force: false,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("db connection ok");
  })
  .catch((error) => {
    console.log("db connection error", error);
  });

export default sequelize;
