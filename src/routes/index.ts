import { Router } from "express";

const router = Router();

router.route("/status").get(
   (req,res)=>{
    res.send("yolo");
   }
)

export default router;