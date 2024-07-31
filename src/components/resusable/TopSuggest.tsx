import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Star, ThumbsUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Suggestion } from "@/lib/suggestion"; // Replace with your actual data fetching function
import { Suggestions as AllSuggestions } from "@/data";
import SubString from "@/lib/subString";

function TopSuggest() {
  const [topSuggestions, setTopSuggestions] = useState<Suggestion[]>([]);

  useEffect(() => {
    const fetchTopSuggestions = async () => {
      try {
        // const allSuggestions = await getPublicSuggestions(); // Replace with your actual data fetching function
        const sortedSuggestions = AllSuggestions.sort(
          (a, b) => b.upvotes - a.upvotes
        ).slice(0, 6);
        setTopSuggestions(sortedSuggestions);
      } catch (error) {
        console.error("Failed to fetch suggestions:", error);
      }
    };

    fetchTopSuggestions();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Top Suggestions</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {topSuggestions.length === 0 ? (
            <p className="text-center text-gray-500">
              No suggestions available
            </p>
          ) : (
            topSuggestions.map((suggestion) => (
              <div
                key={suggestion.id}
                className="flex items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gray-900" />
                  <Link
                    to={`/suggestions/${suggestion.id}`}
                    className="font-medium text-blue-600 hover:underline"
                  >
                    {SubString(suggestion.title, 21)}
                  </Link>
                </div>
                <span className="flex gap-1 items-center">
                  {suggestion.upvotes} <ThumbsUp size={14} fill="#111827" />
                </span>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default TopSuggest;
