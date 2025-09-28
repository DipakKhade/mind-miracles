'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { AdminMails } from '@/lib';

export default function WpGroupMembersPage() {
  const [members, setMembers] = useState<any[]>([]);
  const { data, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'loading') return;
    if (status === 'unauthenticated') {
      router.push('/');
      toast.warning('Please log in to your account');
    } else if (!AdminMails.includes(data?.user?.email ?? '')) {
      router.push('/');
      toast.warning('unAuthorized');
    } else {
      getData();
    }
  }, [status, data]);

  const getData = async () => {
    toast.loading('loading...', {
      position: 'top-center',
    });
    const res = await fetch('/api/adduser/track');
    const response = await res.json();
    setMembers(response.data ?? []);
    toast.dismiss();
  };

  const handleMarkAsAdded = async (memberId: string) => {
    try {
      const res = await fetch('/api/adduser/track/mark_as_added', {
        method: 'POST',
        body: JSON.stringify({
          id: memberId,
        }),
      });

      const response = await res.json();
      if (response.success) {
        setMembers((prevMembers) =>
          prevMembers.map((member) =>
            member.id === memberId
              ? { ...member, isAddedToGroup: true }
              : member,
          ),
        );
      }
    } catch (err) {
      toast.error('some error occured');
    }
  };

  return (
    <div className="container mx-auto px-3 py-4 sm:px-4 sm:py-8">
      <div className="mb-6 sm:mb-8">
        <h1 className="mb-2 text-2xl font-bold text-foreground sm:text-3xl">
          WhatsApp Group Members
        </h1>
        <p className="text-sm text-muted-foreground sm:text-base">
          Manage your WhatsApp group members and track their addition status
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {members.map((member) => (
          <Card key={member.id} className="w-full">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-1 items-center space-x-3 sm:space-x-4">
                  <div className="flex-shrink-0">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 sm:h-12 sm:w-12">
                      <span className="text-lg text-primary sm:text-xl">
                        👤
                      </span>
                    </div>
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="mb-1 flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
                      <h3 className="truncate text-base font-semibold text-foreground sm:text-lg">
                        {member.name}
                      </h3>
                      {member.isAddedToGroup && (
                        <Badge
                          variant="secondary"
                          className="self-start bg-green-100 text-xs text-green-800 dark:bg-green-900 dark:text-green-200 sm:self-auto"
                        >
                          ✓ Added
                        </Badge>
                      )}
                    </div>

                    <div className="flex items-center text-muted-foreground">
                      <span className="mr-2">📱</span>
                      <span className="text-sm">{member.wpNumber}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full flex-shrink-0 sm:w-auto">
                  <Button
                    onClick={() => handleMarkAsAdded(member.id)}
                    disabled={member.isAddedToGroup}
                    variant={member.isAddedToGroup ? 'secondary' : 'default'}
                    className="h-11 w-full text-sm font-medium sm:w-auto sm:min-w-[140px]"
                  >
                    {member.isAddedToGroup ? <>✓ Added</> : 'Mark as Added'}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {members.length === 0 && (
        <Card className="w-full">
          <CardContent className="p-8 text-center sm:p-12">
            <div className="mb-4 text-3xl sm:text-4xl">👥</div>
            <h3 className="mb-2 text-base font-semibold text-foreground sm:text-lg">
              No members found
            </h3>
            <p className="text-sm text-muted-foreground sm:text-base">
              There are no WhatsApp group members to display at the moment.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
