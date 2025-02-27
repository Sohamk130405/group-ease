import { useCurrentUser } from "@/features/user/api/use-current-user";
import GroupPreview from "./group-preview";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useCallback, FormEvent } from "react";
import { useSearchGroups } from "../api/use-search-groups";

const GroupSearchContainer = () => {
  const [formData, setFormData] = useState({
    branch: "",
    year: "",
    div: "",
    sem: 1,
  });

  const { data: groups } = useSearchGroups(formData);
  const { data: user } = useCurrentUser();
  const isFaculty = user?.role === "faculty";

  const handleChange = useCallback((field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  }, []);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="w-full  h-full flex items-center flex-col gap-2">
      <form
        className="gap-2 grid grid-cols-2 sm:grid-cols-2"
        onSubmit={handleSubmit}
      >
        <Select
          value={formData.sem.toString()}
          onValueChange={(value) => handleChange("sem", parseInt(value))}
        >
          <SelectTrigger className="w-[144px]">
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
          onValueChange={(value) => handleChange("div", value)}
        >
          <SelectTrigger className="w-[144px]">
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
          value={formData.year}
          onValueChange={(value) => handleChange("year", value)}
        >
          <SelectTrigger className="w-[144px]">
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
          value={formData.branch}
          onValueChange={(value) => handleChange("branch", value)}
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
      </form>
      {groups?.length === 0 && (
        <p className="text-muted-foreground">No groups found</p>
      )}
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
