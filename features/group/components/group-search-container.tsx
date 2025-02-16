import { useCurrentUser } from "@/features/user/api/use-current-user";
import { useGetGroups } from "../api/use-get-groups";
import GroupPreview from "./group-preview";
import { Loader, Search } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useCallback, FormEvent } from "react";
import { Button } from "@/components/ui/button";

const GroupSearchContainer = () => {
  const [formData, setFormData] = useState({
    branch: "",
    type: "",
    year: "",
    subject: "",
    div: "",
    sem: 0,
    batch: 0,
  });

  const { data: groups, isLoading } = useGetGroups();
  const { data: user } = useCurrentUser();
  const isFaculty = user?.role === "faculty";

  const handleChange = useCallback((field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Handle the search logic here, e.g., filtering groups
    console.log("Searching with: ", formData);
  };

  if (isLoading) {
    return (
      <div className="h-full w-full flex items-center justify-center">
        <Loader className="size-5 animate-spin transition" />
      </div>
    );
  }

  return (
    <div className="w-full  h-full flex items-center flex-col gap-2">
      <form
        className="gap-2 grid grid-cols-2 sm:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <Select
          value={formData.subject}
          onValueChange={(value) => handleChange("subject", value)}
        >
          <SelectTrigger className="w-[144px]">
            <SelectValue placeholder="Subject" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Operating System">Operating System</SelectItem>
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
          onValueChange={(value) => handleChange("sem", parseInt(value))}
        >
          <SelectTrigger className="w-[144px]">
            <SelectValue placeholder="Semester" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="0">All</SelectItem>
              <SelectItem value="1">Semester 1</SelectItem>
              <SelectItem value="2">Semester 2</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={formData.div}
          onValueChange={(value) => handleChange("div", value)}
        >
          <SelectTrigger className="w-[144px]">
            <SelectValue placeholder="Division" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="A">Division A</SelectItem>
              <SelectItem value="B">Division B</SelectItem>
              <SelectItem value="C">Division C</SelectItem>
              <SelectItem value="D">Division D</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={formData.batch.toString()}
          onValueChange={(value) => handleChange("batch", parseInt(value))}
        >
          <SelectTrigger className="w-[144px]">
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
          onValueChange={(value) => handleChange("year", value)}
        >
          <SelectTrigger className="w-[144px]">
            <SelectValue placeholder="Year" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="First">First</SelectItem>
              <SelectItem value="Second">Second</SelectItem>
              <SelectItem value="Third">Third</SelectItem>
              <SelectItem value="Fourth">Fourth</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={formData.type}
          onValueChange={(value) => handleChange("type", value)}
        >
          <SelectTrigger className="w-[144px]">
            <SelectValue placeholder="Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
              <SelectItem value="Theory">Theory</SelectItem>
              <SelectItem value="Tutorial">Tutorial</SelectItem>
              <SelectItem value="Lab">Lab</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Select
          value={formData.branch}
          onValueChange={(value) => handleChange("branch", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Branch" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="All">All</SelectItem>
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

        <Button type="submit" className="flex items-center" aria-label="Search">
          <Search /> Search
        </Button>
      </form>

      <div className="h-full grid gap-2 sm:grid-cols-2 lg:grid-cols-1">
        {groups?.map((group) => {
          const isOwner = user?._id === group.createdBy;
          return (
            <GroupPreview
              key={group._id}
              group={group}
              isOwner={isOwner}
              isFaculty={isFaculty}
            />
          );
        })}
      </div>
    </div>
  );
};

export default GroupSearchContainer;
