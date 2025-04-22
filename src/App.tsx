import React, { useState, useEffect } from 'react';
import { usePDF } from 'react-to-pdf';
import Header from './components/Header';
import CompanyInfoForm from './components/CompanyInfo';
import ClientInfoForm from './components/ClientInfo';
import QuoteDetails from './components/QuoteDetails';
import LineItemsComponent from './components/LineItems';
import TotalSection from './components/TotalSection';
import NotesSection from './components/NotesSection';
import ActionsSection from './components/ActionsSection';
import PdfDocument from './components/PdfDocument';
import { CompanyInfo, ClientInfo, LineItem, EstimateData } from './types';
import { 
  generateQuoteNumber, 
  formatDate, 
  calculateFutureDate,
  calculateSubtotal,
  calculateTotal
} from './utils/helpers';

function App() {
  // Initialize with empty data
  const defaultCompanyInfo: CompanyInfo = {
    name: '',
    address: '',
    phone: '',
    email: '',
    website: ''
  };

  const defaultClientInfo: ClientInfo = {
    name: '',
    company: '',
    address: '',
    phone: '',
    email: ''
  };

  // State for all form data
  const [companyInfo, setCompanyInfo] = useState<CompanyInfo>(defaultCompanyInfo);
  const [clientInfo, setClientInfo] = useState<ClientInfo>(defaultClientInfo);
  const [quoteNumber, setQuoteNumber] = useState<string>(generateQuoteNumber());
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [validUntil, setValidUntil] = useState<string>(
    calculateFutureDate(30).toISOString().split('T')[0]
  );
  const [lineItems, setLineItems] = useState<LineItem[]>([]);
  const [subtotal, setSubtotal] = useState<number>(0);
  const [discount, setDiscount] = useState<number>(0);
  const [tax, setTax] = useState<number>(5); // Default 5% VAT in UAE
  const [total, setTotal] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');

  // PDF generation
  const { toPDF, targetRef } = usePDF({
    filename: `Quote-${quoteNumber}.pdf`,
  });

  // Calculate subtotal and total whenever line items change
  useEffect(() => {
    const newSubtotal = calculateSubtotal(lineItems);
    setSubtotal(newSubtotal);
    
    const newTotal = calculateTotal(newSubtotal, discount, tax);
    setTotal(newTotal);
  }, [lineItems, discount, tax]);

  // Handle save draft
  const handleSave = () => {
    const data: EstimateData = {
      companyInfo,
      clientInfo,
      quoteNumber,
      date,
      validUntil,
      lineItems,
      subtotal,
      discount,
      tax,
      total,
      notes
    };
    
    localStorage.setItem('quoteData', JSON.stringify(data));
    alert('Quote saved successfully!');
  };

  // Handle reset form
  const handleReset = () => {
    if (confirm('Are you sure you want to reset the form? All data will be lost.')) {
      setCompanyInfo(defaultCompanyInfo);
      setClientInfo(defaultClientInfo);
      setQuoteNumber(generateQuoteNumber());
      setDate(new Date().toISOString().split('T')[0]);
      setValidUntil(calculateFutureDate(30).toISOString().split('T')[0]);
      setLineItems([]);
      setDiscount(0);
      setTax(5);
      setNotes('');
      localStorage.removeItem('quoteData');
    }
  };

  // Load saved data on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('quoteData');
    if (savedData) {
      try {
        const data: EstimateData = JSON.parse(savedData);
        setCompanyInfo(data.companyInfo);
        setClientInfo(data.clientInfo);
        setQuoteNumber(data.quoteNumber);
        setDate(data.date);
        setValidUntil(data.validUntil);
        setLineItems(data.lineItems);
        setDiscount(data.discount);
        setTax(data.tax);
        setNotes(data.notes);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Prepare data for PDF generation
  const estimateData: EstimateData = {
    companyInfo,
    clientInfo,
    quoteNumber,
    date: formatDate(new Date(date)),
    validUntil: formatDate(new Date(validUntil)),
    lineItems,
    subtotal,
    discount,
    tax,
    total,
    notes
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <CompanyInfoForm companyInfo={companyInfo} onChange={setCompanyInfo} />
            <ClientInfoForm clientInfo={clientInfo} onChange={setClientInfo} />
          </div>
          
          <QuoteDetails 
            quoteNumber={quoteNumber}
            date={date}
            validUntil={validUntil}
            onDateChange={setDate}
            onValidUntilChange={setValidUntil}
          />
          
          <LineItemsComponent lineItems={lineItems} onChange={setLineItems} />
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <NotesSection notes={notes} onChange={setNotes} />
            </div>
            <div>
              <TotalSection 
                subtotal={subtotal}
                discount={discount}
                tax={tax}
                total={total}
                onDiscountChange={setDiscount}
                onTaxChange={setTax}
              />
            </div>
          </div>
          
          <ActionsSection 
            onSave={handleSave} 
            onReset={handleReset} 
            onDownloadPdf={toPDF}
          />
        </div>
      </main>

      {/* Hidden div for PDF generation */}
      <div style={{ display: 'none' }}>
        <div ref={targetRef}>
          <PdfDocument data={estimateData} />
        </div>
      </div>
    </div>
  );
}

export default App;