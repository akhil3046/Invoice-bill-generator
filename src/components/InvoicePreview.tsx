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
      case 'fuel-bill': return 'Fuel Bill';
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

  const renderFuelBill = () => (
    <div className="bg-white p-4 font-mono text-sm max-w-sm mx-auto border">
      <div className="text-center border-b border-gray-400 pb-3 mb-3">
        <h1 className="text-base font-bold">{data.companyName || 'Your Fuel Station'}</h1>
        <p className="text-xs">{data.companyAddress || '123 Fuel Lane, Petrolville'}</p>
        <p className="text-xs">GST: {data.companyPhone || 'YOUR-GST-NO'}</p>
      </div>

      <div className="space-y-1 text-xs mb-3">
        <div className="flex justify-between">
          <span>Receipt No:</span>
          <span>{data.invoiceNumber}</span>
        </div>
        <div className="flex justify-between">
          <span>Date:</span>
          <span>{formatDate(data.date)}</span>
        </div>
        <div className="flex justify-between">
          <span>Time:</span>
          <span>{formatTime()}</span>
        </div>
      </div>

      <div className="border-t border-b border-gray-400 py-2 mb-3">
        <div className="flex justify-between text-xs">
          <span>Product:</span>
          <span>{data.items[0]?.description || 'Fuel'}</span>
        </div>
        <div className="flex justify-between text-xs">
          <span>Quantity:</span>
          <span>{data.items[0]?.quantity || 1}.00 LTR</span>
        </div>
        <div className="flex justify-between text-xs">
          <span>Rate/Ltr:</span>
          <span>₹{data.items[0]?.price || 100.00}</span>
        </div>
      </div>

      <div className="space-y-1 text-xs">
        <div className="flex justify-between">
          <span>Subtotal:</span>
          <span>₹{data.subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span>Tax @ {data.taxRate}%:</span>
          <span>₹{data.taxAmount.toFixed(2)}</span>
        </div>
        <div className="flex justify-between font-bold border-t border-gray-400 pt-1">
          <span>Total:</span>
          <span>₹{data.total.toFixed(2)}</span>
        </div>
      </div>

      <div className="text-center mt-3 pt-3 border-t border-dashed border-gray-400">
        <p className="text-xs">Thank you for your purchase!</p>
        <p className="text-xs">Drive Safe</p>
      </div>
    </div>
  );

  const renderStandardInvoice = () => (
    <div className="bg-white p-8 shadow-lg max-w-4xl mx-auto">
      <header className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">{getInvoiceTitle()}</h1>
          <p className="text-gray-500">Invoice #{data.invoiceNumber}</p>
        </div>
        <div className="text-right">
          <h2 className="text-2xl font-bold text-gray-800">{data.companyName}</h2>
          <pre className="text-gray-500">{data.companyAddress}</pre>
          <p className="text-gray-500">{data.companyEmail}</p>
          <p className="text-gray-500">{data.companyPhone}</p>
        </div>
      </header>

      <section className="flex justify-between mb-8">
        <div>
          <h3 className="text-lg font-bold text-gray-800 mb-2">Bill To:</h3>
          <p className="font-bold text-gray-700">{data.clientName}</p>
          <pre className="text-gray-500">{data.clientAddress}</pre>
          <p className="text-gray-500">{data.clientEmail}</p>
          <p className="text-gray-500">{data.clientPhone}</p>
        </div>
        <div className="text-right">
          <p><span className="font-bold text-gray-700">Date of Issue:</span> {formatDate(data.date)}</p>
          <p><span className="font-bold text-gray-700">Due Date:</span> {formatDate(data.dueDate)}</p>
        </div>
      </section>

      <section className="mb-8">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-100">
              <th className="text-left py-2 px-4 font-bold text-gray-700">Description</th>
              <th className="text-center py-2 px-4 font-bold text-gray-700">Quantity</th>
              <th className="text-right py-2 px-4 font-bold text-gray-700">Price</th>
              <th className="text-right py-2 px-4 font-bold text-gray-700">Total</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map(item => (
              <tr key={item.id} className="border-b">
                <td className="py-2 px-4">{item.description}</td>
                <td className="text-center py-2 px-4">{item.quantity}</td>
                <td className="text-right py-2 px-4">₹{item.price.toFixed(2)}</td>
                <td className="text-right py-2 px-4">₹{item.total.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      <section className="flex justify-end mb-8">
        <div className="w-1/3">
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Subtotal</span>
            <span className="text-gray-800">₹{data.subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Discount ({data.discountRate}%)</span>
            <span className="text-red-500">-₹{data.discountAmount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span className="text-gray-700">Tax ({data.taxRate}%)</span>
            <span className="text-gray-800">₹{data.taxAmount.toFixed(2)}</span>
          </div>
          <div className="border-t my-2"></div>
          <div className="flex justify-between font-bold text-lg">
            <span className="text-gray-800">Total</span>
            <span className="text-gray-800">₹{data.total.toFixed(2)}</span>
          </div>
        </div>
      </section>

      <footer className="text-gray-500">
        <h4 className="font-bold text-gray-700 mb-2">Notes</h4>
        <pre className="mb-4">{data.notes}</pre>
        <h4 className="font-bold text-gray-700 mb-2">Payment Terms</h4>
        <pre>{data.paymentTerms}</pre>
      </footer>
    </div>
  );

  const renderContent = () => {
    switch (data.type) {
      case 'gas-bill':
        return renderGasBill();
      case 'petrol-bill':
        return renderPetrolBill();
      case 'restaurant-bill':
        return renderRestaurantBill();
      case 'fuel-bill':
        return renderFuelBill();
      default:
        return renderStandardInvoice();
    }
  };

  return <div id="invoice-preview">{renderContent()}</div>;
};