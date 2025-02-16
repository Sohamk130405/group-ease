"use client";

import { FormEvent, useState } from "react";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { SignInStateProps } from "@/lib/types";
import { useAuthActions } from "@convex-dev/auth/react";
export function RegisterForm({ setState }: SignInStateProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    branch: "",
    batch: "",
    year: "",
    phone: "",
    prn: "",
    rollNo: "",
    sem: "",
    div: "",
  });
  const { signIn } = useAuthActions();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signIn("password", {
        ...formData,
        flow: "signUp",
      });
      toast({
        title: "Registration Successful",
        description: "Your account has been created successfully.",
      });
    } catch {
      toast({
        title: "Error",
        description: "Something went wrong. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6")}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Create Your Account</CardTitle>
          <CardDescription>Register with your details</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="98XXXXXXXX"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <div className="grid gap-2">
                    <Label htmlFor="prn">PRN</Label>
                    <Input
                      id="prn"
                      type="number"
                      value={formData.prn}
                      onChange={(e) =>
                        setFormData({ ...formData, prn: e.target.value })
                      }
                      placeholder="12310981"
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="rollNo">Roll No</Label>
                    <Input
                      id="rollNo"
                      type="number"
                      value={formData.rollNo}
                      onChange={(e) =>
                        setFormData({ ...formData, rollNo: e.target.value })
                      }
                      placeholder="55"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Select
                    required
                    value={formData.year}
                    onValueChange={(value) =>
                      setFormData({ ...formData, year: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Year" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="First">First Year</SelectItem>
                      <SelectItem value="Second">Second Year</SelectItem>
                      <SelectItem value="Third">Third Year</SelectItem>
                      <SelectItem value="Fourth">Fourth Year</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    required
                    value={formData.batch}
                    onValueChange={(value) =>
                      setFormData({ ...formData, batch: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Batch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Batch 1</SelectItem>
                      <SelectItem value="2">Batch 2</SelectItem>
                      <SelectItem value="3">Batch 3</SelectItem>
                      <SelectItem value="4">Batch 4</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Select
                    required
                    value={formData.branch}
                    onValueChange={(value) =>
                      setFormData({ ...formData, branch: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CSAI">CSAI</SelectItem>
                      <SelectItem value="CSAIML">CSAIML</SelectItem>
                      <SelectItem value="Comp">Comp</SelectItem>
                      <SelectItem value="IT">IT</SelectItem>
                      <SelectItem value="AIDS">AIDS</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    required
                    value={formData.sem}
                    onValueChange={(value) =>
                      setFormData({ ...formData, sem: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Sem" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1">Sem 1</SelectItem>
                      <SelectItem value="2">Sem 2</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    required
                    value={formData.div}
                    onValueChange={(value) =>
                      setFormData({ ...formData, div: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select Division" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="A">A</SelectItem>
                      <SelectItem value="B">B</SelectItem>
                      <SelectItem value="C">C</SelectItem>
                      <SelectItem value="D">D</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={formData.password}
                    onChange={
                      (e) =>
                        setFormData({ ...formData, password: e.target.value }) // Update the name field
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading ? "Registering..." : "Register"}
                </Button>
                <p className="text-sm text-muted-foreground text-center">
                  Note: Enter your current roll no and batch
                </p>
              </div>
              <div className="relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t after:border-border">
                <span className="relative z-10 bg-background px-2 text-muted-foreground">
                  Or
                </span>
              </div>
              <div className="text-center text-sm">
                Already have an account?{" "}
                <span
                  onClick={() => setState("signIn")}
                  className="underline underline-offset-4 cursor-pointer"
                >
                  Sign in
                </span>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
