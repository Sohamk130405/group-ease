import { format } from "date-fns";

interface TemplateProps {
  subject: string;
  title: string;
  deadline: number;
  assignmentLink: string;
  name: string;
}

export const AssignmentEmailTemplate = ({
  subject,
  title,
  deadline,
  assignmentLink,
  name,
}: TemplateProps) => {
  return `
    <!DOCTYPE html>
    <html>
      <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>GroupEase: New Assignment</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        background-color: #f4f4f4;
        margin: 0;
        padding: 0;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        background-color: #ffffff;
        border: 1px solid #dddddd;
        border-radius: 8px;
        overflow: hidden;
      }
      .header {
        background-color: #4caf50;
        color: white;
        padding: 20px;
        text-align: center;
      }
      .content {
        padding: 20px;
      }
      .footer {
        text-align: center;
        padding: 10px;
        color: #888888;
        font-size: 12px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        color: white;
        background-color: #4caf50;
        text-decoration: none;
        border-radius: 5px;
        margin-top: 20px;
      }
      .button:hover {
        background-color: #45a049;
      }
      .assignment-details {
        background-color: #f9f9f9;
        border-left: 4px solid #4caf50;
        padding: 15px;
        margin: 20px 0;
      }
    </style>
  </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Assignment Created!</h1>
          </div>
          <div class="content">
            <p>Hello,${name}</p>
            <p>A new assignment has been created in your group. Here are the details:</p>
            <div class="assignment-details">
              <p><strong>Subject:</strong> ${subject}</p>
              <p><strong>Title:</strong> ${title}</p>
              <p><strong>Deadline:</strong> ${format(deadline, "HH:mm, MMM d, yyyy")}</p>
            </div>
            <p>Please make sure to complete the assignment before the deadline.</p>
            <a href="${process.env.NEXT_PUBLIC_URL}/assignments/${assignmentLink}" class="button">View Assignment</a>
            <p>Best regards,<br />Vishwakarma Institute of Technology</p>
          </div>
          <div class="footer">
            © ${new Date().getFullYear()} Vishwakarma Institute of Technology, Pune. All rights reserved.
          </div>
        </div>
      </body>
    </html>
  `;
};
