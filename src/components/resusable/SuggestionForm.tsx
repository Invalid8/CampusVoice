import React, { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import {
  createSuggestion,
  updateSuggestion,
  Suggestion,
} from "@/lib/suggestion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { cn } from "@/lib/utils";

interface SuggestionDialogProps {
  open: boolean;
  onClose: () => void;
  suggestion?: Suggestion;
  isEditMode?: boolean;
}

const SuggestionDialog: React.FC<SuggestionDialogProps> = ({
  open,
  onClose,
  suggestion,
  isEditMode = false,
}) => {
  const { user } = useAuth();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("academic");
  const [urgency, setUrgency] = useState("low");
  const [status, setStatus] = useState("draft");
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (suggestion) {
      setTitle(suggestion.title);
      setDescription(suggestion.description);
      setCategory(suggestion.category);
      setUrgency(suggestion.urgency);
      setStatus(suggestion.status);
    }
  }, [suggestion]);

  const handleSubmit = async () => {
    if (!user) {
      alert("You need to be logged in to submit a suggestion.");
      return;
    }

    setLoading(true);

    try {
      if (isEditMode && suggestion) {
        await updateSuggestion(
          suggestion.id,
          { title, description, category, urgency },
          user
        );

        navigate(0);
      } else {
        await createSuggestion({
          title,
          description,
          status,
          createdBy: !isAnonymous ? user.uid : "",
          upvotes: 0,
          downvotes: 0,
          isPublic: true,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
          category,
          urgency: "low",
          upvotedUsers: [],
          downvotedUsers: [],
        });
      }

      setTitle("");
      setDescription("");
      setCategory("academic");
      setUrgency("low");
      setStatus("draft");

      onClose();
      navigate(0);
    } catch (error) {
      console.error("Error submitting suggestion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent
        className={cn(isAnonymous && "border-purple-700 border-4")}
      >
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Suggestion" : "Create Suggestion"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update your suggestion details."
              : "Share your ideas and suggestions to improve the campus."}
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4">
          {user?.role === "user" && (
            <>
              <Input
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                disabled={loading}
              />
              <Select onValueChange={setCategory} value={category}>
                <SelectTrigger>
                  <SelectValue
                    placeholder={"Category"}
                    defaultValue={category}
                  />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="academic">Academics</SelectItem>
                  <SelectItem value="campus-life">Campus Life</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}

          {(user?.role !== "user" || suggestion?.createdBy === user.uid) && (
            <div className="grid grid-cols-2 gap-3">
              <Select onValueChange={setUrgency} value={urgency}>
                <SelectTrigger>
                  <SelectValue placeholder="Urgency" defaultValue={urgency} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                </SelectContent>
              </Select>

              <Select onValueChange={setStatus} value={status}>
                <SelectTrigger>
                  <SelectValue placeholder="Status" defaultValue={status} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in-progress">In Progress</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          {user?.role === "user" && (
            <>
              <Textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                disabled={loading}
              />
            </>
          )}
        </div>
        <DialogFooter className="w-full flex justify-between gap-4 min-w-full max-w-full">
          <div className="flex gap-2 items-center">
            <label htmlFor="anonymous">Anonymous</label>
            <input
              type="checkbox"
              name="anonymous"
              id="anonymous"
              width={50}
              height={50}
              onChange={(e) => {
                setIsAnonymous(e.currentTarget.checked);
              }}
            />
          </div>
          <div className="flex gap-2 w-full justify-end">
            <Button variant="secondary" onClick={onClose} disabled={loading}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleSubmit} disabled={loading}>
              {loading ? "Submitting..." : isEditMode ? "Update" : "Create"}
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuggestionDialog;
