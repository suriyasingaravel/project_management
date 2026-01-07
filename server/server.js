import express from "express";
import "dotenv/config";
import cors from "cors";
import { clerkMiddleware } from "@clerk/express";
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js";
import workspaceRouter from "./routes/workSpaceRoutes.js";
import { protect } from "./middlewares/authMiddleware.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use(clerkMiddleware());

app.get("/", (req, res) => {
  res.send({ msg: "My Project Management app" });
});

app.use("/api/inngest", serve({ client: inngest, functions }));

//Routes
app.use("/api/workspaces", protect, workspaceRouter);

const PORT = process.env.PORT || 4500;

app.listen(PORT, async () => {
  try {
    console.log(`Server running at PORT ${PORT} `);
  } catch (error) {
    console.log(error);
  }
});
