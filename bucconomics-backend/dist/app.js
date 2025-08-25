"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_routes_1 = require("./routes/auth.routes");
const kyc_routes_1 = require("./routes/kyc.routes");
const loan_routes_1 = require("./routes/loan.routes");
const wallet_routes_1 = require("./routes/wallet.routes");
const swagger_1 = require("./docs/swagger");
const savings_routes_1 = require("./routes/savings.routes");
const app = (0, express_1.default)();
app.use(express_1.default.json());
(0, swagger_1.setupSwagger)(app);
app.use("/api/auth", auth_routes_1.authRoutes);
app.use("/api/kyc", kyc_routes_1.kycRoutes);
app.use("/api/wallet", wallet_routes_1.walletRoutes);
app.use("/api/loan", loan_routes_1.loanRoutes);
app.use("/api/savings", savings_routes_1.savingsRoutes);
app.get("/", (req, res) => {
    res.send("Welcome to Buconomics API");
});
exports.default = app;
