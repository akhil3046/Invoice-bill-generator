import React from 'react';
import { InvoiceData, InvoiceItem } from '../types/invoice';
import { Plus, Trash2 } from 'lucide-react';

interface InvoiceFormProps {
  data: InvoiceData;
  onChange: (data: InvoiceData) => void;
}

export const InvoiceForm: React.FC<InvoiceFormProps> = ({ data, onChange }) => {
  const updateField = (field: keyof InvoiceData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Date.now().toString(),
      description: '',
      quantity: 1,
      price: 0,
      total: 0,
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    const updatedItems = data.items.map(item => {
      if (item.id === id) {
        const updatedItem = { ...item, [field]: value };
        if (field === 'quantity' || field === 'price') {
          updatedItem.total = updatedItem.quantity * updatedItem.price;
        }
        return updatedItem;
      }
      return item;
    });
    
    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    const discountAmount = subtotal * (data.discountRate / 100);
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = taxableAmount * (data.taxRate / 100);
    const total = taxableAmount + taxAmount;
    
    onChange({
      ...data,
      items: updatedItems,
      subtotal,
      discountAmount,
      taxAmount,
      total,
    });
  };

  const removeItem = (id: string) => {
    const updatedItems = data.items.filter(item => item.id !== id);
    const subtotal = updatedItems.reduce((sum, item) => sum + item.total, 0);
    const discountAmount = subtotal * (data.discountRate / 100);
    const taxableAmount = subtotal - discountAmount;
    const taxAmount = taxableAmount * (data.taxRate / 100);
    const total = taxableAmount + taxAmount;
    
    onChange({
      ...data,
      items: updatedItems,
      subtotal,
      discountAmount,
      taxAmount,
      total,
    });
  };

  const updateTaxRate = (rate: number) => {
    const discountAmount = data.subtotal * (data.discountRate / 100);
    const taxableAmount = data.subtotal - discountAmount;
    const taxAmount = taxableAmount * (rate / 100);
    const total = taxableAmount + taxAmount;
    
    onChange({
      ...data,
      taxRate: rate,
      taxAmount,
      total,
    });
  };

  const updateDiscountRate = (rate: number) => {
    const discountAmount = data.subtotal * (rate / 100);
    const taxableAmount = data.subtotal - discountAmount;
    const taxAmount = taxableAmount * (data.taxRate / 100);
    const total = taxableAmount + taxAmount;
    
    onChange({
      ...data,
      discountRate: rate,
      discountAmount,
      taxAmount,
      total,
    });
  };

  return (
    <div className="space-y-8">
      {/* Invoice Header */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Details</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Invoice Number
              </label>
              <input
                type="text"
                value={data.invoiceNumber}
                onChange={(e) => updateField('invoiceNumber', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="INV-001"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date
              </label>
              <input
                type="date"
                value={data.date}
                onChange={(e) => updateField('date', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={data.dueDate}
                onChange={(e) => updateField('dueDate', e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Invoice Type</h3>
          <select
            value={data.type}
            onChange={(e) => updateField('type', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="standard">Standard Invoice</option>
            <option value="service">Service Bill</option>
            <option value="product">Product Invoice</option>
            <option value="freelance">Freelance Invoice</option>
            <option value="gas-bill">Indian Gas Bill</option>
            <option value="petrol-bill">Indian Petrol Bill</option>
            <option value="restaurant-bill">Restaurant Bill</option>
          </select>
        </div>
      </div>

      {/* Company & Client Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Company</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={data.companyName}
              onChange={(e) => updateField('companyName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Company Name"
            />
            <textarea
              value={data.companyAddress}
              onChange={(e) => updateField('companyAddress', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Company Address"
            />
            <input
              type="email"
              value={data.companyEmail}
              onChange={(e) => updateField('companyEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="company@email.com"
            />
            <input
              type="tel"
              value={data.companyPhone}
              onChange={(e) => updateField('companyPhone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Phone Number"
            />
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Bill To</h3>
          <div className="space-y-4">
            <input
              type="text"
              value={data.clientName}
              onChange={(e) => updateField('clientName', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Client Name"
            />
            <textarea
              value={data.clientAddress}
              onChange={(e) => updateField('clientAddress', e.target.value)}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Client Address"
            />
            <input
              type="email"
              value={data.clientEmail}
              onChange={(e) => updateField('clientEmail', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="client@email.com"
            />
            <input
              type="tel"
              value={data.clientPhone}
              onChange={(e) => updateField('clientPhone', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Phone Number"
            />
          </div>
        </div>
      </div>

      {/* Invoice Items */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Items</h3>
          <button
            onClick={addItem}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Add Item
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 px-4 py-3 text-left">Description</th>
                <th className="border border-gray-300 px-4 py-3 text-center w-24">Qty</th>
                <th className="border border-gray-300 px-4 py-3 text-right w-32">Price</th>
                <th className="border border-gray-300 px-4 py-3 text-right w-32">Total</th>
                <th className="border border-gray-300 px-4 py-3 text-center w-16"></th>
              </tr>
            </thead>
            <tbody>
              {data.items.map((item) => (
                <tr key={item.id}>
                  <td className="border border-gray-300 px-4 py-3">
                    <input
                      type="text"
                      value={item.description}
                      onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                      className="w-full px-2 py-1 border border-gray-200 rounded focus:ring-1 focus:ring-blue-500"
                      placeholder="Item description"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    <input
                      type="number"
                      value={item.quantity}
                      onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 border border-gray-200 rounded text-center focus:ring-1 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-3">
                    <input
                      type="number"
                      value={item.price}
                      onChange={(e) => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                      className="w-full px-2 py-1 border border-gray-200 rounded text-right focus:ring-1 focus:ring-blue-500"
                      min="0"
                      step="0.01"
                    />
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-right font-medium">
                    ₹{item.total.toFixed(2)}
                  </td>
                  <td className="border border-gray-300 px-4 py-3 text-center">
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700 p-1"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Totals and Additional Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Information</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Notes
              </label>
              <textarea
                value={data.notes}
                onChange={(e) => updateField('notes', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Additional notes..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Terms
              </label>
              <textarea
                value={data.paymentTerms}
                onChange={(e) => updateField('paymentTerms', e.target.value)}
                rows={2}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Payment terms and conditions..."
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Totals</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-700">Subtotal:</span>
              <span className="font-medium">₹{data.subtotal.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between items-center">
              <label className="text-gray-700">
                Discount:
                <input
                  type="number"
                  value={data.discountRate}
                  onChange={(e) => updateDiscountRate(parseFloat(e.target.value) || 0)}
                  className="ml-2 w-16 px-2 py-1 border border-gray-300 rounded text-center"
                  min="0"
                  max="100"
                  step="0.1"
                />
                %
              </label>
              <span className="font-medium text-red-600">-₹{data.discountAmount.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-gray-700">
                Tax:
                <input
                  type="number"
                  value={data.taxRate}
                  onChange={(e) => updateTaxRate(parseFloat(e.target.value) || 0)}
                  className="ml-2 w-16 px-2 py-1 border border-gray-300 rounded text-center"
                  min="0"
                  max="100"
                  step="0.1"
                />
                %
              </label>
              <span className="font-medium">₹{data.taxAmount.toFixed(2)}</span>
            </div>

            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Total:</span>
                <span>₹{data.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};