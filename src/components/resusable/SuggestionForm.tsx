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
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (suggestion) {
      setTitle(suggestion.title);
      setDescription(suggestion.description);
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
        await updateSuggestion(suggestion.id, { title, description }, user);
      } else {
        await createSuggestion({
          title,
          description,
          status: "Draft",
          createdBy: user.uid,
          upvotes: 0,
          downvotes: 0,
          isPublic: false,
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }

      setTitle("");
      setDescription("");
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
          <Textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={loading}
          />
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
