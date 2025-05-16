"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ProfileDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  name: string;
  image?: string;
  email?: string;
  phone?: string;
  room?: string;
  role?: "student" | "faculty";
}

const ProfileDialog = ({
  open,
  onOpenChange,
  name,
  image,
  email,
  phone,
  room,
  role,
}: ProfileDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xs p-6">
        <DialogHeader>
          <DialogTitle className="text-center text-xl font-bold">
            Profile
          </DialogTitle>
          <DialogDescription className="text-center">
            User information
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col items-center gap-4 mt-2">
          <Avatar className="w-24 h-24 shadow-lg border-2 border-primary">
            <AvatarImage
              src={
                image ||
                "https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png"
              }
              alt="avatar"
            />
            <AvatarFallback className="text-2xl">{name[0]}</AvatarFallback>
          </Avatar>
          <div className="w-full flex flex-col gap-2 mt-2">
            <div>
              <span className="block text-xs text-muted-foreground font-medium">
                Name
              </span>
              <span className="block font-semibold text-base">{name}</span>
            </div>
            {email && (
              <div>
                <span className="block text-xs text-muted-foreground font-medium">
                  Email
                </span>
                <span className="block text-sm">{email}</span>
              </div>
            )}
            {phone && (
              <div>
                <span className="block text-xs text-muted-foreground font-medium">
                  Phone
                </span>
                <span className="block text-sm">{phone}</span>
              </div>
            )}
            {room && (
              <div>
                <span className="block text-xs text-muted-foreground font-medium">
                  Class Room
                </span>
                <span className="block text-sm">{room}</span>
              </div>
            )}
            {role && (
              <div>
                <span className="block text-xs text-muted-foreground font-medium">
                  Role
                </span>
                <span className="inline-block text-xs mt-1 px-2 py-1 rounded bg-secondary text-secondary-foreground font-semibold uppercase tracking-wide">
                  {role}
                </span>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProfileDialog;
