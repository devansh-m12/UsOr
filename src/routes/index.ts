import { Router } from "express";
import authRouter from "./auth";

const router = Router();

router.route("/status").get(
   (req,res)=>{
    res.send("yolo");
   }
)

router.use("/auth", authRouter);

export default router;