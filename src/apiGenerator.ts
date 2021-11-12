import chalk from "chalk";
import constants from "./constants";
import routeGeneration from "./routeGeneration";
import routeRegistration from "./routeRegistration";

const apiGenerator = async (entityName: string) => {
  try {
    await Promise.all(
      constants.methods.map((e) => routeGeneration(e, entityName))
    );
    await routeRegistration(constants.methods, entityName);
    console.log(
      chalk.green.bold(`Api route for ${entityName} successfully created!`)
    );
  } catch (error) {
    console.log(chalk.red.bold("Bad luck, try again :("));
  }
};

export default apiGenerator;
