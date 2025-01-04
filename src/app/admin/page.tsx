'use client';
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useState } from 'react'
import { ChevronDown, ChevronUp, ChevronsUpDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface DataItem {
  id: string
  firstName: string
  lastName: string
  mobileNo: number
  email: string
  age: number
  place: string
}



export default function Page() {
  const [username, SetUsername] = useState<string>()
  const [password, SetPassword] = useState<string>()
  const [isadmin, SetisAdmin] = useState<boolean>(false)
  const [data, SetData] = useState<DataItem[]>([])

  const adminLogin = async () => {
    if (!username || !password) {
      toast.error('enter credentionals')
      return;
    }

    const res = await fetch('/api/admin', {
      method: "POST",
      body: JSON.stringify({
        username,
        password
      })
    })
    const response = await res.json();
    if (response.success === true) {
      SetisAdmin(true)
      SetData(response.register)
      toast.success('indentity verified')
      return
    } else {
      toast.error('invalid credentionals')
      SetisAdmin(false)
    }
  }


  return <>
    <main className="pt-12 p-2 md:p-8 md:pt-24">
      <div className="max-w-4xl justify-centre md:space-y-4">
        <div className="md:pl-[30vw] space-y-2 ">
          <Input onChange={(e) => SetUsername(e.target.value)} type="text" placeholder="Enter Admin Username" />
          <Input onChange={(e) => SetPassword(e.target.value)} type="password" placeholder="Enter Password" />
        </div>
        <div className="pl-[35vw] md:pl-[40vw] ">
          <Button className="bg-green-400 hover:bg-text-green-700 text-slate-900" onClick={adminLogin}>Verify</Button>
        </div>

      </div>
      {
        isadmin && data ?
          < DataTable data={data} />
          : ''
      }

    </main>
  </>
}



function DataTable({ data }: any) {
  const [sortColumn, setSortColumn] = useState<keyof DataItem | null>(null)
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 5

  const handleSort = (column: keyof DataItem) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortColumn(column)
      setSortDirection('asc')
    }
  }

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) return 0
    if (a[sortColumn] < b[sortColumn]) return sortDirection === 'asc' ? -1 : 1
    if (a[sortColumn] > b[sortColumn]) return sortDirection === 'asc' ? 1 : -1
    return 0
  })

  const totalPages = Math.ceil(sortedData.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = sortedData.slice(startIndex, startIndex + itemsPerPage)

  const renderSortIcon = (column: keyof DataItem) => {
    if (sortColumn !== column) return <ChevronsUpDown className="ml-2 h-4 w-4" />
    return sortDirection === 'asc' ? <ChevronUp className="ml-2 h-4 w-4" /> : <ChevronDown className="ml-2 h-4 w-4" />
  }

  return (
    <div className="w-full pt-4">
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              {Object.keys(data[0]).map((key) => (
                <TableHead key={key} className="font-medium">
                  <Button
                    variant="ghost"
                    onClick={() => handleSort(key as keyof DataItem)}
                    className="flex items-center"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                    {renderSortIcon(key as keyof DataItem)}
                  </Button>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.map((item) => (
              <TableRow key={item.id}>
                {Object.entries(item).map(([key, value]) => (
                  <TableCell key={key}>{value}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, sortedData.length)} of {sortedData.length} entries
        </div>
        <div className="flex gap-2">
          <Button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <Button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

