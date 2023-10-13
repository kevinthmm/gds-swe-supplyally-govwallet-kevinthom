import {Express} from 'express';
import dotenv from 'dotenv';
import createServer from "./utils/server";

// Check if environment variables are set
dotenv.config();
if (!process.env.PORT) {
    process.exit(1);
}
// Set port to environment variable and create express app
const PORT: number = parseInt(process.env.PORT as string, 10);
const app:Express = createServer();

app.listen(PORT, async () => {
    console.log(`Listening on port ${PORT}`);
});