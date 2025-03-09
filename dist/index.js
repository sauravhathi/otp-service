"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const db_1 = __importDefault(require("./config/db"));
const otpRoutes_1 = __importDefault(require("./routes/otpRoutes"));
const logger_1 = __importDefault(require("./utils/logger"));
const middleware_1 = require("./middleware");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.set('trust proxy', true);
app.use(express_1.default.json());
app.get('/', (req, res) => {
    res.send('Welcome to OTP service');
});
app.use('/api', middleware_1.validateEmail, otpRoutes_1.default);
async function startServer() {
    try {
        await (0, db_1.default)();
        app.listen(PORT, () => {
            logger_1.default.info(`Server is running on port ${PORT}`);
        });
    }
    catch (error) {
        logger_1.default.error('Failed to start server', error);
    }
}
startServer();
