"use server";
import { getServerSession } from "next-auth";
import authOptions from "@/app/api/auth/[...nextauth]/route";
import Conversation from "@/models/conversation";
import User from "@/models/user";
import connectDB from "@/lib/db";
import { handleError, parseStringify } from "@/lib/utils";

const createGroup = async ({
  subject,
  batch,
  branch,
  year,
  type,
  semester,
  division,
}) => {
  try {
    await connectDB();
    const group = new Conversation({
      title: `${year} Year ${branch} ${division} Sem ${semester}`,
      subject,
      batch,
      branch,
      year,
      division,
      type,
      semester,
    });
    await group.save();
    return parseStringify({
      success: true,
      data: group,
      message: "Group created successfully",
    });
  } catch (error) {
    return handleError({ error, message: "Failed to create group" });
  }
};

export const fetchGroup = async ({
  subject,
  batch,
  branch,
  year,
  type,
  semester,
  division,
}) => {
  try {
    await connectDB();
    let group = await Conversation.findOne({
      subject,
      batch,
      branch,
      year,
      type,
      division,
      semester,
    });

    if (!group) {
      const createResponse = await createGroup({
        subject,
        batch,
        branch,
        year,
        type,
        semester,
        division,
      });

      if (!createResponse.success) {
        return handleError({ error, message: "Failed to fetch group" });
      }
      group = createResponse.data;
    }

    return parseStringify({
      success: true,
      data: group,
      message: "Group fetched successfully",
    });
  } catch (error) {
    return handleError({ error, message: "Failed to fetch group" });
  }
};

export const fetchNotifiedGroups = async (userId) => {
  try {
    await connectDB();
    const user = await User.findById(userId);
    if (!user) return handleError({ message: "User not found" });
    if (user.role === "student") {
      const groups = await Conversation.find({
        branch: user.branch,
        year: user.year,
        semester: user.sem,
        division: user.division,
      });
      return parseStringify({
        success: true,
        data: groups,
        message: "Groups fetched successfully",
      });
    } else {
      const groups = await Conversation.find({
        _id: { $in: user.notifications },
      });
      return parseStringify({
        success: true,
        data: groups,
        message: "Groups fetched successfully",
      });
    }
  } catch (error) {
    return handleError({ error, message: "Failed to fetch groups" });
  }
};
