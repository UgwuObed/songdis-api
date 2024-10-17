import express, { Express,  Response } from "express";
import { env } from "./config";
// import { rateLimit } from "express-rate-limit"
import cors from "cors";
import routes from "./routes";
import { Logger } from "./libs";
import { Cloudinary } from "./utils";
import morgan from "morgan"


const app: Express = express();
const port = env.PORT || 5000;

// Cross-origin resource sharing
app.use(cors({
    origin: ["http://localhost:3000", "https://www.songdis.com/"], 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
}));



app.use(morgan('dev'));
// Cloudinary config
app.use("*", Cloudinary.config);
// parses body request
app.use(express.json({ limit: "200mb" }));
app.use(express.urlencoded({ limit: "200mb", extended: true }));

// app.use(rateLimit({
//     // Limit each IP to a certain number of requests every 15 minutes.
//     windowMs: 15 * 60 * 1000,
//     limit: Number(env.RATE_LIMIT),
//     message: 'Too many requests from this IP, please try again after 20 minutes.',
//     legacyHeaders: false
// }));

app.get("/", (_, res: Response) => {
    res.send("songdis Rest API");
});

app.use("/api", routes);


app.listen(port, async () => {
    Logger.info(`server running on port: ${port}`)
});
