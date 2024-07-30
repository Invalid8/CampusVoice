import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  getSuggestion,
  deleteSuggestion,
  upvoteSuggestion,
  downvoteSuggestion,
  changeSuggestionStatus,
  Suggestion,
} from "@/lib/suggestion";
import { Button } from "@/components/ui/button";

const SuggestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [suggestion, setSuggestion] = useState<Suggestion | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const data = await getSuggestion(id!);
        setSuggestion(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestion();
  }, [id]);

  const handleUpvote = async () => {
    await upvoteSuggestion(id!);
    setSuggestion((prev) => prev && { ...prev, upvotes: prev.upvotes + 1 });
  };

  const handleDownvote = async () => {
    await downvoteSuggestion(id!);
    setSuggestion((prev) => prev && { ...prev, downvotes: prev.downvotes + 1 });
  };

  const handleStatusChange = async (status: string) => {
    if (user?.role !== "moderator") return;
    await changeSuggestionStatus(id!, status, user);
    setSuggestion((prev) => prev && { ...prev, status: status });
  };

  const handleDelete = async () => {
    await deleteSuggestion(id!, user!);
    // Redirect to suggestions list
  };

  if (loading) return <p>Loading...</p>;
  if (!suggestion) return <p>Suggestion not found</p>;

  return (
    <div className="max-w-4xl mx-auto py-8 px-6">
      <div className="space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">{suggestion.title}</h1>
        <p className="text-gray-700">{suggestion.description}</p>
        <p>Status: {suggestion.status}</p>
        <p>Upvotes: {suggestion.upvotes}</p>
        <p>Downvotes: {suggestion.downvotes}</p>
        <div className="flex space-x-4">
          <Button onClick={handleUpvote}>Upvote</Button>
          <Button onClick={handleDownvote}>Downvote</Button>
          {user?.role === "moderator" && (
            <>
              <Button onClick={() => handleStatusChange("Pending")}>
                Set to Pending
              </Button>
              <Button onClick={() => handleStatusChange("Done")}>
                Set to Done
              </Button>
              <Button onClick={() => handleStatusChange("Closed/Cancelled")}>
                Set to Closed/Cancelled
              </Button>
            </>
          )}
          {user?.uid === suggestion.createdBy || user?.role === "moderator" ? (
            <>
              <Button>
                <Link to={`/suggestions/edit/${id}`}>Edit</Link>
              </Button>
              <Button onClick={handleDelete}>Delete</Button>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default SuggestionDetail;
