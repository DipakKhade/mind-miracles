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
  const [loading, SetLoading] = useState<boolean>(false)

  const adminLogin = async () => {
    if (!username || !password) {
      toast.error('enter credentionals')
      return;
    }
    SetLoading(true)
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
      SetLoading(false)
      SetData(response.register)
      toast.success('indentity verified')
      return
    } else {
      SetLoading(false)
      toast.error('invalid credentionals')
      SetisAdmin(false)
    }
  }


  return <>
    <main className="pt-12 p-2 md:p-8 md:pt-24">
      {data?.length == 0 ? <div className="max-w-4xl justify-centre md:space-y-4">
        <div className="md:pl-[30vw] space-y-2 ">
          <Input onChange={(e) => SetUsername(e.target.value)} type="text" placeholder="Enter Admin Username" />
          <Input onChange={(e) => SetPassword(e.target.value)} type="password" placeholder="Enter Password" />
        </div>
        <div className="pl-[35vw] md:pl-[40vw] pt-2">
          {loading ?
            <>            <div role="status" className="ml-1">
              {/*  @ts-ignore */}
              <svg aria-hidden="true" class="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
              </svg>
            </div>
            </>
            : <Button className="bg-green-400 hover:bg-text-green-700 text-slate-900" onClick={adminLogin}>Verify</Button>}
        </div>

      </div>
        : ''
      }
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
      <h3 className="p-2 text-green-700">Registered Peoples List</h3>
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
                {Object.entries(item).map(([key, value]: any) => (
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

