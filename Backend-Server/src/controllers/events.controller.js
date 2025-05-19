import axios from "axios";
import puppeteer from "puppeteer";
import * as cheerio from "cheerio";
import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import { apiError } from "../utils/apiError.utils.js";

const EventsList = asyncAwaitHandler(async (req, res) => {
  try {
    const sprintURL = "https://www.sprint.dev/hackathons";
    const events = [];

    // 🔹 Scrape Devfolio using Puppeteer
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.goto("https://devfolio.co/hackathons/open", {
      waitUntil: "networkidle2",
    });
    await page.waitForSelector("h1, h2, h3");

    const devfolioEvents = await page.evaluate(() => {
      const data = [];
      const cards = document.querySelectorAll("a[href^='/hackathons/']");
      cards.forEach((card) => {
        const name = card.querySelector("h1, h2, h3")?.innerText?.trim();
        const description = card.querySelector("p")?.innerText?.trim();
        const link = "https://devfolio.co" + card.getAttribute("href");
        const image = card.querySelector("img")?.getAttribute("src");
        if (name) {
          data.push({
            name,
            description,
            link,
            image,
            source: "Devfolio",
          });
        }
      });
      return data;
    });
    console.log(devfolioEvents)

    events.push(...devfolioEvents);
    await browser.close();

    // 🔹 Scrape Sprint using Axios + Cheerio
    const sprintRes = await axios.get(sprintURL, {
      headers: {
        "User-Agent": "Mozilla/5.0",
      },
    });

    const sprint$ = cheerio.load(sprintRes.data);

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

export default EventsList;
