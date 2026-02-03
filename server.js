const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

/**
 * Edit your wedding info here
 */
const WEDDING = {
  couple: "សុខបញ្ញា & ម៉ាលីកា",
  tagline: "សូមគោរពអញ្ជើញភ្ងៀវកិត្តិយសចូលរួមក្នុងពិធីរៀបអាពាហ៍ពិពាហ៍",
  dateLine: "ថ្ងៃអាទិត្យ, ១ មីនា ២០២៦",
  timeLine: "៥:៣០នាទីល្ងាច",
  venueLine: "សមភាព (B)",
  addressLine: "Svay Dangkum, Siem Reap",
  dressCode: "ផ្ទះកូនក្រមុំ",
  quote: "“Love is composed of a single soul inhabiting two bodies.” — Aristotle",

};

/**
 * Convert a URL slug like "michael_jackson_01" => "Michael Jackson"
 */
function slugToGuestName(slug) {
  if (!slug) return "Our Guest";

  let cleaned = String(slug).trim().replace(/[^\w-]/g, "");
  let parts = cleaned.split(/[_-]+/).filter(Boolean);

  // remove trailing numeric code (e.g. 01)
  if (parts.length > 1 && /^\d+$/.test(parts[parts.length - 1])) {
    parts.pop();
  }

  const name = parts
    .map((p) => p.toLowerCase())
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");

  return name || "Our Guest";
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.redirect("/wedding/our_dearest_guest_01");
});

app.get("/wedding/:guestSlug", (req, res) => {
  const guestSlug = req.params.guestSlug;
  const guestName = slugToGuestName(guestSlug);

  res.render("invite", {
    wedding: WEDDING,
    guestName,
    guestSlug
  });
});

app.use((req, res) => {
  res.status(404).send("Not found. Try /wedding/your_name_01");
});

app.listen(PORT, () => {
  console.log(`Wedding invite running on http://localhost:${PORT}`);
});
