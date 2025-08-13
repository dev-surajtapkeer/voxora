import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Team } from "@/lib/api";
import { TeamFormData } from "@/lib/interfaces/admin";
import { useState } from "react";

// Team Form Component
function TeamForm({
  team = null,
  onSubmit,
  onCancel,
  isLoading = false,
}: {
  team?: Team | null;
  onSubmit: (data: TeamFormData) => void;
  onCancel: () => void;
  isLoading?: boolean;
}) {
  const [formData, setFormData] = useState<TeamFormData>({
    name: team?.name || "",
    description: team?.description || "",
    color: team?.color || "#3b82f6",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Team Name</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="Enter team name"
          disabled={!!team} // Disable name editing for existing teams
          required
        />
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          placeholder="Enter team description"
          rows={3}
          required
        />
      </div>

      <Label htmlFor="color">Team Color</Label>
      <div className="flex gap-2 items-center">
        <Input
          id="color"
          type="color"
          value={formData.color}
          onChange={(e) => setFormData({ ...formData, color: e.target.value })}
          required
        />
      </div>
      <div>
        <Label htmlFor="color">Team Color</Label>
        <div className="flex gap-2 items-center">
          <Input
            id="color"
            type="color"
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            className="w-16 h-10"
          />
          <Input
            value={formData.color}
            onChange={(e) =>
              setFormData({ ...formData, color: e.target.value })
            }
            placeholder="#3b82f6"
            className="flex-1"
          />
        </div>
      </div>

      <div className="flex gap-2 pt-4">
        <Button type="submit" className="flex-1" disabled={isLoading}>
          {isLoading ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-gray-300 border-t-white mr-2"></div>
              {team ? "Updating..." : "Creating..."}
            </>
          ) : team ? (
            "Update Team"
          ) : (
            "Create Team"
          )}
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="flex-1"
          disabled={isLoading}
        >
          Cancel
        </Button>
      </div>
    </form>
  );
}

export default TeamForm;
