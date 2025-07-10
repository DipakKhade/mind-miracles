import { Card, CardContent } from "@/components/ui/card"
import { Phone, Mail } from "lucide-react"

interface InvoiceItem {
  description: string
  price: number
}

interface InvoiceProps {
  // Company Details
  companyName?: string
  companyPhone?: string
  companyEmail?: string
  companyLogo?: string

  // Invoice Details
  invoiceNumber?: string
  invoiceDate?: string

  // Recipient Details
  recipientName?: string
  recipientPhone?: string
  recipientEmail?: string

  // Items and Pricing
  items?: InvoiceItem[]
  taxRate?: number
  taxLabel?: string

  // Payment Details
  paymentMethod?: string
  transactionId?: string
  gstin?: string

  // Additional
  amountInWords?: string
}

export function Invoice({
  companyName = "Mind Miracles",
  companyPhone = "+91-779-808-2219",
  companyEmail = "mindmiracles1707@gmail.com",
  companyLogo = "/mind_miracles_logo.png",
  invoiceNumber = "38894",
  invoiceDate = "28 Jul 2024",
  recipientName = "Dipak Khade",
  recipientPhone = "8999105272",
  recipientEmail = "dipakhade214@gmail.com",
  items = [
    {
      description: "Complete Web3/Blockchain Cohort",
      price: 3615.25,
    },
  ],
  taxRate = 18,
  taxLabel = "IGST",
  paymentMethod = "Online",
  transactionId = "pay_OdvNA2yvyZwZto_COHORT2-HALF",
  gstin = "03ASDPK6910E1Z8",
  amountInWords = "Four Thousand Two Hundred And Sixty Six Rupees",
}: InvoiceProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0)
  const taxAmount = (subtotal * taxRate) / 100
  const total = subtotal + taxAmount

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="bg-white shadow-lg">
        <CardContent className="p-8">
          {/* Header Section */}
          <div className="flex justify-between items-start mb-12">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-green-600">{companyName}</h1>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span>{companyPhone}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-green-600" />
                  <span>{companyEmail}</span>
                </div>
              </div>
            </div>

            <div className="text-right space-y-4">
              <div className="w-20 h-20 rounded-full overflow-hidden flex items-center justify-center">
                <img
                  src={companyLogo || "/placeholder.svg"}
                  alt="Company Logo"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Invoice</h2>
              </div>
            </div>
          </div>

          {/* Recipient and Invoice Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div>
              <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide mb-3">RECIPIENT</h3>
              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-gray-800">{recipientName}</h4>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Phone className="h-4 w-4 text-green-600" />
                  <span>{recipientPhone}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-600">
                  <Mail className="h-4 w-4 text-green-600" />
                  <span>{recipientEmail}</span>
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">INVOICE NO.</p>
                  <p className="text-xl font-bold text-gray-800">{invoiceNumber}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500 uppercase tracking-wide">INVOICE DATE</p>
                  <p className="text-lg font-semibold text-gray-800">{invoiceDate}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-4 py-4 border-b border-gray-200">
              <div>
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">ITEM DESCRIPTION</h3>
              </div>
              <div className="text-right">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">PRICE</h3>
              </div>
            </div>

            {items.map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-4 py-4 border-b border-gray-100">
                <div>
                  <p className="text-gray-800 font-medium">{item.description}</p>
                </div>
                <div className="text-right">
                  <p className="text-gray-800">
                    Rs. {item.price.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                  </p>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4 py-4 border-b border-gray-100">
              <div>
                <p className="text-gray-800">
                  {taxLabel} ({taxRate} %)
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-800">Rs. {taxAmount.toLocaleString("en-IN", { minimumFractionDigits: 2 })}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6">
              <div>
                <p className="text-xl font-bold text-gray-800">TOTAL</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">
                  Rs. {total.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="space-y-6 mb-8">
            <div>
              <p className="text-sm text-gray-500 mb-1">Amount in Words</p>
              <p className="text-lg font-semibold text-gray-800">{amountInWords}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">PAYMENT METHOD</p>
                <p className="text-gray-800 font-medium">{paymentMethod}</p>
              </div>

              <div>
                <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">GSTIN</p>
                <p className="text-gray-800 font-medium">{gstin}</p>
              </div>
            </div>

            <div>
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-1">TRANSACTION ID</p>
              <p className="text-gray-800 font-mono text-sm">{transactionId}</p>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="text-right mb-6">
            <p className="text-lg font-semibold text-gray-700">Thanks for choosing us!</p>
          </div>
        </CardContent>

        {/* Footer */}
        <div className="bg-green-600 text-white text-center py-4">
          <p className="text-sm">This is a computer generated invoice. No signature required.</p>
        </div>
      </Card>
    </div>
  )
}
