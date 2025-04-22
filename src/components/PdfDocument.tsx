import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Font 
} from '@react-pdf/renderer';
import { EstimateData, LineItem } from '../types';
import { formatAED } from '../utils/helpers';
import { getServiceById } from '../data/services';

// Register fonts for better typography
Font.register({
  family: 'Roboto',
  fonts: [
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf', fontWeight: 300 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf', fontWeight: 400 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf', fontWeight: 500 },
    { src: 'https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf', fontWeight: 700 },
  ]
});

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Roboto',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#333333',
  },
  spacer: {
    height: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
    borderBottomWidth: 2,
    borderBottomColor: '#1E40AF',
    paddingBottom: 10,
  },
  headerLeft: {
    flex: 2,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  companyName: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E40AF',
    marginBottom: 5,
  },
  companyDetail: {
    fontSize: 9,
    color: '#4B5563',
  },
  documentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#1E40AF',
    marginVertical: 20,
    textTransform: 'uppercase',
  },
  section: {
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#1E40AF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 3,
  },
  infoGrid: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  infoCol: {
    flex: 1,
    paddingRight: 10,
  },
  infoItem: {
    marginBottom: 5,
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 9,
    color: '#4B5563',
  },
  infoValue: {
    fontSize: 10,
  },
  clientValue: {
    fontSize: 10,
    marginBottom: 3,
  },
  table: {
    marginVertical: 15,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderBottomWidth: 1,
    borderBottomColor: '#CBD5E1',
    paddingVertical: 8,
    paddingHorizontal: 5,
    fontWeight: 'bold',
    fontSize: 9,
    color: '#1E3A8A',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 6,
    paddingHorizontal: 5,
    fontSize: 9,
  },
  tableCellDescription: {
    flex: 3,
  },
  tableCellQuantity: {
    flex: 1,
    textAlign: 'center',
  },
  tableCellRate: {
    flex: 1,
    textAlign: 'right',
  },
  tableCellAmount: {
    flex: 1,
    textAlign: 'right',
  },
  subServiceItem: {
    paddingLeft: 10,
    fontSize: 8,
    color: '#6B7280',
    paddingTop: 2,
  },
  totalsSection: {
    marginTop: 30,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  totalLabel: {
    width: 100,
    textAlign: 'right',
    paddingRight: 10,
  },
  totalValue: {
    width: 100,
    textAlign: 'right',
  },
  grandTotal: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#CBD5E1',
    marginTop: 5,
    paddingTop: 5,
    fontWeight: 'bold',
  },
  notes: {
    marginTop: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  noteText: {
    fontSize: 9,
    color: '#4B5563',
    lineHeight: 1.4,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    fontSize: 8,
    color: '#6B7280',
  },
});

interface PdfDocumentProps {
  data: EstimateData;
}

const PdfDocument: React.FC<PdfDocumentProps> = ({ data }) => {
  // Safely handle undefined data
  if (!data || !data.companyInfo || !data.clientInfo || !data.lineItems) {
    return (
      <Document>
        <Page size="A4">
          <Text>Error: Missing required data</Text>
        </Page>
      </Document>
    );
  }
  
  const getSubServiceNames = (item: LineItem): string[] => {
    try {
      const service = getServiceById(item.service);
      if (!service) return [];
      
      return service.subServices
        .filter(sub => item.selectedSubServices && item.selectedSubServices.includes(sub.id))
        .map(sub => sub.name);
    } catch (error) {
      console.error('Error getting sub-service names:', error);
      return [];
    }
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with company info */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.companyName}>{data.companyInfo.name || 'Company Name'}</Text>
            <Text style={styles.companyDetail}>{data.companyInfo.address || ''}</Text>
            <Text style={styles.companyDetail}>
              {data.companyInfo.phone ? `Phone: ${data.companyInfo.phone}` : ''}
              {data.companyInfo.phone && data.companyInfo.email ? ' | ' : ''}
              {data.companyInfo.email ? `Email: ${data.companyInfo.email}` : ''}
            </Text>
            <Text style={styles.companyDetail}>
              {data.companyInfo.website ? `Website: ${data.companyInfo.website}` : ''}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Text style={styles.infoLabel}>QUOTATION</Text>
            <Text style={styles.infoValue}>#{data.quoteNumber || 'Q0001'}</Text>
          </View>
        </View>

        <Text style={styles.documentTitle}>Quotation</Text>

        {/* Quote Info and Client Info */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCol}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Quote Details</Text>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Quote Number:</Text>
                <Text style={styles.infoValue}>{data.quoteNumber || 'Q0001'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Date:</Text>
                <Text style={styles.infoValue}>{data.date || 'N/A'}</Text>
              </View>
              <View style={styles.infoItem}>
                <Text style={styles.infoLabel}>Valid Until:</Text>
                <Text style={styles.infoValue}>{data.validUntil || 'N/A'}</Text>
              </View>
            </View>
          </View>

          <View style={styles.infoCol}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Client Information</Text>
              <Text style={styles.clientValue}>{data.clientInfo.name || 'Client Name'}</Text>
              {data.clientInfo.company && <Text style={styles.clientValue}>{data.clientInfo.company}</Text>}
              {data.clientInfo.address && <Text style={styles.clientValue}>{data.clientInfo.address}</Text>}
              {data.clientInfo.phone && <Text style={styles.clientValue}>Phone: {data.clientInfo.phone}</Text>}
              {data.clientInfo.email && <Text style={styles.clientValue}>Email: {data.clientInfo.email}</Text>}
            </View>
          </View>
        </View>

        {/* Line Items */}
        <View style={styles.table}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.tableCellDescription}>Description</Text>
            <Text style={styles.tableCellQuantity}>Qty</Text>
            <Text style={styles.tableCellRate}>Rate</Text>
            <Text style={styles.tableCellAmount}>Amount</Text>
          </View>

          {data.lineItems.map((item, index) => (
            <View key={index}>
              <View style={styles.tableRow}>
                <View style={styles.tableCellDescription}>
                  <Text>{(item.description && item.description.split(':')[0]) || 'Service'}</Text>
                  {getSubServiceNames(item).map((name, idx) => (
                    <Text key={idx} style={styles.subServiceItem}>• {name}</Text>
                  ))}
                </View>
                <Text style={styles.tableCellQuantity}>{item.quantity || 1}</Text>
                <Text style={styles.tableCellRate}>
                  {formatAED(item.rate || 0)}
                </Text>
                <Text style={styles.tableCellAmount}>
                  {formatAED(item.amount || 0)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>{formatAED(data.subtotal || 0)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Discount ({data.discount || 0}%):</Text>
            <Text style={styles.totalValue}>
              {formatAED((data.subtotal || 0) * ((data.discount || 0) / 100))}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Tax ({data.tax || 0}%):</Text>
            <Text style={styles.totalValue}>
              {formatAED((data.subtotal || 0) * (1 - (data.discount || 0) / 100) * ((data.tax || 0) / 100))}
            </Text>
          </View>
          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>{formatAED(data.total || 0)}</Text>
          </View>
        </View>

        {/* Notes */}
        {data.notes && (
          <View style={styles.notes}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.noteText}>{data.notes}</Text>
          </View>
        )}

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;