import express, { Router, Request, Response } from 'express';
import readinessRouter from "./app/routes/Readiness.js"
import reqNumRouter from "./app/routes/number_of_requests.js"
import resetRouter from './app/routes/reset.js';
import { middlewareLogResponses } from './middleware/log_responses.js';
import { middlewareMetricsInc } from './middleware/middlewareMetricsInc.js';
const app = express();
const PORT = 8080;

// Tells Express to serve static files from the current directory
app.use(middlewareLogResponses);
app.use("/app", middlewareMetricsInc, express.static("./src/app"));
app.use("/api/healthz", readinessRouter);
app.use("/admin/metrics", reqNumRouter);
app.use("/admin/reset", resetRouter);

// Basic route
app.get('/', (req, res) => {
  res.send('Welcome to the Express TypeScript API!');
});

// Starts the server and listens for incoming connections on the specified port
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

