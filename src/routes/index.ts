import { Router } from "express";
import authRouter from "./auth";
import scrapeRouter from "./scrape";

const router = Router();

router.route("/status").get(
   (req,res)=>{
    res.send("yolo");
   }
)

router.use("/auth", authRouter);
router.use("/scrape",scrapeRouter);

export default router;