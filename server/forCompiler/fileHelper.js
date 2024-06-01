import fs from "fs";
import path from "path";
import {exec} from "child_process";
import { fileURLToPath } from "url";
import {v4 as uuid} from "uuid";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

//here my code goes
const dirCodes = path.join(__dirname , "codes");

if(!fs.existsSync(dirCodes))
{
    fs.mkdirSync(dirCodes , {recursive:true});
}

const generateFile = async (format , code) => {
  
    //unique name for file
    const jobId = uuid();
    const fileName = `${jobId}.${format}`;
    const filePath = path.join(dirCodes,fileName);
    //write code to file path
    fs.writeFileSync(filePath , code);
    
    return filePath;
}
//here goes .exe file
const outputPath = path.join(__dirname , "outputs");
//here goes the input from console to compiler
const inputPath = path.join(__dirname, "inputs");

if(!fs.existsSync(outputPath))
{
    fs.mkdirSync(outputPath , {recursive:true});
}

if(!fs.existsSync(inputPath))
{
    fs.mkdirSync(inputPath , {recursive:true});
}

const executeCpp = async(filePath , input) => {
  
    const jobId = path.basename(filePath).split('.')[0];
    //this creates path for exe file
    const outPath = path.join(outputPath , `${jobId}.exe`);
    //this creates path for input file
    const inPath = path.join(inputPath , `${jobId}.txt`);
    //write input to txt file
    fs.writeFileSync(inPath , input);
    
    //command for execution
    return new Promise((resolve, reject) => {
        exec(
          `g++ ${filePath} -o ${outPath} && cd ${outputPath} && .\\${jobId}.exe < ${inPath}`,
          (error, stdout, stderr) => {
            if (error) {
              reject({ error, stderr });
            }
            if (stderr) {
              reject(stderr);
            }
            resolve(stdout);
          }
        );
      });
};

export {generateFile , executeCpp};




