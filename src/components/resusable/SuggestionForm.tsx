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
  const [urgency, setUrgency] = useState("");
  const [status, setStatus] = useState("Draft");
  const [loading, setLoading] = useState(false);

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
      } else {
        await createSuggestion({
          title,
          description,
          status,
          createdBy: user.uid,
          upvotes: 0,
          downvotes: 0,
          isPublic: true,
          createdAt: new Date().toString(),
          updatedAt: new Date().toString(),
          category,
          urgency: "low",
        });
      }

      setTitle("");
      setDescription("");
      setCategory("");
      setUrgency("");
      onClose();
    } catch (error) {
      console.error("Error submitting suggestion:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
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
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            disabled={loading}
          />
          <Select onValueChange={setCategory} value={category}>
            <SelectTrigger>
              <SelectValue placeholder={category || "Category"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="infrastructure">Infrastructure</SelectItem>
              <SelectItem value="academic">Academics</SelectItem>
              <SelectItem value="campus-life">Campus Life</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
          <Select onValueChange={setUrgency}>
            <SelectTrigger>
              <SelectValue placeholder="Urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={setStatus}>
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="open">Open</SelectItem>
              <SelectItem value="in-progress">In Progress</SelectItem>
              <SelectItem value="closed">Closed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <DialogFooter>
          <Button variant="secondary" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={loading}>
            {loading ? "Submitting..." : isEditMode ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SuggestionDialog;
