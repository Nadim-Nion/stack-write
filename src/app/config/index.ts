import dotenv from "dotenv";
import path from "path";

/* 
Before Join: current directory: C:\Users\ahsan\Documents\Level-2-Projects\stack-write
After Join: current directory: C:\Users\ahsan\Documents\Level-2-Projects\stack-write/.env
*/

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
};
