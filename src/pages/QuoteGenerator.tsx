
import React, { useState, useEffect } from 'react';
import { PDFViewer, pdf } from '@react-pdf/renderer';
import { saveAs } from 'file-saver';

import Header from '../components/Header';
import CompanyInfoForm from '../components/CompanyInfo';
import ClientInfoForm from '../components/ClientInfo';
import QuoteDetails from '../components/QuoteDetails';
import LineItemsComponent from '../components/LineItems';
import TotalSection from '../components/TotalSection';
import NotesSection from '../components/NotesSection';
import PdfDocument from '../components/PdfDocument';
import { CompanyInfo, ClientInfo, LineItem, EstimateData } from '../types';
import {
  generateQuoteNumber,
  formatDate,
  calculateFutureDate,
  calculateSubtotal,
  calculateTotal,
} from '../utils/helpers';

function QuoteGenerator() {
  const defaultCompanyInfo: CompanyInfo = {
    name: 'Aieera Digital Marketing',
    phone: '',
    email: 'hello@aieera.com',
    website: 'https://www.aieera.com',
  };

  const defaultClientInfo: ClientInfo = {
    name: '',
    company: '',
    address: '',
    phone: '',
    email: '',
  };
  

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

  const [total, setTotal] = useState<number>(0);
  const [notes, setNotes] = useState<string>('');
  const [showPdfPreview, setShowPdfPreview] = useState<boolean>(false);
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
const handleDownloadPdf = async () => {
  setIsPdfGenerating(true);
  try {
    const blob = await pdf(<PdfDocument data={estimateData} />).toBlob();
    
    const safeClientCompany = clientInfo.company.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_') || 'NoCompany';
    
    // Create filename with your company and client company names
    const filename = `${safeClientCompany}_Quote_${quoteNumber}.pdf`;
    
    saveAs(blob, filename);
  } catch (error) {
    console.error('Error generating PDF:', error);
    alert('Error generating PDF. Please try again.');
  } finally {
    setIsPdfGenerating(false);
  }
};
  useEffect(() => {
    const newSubtotal = calculateSubtotal(lineItems);
    setSubtotal(newSubtotal);

    const newTotal = calculateTotal(newSubtotal, discount);
    setTotal(newTotal);
  }, [lineItems, discount]);

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
   
      total,
      notes,
    };

    localStorage.setItem('quoteData', JSON.stringify(data));
    alert('Quote saved successfully!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset the form? All data will be lost.')) {
      setCompanyInfo(defaultCompanyInfo);
      setClientInfo(defaultClientInfo);
      setQuoteNumber(generateQuoteNumber());
      setDate(new Date().toISOString().split('T')[0]);
      setValidUntil(calculateFutureDate(30).toISOString().split('T')[0]);
      setLineItems([]);
      setDiscount(0);
     
      setNotes('');
      localStorage.removeItem('quoteData');
    }
  };

  const togglePdfPreview = () => {
    setShowPdfPreview(!showPdfPreview);
  };

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
        
        setNotes(data.notes);
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  const estimateData: EstimateData = {
    companyInfo,
    clientInfo,
    quoteNumber,
    date: formatDate(new Date(date)),
    validUntil: formatDate(new Date(validUntil)),
    lineItems,
    subtotal,
    discount,
 
    total,
    notes,
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {!showPdfPreview ? (
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
                 
                  total={total}
                  onDiscountChange={setDiscount}
                                 />
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex space-x-4">
                <button
                  onClick={handleSave}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                  Save Quote
                </button>
                <button
                  onClick={handleReset}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
                >
                  Reset
                </button>
              </div>
              <div className="flex space-x-4">
                <button
                  onClick={togglePdfPreview}
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
                >
                  Preview PDF
                </button>
                <button
    onClick={handleDownloadPdf}
    disabled={isPdfGenerating}
    className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 disabled:bg-green-400"
  >
    {isPdfGenerating ? 'Preparing PDF...' : 'Download PDF'}
  </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col h-screen">
            <div className="flex justify-between mb-4">
              <h2 className="text-xl font-bold">PDF Preview</h2>
              <button
                onClick={togglePdfPreview}
                className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300"
              >
                Back to Editor
              </button>
            </div>
            <div className="flex-1 border border-gray-300 rounded">
              <PDFViewer width="100%" height="100%" className="rounded">
                <PdfDocument data={estimateData} />
              </PDFViewer>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default QuoteGenerator;