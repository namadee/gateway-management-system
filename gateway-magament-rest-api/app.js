import express from "express";
import cors from "cors"; // Import the cors middleware
import dotenv from "dotenv";

import { bodyParserConfigs } from "./src/config/bodyParser.js";
import { mongoDbConnection } from "./src/config/dbConfig.js";
import { routes } from "./src/routes/route.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT;

// Use cors middleware with allowed origins
const allowedOrigins = ['http://localhost:3000']; // Add your frontend URL here
app.use(cors({
  origin: allowedOrigins
}));


mongoDbConnection();
bodyParserConfigs(app);

routes(app);

app.get("/", (_req, res) => {
    res.send(`MS Gateway API server is running on port ${PORT}`);
});

app.listen(PORT, ()=> {
    process.stdout.write(`MS Gateway API server is running on port ${PORT} \n`);
});
