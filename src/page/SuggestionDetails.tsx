import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  deleteSuggestion,
  upvoteSuggestion,
  downvoteSuggestion,
  Suggestion,
  getSuggestion,
  getAllSuggestions,
} from "@/lib/suggestion";
import { Button } from "@/components/ui/button";
import { Loader } from "@/components/ui/loader";
import { SuggestionForm, SuggestModal } from "@/components/resusable";
import { ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User } from "firebase/auth";
import { getUserData } from "@/lib/users";
import FormatDate, { convertTimestampToDate } from "@/lib/formatDate";

const SuggestionDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { user } = useAuth();
  const [suggestion, setSuggestion] = useState<Suggestion | null | undefined>(
    null
  );
  const [relatedSuggestions, setRelatedSuggestions] = useState<Suggestion[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);
  const [open, setOpen] = useState<boolean>(false);
  const [author, setAuthor] = useState<User | null>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuggestion = async () => {
      try {
        const data = await getSuggestion(id!);
        setSuggestion(data);

        if (data) {
          const dataAuthor = await getUserData(data.createdBy);
          setAuthor(dataAuthor);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchSuggestion();
  }, [id]);

  useEffect(() => {
    const fetchRelatedSuggestions = async () => {
      try {
        const suggestions = await getAllSuggestions();
        const filteredSuggestions = suggestions.filter(
          (s) => s.id !== id && s.status === suggestion?.status
        );
        setRelatedSuggestions(filteredSuggestions.slice(0, 6));
      } catch (error) {
        console.error("Error fetching related suggestions:", error);
      }
    };

    if (suggestion) {
      fetchRelatedSuggestions();
    }
  }, [suggestion, id]);

  const handleUpvote = async () => {
    if (!user) return;
    await upvoteSuggestion(id!, user?.uid);
    setSuggestion((prev) => prev && { ...prev, upvotes: prev.upvotes + 1 });
  };

  const handleDownvote = async () => {
    if (!user) return;
    await downvoteSuggestion(id!, user?.uid);
    setSuggestion((prev) => prev && { ...prev, downvotes: prev.downvotes + 1 });
  };

  const handleDelete = async () => {
    await deleteSuggestion(id!, user!);
    navigate("/suggestions");
  };

  if (loading) return <Loader />;

  if (!suggestion)
    return (
      <div className="flex justify-center items-center min-w-full min-h-full">
        <div className="info flex flex-col gap-2 items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            Suggestion not found
          </h2>
          <p className="text-gray-600">
            Sorry, we couldn't find the suggestion you were looking for.
          </p>
          <Button
            className="bg-gray-900 text-white hover:bg-gray-800"
            onClick={() => {
              navigate(-1);
            }}
          >
            Go back
          </Button>
        </div>
      </div>
    );

  return (
    <div className="max-w-4xl mx-auto py-8 px-6 flex flex-col gap-2">
      <Link to="/suggestions">
        <Button className="bg-gray-900 text-white hover:bg-gray-800 float-right">
          Go back
        </Button>
      </Link>
      <div className="grid md:grid-cols-[1fr_350px] gap-8">
        <div className="flex p-4 sm:p-8 md:p-10 rounded-sm flex-col border-2 shadow-lg gap-3 bg-white h-fit">
          <div className="user flex gap-2 justify-end items-end">
            <Avatar className="h-9 w-9">
              <AvatarImage src={author?.photoURL ?? "/placeholder-user.jpg"} />
              <AvatarFallback>
                {author?.displayName?.charAt(0) ?? "A"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-0 5">
              <span className="capitalized text-sm font-bold">
                {author?.displayName ?? "Anonymous"}
              </span>
              <span className="capitalized text-xs">
                {FormatDate(convertTimestampToDate(suggestion.createdAt))}
              </span>
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">
            {suggestion.title}
          </h1>
          <p className="text-gray-700">{suggestion.description}</p>
          <div className="flex gap-1.5 flex-wrap">
            <div
              className={cn(
                "badge px-3.5 py-1.5 rounded-full font-semibold w-fit text-xs capitalize select-none",
                suggestion.status.toLowerCase() === "draft" && "bg-yellow-400",
                suggestion.status.toLowerCase() === "closed" && "bg-red-400",
                suggestion.status.toLowerCase() === "pending" && "bg-green-400",
                suggestion.status.toLowerCase() === "open" &&
                  "bg-gray-900 text-white"
              )}
              title="Suggestion Status"
            >
              {suggestion.status}
            </div>
            <div
              className={cn(
                "badge px-3.5 py-1.5 rounded-full font-semibold w-fit text-xs capitalize select-none",

                "border-2 border-gray-900 text-gray-900"
              )}
              title="Suggestion Category"
            >
              {suggestion.category}
            </div>
            <div
              className={cn(
                "badge px-3.5 py-1.5 rounded-full font-semibold w-fit text-xs capitalize select-none",
                suggestion.urgency.toLowerCase() === "low" && "bg-yellow-400",
                suggestion.urgency.toLowerCase() === "high" && "bg-red-400",
                suggestion.urgency.toLowerCase() === "medium" &&
                  "bg-gray-900 text-white"
              )}
              title="Suggestion Urgency"
            >
              {suggestion.urgency}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500 justify-end w-full">
            <Button
              onClick={handleDownvote}
              className="flex gap-1"
              variant="ghost"
            >
              <ThumbsDownIcon className="w-5 h-5 fill-gray-900" />
              <span>{suggestion.downvotes}</span>
            </Button>
            <Button
              onClick={handleUpvote}
              className="flex gap-1"
              variant="ghost"
            >
              <ThumbsUpIcon className="w-5 h-5 fill-gray-900" />
              <span>{suggestion.upvotes}</span>
            </Button>
          </div>
          <hr className="pb-2" />
          <div>
            {user?.uid === suggestion.createdBy ||
            user?.role === "moderator" ? (
              <div className="flex gap-2">
                <Button onClick={() => setOpen(true)}>Edit</Button>
                <Button onClick={handleDelete} variant={"destructive"}>
                  Delete
                </Button>
                <SuggestionForm
                  open={open}
                  onClose={() => {
                    setOpen(!open);
                  }}
                  suggestion={suggestion}
                  isEditMode={true}
                />
              </div>
            ) : null}
          </div>
        </div>
        <div className="related-suggestions flex flex-col gap-4">
          <h2 className="text-2xl font-bold text-gray-900">
            Related Suggestions
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {relatedSuggestions.map((related) => (
              <SuggestModal suggestion={related} />
            ))}
          </div>

          {relatedSuggestions.length === 0 && (
            <div className="box w-full">
              <p>No related suggestions at the moment</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SuggestionDetail;
