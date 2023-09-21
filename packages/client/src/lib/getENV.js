/*
    This file is used to get the environment variables from the .env file
*/
import dotenv from "dotenv";
dotenv.config();
export const env = process.env;
