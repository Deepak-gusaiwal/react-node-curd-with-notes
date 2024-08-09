import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
export const app = express();
//middlewares
import path from "path";
import { fileURLToPath } from "url";
//middlewares
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(path.dirname(__filename));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb", extended: true }));
app.use(express.urlencoded({ limit: "16kb", extended: true }));
app.use(cookieParser());
// --------------------------------------------------------------- routes
import userRouter from "./routes/user.route.js";
import noteRouter from "./routes/note.route.js";
import invoiceRouter from "./routes/invoice.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/note", noteRouter);
app.use("/api/v1/invoice", invoiceRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  console.error(
    `Error: ${message}\nStatus Code: ${statusCode}\nStack: ${err.stack}`
  );
  res.status(statusCode).json({
    success: false,
    message,
    errorName: err.name,
  });
});
