import { Doc } from "@/convex/_generated/dataModel";
import { sendEmail } from "./email";
import { AssignmentEmailTemplate } from "./email-template";

export interface NotifyAssignmentAndUsersProps {
  users: Doc<"users">[];
  assignmentDetails: {
    subject: string;
    title: string;
    deadline: number;
    assignmentLink: string;
  };
}

export const SendEmailTo = async (
  NotifyDetails: NotifyAssignmentAndUsersProps
) => {
  await Promise.all(
    NotifyDetails.users.map((user) => {
      sendEmail({
        to: user.email,
        subject: "New Assignment Added By Faculty",
        html: AssignmentEmailTemplate({
          ...NotifyDetails.assignmentDetails,
          name: user.name,
        }),
      });
    })
  );
};
