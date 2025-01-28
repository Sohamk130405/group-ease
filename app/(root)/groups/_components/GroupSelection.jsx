"use client";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { academicData } from "@/constants/academicData";
import { Button } from "@/components/ui/button";
import { fetchGroup } from "@/lib/actions/groups";
import { handleError } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import GroupPreview from "../../_components/GroupPreview";

const GroupSelection = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("");
  const [selectedSemester, setSelectedSemester] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedSubject, setSelectedSubject] = useState("");
  const [selectedBatch, setSelectedBatch] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [loading, setLoading] = useState(false);
  const [group, setGroup] = useState(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [subjects, setSubjects] = useState([]);
  const [divisions, setDivisions] = useState([]);
  const [batches, setBatches] = useState([]);

  const handleYearChange = (value) => {
    setSelectedYear(value);
    setSelectedBranch("");
    setSelectedSemester("");
    setSelectedDivision("");
    setSubjects([]);
    setDivisions([]);
  };

  const handleBranchChange = (value) => {
    setSelectedBranch(value);
    setSelectedSemester("");
    setSelectedDivision("");
    setSubjects([]);
    setDivisions([]);
  };

  const handleSemesterChange = (value) => {
    setSelectedSemester(value);
    const yearData = academicData.years.find((y) =>
      y.year.includes(selectedYear)
    );
    const semesterData = yearData?.semesters.find((s) =>
      s.semester.includes(value)
    );
    const branchData = semesterData?.branches.find(
      (b) => b.branch === selectedBranch
    );
    setDivisions(branchData?.divisions || []);
    setSelectedDivision("");
    setSubjects([]);
  };

  const handleDivisionChange = (value) => {
    setSelectedDivision(value);
    const yearData = academicData.years.find((y) =>
      y.year.includes(selectedYear)
    );
    const semesterData = yearData?.semesters.find((s) =>
      s.semester.includes(selectedSemester)
    );
    const branchData = semesterData?.branches.find(
      (b) => b.branch === selectedBranch
    );
    const divisionData = branchData?.divisions.find(
      (d) => d.division === value
    );
    setSubjects(divisionData?.subjects || []);
    setBatches(divisionData?.batches || []);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !selectedBatch ||
      !selectedDivision ||
      !selectedSemester ||
      !selectedSubject ||
      !selectedType ||
      !selectedYear ||
      !selectedBranch
    ) {
      setErrorMessage("Please select all fields");
      return;
    }
    setLoading(true);

    try {
      const response = await fetchGroup({
        year: selectedYear,
        branch: selectedBranch,
        semester: selectedSemester,
        division: selectedDivision,
        subject: selectedSubject,
        batch: selectedBatch,
        type: selectedType,
      });
      if (response.success) {
        setGroup(response.data);
        toast({
          title: response.message,
          description: "Send message to make group visible in feed",
        });
      } else {
        toast({
          title: "Something went wrong!",
          description: response?.message || "Failed to fetch group",
          variant: "destructive",
        });
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form
        className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-2 gap-2 md:gap-4 w-full"
        onSubmit={handleSubmit}
      >
        {/* Year Selection */}
        <Select onValueChange={handleYearChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Year" />
          </SelectTrigger>
          <SelectContent>
            {academicData.years.map((year) => (
              <SelectItem key={year.year} value={year.year}>
                {year.year} Year
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Branch Selection */}
        <Select disabled={!selectedYear} onValueChange={handleBranchChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Branch" />
          </SelectTrigger>
          <SelectContent>
            {academicData.years
              .find((y) => y.year.includes(selectedYear))
              ?.semesters[0]?.branches.map((branch) => (
                <SelectItem key={branch.branch} value={branch.branch}>
                  {branch.branch}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {/* Semester Selection */}
        <Select disabled={!selectedBranch} onValueChange={handleSemesterChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Sem" />
          </SelectTrigger>
          <SelectContent>
            {academicData.years
              .find((y) => y.year.includes(selectedYear))
              ?.semesters.map((semester) => (
                <SelectItem key={semester.semester} value={semester.semester}>
                  Sem {semester.semester}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>

        {/* Division Selection */}
        <Select
          disabled={!selectedSemester}
          onValueChange={handleDivisionChange}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Division" />
          </SelectTrigger>
          <SelectContent>
            {divisions.map((division) => (
              <SelectItem key={division.division} value={division.division}>
                {division.division}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Batch Selection */}
        <Select disabled={!selectedDivision} onValueChange={setSelectedBatch}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Batch" />
          </SelectTrigger>
          <SelectContent>
            {batches.map((batch) => (
              <SelectItem key={batch} value={batch}>
                Batch {batch}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Subject Selection */}
        <Select disabled={!selectedDivision} onValueChange={setSelectedSubject}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Subject" />
          </SelectTrigger>
          <SelectContent>
            {subjects.map((subject) => (
              <SelectItem key={subject} value={subject}>
                {subject}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Type Selection */}
        <Select onValueChange={setSelectedType}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Theory">Theory</SelectItem>
            <SelectItem value="Tutorial">Tutorial</SelectItem>
            <SelectItem value="Lab">Lab</SelectItem>
          </SelectContent>
        </Select>
        <Button
          type="submit"
          disabled={loading}
          className="bg-primary text-primary-foreground"
        >
          Search
        </Button>
      </form>
      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      {group && <GroupPreview group={group} />}
    </>
  );
};

export default GroupSelection;
