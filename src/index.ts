import express, { Router, Request, Response } from 'express';
import postgres from "postgres";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { drizzle } from "drizzle-orm/postgres-js";
import { config } from './config.js';
import readinessRouter from "./app/routes/Readiness.js"
import reqNumRouter from "./app/routes/number_of_requests.js"
import resetRouter from './app/routes/reset.js';
import chirpsRouter from './app/routes/chirps.js';
import usersRouter from './app/routes/users.js';
import loginRouter from './app/routes/login.js';
import { middlewareLogResponses } from './middleware/log_responses.js';
import { middlewareMetricsInc } from './middleware/metricsInc_middleware.js';
import { errorHandlerMiddleware } from './middleware/error_handler_middleware.js';

const app = express();
const PORT = 8080;

const migrationClient = postgres(config.db.url, { max: 1 });
await migrate(drizzle(migrationClient), config.db.migrationConfig);
if (config.api.platfrom != "dev") {

}

// Tells Express to serve static files from the current directory
app.use(middlewareLogResponses);
app.use(express.json())
app.use("/app", middlewareMetricsInc, express.static("./src/app"));
app.use("/api/healthz", readinessRouter);
app.use("/admin/metrics", reqNumRouter);
app.use("/admin/reset", resetRouter);
app.use("/api/users", usersRouter);
app.use("/api/chirps", chirpsRouter);
app.use("/api/login", loginRouter);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Express TypeScript API!');
});

app.use(errorHandlerMiddleware);

// Starts the server and listens for incoming connections on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

