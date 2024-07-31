import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { SuggestModal, Filter, TopSuggest } from "@/components/resusable";
import { Suggestions as AllSuggestions } from "@/data";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function Suggestions() {
  const query = useQuery();
  const [filteredSuggestions, setFilteredSuggestions] =
    useState(AllSuggestions);

  useEffect(() => {
    const category = query.get("category");
    const urgency = query.get("urgency");
    const status = query.get("status");

    let filtered = AllSuggestions;

    if (category) {
      filtered = filtered.filter(
        (suggestion) => suggestion.category === category
      );
    }

    if (urgency) {
      filtered = filtered.filter(
        (suggestion) => suggestion.urgency === urgency
      );
    }

    if (status) {
      filtered = filtered.filter((suggestion) => suggestion.status === status);
    }

    setFilteredSuggestions(filtered);
  }, [query]);

  return (
    <div className="flex-1 max-w-6xl mx-auto py-8 px-6 flex flex-col gap-3">
      <h1 className="font-bold text-3xl">Suggestions</h1>
      <div className="grid md:grid-cols-[1fr_300px] gap-8">
        <div>
          <div className="grid gap-4 lg:grid-cols-2">
            {filteredSuggestions.map((suggestion) => (
              <SuggestModal suggestion={suggestion} key={suggestion.id} />
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <Filter />
          <TopSuggest />
        </div>
      </div>
    </div>
  );
}

export default Suggestions;
