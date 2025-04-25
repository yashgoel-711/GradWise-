import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { apiError } from "../utils/apiError.utils.js";
import axios from 'axios';
import * as cheerio from "cheerio";

// InternshipList - Scraping the part-time engineering jobs from Internshala
export const InternshipList = asyncAwaitHandler(async (req, res) => {
  try {
    const url = "https://internshala.com/internships/part-time-engineering-jobs"; // URL for part-time engineering jobs
    const response = await axios.get(url);
    const $ = cheerio.load(response.data);

    const internships = [];

    // Scraping internships data (selectors may need adjustment based on page structure)
    $('.individual_internship').each((i, el) => {
      const title = $(el).find('.heading_4_5').text().trim() || $(el).find('h3').text().trim(); // Fixed selector for title
      const company = $(el).find('.company_name').text().trim();
      const location = $(el).find('.location_link').text().trim();
      const stipend = $(el).find('.stipend').text().trim();
      const link = "https://internshala.com" + $(el).find('a').attr('href');

      // Add to internships array if title exists
      if (title) {
        internships.push({ title, company, location, stipend, link });
      }
    });

    return res
      .status(200)
      .json(new apiResponse(200, internships, "Part-time Engineering Jobs scraped successfully"));
  } catch (err) {
    throw new apiError(500, "Failed to scrape part-time engineering jobs");
  }
});
