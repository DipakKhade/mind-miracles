"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { toast } from "sonner"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { AdminMails } from "@/lib"



export default function WpGroupMembersPage() {
  const [members, setMembers] = useState<any[]>([])
  const {data, status} = useSession()
  const router = useRouter()

  useEffect(()=> {
    if( status === 'loading') return;
    if(status === 'unauthenticated') {
      router.push('/')
    } else if(!AdminMails.includes(data?.user?.email ?? '')) {
      router.push('/')
      toast.warning('unAuthorized')
    } else {
      getData()
    }
  }, [status, data])

  const getData = async() => {
    const res = await fetch('/api/adduser/track')
    const response = await res.json();
    setMembers(response.data ?? [])
  }

  const handleMarkAsAdded = async (memberId: string) => {
    try {
      const res = await fetch('/api/adduser/track/mark_as_added', {
        method: "POST",
        body: JSON.stringify({
          id: memberId
        })
      })
      
      const response = await res.json()
      if(response.success) {
        setMembers((prevMembers) =>
          prevMembers.map((member) => (member.id === memberId ? { ...member, isAddedToGroup: true } : member)),
        )
      }

    } catch(err) {
      toast.error('some error occured')
    }
   
  }

  return (
    <div className="container mx-auto py-4 px-3 sm:py-8 sm:px-4">
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">WhatsApp Group Members</h1>
        <p className="text-sm sm:text-base text-muted-foreground">
          Manage your WhatsApp group members and track their addition status
        </p>
      </div>

      <div className="grid gap-3 sm:gap-4">
        {members.map((member) => (
          <Card key={member.id} className="w-full">
            <CardContent className="p-4 sm:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <span className="text-primary text-lg sm:text-xl">👤</span>
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
                      <h3 className="text-base sm:text-lg font-semibold text-foreground truncate">{member.name}</h3>
                      {member.isAddedToGroup && (
                        <Badge
                          variant="secondary"
                          className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 self-start sm:self-auto text-xs"
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

                <div className="flex-shrink-0 w-full sm:w-auto">
                  <Button
                    onClick={() => handleMarkAsAdded(member.id)}
                    disabled={member.isAddedToGroup}
                    variant={member.isAddedToGroup ? "secondary" : "default"}
                    className="w-full sm:w-auto sm:min-w-[140px] h-11 text-sm font-medium"
                  >
                    {member.isAddedToGroup ? <>✓ Added</> : "Mark as Added"}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {members.length === 0 && (
        <Card className="w-full">
          <CardContent className="p-8 sm:p-12 text-center">
            <div className="text-3xl sm:text-4xl mb-4">👥</div>
            <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">No members found</h3>
            <p className="text-sm sm:text-base text-muted-foreground">
              There are no WhatsApp group members to display at the moment.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
