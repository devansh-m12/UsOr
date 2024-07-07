import  ycScraper  from "../../controllers/scrape/scrape.contoller";
import { Router } from "express";
const scrapeRouter = Router();
const ycScraperController = new ycScraper();

scrapeRouter.route("/yc-data").get(
      ycScraperController.scrapeAndStore
)

export default scrapeRouter;