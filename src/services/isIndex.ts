import path from "path";
import * as fs from "fs";
import constants from "../constants";

export const isIndex = async () => {
  if (
    !fs.existsSync(path.join(constants.src_dir, constants.api_dir, "index.ts"))
  ) {
    await fs.promises.writeFile(
      path.join(constants.src_dir, constants.api_dir, "index.ts"),
      `import { Express, json } from "express";

export const registerRouters = (app: Express) => {\n  app.use(json());
}`
    );
  }
};

