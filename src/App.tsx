import React, { useState, useEffect } from 'react';
import { InvoiceForm } from './components/InvoiceForm';
import { InvoicePreview } from './components/InvoicePreview';
import { useInvoiceExport } from './hooks/useInvoiceExport';
import { InvoiceData } from './types/invoice';
import { FileText, Download, Image, Eye, EyeOff } from 'lucide-react';

function App() {
  const [invoiceData, setInvoiceData] = useState<InvoiceData>({
    invoiceNumber: 'INV-001',
    date: new Date().toISOString().split('T')[0],
    dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    type: 'standard',
    
    companyName: 'Your Company Name',
    companyAddress: '123 Business Street\nCity, State 12345',
    companyEmail: 'hello@company.com',
    companyPhone: '+1 (555) 123-4567',
    
    clientName: 'Client Name',
    clientAddress: '456 Client Avenue\nClient City, State 67890',
    clientEmail: 'client@email.com',
    clientPhone: '+1 (555) 987-6543',
    
    items: [
      {
        id: '1',
        description: 'LPG Cylinder 14.2 KG',
        quantity: 1,
        price: 850,
        total: 850,
      },
    ],
    
    subtotal: 850,
    taxRate: 18,
    taxAmount: 153,
    discountRate: 0,
    discountAmount: 0,
    total: 1003,
    
    notes: 'Thank you for your business!',
    paymentTerms: 'Payment is due within 30 days.',
  });

  const [showPreview, setShowPreview] = useState(false);
  const [pendingExport, setPendingExport] = useState<'pdf' | 'image' | null>(null);
  const { exportToPDF, exportToImage } = useInvoiceExport();

  useEffect(() => {
    if (pendingExport && showPreview) {
      // Small delay to ensure DOM is updated
      setTimeout(() => {
        if (pendingExport === 'pdf') {
          exportToPDF(invoiceData.invoiceNumber);
        } else if (pendingExport === 'image') {
          exportToImage(invoiceData.invoiceNumber);
        }
        setPendingExport(null);
      }, 100);
    }
  }, [pendingExport, showPreview, exportToPDF, exportToImage, invoiceData.invoiceNumber]);

  const handleExportPDF = () => {
    if (!showPreview) {
      setShowPreview(true);
      setPendingExport('pdf');
    } else {
      exportToPDF(invoiceData.invoiceNumber);
    }
  };

  const handleExportImage = () => {
    if (!showPreview) {
      setShowPreview(true);
      setPendingExport('image');
    } else {
      exportToImage(invoiceData.invoiceNumber);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <FileText className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-gray-900">Invoice Generator</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                {showPreview ? 'Hide Preview' : 'Show Preview'}
              </button>
              
              <button
                onClick={handleExportImage}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Image className="w-4 h-4" />
                Export PNG
              </button>
              
              <button
                onClick={handleExportPDF}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Download className="w-4 h-4" />
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className={`grid gap-8 ${showPreview ? 'lg:grid-cols-2' : 'lg:grid-cols-1 max-w-4xl mx-auto'}`}>
          {/* Form */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Invoice Information</h2>
            <InvoiceForm data={invoiceData} onChange={setInvoiceData} />
          </div>

          {/* Preview */}
          {showPreview && (
            <div className="lg:sticky lg:top-8 lg:h-fit">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Preview</h2>
              <div className="max-h-[80vh] overflow-y-auto rounded-xl shadow-lg">
                <InvoicePreview data={invoiceData} />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;