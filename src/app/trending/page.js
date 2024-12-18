
"use client";

import React, { useState, useEffect, useRef } from "react";
import { TrendingUp } from "lucide-react";
import Link from "next/link";

const TopNews = () => {
  const [news, setNews] = useState([]);
  const [modalNews, setModalNews] = useState(null); //for modal pop-up
  const [generatedPost, setGeneratedPost] = useState(""); //for the generated linkedin post
  const [isGenerating, setIsGenerating] = useState(false); // Controls the generation flow
  const [isCopied,setIsCopied] = useState(false);
  const [loadingState, setLoadingState] = useState("");

  const textareaRef = useRef(null);

  const API_KEY = process.env.NEXT_PUBLIC_API_KEY; // Your NewsAPI key
  const SHARED_COUNT_API_KEY = process.env.NEXT_PUBLIC_SHARED_COUNT_API_KEY; // Engagement API key

  // Fetch top 10 global news based on engagement
  useEffect(() => {
    // const fetchNews = async () => {
    //   const url = `https://newsapi.org/v2/top-headlines?category=general&apiKey=${API_KEY}`;

    //   try {
    //     const response = await fetch(url);
    //     const data = await response.json();

    //     const validNews = data.articles
    //       .filter((article) => article.urlToImage && article.description)
    //       .slice(0, 20); // Fetch more to ensure we get 10 valid articles with engagement data

    //     const newsWithEngagement = await Promise.all(
    //       validNews.map(async (article) => {
    //         const engagement = await fetchEngagement(article.url);
    //         return { ...article, engagement };
    //       })
    //     );

    //     // Sort by engagement and pick the top 10
    //     const sortedNews = newsWithEngagement
    //       .sort((a, b) => b.engagement - a.engagement)
    //       .slice(0, 10);

    //     setNews(sortedNews);
    //   } catch (error) {
    //     console.error("Error fetching news:", error);
    //   }
    // };

    // fetchNews();

    const fetchNews = async () => {
      try {
        const response = await fetch("/api/trending");
        const data = await response.json();

        const validNews = data.articles
          .filter((article) => article.urlToImage && article.description)
          .slice(0, 20); // Fetch more to ensure we get 10 valid articles with engagement data

         // Fetching engagement via SharedCount API
        const fetchEngagement = async (url) => {
          const sharedCountUrl = `https://api.sharedcount.com/v1.0/?url=${encodeURIComponent(
            url
          )}&apikey=${SHARED_COUNT_API_KEY}`;

          try {
            const response = await fetch(sharedCountUrl);
            if (!response.ok) {
              console.error("SharedCount API response error:", response.statusText);
              return 0;
            }
            const data = await response.json();
            return data.Facebook.total_count + data.Pinterest || 0;
          } catch (error) {
            console.error("Error fetching engagement:", error);
            return 0;
          }
        };  

        const newsWithEngagement = await Promise.all(
          validNews.map(async (article) => {
            const engagement = await fetchEngagement(article.url);
            return { ...article, engagement };
          })
        );

        // Sort by engagement and pick the top 10
        const sortedNews = newsWithEngagement
          .sort((a, b) => b.engagement - a.engagement)
          .slice(0, 10);

        setNews(sortedNews);
      } catch (error) {
        console.error("Error fetching news:", error);
      }
    };


    fetchNews();
  }, [API_KEY,SHARED_COUNT_API_KEY]);

  

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [generatedPost]);

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedPost);
    setIsCopied(true);
    //setTimeout(() => setIsCopied(false), 500);
    
  };

 

  // Open modal and set modal news
  const openModal = (article) => {
    setModalNews(article);
    setGeneratedPost("");
    generateLinkedInPost(article.description);
  };
  // Close modal
  const closeModal = () => {
    setModalNews(null);
    setGeneratedPost("");
    setLoadingState("");
    setIsCopied(false);
  };

  // Function to generate LinkedIn post using the Prompt API
  const generateLinkedInPost = async (desc) => {
    try {
      console.log("generating");
      setLoadingState("Reading Contents");
      setIsGenerating(true);
      setGeneratedPost(""); // Clear previous output
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      setLoadingState("Summarising content");
      const canSummarize = await ai.summarizer.capabilities();
      let summarizer;
      if (canSummarize && canSummarize.available !== "no") {
        summarizer = await ai.summarizer.create();
        if (canSummarize.available === "readily") {
          // The summarizer can immediately be used.
          console.log("ready");
          summarizer = await ai.summarizer.create();
        } else {
          // The summarizer can be used after the model download.
          summarizer = await ai.summarizer.create();
          summarizer.addEventListener("downloadprogress", (e) => {
            console.log(e.loaded, e.total);
          });
          await summarizer.ready;
        }
      }
      const result = await summarizer.summarize(desc);
      summarizer.destroy();
      //await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate delay
      const { available, defaultTemperature, defaultTopK, maxTopK } =
        await ai.languageModel.capabilities();
      setLoadingState("Generating Post");
      let session;
      if (available !== "no") {
        console.log("ready");
        session = await ai.languageModel.create({
          systemPrompt: "You are a professional content writer",
        });
      } else {
        // Model is not available, download it first
        console.log("Model is not available. Starting download...");
        session = await ai.languageModel.create({
          monitor(m) {
            m.addEventListener("downloadprogress", (e) => {
              console.log(`Downloaded ${e.loaded} of ${e.total} bytes.`);
            });
          },
        });
      }
      const prompt = `
    Below are some examples showing an article summary and its corresponding LinkedIn post format. Notice how the post emphasizes key points using **bold text** and relevant emojis to make it visually appealing:
    Summary: OpenAI is introducing "Work with Apps" for its ChatGPT desktop app, enabling it to integrate with various coding and text-based applications on macOS. The feature currently supports developer tools like VS Code, Xcode, and Terminal, allowing users to send code directly to ChatGPT for contextual analysis without manual copy-pasting. OpenAI plans to expand compatibility to other text-based apps, particularly those that support writing tasks, and explore more general AI agent capabilities beyond text-based interactions.
    LinkedIn Post:
    “BREAKING: ChatGPT can now use your Mac Apps!
    A major step toward ChatGPT acting as a full-fledged computer agent:
     • 🖥️ Coding Power: Write code directly in Xcode or VSCode
     • 🌐 Version Control: Make git commits in Terminal/iTerm2
     • 🔒 Permission-Based: Only operates with your explicit permission
     • 📅 Availability:
       • Now live for Plus and Team users
       • Coming soon for Enterprise and Edu users
     • 🧪 Status: Early beta
    Built for Over a Year
    OpenAI has been developing this capability since early 2023.
    🤔What’s Next?
    ChatGPT could soon control your entire desktop environment as an “agent.” Bloomberg reports this system, called the “Operator,” may launch in January.
    App Usage = Feedback Loop
    App integration is a test phase for ironing out bugs before full agent release.
    👀Competitive Landscape
    Google DeepMind, Anthropic, and other stealth-mode startups are reportedly launching agent-like systems within weeks. Looks like no one’s taking Christmas off this year!
    🦿Industry Impact
    Coding AI startups might need to rethink their strategies as ChatGPT starts working directly in tools like Xcode and VSCode.
    #AI hashtag#ChatGPT hashtag#OpenAI hashtag#MacBook hashtag#Coding
    Summary: Mistral AI has released significant updates to its Le Chat platform, introducing new AI models and features that rival those of ChatGPT and other leading AI chatbots. Le Chat now includes features like web search with cited sources, a canvas tool, image generation, document analysis, and AI agents. Mistral has introduced two new powerful models: Pixtral Large, a 124-billion parameter multimodal model, and Mistral Large 24.11, an updated version of their flagship text model. Mistral's approach differs from its competitors by focusing on making frontier AI accessible rather than pursuing artificial general intelligence. The company offers many of its new features for free during the beta phase, contrasting with the paid offerings of competitors like OpenAI and Anthropic.
    LinkedIn Post:
    📣ChatGPT Killer: Mistral AI Rolls Out Major Update
     • Web Search: Real-time info at your fingertips.
     • Image Generation: Create visuals with Flux Pro.
     • PDF Integration: Upload, ask, and get instant insights.
     • Text Mastery: Rewrite, summarize, and adapt text effortlessly.
     • Code Wizardry: Build or debug code like a pro.
    Explore it now: https://lnkd.in/d8CgQ6sW
    Is this the update that changes the game?
    #ai hashtag#mistral hashtag#tech hashtag#innovation hashtag#chatgpt
    ---
    Now, create a LinkedIn post from the following summary given the example above. Make sure to:
    1. **Bold key points** for emphasis.
    2. use **relevant emojis** to mkae the post visually engaging.
    3. Follow a professionl yet creative tone.
    4. Do not include any explanations or notes at the end of the post.
    Summary: ${result}
    LinkedinPost :
        `;
      // Get the generated LinkedIn post
      const result1 = await session.promptStreaming(prompt);
      for await (const chunk of result1) {
        setGeneratedPost(chunk);
        //return chunk;
      }
      setIsGenerating(false);
      session.destroy();
      //return; // Clean up the generated result
    } catch (error) {
      console.log("Error generating LinkedIn post:", error);
      setGeneratedPost("Error generating post. Please try again.");
      setIsGenerating(false);
      setLoadingState("Failed!");
      //return "Error generating post. Please try again.";
    }
  };

  return (
    <div className="min-h-screen text-gray-100 bg-black bg-grid-white/[0.08]">
      {/* <h1 className="text-6xl text-center font-bold py-8 text-white">
        <span className="text-[#2CFBCD]">Top 10</span> Global News
      </h1> */}

      <div className=" flex flex-row items-center justify-center text-center py-8 px-4">
        <h1 className="text-6xl md:text-5xl font-bold mb-2 text-white">
          Trending
        </h1>

        <div className="flex items-center justify-center ml-2 ">
          <TrendingUp size={40} color="#2CFBCD" />
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <section className="flex flex-col space-y-6">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-[#1a1a1aa9] rounded-lg overflow-hidden shadow-lg hover:shadow-[#2CFBCD]/50  transition-shadow duration-300 transition-transform hover:scale-110 flex flex-row items-center relative"
            >
              {/* Numeric Indicator */}
              <div className="absolute top-0 left-0 bg-[#2CFBCD] text-black font-bold py-2 px-4 rounded-br-lg">
                {"#"}
                {index + 1}
              </div>

              {/* Image Section */}
              <div className="w-1/3 ">
                <img
                  src={article.urlToImage || "/placeholder.svg"}
                  alt={article.title}
                  className="w-full p-2 rounded-lg h-48 object-cover"
                />
              </div>

              {/* Content Section */}
              <div className="w-2/3 p-6">
                <h3 className="text-lg font-semibold mb-2 text-white">
                  {article.title}
                </h3>
                <p className="text-gray-400 text-sm mb-4">
                  {article.description?.slice(0, 150)}...
                </p>

                {/* Engagement and Buttons */}
                <div className="flex justify-between items-center">
                  <div className="bg-[#242424] p-2 rounded-md">
                    <span className="text-[#2CFBCD] text-lg">
                      Engagement: {article.engagement}
                    </span>
                  </div>
                  <Link href={article.url} target="_blank">
                    <button
                      href={article.url}
                      className="bg-[#2CFBCD] hover:bg-[#2CFBCD]/60 text-black font-bold py-2 px-4  rounded-md md:rounded-md transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Read Full Article
                    </button>
                  </Link>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal(article);
                    }}
                    className="bg-[#2CFBCD] hover:bg-[#2CFBCD]/60 text-black font-bold py-2 px-4 rounded-md transition-colors"
                  >
                    Generate Post
                  </button>
                </div>
              </div>
            </div>
          ))}
        </section>
      </main>
      {modalNews && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-black/90 rounded-xl max-w-2xl w-full p-6 shadow-lg border border-[#2CFBCD]/20">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-[#2CFBCD]  pr-4">
                {modalNews.title}
              </h3>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-white transition-colors p-2 rounded-full hover:bg-white/10"
                aria-label="Close modal"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              <label
                htmlFor="generated-post"
                className="block text-gray-300 text-sm font-medium"
              >
                Generated Post:
              </label>
              <div className="relative">
                <textarea
                  id="generated-post"
                  ref={textareaRef}
                  className="w-full min-h-[120px] max-h-[300px] bg-[#1a1a1aa9] border border-white/20 rounded-lg p-3 text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#2CFBCD] focus:border-transparent resize-none scrollbar-thin scrollbar-thumb-[#2CFBCD] scrollbar-track-gray-800"
                  value={generatedPost}
                  readOnly
                  placeholder={
                    isGenerating
                      ? loadingState
                      : "Your generated post will appear here..."
                  }
                  style={{ overflow: "auto" }}
                />
                {isGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                    <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[#2CFBCD]"></div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end mt-6">
              <button
                onClick={handleCopy}
                disabled={isGenerating || !generatedPost}
                className={`px-6 py-2 rounded-lg font-medium transition-all duration-300 ${
                  isCopied
                    ? "bg-[#2CFBCD] text-black"
                    : "bg-transparent text-[#2CFBCD] border-2 border-[#2CFBCD] hover:bg-[#2CFBCD] hover:text-black"
                } disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isCopied ? "Copied" : "Copy"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopNews;
