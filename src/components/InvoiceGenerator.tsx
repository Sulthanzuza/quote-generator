import React, { useState, useMemo } from 'react';
import { useForm, useWatch, Control } from 'react-hook-form';
import { FileText, Plus, Trash2, ChevronDown, ChevronUp, Download, RotateCcw, User, Building, Mail, Phone, MapPin, Package, Calculator, CreditCard, Calendar } from 'lucide-react';
import { Document, Page, Text, View, StyleSheet,Image, PDFDownloadLink } from '@react-pdf/renderer';
import { Invoice, ServiceItem, SubService } from '../types/invoice';
import { services, getServiceById, getSubServicesByServiceId, getServiceNameById, formatCurrency } from '../data/services';
import Header from './Header';
import bg from '../../Single logo with black gradient.png'
// (Your PDF styles remain the same)
const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    backgroundColor: '#ffffff',
    padding: 30,
    fontFamily: 'Helvetica',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 30,
    paddingBottom: 20,
    borderBottom: 2,
    borderBottomColor: '#3B82F6',
  },
  companyInfo: {
    flex: 1,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 5,
  },
  companyDetails: {
    fontSize: 10,
    color: '#6B7280',
    lineHeight: 1.5,
  },
  invoiceTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#3B82F6',
    textAlign: 'right',
  },
  invoiceNumber: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'right',
    marginTop: 5,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 10,
    backgroundColor: '#F3F4F6',
    padding: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  column: {
    flex: 1,
  },
  label: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#374151',
    marginBottom: 3,
  },
  value: {
    fontSize: 12,
    color: '#1F2937',
    lineHeight: 1.4,
  },
  table: {
    marginTop: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#3B82F6',
    padding: 8,
    borderRadius: 4,
  },
  tableHeaderText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
  },
  tableCell: {
    fontSize: 9,
    color: '#374151',
    textAlign: 'center',
  },
  summarySection: {
    marginTop: 20,
    alignItems: 'flex-end',
  },
  summaryTable: {
    width: 300,
    border: 1,
    borderColor: '#E5E7EB',
    borderRadius: 4,
  },
logo: {
    width: 70, // Adjust the width as needed
    height: 50, // Adjust the height as needed
    marginBottom: 10,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 8,
    borderBottom: 1,
    borderBottomColor: '#E5E7EB',
  },
  summaryLabel: {
    fontSize: 10,
    color: '#6B7280',
  },
  summaryValue: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
  },
  totalLabel: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  totalValue: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#3B82F6',
  },
  footer: {
    marginTop: 30,
    paddingTop: 20,
    borderTop: 1,
    borderTopColor: '#E5E7EB',
  },
  footerText: {
    fontSize: 9,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 1.5,
  },
});


