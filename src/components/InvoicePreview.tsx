import React from 'react';
import { InvoiceData } from '../types/invoice';

interface InvoicePreviewProps {
  data: InvoiceData;
}

export const InvoicePreview: React.FC<InvoicePreviewProps> = ({ data }) => {
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const formatTime = () => {
    return new Date().toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const getInvoiceTitle = () => {
    switch (data.type) {
      case 'service': return 'Service Bill';
      case 'product': return 'Product Invoice';
      case 'freelance': return 'Freelance Invoice';
      case 'gas-bill': return 'Gas Bill';
      case 'petrol-bill': return 'Fuel Receipt';
      case 'restaurant-bill': return 'Restaurant Bill';
      default: return 'Invoice';
    }
  };

  // Gas Bill Template
  const renderGasBill = () => (
    <div className="bg-white p-6 font-mono text-sm max-w-md mx-auto border">
      <div className="text-center border-b-2 border-dashed border-gray-400 pb-4 mb-4">
        <h1 className="text-lg font-bold">{data.companyName || 'INDIAN GAS CORPORATION'}</h1>
        <p className="text-xs">DOMESTIC LPG CONSUMER BILL</p>
        <p className="text-xs">GST REG: 07AAACI1681G1ZM</p>
      </div>

      <div className="space-y-1 text-xs mb-4">
        <div className="flex justify-between">
          <span>CONSUMER NO:</span>
          <span>{data.invoiceNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>BILL DATE:</span>
          <span>{formatDate(data.date)}</span>
        </div>
        <div className="flex justify-between">
          <span>DUE DATE:</span>
          <span>{formatDate(data.dueDate)}</span>
        </div>
      </div>

      <div className="border-t border-b border-gray-400 py-2 mb-4">
        <p className="text-xs font-bold">CONSUMER DETAILS:</p>
        <p className="text-xs">{data.clientName}</p>
        <p className="text-xs">{data.clientAddress}</p>
      </div>

      <div className="space-y-1 text-xs mb-4">
        <div className="flex justify-between">
          <span>CYLINDER SIZE:</span>
          <span>14.2 KG</span>
        </div>
        <div className="flex justify-between">
          <span>QUANTITY:</span>
          <span>{data.items[0]?.quantity || 1} CYLINDER(S)</span>
        </div>
        <div className="flex justify-between">
          <span>RATE PER CYLINDER:</span>
          <span>₹{data.items[0]?.price || 850}.00</span>
        </div>
      </div>

      <div className="border-t border-gray-400 pt-2 space-y-1 text-xs">
        <div className="flex justify-between">
          <span>BASIC AMOUNT:</span>
          <span>₹{data.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>GST @ {data.taxRate}%:</span>
          <span>₹{data.taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold border-t border-gray-400 pt-1">
          <span>TOTAL AMOUNT:</span>
          <span>₹{data.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center mt-4 pt-4 border-t-2 border-dashed border-gray-400">
        <p className="text-xs">PAYMENT MODE: CASH/ONLINE</p>
        <p className="text-xs">THANK YOU FOR USING LPG</p>
        <p className="text-xs">SAVE FUEL, SAVE NATION</p>
      </div>
    </div>
  );

  // Petrol Bill Template
  const renderPetrolBill = () => (
    <div className="bg-white p-4 font-mono text-sm max-w-sm mx-auto border">
      <div className="text-center border-b border-gray-400 pb-3 mb-3">
        <h1 className="text-base font-bold">{data.companyName || 'BHARAT PETROLEUM'}</h1>
        <p className="text-xs">FUEL STATION</p>
        <p className="text-xs">{data.companyAddress || 'Highway Road, Mumbai'}</p>
        <p className="text-xs">GST: 27AAACB2902A1Z8</p>
      </div>

      <div className="space-y-1 text-xs mb-3">
        <div className="flex justify-between">
          <span>RECEIPT NO:</span>
          <span>{data.invoiceNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>DATE:</span>
          <span>{formatDate(data.date)}</span>
        </div>
        <div className="flex justify-between">
          <span>TIME:</span>
          <span>{formatTime()}</span>
        </div>
        <div className="flex justify-between">
          <span>PUMP NO:</span>
          <span>03</span>
        </div>
        <div className="flex justify-between">
          <span>NOZZLE:</span>
          <span>A</span>
        </div>
      </div>

      <div className="border-t border-b border-gray-400 py-2 mb-3">
        <div className="flex justify-between text-xs">
          <span>PRODUCT:</span>
          <span>{data.items[0]?.description || 'PETROL'}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span>QUANTITY:</span>
          <span>{data.items[0]?.quantity || 10}.00 LTR</span>
        </div>
        <div className="flex justify-between text-xs">
          <span>RATE/LTR:</span>
          <span>₹{data.items[0]?.price || 103.50}</span>
        </div>
      </div>

      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>BASIC AMOUNT:</span>
          <span>₹{data.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>GST @ {data.taxRate}%:</span>
          <span>₹{data.taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold border-t border-gray-400 pt-1">
          <span>TOTAL:</span>
          <span>₹{data.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center mt-3 pt-3 border-t border-dashed border-gray-400">
        <p className="text-xs">PAYMENT: CASH</p>
        <p className="text-xs">CUSTOMER COPY</p>
        <p className="text-xs">DRIVE SAFE</p>
      </div>
    </div>
  );

  // Restaurant Bill Template
  const renderRestaurantBill = () => (
    <div className="bg-white p-4 font-mono text-sm max-w-sm mx-auto border">
      <div className="text-center border-b border-gray-400 pb-3 mb-3">
        <h1 className="text-base font-bold">{data.companyName || 'SPICE GARDEN RESTAURANT'}</h1>
        <p className="text-xs">{data.companyAddress || 'MG Road, Bangalore'}</p>
        <p className="text-xs">Ph: {data.companyPhone || '+91-80-12345678'}</p>
        <p className="text-xs">GSTIN: 29AAACR4849N1ZX</p>
      </div>

      <div className="space-y-1 text-xs mb-3">
        <div className="flex justify-between">
          <span>BILL NO:</span>
          <span>{data.invoiceNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>DATE:</span>
          <span>{formatDate(data.date)}</span>
        </div>
        <div className="flex justify-between">
          <span>TIME:</span>
          <span>{formatTime()}</span>
        </div>
        <div className="flex justify-between">
          <span>TABLE:</span>
          <span>A-05</span>
        </div>
        <div className="flex justify-between">
          <span>GUESTS:</span>
          <span>2</span>
        </div>
        <div className="flex justify-between">
          <span>SERVER:</span>
          <span>RAVI</span>
        </div>
      </div>

      <div className="border-t border-b border-gray-400 py-2 mb-3">
        <div className="text-xs font-bold mb-1">ITEM DETAILS:</div>
        {data.items.map((item, index) => (
          <div key={index} className="space-y-1 mb-2">
            <div className="flex justify-between">
              <span className="text-xs">{item.description}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs">{item.quantity} x ₹{item.price.toFixed(2)}</span>
              <span className="text-xs">₹{item.total.toFixed(2)}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>SUB TOTAL:</span>
          <span>₹{data.subtotal.toFixed(2)}</span>
        </div>
        {data.discountAmount > 0 && (
          <div className="flex justify-between">
            <span>DISCOUNT:</span>
            <span>-₹{data.discountAmount.toFixed(2)}</span>
          </div>
        )}
        <div className="flex justify-between">
          <span>CGST @ {(data.taxRate/2)}%:</span>
          <span>₹{(data.taxAmount/2).toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>SGST @ {(data.taxRate/2)}%:</span>
          <span>₹{(data.taxAmount/2).toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold border-t border-gray-400 pt-1">
          <span>GRAND TOTAL:</span>
          <span>₹{data.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center mt-3 pt-3 border-t border-dashed border-gray-400">
        <p className="text-xs">PAYMENT MODE: CASH</p>
        <p className="text-xs">THANK YOU FOR DINING WITH US</p>
        <p className="text-xs">VISIT AGAIN!</p>
      </div>
    </div>
  );

  // Render appropriate template based on bill type
  if (data.type === 'gas-bill') {
    return renderGasBill();
  }
  
  if (data.type === 'petrol-bill') {
    return renderPetrolBill();
  }
  
  if (data.type === 'restaurant-bill') {
    return renderRestaurantBill();
  }

  // Standard invoice template for other types
  return (
    <div id="invoice-preview" className="bg-white p-8 shadow-lg max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b-4 border-blue-600 pb-6 mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{getInvoiceTitle()}</h1>
            <p className="text-gray-600">#{data.invoiceNumber}</p>
          </div>
          <div className="text-right">
            <h2 className="text-2xl font-bold text-blue-600 mb-2">{data.companyName}</h2>
            {data.companyAddress && (
              <div className="text-gray-600 whitespace-pre-line text-sm">
                {data.companyAddress}
              </div>
            )}
            <div className="text-gray-600 text-sm mt-2">
              {data.companyEmail && <div>{data.companyEmail}</div>}
              {data.companyPhone && <div>{data.companyPhone}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Details & Bill To */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Invoice Details
          </h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Date:</span>
              <span>{formatDate(data.date)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Due Date:</span>
              <span>{formatDate(data.dueDate)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Type:</span>
              <span className="capitalize">{data.type} Invoice</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4 border-b border-gray-200 pb-2">
            Bill To
          </h3>
          <div className="text-sm">
            <div className="font-semibold text-gray-900 mb-2">{data.clientName}</div>
            {data.clientAddress && (
              <div className="text-gray-600 whitespace-pre-line mb-2">
                {data.clientAddress}
              </div>
            )}
            <div className="text-gray-600">
              {data.clientEmail && <div>{data.clientEmail}</div>}
              {data.clientPhone && <div>{data.clientPhone}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Items Table */}
      <div className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="text-left py-4 px-2 font-semibold text-gray-900">Description</th>
              <th className="text-center py-4 px-2 font-semibold text-gray-900 w-20">Qty</th>
              <th className="text-right py-4 px-2 font-semibold text-gray-900 w-32">Price</th>
              <th className="text-right py-4 px-2 font-semibold text-gray-900 w-32">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item, index) => (
              <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                <td className="py-3 px-2 border-b border-gray-200">
                  {item.description}
                </td>
                <td className="py-3 px-2 text-center border-b border-gray-200">
                  {item.quantity}
                </td>
                <td className="py-3 px-2 text-right border-b border-gray-200">
                  ₹{item.price.toFixed(2)}
                </td>
                <td className="py-3 px-2 text-right font-medium border-b border-gray-200">
                  ₹{item.total.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="flex justify-end mb-8">
        <div className="w-80">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between py-2">
              <span className="text-gray-600">Subtotal:</span>
              <span className="font-medium">₹{data.subtotal.toFixed(2)}</span>
            </div>
            
            {data.discountAmount > 0 && (
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Discount ({data.discountRate}%):</span>
                <span className="font-medium text-red-600">-₹{data.discountAmount.toFixed(2)}</span>
              </div>
            )}

            {data.taxAmount > 0 && (
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Tax ({data.taxRate}%):</span>
                <span className="font-medium">₹{data.taxAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="border-t-2 border-gray-800 pt-2 mt-4">
              <div className="flex justify-between py-2">
                <span className="text-lg font-bold text-gray-900">Total:</span>
                <span className="text-lg font-bold text-gray-900">₹{data.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Notes and Payment Terms */}
      {(data.notes || data.paymentTerms) && (
        <div className="border-t border-gray-200 pt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {data.notes && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Notes</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line">{data.notes}</p>
              </div>
            )}
            {data.paymentTerms && (
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Payment Terms</h4>
                <p className="text-sm text-gray-600 whitespace-pre-line">{data.paymentTerms}</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="border-t border-gray-200 pt-6 mt-8 text-center">
        <p className="text-sm text-gray-500">Thank you for your business!</p>
      </div>
    </div>
  );
};