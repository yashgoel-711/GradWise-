import { asyncAwaitHandler } from "../utils/asyncAwaitHandler.utils.js";
import { apiResponse } from "../utils/apiResponse.utils.js";
import axios from 'axios';
import * as cheerio from "cheerio";

const SOURCE_URL = "https://internshala.com/internships/part-time-engineering-jobs";

// Shown when scraping fails or finds nothing, so the page is never empty.
// These are typical role types linking to category searches, not specific vacancies.
const FALLBACK = [
  { title: "Web Development Intern", company: "Various startups", location: "Remote", stipend: "Typically ₹5,000 - 15,000/month", link: "https://internshala.com/internships/web-development-internship", tags: ["html", "css", "javascript", "react", "node"] },
  { title: "Python Developer Intern", company: "Various companies", location: "Remote", stipend: "Typically ₹5,000 - 20,000/month", link: "https://internshala.com/internships/python-django-internship", tags: ["python", "django", "flask", "sql"] },
  { title: "Data Science Intern", company: "Various companies", location: "Remote / Hybrid", stipend: "Typically ₹8,000 - 25,000/month", link: "https://internshala.com/internships/data-science-internship", tags: ["python", "pandas", "machine learning", "sql", "statistics"] },
  { title: "Machine Learning Intern", company: "Various startups", location: "Remote", stipend: "Typically ₹10,000 - 30,000/month", link: "https://internshala.com/internships/machine-learning-internship", tags: ["python", "machine learning", "tensorflow", "pytorch"] },
  { title: "Android App Development Intern", company: "Various companies", location: "Remote", stipend: "Typically ₹5,000 - 15,000/month", link: "https://internshala.com/internships/android-app-development-internship", tags: ["java", "kotlin", "android"] },
  { title: "Java Developer Intern", company: "Various companies", location: "On-site / Remote", stipend: "Typically ₹5,000 - 15,000/month", link: "https://internshala.com/internships/java-internship", tags: ["java", "spring", "sql"] },
  { title: "UI/UX Design Intern", company: "Various studios", location: "Remote", stipend: "Typically ₹5,000 - 12,000/month", link: "https://internshala.com/internships/ui-ux-design-internship", tags: ["figma", "design", "ux", "css"] },
  { title: "Cloud / DevOps Intern", company: "Various companies", location: "Remote", stipend: "Typically ₹8,000 - 20,000/month", link: "https://internshala.com/internships/devops-internship", tags: ["aws", "docker", "linux", "ci/cd", "kubernetes"] },
];

const scrape = async () => {
  const response = await axios.get(SOURCE_URL, { timeout: 8000 });
  const $ = cheerio.load(response.data);
  const found = [];

  $('.individual_internship').each((i, el) => {
    const title = $(el).find('.heading_4_5').text().trim() || $(el).find('h3').text().trim();
    const company = $(el).find('.company_name').text().trim();
    const location = $(el).find('.location_link').text().trim();
    const stipend = $(el).find('.stipend').text().trim();
    const href = $(el).attr('data-href') || $(el).find('a').attr('href');
    if (title) {
      found.push({
        title,
        company: company || "Company",
        location: location || "-",
        stipend: stipend || "Not disclosed",
        link: href ? `https://internshala.com${href}` : SOURCE_URL,
        tags: [],
      });
    }
  });
  return found;
};

// Which of the student's skills show up in the listing (title, company or tags)
const matchSkills = (listing, skills) => {
  const haystack = `${listing.title} ${listing.company} ${listing.tags.join(" ")}`.toLowerCase();
  return skills.filter((skill) => haystack.includes(skill.toLowerCase()));
};

export const InternshipList = asyncAwaitHandler(async (req, res) => {
  let listings = [];
  let source = "Internshala";
  try {
    listings = await scrape();
  } catch (err) {
    console.error("Internship scrape failed:", err.message);
  }
  if (!listings.length) {
    listings = FALLBACK;
    source = "Suggested roles";
  }

  const skills = req.student?.skills || [];
  const ranked = listings
    .map(({ tags, ...listing }) => ({ ...listing, matchedSkills: matchSkills({ ...listing, tags }, skills) }))
    .sort((a, b) => b.matchedSkills.length - a.matchedSkills.length);

  return res
    .status(200)
    .json(new apiResponse(200, { source, internships: ranked }, "Internships fetched"));
});
