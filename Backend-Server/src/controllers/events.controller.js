import axios from "axios";
import * as cheerio from "cheerio";
import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { apiError } from "../utils/apiError.utils.js";

const EventsList = asyncAwaitHandler(async (req, res) => {
  try {
    const devfolioURL = "https://devfolio.co/hackathons";
    const sprintURL = "https://www.sprint.dev/hackathons";

    // Fetch both pages
    const [devfolioRes, sprintRes] = await Promise.all([
      axios.get(devfolioURL, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      }),
      axios.get(sprintURL, {
        headers: {
          "User-Agent": "Mozilla/5.0",
        },
      }),
    ]);

    const devfolio$ = cheerio.load(devfolioRes.data);
    const sprint$ = cheerio.load(sprintRes.data);

    const events = [];

    // 🔹 Scrape Devfolio
    devfolio$("a[href^='/hackathons/']").each((_, el) => {
      const element = devfolio$(el);
      const name = element.find("h1, h2, h3").first().text().trim();
      const description = element.find("p").first().text().trim();
      const link = "https://devfolio.co" + element.attr("href");
      const image = element.find("img").attr("src");

      if (name) {
        events.push({
          name,
          description,
          link,
          image,
          source: "Devfolio",
        });
      }
    });

    // 🔹 Scrape Sprint
    sprint$("a[href^='/hackathons/']").each((_, el) => {
      const element = sprint$(el);
      const name = element.find("h1, h2, h3").first().text().trim();
      const description = element.find("p").first().text().trim();
      const link = "https://www.sprint.dev" + element.attr("href");
      const image = element.find("img").attr("src");

      if (name) {
        events.push({
          name,
          description,
          link,
          image,
          source: "Sprint",
        });
      }
    });

    return res
      .status(200)
      .json(new apiResponse(200, events, "Events scraped successfully"));
  } catch (error) {
    console.error("Scraping error:", error.message);
    throw new apiError("Scraping failed: " + error.message);
  }
});

// export { EventsList };
export default EventsList;