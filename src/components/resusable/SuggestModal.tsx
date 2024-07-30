import { CalendarIcon, ThumbsUpIcon } from "lucide-react";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Link } from "react-router-dom";
import { Suggestion } from "@/lib/suggestion";

const SuggestModal = ({ suggestion }: { suggestion: Suggestion }) => {
  return (
    <Link to={"/suggestion"}>
      <Card>
        <CardHeader>
          <CardTitle>{suggestion.title}</CardTitle>
          <CardDescription>{suggestion.description}</CardDescription>
          <div className=" flex flex-row gap-2 items-center text-sm">
            <span className=" p-1 bg-gray-200 rounded-md">
              {suggestion.category}
            </span>
            <span className=" p-1 bg-gray-200 rounded-md"> </span>
            <span className=" p-1 bg-gray-200 rounded-md">
              {" "}
              {suggestion.status}{" "}
            </span>
          </div>
        </CardHeader>
        <CardFooter className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <CalendarIcon className="w-4 h-4" />
            <span>{}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <ThumbsUpIcon className="w-4 h-4 fill-gray-900" />
            <span>{suggestion.upvotes} votes</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default SuggestModal;
