import axios from 'axios';
import { JSDOM } from 'jsdom';
import { ApiError } from '../../utils';

class ScrapeService {
  // following service is to fetch the Algolia Opt's which is required to get the url
  async extractAlgoliaOpts(): Promise<any> {
    try {
      const url = 'https://www.ycombinator.com/companies';
      const html = await axios.get(url);
      const $ = new JSDOM(html.data);

      // Extract AlgoliaOpts
      const algoliaOptsMatch = html.data.match(/window\.AlgoliaOpts\s*=\s*(\{[^}]+\})/);
      if (algoliaOptsMatch) {
        const algoliaOptsString = algoliaOptsMatch[1];
        const algoliaOpts = JSON.parse(algoliaOptsString.replace(/'/g, '"'));
        // console.log('Extracted AlgoliaOpts:', algoliaOpts);
        return algoliaOpts;
      }
      throw new ApiError(404, 'AlgoliaOpts not found');
    } catch (error) {
      console.error('Error extracting AlgoliaOpts:', error);
      throw new ApiError(500, 'Failed to extract AlgoliaOpts');
    }
  }
  async buildUrl(algoliaPayload : any): Promise<string> {
    const baseUrl = `https://${algoliaPayload.app.toLowerCase()}-dsn.algolia.net/1/indexes/*/queries`;
    const algoliaAgent = encodeURIComponent("Algolia for JavaScript (3.35.1); Browser; JS Helper (3.16.1)");
    const algoliaAppId = encodeURIComponent(algoliaPayload.app);
    const algoliaApiKey = encodeURIComponent(algoliaPayload.key);

    // const params = new URLSearchParams(queryParameters).toString();

    return `${baseUrl}?x-algolia-agent=${algoliaAgent}&x-algolia-application-id=${algoliaAppId}&x-algolia-api-key=${algoliaApiKey}`;
  }
}

export default ScrapeService;
