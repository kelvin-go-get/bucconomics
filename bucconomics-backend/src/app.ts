import express from "express";
import cors from "cors";

import authRoutes from "./routes/auth.routes";
import { kycRoutes } from "./routes/kyc.routes";
import { loanRoutes } from "./routes/loan.routes";
import { walletRoutes } from "./routes/wallet.routes";
import { setupSwagger } from "./docs/swagger";
import { savingsRoutes } from "./routes/savings.routes";
import communityRoutes from "./routes/community.routes";
import votingRoutes from "./routes/vote.routes";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

setupSwagger(app);

app.use("/api/auth", authRoutes);
app.use("/api/kyc", kycRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/loan", loanRoutes);
app.use("/api/savings", savingsRoutes);
app.use("/api/community", communityRoutes);
app.use("/api/vote", votingRoutes);

app.get("/", (req, res) => {
  res.send("Welcome to Buconomics API");
});

export default app;
