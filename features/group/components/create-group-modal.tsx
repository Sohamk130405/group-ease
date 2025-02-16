import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCreateGroupModal } from "@/features/group/store/use-create-group-modal";
import { useCreateGroup } from "@/features/group/api/use-create-group";
import { toast } from "@/hooks/use-toast";

export function CreateGroupDialog() {
  const [open, setOpen] = useCreateGroupModal();
  const { mutate, isPending } = useCreateGroup();
  const [formData, setFormData] = useState({
    branch: "",
    type: "",
    year: "",
    subject: "",
    div: "",
    sem: 1,
    batch: 0,
  });

  const handleCreateGroup = async () => {
    try {
      await mutate(formData, {
        onSuccess: () => {
          setOpen(false);
          toast({ title: "Group created successfully." });
        },
        onError: (error) => {
          toast({
            title: "Failed to create group.",
            description: error.message,
            variant: "destructive",
          });
        },
      });
    } catch (error) {
      console.error("Error creating group:", error);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[425px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Create new group</DialogTitle>
          <DialogDescription>
            Select all fields to create group and click on create.
          </DialogDescription>
        </DialogHeader>
        <div className="gap-2 grid grid-cols-2">
          <Select
            value={formData.subject}
            onValueChange={(value) =>
              setFormData({ ...formData, subject: value })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Subject" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Operating System">
                  Operating System
                </SelectItem>
                <SelectItem value="Data Structures">Data Structures</SelectItem>
                <SelectItem value="Web Technology">Web Technology</SelectItem>
                <SelectItem value="Data Visualization">
                  Data Visualization
                </SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={formData.sem.toString()}
            onValueChange={(value) =>
              setFormData({ ...formData, sem: parseInt(value) })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Semester" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="1">Semester 1</SelectItem>
                <SelectItem value="2">Semester 2</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={formData.div}
            onValueChange={(value) => setFormData({ ...formData, div: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Division" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="A">Division A</SelectItem>
                <SelectItem value="B">Division B</SelectItem>
                <SelectItem value="C">Division C</SelectItem>
                <SelectItem value="D">Division D</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={formData.batch.toString()}
            onValueChange={(value) =>
              setFormData({ ...formData, batch: parseInt(value) })
            }
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Batch" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="0">All</SelectItem>
                <SelectItem value="1">Batch 1</SelectItem>
                <SelectItem value="2">Batch 2</SelectItem>
                <SelectItem value="3">Batch 3</SelectItem>
                <SelectItem value="4">Batch 4</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={formData.year}
            onValueChange={(value) => setFormData({ ...formData, year: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="First">First</SelectItem>
                <SelectItem value="Second">Second</SelectItem>
                <SelectItem value="Third">Third</SelectItem>
                <SelectItem value="Fourth">Fourth</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Select
            value={formData.type}
            onValueChange={(value) => setFormData({ ...formData, type: value })}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="Theory">Theory</SelectItem>
                <SelectItem value="Tutorial">Tutorial</SelectItem>
                <SelectItem value="Lab">Lab</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <Select
          value={formData.branch}
          onValueChange={(value) => setFormData({ ...formData, branch: value })}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Computer Engineering">
                Computer Engineering
              </SelectItem>
              <SelectItem value="Information Technology">
                Information Technology
              </SelectItem>
              <SelectItem value="CSAI">CSAI</SelectItem>
              <SelectItem value="CSAIML">CSAIML</SelectItem>
              <SelectItem value="AIDS">AIDS</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <DialogFooter>
          <Button
            type="button"
            onClick={handleCreateGroup}
            disabled={isPending}
          >
            {isPending ? "Creating..." : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
