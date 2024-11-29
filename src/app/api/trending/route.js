export async function GET(request) {
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  const url = `https://newsapi.org/v2/top-headlines?category=general&apiKey=${API_KEY}`;

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
