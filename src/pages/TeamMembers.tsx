
import React from 'react';
import TeamOverview from '@/components/team/TeamOverview';
import BreadcrumbNav from '@/components/BreadcrumbNav';
import { Button } from '@/components/ui/button';
import { UserPlus } from 'lucide-react';

const TeamMembersPage: React.FC = () => {
  return (
    <div className="container py-6">
      <BreadcrumbNav />
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-foreground">Team</h1>
          <Button className="flex items-center gap-2">
            <UserPlus className="h-4 w-4" />
            Add Team Member
          </Button>
        </div>
        <TeamOverview />
      </div>
    </div>
  );
};

export default TeamMembersPage;
