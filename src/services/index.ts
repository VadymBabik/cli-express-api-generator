import  constants from "../constants";
import fs from "fs/promises";


const getPathSrc=async ()=>{
    const rootDir = await fs.readdir(constants.cwd);
    if(constants.cwd.indexOf(constants.src_dir)){
        return `${constants.cwd.substring(0,constants.cwd.indexOf(constants.src_dir))}${constants.src_dir}`
    }
    if (rootDir.includes(constants.src_dir)) {
        return `${constants.cwd}/${constants.src_dir}`;
    }
}

export default getPathSrc