const SubServiceChecklist: React.FC<{
  subServices: SubService[];
  selectedSubServices: string[];
  onSubServiceChange: (ids: string[]) => void;
}> = ({ subServices, selectedSubServices, onSubServiceChange }) => {
  const handleToggle = (subServiceId: string) => {
    const newSelected = selectedSubServices.includes(subServiceId)
      ? selectedSubServices.filter(id => id !== subServiceId)
      : [...selectedSubServices, subServiceId];
    onSubServiceChange(newSelected);
  };

  return (
    <div className="bg-gray-50 p-4 rounded-lg">
      <h4 className="font-medium text-gray-800 mb-3">Select Sub-services:</h4>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
        {subServices.map((subService) => (
          <label key={subService.id} className="flex items-center space-x-2 text-sm">
            <input
              type="checkbox"
              checked={selectedSubServices.includes(subService.id)}
              onChange={() => handleToggle(subService.id)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-gray-700">{subService.name}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const InvoicePDFDocument: React.FC<{ invoice: Invoice }> = ({ invoice }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.companyInfo}>
   <Image 
            style={styles.logo} 
            src={bg} 
          />
          <Text style={styles.companyName}>Aieera Future Marketing</Text>
          <Text style={styles.companyDetails}>
            Email: hello@aieera.com{'\n'}
            Phone: +91-9633752092{'\n'}
          
          </Text>
        </View>
        <View>
          <Text style={styles.invoiceTitle}>INVOICE</Text>
          <Text style={styles.invoiceNumber}>#{invoice.invoiceNumber}</Text>
        </View>
      </View>

      {/* Invoice Details */}
      <View style={styles.section}>
        <View style={styles.row}>
          <View style={styles.column}>
            <Text style={styles.label}>Invoice Date:</Text>
            <Text style={styles.value}>{new Date(invoice.invoiceDate).toLocaleDateString()}</Text>
          </View>
          <View style={styles.column}>
            <Text style={styles.label}>Due Date:</Text>
            <Text style={styles.value}>{invoice.dueDate ? new Date(invoice.dueDate).toLocaleDateString() : 'N/A'}</Text>
          </View>
        </View>
      </View>

      {/* Client Details */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bill To:</Text>
        <Text style={styles.value}>
          {invoice.client.name}{'\n'}
          {invoice.client.company}{'\n'}
          {invoice.client.address}{'\n'}
          Email: {invoice.client.email}{'\n'}
          Phone: {invoice.client.phone}
        </Text>
      </View>

      {/* Services Table */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Services</Text>
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={[styles.tableHeaderText, { flex: 3 }]}>Service</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Qty</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Rate</Text>
            <Text style={[styles.tableHeaderText, { flex: 1 }]}>Amount</Text>
          </View>
          {invoice.services.map((service, index) => {
            const serviceName = getServiceNameById(service.service);
            const itemTotal = service.quantity * service.unitPrice;
            const discountAmount = (itemTotal * service.discount) / 100;
            const finalAmount = itemTotal - discountAmount;
            
            return (
              <View key={index} style={styles.tableRow}>
                <Text style={[styles.tableCell, { flex: 3, textAlign: 'left' }]}>
                  {serviceName}
                  {service.description && `\n${service.description}`}
                </Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{service.quantity}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{formatCurrency(service.unitPrice, invoice.currency)}</Text>
                <Text style={[styles.tableCell, { flex: 1 }]}>{formatCurrency(finalAmount, invoice.currency)}</Text>
              </View>
            );
          })}
        </View>
      </View>

      {/* Summary */}
      <View style={styles.summarySection}>
        <View style={styles.summaryTable}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal:</Text>
            <Text style={styles.summaryValue}>{formatCurrency(invoice.subtotal, invoice.currency)}</Text>
          </View>
          {invoice.totalDiscount > 0 && (
            <View style={styles.summaryRow}>
              <Text style={styles.summaryLabel}>Total Discount:</Text>
              <Text style={styles.summaryValue}>-{formatCurrency(invoice.totalDiscount, invoice.currency)}</Text>
            </View>
          )}
         
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total Amount:</Text>
            <Text style={styles.totalValue}>{formatCurrency(invoice.totalAmount, invoice.currency)}</Text>
          </View>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Thank you for your business! For any questions regarding this invoice, please contact us at support@digitalreach.in
        </Text>
      </View>
    </Page>
  </Document>
);


const InvoiceGenerator: React.FC = () => {
  // This is the single source of truth for your line items.
  // Any change here will trigger a re-render.
  const [lineItems, setLineItems] = useState<ServiceItem[]>([
    {
      id: Date.now().toString(),
      service: '',
      description: '',
      selectedSubServices: [],
      quantity: 1,
      unitPrice: 0,
      discount: 0
    }
  ]);

  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);
  const [generatedInvoice, setGeneratedInvoice] = useState<Invoice | null>(null);

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<Invoice>({
    defaultValues: {
      invoiceNumber: `DRM-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      currency: 'INR',
      paymentDetails: {
        status: 'unpaid',
        method: ''
      }
    }
  });
  
  // useWatch is a great way to subscribe to changes in your form state.
  const currency = useWatch({
    control,
    name: 'currency'
  });

  // These handler functions are the only way the lineItems state is modified.
  // They ensure that state updates are predictable and centralized.
  const addLineItem = () => {
    setLineItems(prevItems => [...prevItems, {
      id: Date.now().toString(),
      service: '',
      description: '',
      selectedSubServices: [],
      quantity: 1,
      unitPrice: 0,
      discount: 0
    }]);
  };

  const removeLineItem = (id: string) => {
    if (lineItems.length > 1) {
      setLineItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  };
  
  const updateLineItem = (id: string, updatedValues: Partial<ServiceItem>) => {
    setLineItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, ...updatedValues } : item
      )
    );
  };


  const handleServiceChange = (id: string, serviceId: string) => {
    updateLineItem(id, { service: serviceId, selectedSubServices: [], description: '' });
  };

  const handleSubServiceChange = (id: string, selectedSubServices: string[]) => {
    const currentItem = lineItems.find(item => item.id === id);
    if (!currentItem) return;

    const description = selectedSubServices.map(subId => {
      const service = getServiceById(currentItem.service);
      const subService = service?.subServices.find(sub => sub.id === subId);
      return subService?.name || '';
    }).join('\n');
    
    updateLineItem(id, { selectedSubServices, description });
  };
  
  // These calculations are memoized with useMemo. This is a performance optimization.
  // It means these values will only be recalculated when `lineItems` changes,
  // not on every single render.
  const calculations = useMemo(() => {
    const subtotal = lineItems.reduce((sum, item) => sum + (item.quantity * item.unitPrice), 0);
    const totalDiscount = lineItems.reduce((sum, item) => {
      const itemSubtotal = item.quantity * item.unitPrice;
      return sum + (itemSubtotal * item.discount) / 100;
    }, 0);
    const totalAmount = subtotal - totalDiscount;

    return { subtotal, totalDiscount, totalAmount };
  }, [lineItems]);

  const calculateItemAmount = (item: ServiceItem) => {
    const subtotal = item.quantity * item.unitPrice;
    const discountAmount = (subtotal * item.discount) / 100;
    return subtotal - discountAmount;
  };


  // The onSubmit function brings everything together: the form data and the line items state.
  const onSubmit = (data: Omit<Invoice, 'services' | 'subtotal' | 'totalDiscount' | 'totalAmount'>) => {
    const invoice: Invoice = {
      ...data,
      services: lineItems,
      subtotal: calculations.subtotal,
      totalDiscount: calculations.totalDiscount,
      totalAmount: calculations.totalAmount
    };
    setGeneratedInvoice(invoice);
  };

  const handleReset = () => {
    setGeneratedInvoice(null);
    setLineItems([{
      id: Date.now().toString(),
      service: '',
      description: '',
      selectedSubServices: [],
      quantity: 1,
      unitPrice: 0,
      discount: 0
    }]);
    reset({
      invoiceNumber: `DRM-${Date.now().toString().slice(-6)}-${Math.floor(Math.random() * 100).toString().padStart(2, '0')}`,
      invoiceDate: new Date().toISOString().split('T')[0],
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    });
  };

  if (generatedInvoice) {
    // This view is shown after submission and is guaranteed to have the final, correct data.
    return (
      <div className="min-h-screen bg-gray-50 p-4">
  <Header/>
        <div className="max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
              <FileText className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Invoice Generated Successfully!
            </h2>
            <p className="text-gray-600 mb-6">
              Your invoice #{generatedInvoice.invoiceNumber} has been generated and is ready for download.
            </p>
            
            <div className="flex justify-center space-x-4 mb-8">
              <PDFDownloadLink
                document={<InvoicePDFDocument invoice={generatedInvoice} />}
                fileName={`invoice-${generatedInvoice.invoiceNumber}.pdf`}
                className="flex items-center px-6 py-3 bg-green-600 text-white font-semibold rounded-lg hover:bg-green-700 transition-colors shadow-md"
              >
                <Download className="w-5 h-5 mr-2" />
                Download PDF
              </PDFDownloadLink>
              
              <button
                onClick={handleReset}
                className="flex items-center px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
              >
                <RotateCcw className="w-5 h-5 mr-2" />
                Create New Invoice
              </button>
            </div>

            <div className="border-t pt-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4">Invoice Summary</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div><strong>Client:</strong> {generatedInvoice.client.name}</div>
                  <div><strong>Amount:</strong> {formatCurrency(generatedInvoice.totalAmount, generatedInvoice.currency)}</div>
                  <div><strong>Services:</strong> {generatedInvoice.services.length} item(s)</div>
    _                <div><strong>Status:</strong> {generatedInvoice.paymentDetails.status}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    // The main form UI. Because it reads from the same state that the handlers update,
    // it's always showing the current data.
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        <Header />
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-600" />
                  Client Details
                </h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Client Name *</label>
                    <input
                      type="text"
                      {...register('client.name', { required: 'Client name is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter client name"
                    />
                    {errors.client?.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.client.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Company Name *</label>
                    <input
                      type="text"
                      {...register('client.company', { required: 'Company name is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter company name"
                    />
                    {errors.client?.company && (
                      <p className="mt-1 text-sm text-red-600">{errors.client.company.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      {...register('client.email', { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter email address"
                    />
                    {errors.client?.email && (
                      <p className="mt-1 text-sm text-red-600">{errors.client.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone *</label>
                    <input
                      type="tel"
                      {...register('client.phone', { required: 'Phone number is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter phone number"
                    />
                    {errors.client?.phone && (
                      <p className="mt-1 text-sm text-red-600">{errors.client.phone.message}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Billing Address *</label>
                    <textarea
                      {...register('client.address', { required: 'Billing address is required' })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter complete billing address"
                    />
                    {errors.client?.address && (
                      <p className="mt-1 text-sm text-red-600">{errors.client.address.message}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <Package className="w-5 h-5 mr-2 text-blue-600" />
                    Service Line Items
                  </h2>
                  <button
                    type="button"
                    onClick={addLineItem}
                    className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Plus className="w-4 h-4 mr-2" />
            _        Add Service
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rate</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {lineItems.map((item) => (
                        <React.Fragment key={item.id}>
                          <tr className="hover:bg-gray-50 transition-colors cursor-pointer" onClick={() => toggleExpand(item.id)}>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm font-medium text-gray-900">
                                <select
                                  value={item.service}
                    _               onChange={(e) => handleServiceChange(item.id, e.target.value)}
                                  className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                  onClick={(e) => e.stopPropagation()}
                                >
                                  <option value="">Select a service</option>
                                  {services.map((service) => (
                                    <option key={service.id} value={service.id}>
                                      {service.name}
                                    </option>
                                  ))}
                                </select>
                                {item.description && (
                                  <div className="text-sm text-gray-600 mt-1 break-words" style={{ maxWidth: '10cm', whiteSpace: 'pre-line' }}>
                                    {item.description}
                                  </div>
                                )}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateLineItem(item.id, { quantity: parseInt(e.target.value) || 0 })}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onClick={(e) => e.stopPropagation()}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <input
                                type="number"
                                min="0"
                                step="0.01"
                                value={item.unitPrice}
                                onChange={(e) => updateLineItem(item.id, { unitPrice: parseFloat(e.target.value) || 0 })}
                                className="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                onClick={(e) => e.stopPropagation()}
                                placeholder={`0.00 ${currency}`}
                              />
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {formatCurrency(calculateItemAmount(item), currency)}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeLineItem(item.id);
                                }}
              _                  className="text-red-600 hover:text-red-900 transition-colors"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            </td>
                          </tr>
                          {expandedItemId === item.id && item.service && (
                            <tr>
                              <td colSpan={5} className="px-6 py-4">
                                <SubServiceChecklist
                                  subServices={getSubServicesByServiceId(item.service)}
                                  selectedSubServices={item.selectedSubServices}
                                  onSubServiceChange={(ids) => handleSubServiceChange(item.id, ids)}
                                />
                              </td>
                            </tr>
                          )}
                        </React.Fragment>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Payment Details */}
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                  <CreditCard className="w-5 h-5 mr-2 text-blue-600" />
                  Payment & Invoice Details
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Invoice Date *</label>
                    <input
                      type="date"
                      {...register('invoiceDate', { required: 'Invoice date is required' })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                    <input
                      type="date"
                      {...register('dueDate')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Currency</label>
                    <select
                      {...register('currency')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="INR">INR (Indian Rupee)</option>
                      <option value="AED">AED (UAE Dirham)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <select
                      {...register('paymentDetails.method')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Select payment method</option>
                      <option value="UPI">UPI</option>
                      <option value="Bank Transfer">Bank Transfer</option>
                      <option value="Razorpay">Razorpay</option>
                      <option value="Stripe">Stripe</option>
                      <option value="Cash">Cash</option>
                      <option value="Cheque">Cheque</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Status</label>
                    <select
                      {...register('paymentDetails.status')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="unpaid">Unpaid</option>
                      <option value="paid">Paid</option>
                      <option value="partial">Partial</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Transaction ID</label>
                    <input
                      type="text"
                      {...register('paymentDetails.transactionId')}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter transaction ID (if available)"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                    <textarea
                      {...register('notes')}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Add any additional notes or special instructions..."
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Invoice Summary */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <div className="bg-white p-6 rounded-lg shadow-md">
                  <h2 className="text-xl font-semibold text-gray-800 mb-4 flex items-center">
                    <Calculator className="w-5 h-5 mr-2 text-blue-600" />
                    Invoice Summary
                  </h2>

                  <div className="space-y-3">
                    {/* The summary directly uses the results of the memoized calculations */}
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Subtotal:</span>
                      <span className="font-medium">{formatCurrency(calculations.subtotal, currency)}</span>
                    </div>

                    {calculations.totalDiscount > 0 && (
                      <div className="flex justify-between items-center py-2 border-b border-gray-200">
                        <span className="text-gray-600">Total Discount:</span>
                        <span className="font-medium text-green-600">-{formatCurrency(calculations.totalDiscount, currency)}</span>
                      </div>
                    )}

                    <div className="flex justify-between items-center py-3 border-t-2 border-gray-300">
                      <span className="text-lg font-semibold text-gray-800">Total Amount:</span>
                      <span className="text-lg font-bold text-blue-600">{formatCurrency(calculations.totalAmount, currency)}</span>
                    </div>
              _     </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-center space-x-4">
            <button
              type="button"
              onClick={handleReset}
              className="flex items-center px-6 py-3 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Reset Form
            </button>
            
            <button
              type="submit"
              className="flex items-center px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors shadow-md"
            >
              <FileText className="w-5 h-5 mr-2" />
              Generate Invoice
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default InvoiceGenerator;