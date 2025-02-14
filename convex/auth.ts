import { convexAuth } from "@convex-dev/auth/server";

import { Password } from "@convex-dev/auth/providers/Password";
import { DataModel } from "./_generated/dataModel";
import { ConvexError } from "convex/values";

const CustomPassword = Password<DataModel>({
  profile(params) {
    return {
      email: params.email as string,
      name: params.name as string,
      phone: params.phone as string,
      rollNo: parseInt(params.rollNo as string) as number | undefined,
      role: (params.role as "student" | "faculty") || "student",
      prn: parseInt(params.prn as string) as number | undefined,
      branch: params.branch as string | undefined,
      div: params.div as string | undefined,
      batch: parseInt(params.batch as string) as number | undefined,
      sem: parseInt(params.sem as string) as number | undefined,
      year: params.year as string | undefined,
    };
  },
  validatePasswordRequirements: (password: string) => {
    if (password.length < 8) {
      throw new ConvexError("Password must be at least 8 characters long.");
    }
  },
});

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [CustomPassword],
});
