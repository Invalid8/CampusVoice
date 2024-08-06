import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { SuggestModal, Filter, TopSuggest } from "@/components/resusable";
import { getPublicSuggestions, Suggestion } from "@/lib/suggestion";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

function Suggestions() {
  const [searchParams] = useSearchParams();
  const [filteredSuggestions, setFilteredSuggestions] = useState<Suggestion[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    async function loadSuggestions() {
      setLoading(true);

      let filtered = await getPublicSuggestions();

      if (searchParams.get("category")) {
        filtered = filtered.filter(
          (suggestion) =>
            suggestion.category.toLowerCase() ===
            searchParams.get("category")?.toLocaleLowerCase()
        );
      }

      if (searchParams.get("urgency")) {
        filtered = filtered.filter(
          (suggestion) =>
            suggestion.urgency.toLowerCase() ===
            searchParams.get("urgency")?.toLocaleLowerCase()
        );
      }

      if (searchParams.get("status")) {
        filtered = filtered.filter(
          (suggestion) =>
            suggestion.status.toLowerCase() ===
            searchParams.get("status")?.toLocaleLowerCase()
        );
      }

      setFilteredSuggestions(filtered);

      setLoading(false);
    }

    loadSuggestions();
  }, [searchParams]);

  return (
    <div className="flex-1 max-w-6xl mx-auto py-8 px-6 flex flex-col gap-3">
      <h1 className="font-bold text-3xl">Suggestions {}</h1>
      {(!!searchParams.get("category") ||
        !!searchParams.get("urgency") ||
        !!searchParams.get("status")) && (
        <div className="flex flex-wrap gap-2">
          <p className="text-lg capitalize">
            <span>
              <strong>Category:</strong>{" "}
              {searchParams.get("category") || "None"}
            </span>
            {" , "}
            <span>
              <strong>Urgency:</strong> {searchParams.get("urgency") || "None"}
            </span>
            {" , "}
            <span>
              <strong>Status:</strong> {searchParams.get("status") || "None"}
            </span>
          </p>
        </div>
      )}
      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div className="div">
          {loading && <Loader />}
          {!loading && filteredSuggestions.length == 0 && (
            <div className="flex justify-center items-center min-w-full min-h-full">
              <div className="info flex flex-col gap-2 items-center">
                <h2 className="text-2xl font-bold text-gray-900">
                  Suggestions does not exist
                </h2>
                <p className="text-gray-600">
                  Sorry, we couldn't find the suggestions under such filter.
                </p>
                <Link to={"/suggestions"}>
                  <Button className="bg-gray-900 text-white hover:bg-gray-800">
                    Reset Filter
                  </Button>
                </Link>
              </div>
            </div>
          )}
          {!loading && (
            <div className="grid gap-4 lg:grid-cols-2">
              {filteredSuggestions.map((suggestion) => (
                <SuggestModal suggestion={suggestion} key={suggestion.id} />
              ))}
            </div>
          )}
        </div>
        <div className="space-y-4 min-w-[300px]">
          <Filter />
          <TopSuggest />
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
