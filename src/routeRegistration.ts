import fs from "fs/promises";
import getPathSrc from "./services";
import path from "path";
import constants from "./constants";
import { isIndex } from "./services/isIndex";

const routeRegistration = async (api: string[], entityName: string) => {
  const apiSrcPath = await getPathSrc();
  if (apiSrcPath) {
    const apiPath = path.join(apiSrcPath, constants.api_dir, entityName);

    await fs.writeFile(
      `${apiPath}/index.ts`,
      `import { Router } from "express";
${api
  .map(
    (e) =>
      `import { ${e}${constants.ucFirst(
        entityName
      )} } from "./${e}${constants.ucFirst(entityName)}";\n`
  )
  .join("")}
const router = Router();

${api
  .map((e) => `router.${e}("/", ${e}${constants.ucFirst(entityName)});\n`)
  .join("")}
export default router;`
    );
    await isIndex();
    const indexContent = await fs.readFile(
      path.join(apiSrcPath, constants.api_dir, "index.ts"),
      "utf-8"
    );
    await fs.writeFile(
      path.join(apiSrcPath, constants.api_dir, "index.ts"),
      `${indexContent.slice(0, indexContent.indexOf(";"))};
import ${entityName}Router from "./${entityName}";${indexContent.slice(
        indexContent.indexOf(";") + 1,
        indexContent.lastIndexOf("}") - 1
      )}
  app.use("/${entityName}", ${entityName}Router);
};`
    );
  }
};

export default routeRegistration;
