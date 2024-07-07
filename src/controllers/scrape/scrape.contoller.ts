import { Model } from 'mongoose';
import { Request, Response } from 'express';
import { Startup } from '../../models';
import { IStartupDocument } from '../../types';
import { ApiError, ApiResponse, asyncHandler } from '../../utils';
import ScrapeService from './scrape.service';

class YCScraper {
  private scrapeService: ScrapeService;
  private algoliaPayload?: any;
  private startupModel: Model<IStartupDocument>;

  constructor() {
    this.startupModel = Startup as unknown as Model<IStartupDocument>;
    this.scrapeService = new ScrapeService();
    this.scrapeAndStore = this.scrapeAndStore.bind(this);
    this.algoliaPayload = {};
  }

  scrapeAndStore = asyncHandler(async (req: Request, res: Response): Promise<void> => {
    try {
      this.algoliaPayload = await this.scrapeService.extractAlgoliaOpts();
      const url = await this.scrapeService.buildUrl(this.algoliaPayload);
      console.log(url);
      const data = 
      console.log('Scraping and storing completed successfully');
      res.status(200).json(new ApiResponse(200, "Scraping and storing completed successfully"));
    } catch (error) {
      console.error('Error in scrapeAndStore:', error);
      if (error instanceof ApiError) {
        res.status(error.statusCode).json(new ApiResponse(error.statusCode, error.message));
      } else {
        throw new ApiError(500, "Something went wrong while scraping and storing the startup data of Y Combinator");
      }
    }
  });
}

export default YCScraper;
