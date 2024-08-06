import { CalendarIcon, ThumbsDownIcon, ThumbsUpIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";
import { Suggestion } from "@/lib/suggestion";
import FormatDate, { convertTimestampToDate } from "@/lib/formatDate";
import SubString from "@/lib/subString";

const SuggestModal = ({ suggestion }: { suggestion: Suggestion }) => {
  return (
    <Link to={"/suggestions/" + suggestion.id}>
      <Card className="sm:h-[200px] sm:max-h-[200px] justify-between flex-col flex hover:bg-accent overflow-hidden">
        <CardHeader className="p-3 sm:p-4">
          <CardTitle>{suggestion.title}</CardTitle>
          <CardDescription className="">
            {SubString(suggestion.description, 80)}
          </CardDescription>
          <div className="flex-row gap-2 items-center text-sm sm:flex hidden">
            <span className=" p-1 bg-gray-200 rounded-md capitalize">
              {suggestion.category}
            </span>
            <span className=" p-1 bg-gray-200 rounded-md" />
            <span className=" p-1 bg-gray-200 rounded-md capitalize">
              {suggestion.status}
            </span>
          </div>
        </CardHeader>
        <CardFooter className="items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4" />
            <span>
              {FormatDate(convertTimestampToDate(suggestion.createdAt))}
            </span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <div className="flex gap-1">
              <ThumbsDownIcon className="w-4 h-4 fill-gray-900" />
              <span>{suggestion.downvotes}</span>
            </div>
            <div className="flex gap-1">
              <ThumbsUpIcon className="w-4 h-4 fill-gray-900" />
              <span>{suggestion.upvotes}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SuggestModal;
