import { Card } from "@/components/ui/card";

const AssignmmentsFallback = () => {
  return (
    <Card className="hidden lg:flex h-full w-full p-2 items-center justify-center bg-secondary text-secondary-foreground">
      Select a assignment to get view details!
    </Card>
  );
};

export default AssignmmentsFallback;
