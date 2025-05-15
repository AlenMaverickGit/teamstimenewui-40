import React, { useState } from "react";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { UserPlus, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  initials: string;
}

const UsersPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "Alex Johnson",
      email: "alex@example.com",
      role: "Admin",
      initials: "AJ",
    },
    {
      id: "2",
      name: "Sam Taylor",
      email: "sam@example.com",
      role: "Project Manager",
      initials: "ST",
    },
    {
      id: "3",
      name: "Jamie Smith",
      email: "jamie@example.com",
      role: "Project Manager",
      initials: "JS",
    },
    {
      id: "4",
      name: "Morgan Lee",
      email: "morgan@example.com",
      role: "Team Member",
      initials: "ML",
    },
    {
      id: "5",
      name: "Riley Chen",
      email: "riley@example.com",
      role: "Team Member",
      initials: "RC",
    },
    {
      id: "6",
      name: "Jordan Patel",
      email: "jordan@example.com",
      role: "Team Member",
      initials: "JP",
    },
    {
      id: "7",
      name: "Casey Wilson",
      email: "casey@example.com",
      role: "Team Member",
      initials: "CW",
    },
  ]);

  const getRoleColor = (role: string) => {
    switch (role) {
      case "Admin":
        return "bg-red-100 text-red-600 border-red-200";
      case "Project Manager":
        return "bg-amber-100 text-amber-600 border-amber-200";
      case "Team Member":
        return "bg-blue-100 text-blue-600 border-blue-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  const getAvatarColor = (initials: string) => {
    const colors = [
      "bg-primary/10 text-primary",
      "bg-red-100 text-red-600",
      "bg-amber-100 text-amber-600",
      "bg-emerald-100 text-emerald-600",
      "bg-blue-100 text-blue-600",
      "bg-indigo-100 text-indigo-600",
      "bg-purple-100 text-purple-600",
    ];

    // Simple hash function to deterministically assign colors
    const hash = initials.charCodeAt(0) % colors.length;
    return colors[hash];
  };

  return (
    // <div className="px-2 sm:container sm:mx-auto py-6">
    //   <BreadcrumbNav />
    //   <div className="flex flex-col gap-6">
    //     <div className="flex items-center justify-between flex-wrap gap-2">
    //       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground">
    //         User Management
    //       </h1>
    //       <Button className="flex items-center gap-2">
    //         <UserPlus className="h-4 w-4" />
    //         Invite User
    //       </Button>
    //     </div>

    <div className="px-2 sm:container sm:mx-auto py-6">
      <div className="flex items-center justify-between flex-wrap gap-2 mb-6">
        <BreadcrumbNav />
        <Button className="h-8 px-3 py-1.5 text-sm flex items-center gap-2">
          <UserPlus className="h-4 w-4" />
          Invite User
        </Button>
      </div>
      <div>
        <div className="bg-white rounded-lg shadow-sm border border-border/30">
          <div className="p-5">
            <h2 className="text-lg font-semibold">Team Members</h2>
            <p className="text-muted-foreground text-sm">
              Manage user roles and permissions across the platform.
            </p>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback
                          className={getAvatarColor(user.initials)}
                        >
                          {user.initials}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">{user.name}</span>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={`font-medium ${getRoleColor(user.role)}`}
                      >
                        {user.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0"
                          >
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>Edit user</DropdownMenuItem>
                          <DropdownMenuItem>Change role</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">
                            Remove user
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
