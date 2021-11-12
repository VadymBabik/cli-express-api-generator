import getPathSrc from "./services";
import path from "path";
import constants from "./constants";
import fs from "fs/promises";

export const routeGeneration = async (api: string, entityName: string) => {
  const apiSrcPath = await getPathSrc();
  if (apiSrcPath) {
    const apiPath = path.join(apiSrcPath, constants.api_dir, entityName);
    await fs.mkdir(apiPath, { recursive: true });
    await fs.writeFile(
      `${apiPath}/${api}${constants.ucFirst(entityName)}.ts`,
      `import { Request, Response } from "express";\n
export const ${api}${constants.ucFirst(entityName)} = async (req: Request, res: Response) => {
  res.sendStatus(200);
};`
    );
  }
};

export default routeGeneration;
