import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export const pdf = async (
  element: HTMLElement,
  companyName: string,
  clientCompany: string,
  quoteNumber: string
) => {
  const canvas = await html2canvas(element);
  const imgData = canvas.toDataURL('image/png');
  
  const pdf = new jsPDF('p', 'mm', 'a4');
  const pdfWidth = pdf.internal.pageSize.getWidth();
  const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
  pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
  
  const safeCompany = companyName.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_');
  const safeClientCompany = clientCompany.replace(/[^\w\s]/gi, '').replace(/\s+/g, '_') || 'NoCompany';
  const filename = `${safeCompany}_${safeClientCompany}_Quote_${quoteNumber}.pdf`;
  
  pdf.save(filename);
};