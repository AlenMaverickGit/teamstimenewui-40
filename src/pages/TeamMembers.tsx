import React from "react";
import TeamOverview from "@/components/team/TeamOverview";
import BreadcrumbNav from "@/components/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const TeamMembersPage: React.FC = () => {
  return (
    // <div className="px-2 sm:container sm:mx-auto py-6">
    //   <BreadcrumbNav />
    //   <div className="flex flex-col gap-6">
    //     <div className="flex items-center justify-between flex-wrap gap-2">
    //       <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground block md:hidden">
    //         Team
    //       </h1>
    //       <Button className="ml-auto flex items-center gap-2">
    //         <UserPlus className="h-4 w-4" />
    //         Add Team Member
    //       </Button>
    //     </div>
    //     <TeamOverview />
    //   </div>
    // </div>

    <div className="px-2 sm:container sm:mx-auto py-6">
      <div className="flex items-center justify-between flex-wrap gap-4 mb-6">
        <BreadcrumbNav />
        <Button className="h-8 px-3 py-1.5 text-sm gap-2 shadow-sm transition-all hover:translate-y-[-1px]">
          {/* <UserPlus className="h-4 w-4" /> */}
          <UserCog className="h-4 w-4" />
          Manage Users
        </Button>
        <Button className="h-8 px-3 py-1.5 text-sm gap-2 shadow-sm transition-all hover:translate-y-[-1px]">
          <UserPlus className="h-4 w-4" />
          Add Team Member
        </Button>
      </div>

      <div className="flex flex-col gap-6">
        <TeamOverview />
      </div>
    </div>
  );
};

export default TeamMembersPage;
