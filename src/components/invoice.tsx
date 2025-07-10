import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail } from 'lucide-react';

interface InvoiceItem {
  description: string;
  price: number;
}

interface InvoiceProps {
  // Company Details
  companyName?: string;
  companyPhone?: string;
  companyEmail?: string;
  companyLogo?: string;

  // Invoice Details
  invoiceNumber?: string;
  invoiceDate?: string;

  // Recipient Details
  recipientName?: string;
  recipientPhone?: string;
  recipientEmail?: string;

  // Items and Pricing
  items?: InvoiceItem[];
  taxRate?: number;
  taxLabel?: string;

  // Payment Details
  paymentMethod?: string;
  transactionId?: string;
  gstin?: string;

  // Additional
  amountInWords?: string;
}

export function Invoice({
  companyName = 'Mind Miracles',
  companyPhone = '+91-779-808-2219',
  companyEmail = 'mindmiracles1707@gmail.com',
  companyLogo = '/mind_miracles_logo.png',
  invoiceNumber = '38894',
  invoiceDate = '28 Jul 2024',
  recipientName = 'Dipak Khade',
  recipientPhone = '8999105272',
  recipientEmail = 'dipakhade214@gmail.com',
  items = [
    {
      description: 'Complete Web3/Blockchain Cohort',
      price: 3615.25,
    },
  ],
  taxRate = 18,
  taxLabel = 'IGST',
  paymentMethod = 'Online',
  transactionId = 'pay_OdvNA2yvyZwZto_COHORT2-HALF',
  gstin = '03ASDPK6910E1Z8',
  amountInWords = 'Four Thousand Two Hundred And Sixty Six Rupees',
}: InvoiceProps) {
  const subtotal = items.reduce((sum, item) => sum + item.price, 0);
  const taxAmount = (subtotal * taxRate) / 100;
  const total = subtotal + taxAmount;

  return (
    <div className="mx-auto max-w-2xl p-6">
      <Card className="bg-white shadow-lg">
        <CardContent className="p-8">
          {/* Header Section */}
          <div className="mb-12 flex items-start justify-between">
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-green-600">
                {companyName}
              </h1>
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

            <div className="space-y-4 text-right">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full">
                <img
                  src={companyLogo || '/placeholder.svg'}
                  alt="Company Logo"
                  className="h-full w-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">Invoice</h2>
              </div>
            </div>
          </div>

          {/* Recipient and Invoice Details */}
          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-3 text-sm font-semibold uppercase tracking-wide text-gray-500">
                RECIPIENT
              </h3>
              <div className="space-y-2">
                <h4 className="text-xl font-semibold text-gray-800">
                  {recipientName}
                </h4>
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
                  <p className="text-sm uppercase tracking-wide text-gray-500">
                    INVOICE NO.
                  </p>
                  <p className="text-xl font-bold text-gray-800">
                    {invoiceNumber}
                  </p>
                </div>
                <div>
                  <p className="text-sm uppercase tracking-wide text-gray-500">
                    INVOICE DATE
                  </p>
                  <p className="text-lg font-semibold text-gray-800">
                    {invoiceDate}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Items Table */}
          <div className="mb-8">
            <div className="grid grid-cols-2 gap-4 border-b border-gray-200 py-4">
              <div>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  ITEM DESCRIPTION
                </h3>
              </div>
              <div className="text-right">
                <h3 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                  PRICE
                </h3>
              </div>
            </div>

            {items.map((item, index) => (
              <div
                key={index}
                className="grid grid-cols-2 gap-4 border-b border-gray-100 py-4"
              >
                <div>
                  <p className="font-medium text-gray-800">
                    {item.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-gray-800">
                    Rs.{' '}
                    {item.price.toLocaleString('en-IN', {
                      minimumFractionDigits: 2,
                    })}
                  </p>
                </div>
              </div>
            ))}

            <div className="grid grid-cols-2 gap-4 border-b border-gray-100 py-4">
              <div>
                <p className="text-gray-800">
                  {taxLabel} ({taxRate} %)
                </p>
              </div>
              <div className="text-right">
                <p className="text-gray-800">
                  Rs.{' '}
                  {taxAmount.toLocaleString('en-IN', {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-6">
              <div>
                <p className="text-xl font-bold text-gray-800">TOTAL</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold text-green-600">
                  Rs.{' '}
                  {total.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </p>
              </div>
            </div>
          </div>

          {/* Additional Details */}
          <div className="mb-8 space-y-6">
            <div>
              <p className="mb-1 text-sm text-gray-500">Amount in Words</p>
              <p className="text-lg font-semibold text-gray-800">
                {amountInWords}
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <p className="mb-1 text-sm uppercase tracking-wide text-gray-500">
                  PAYMENT METHOD
                </p>
                <p className="font-medium text-gray-800">{paymentMethod}</p>
              </div>

              <div>
                <p className="mb-1 text-sm uppercase tracking-wide text-gray-500">
                  GSTIN
                </p>
                <p className="font-medium text-gray-800">{gstin}</p>
              </div>
            </div>

            <div>
              <p className="mb-1 text-sm uppercase tracking-wide text-gray-500">
                TRANSACTION ID
              </p>
              <p className="font-mono text-sm text-gray-800">{transactionId}</p>
            </div>
          </div>

          {/* Thank You Message */}
          <div className="mb-6 text-right">
            <p className="text-lg font-semibold text-gray-700">
              Thanks for choosing us!
            </p>
          </div>
        </CardContent>

        {/* Footer */}
        <div className="bg-green-600 py-4 text-center text-white">
          <p className="text-sm">
            This is a computer generated invoice. No signature required.
          </p>
        </div>
      </Card>
    </div>
  );
}
