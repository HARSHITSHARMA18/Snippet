export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const genre = searchParams.get("genre");
  const timeFilter = searchParams.get("timeFilter");

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

  const today = new Date();
  const fromDate = new Date(
    today.getTime() -
      (timeFilter === "24h"
        ? 1 * 24 * 60 * 60 * 1000
        : timeFilter === "2d"
        ? 2 * 24 * 60 * 60 * 1000
        : 7 * 24 * 60 * 60 * 1000)
  )
    .toISOString()
    .split("T")[0];

  const domains = [
    "timesofindia.indiatimes.com",
    "ndtv.com",
    "hindustantimes.com",
    "thehindu.com",
    "indiatoday.in",
    "foxnews.com",
    "cbc.ca",
    "news24.com",
    "scroll.in",
    "news18.com",
    "google.com/news",
    "bloomberg.com",
    "business-standard.com",
    "economictimes.indiatimes.com",
    "moneycontrol.com",
    "financialexpress.com",
    "fortune.com",
    "livemint.com",
    "espncricinfo.com",
    "espn.in",
    "sports.ndtv.com",
    "thebridge.in",
    "sportstar.thehindu.com",
    "gadgets.ndtv.com",
    "techcrunch.com",
    "digit.in",
    "91mobiles.com",
    "firstpost.com",
    "buzzfeed.com",
    "entertainmentweekly.com",
    "filmfare.com",
    "koimoi.com",
    "bollywoodhungama.com",
    "indiaforums.com",
    "pinkvilla.com",
    "thewallstreetjournal.com",
    "cnn.com",
    "bbc.com",
    "nytimes.com",
    "theguardian.com",
    "reuters.com",
    "aljazeera.com",
    "forbes.com",
    "dainikbhaskar.com",
    "amarujala.com",
    "patrikalive.com",
  ].join(",");

  const url = `https://newsapi.org/v2/everything?q=${genre}&domains=${domains}&from=${fromDate}&sortBy=popularity&apiKey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    return new Response(JSON.stringify(data), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to fetch news" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
