import React from 'react';
import { Document, Page, Text, View, StyleSheet, Font } from '@react-pdf/renderer';
import { EstimateData, LineItem, SubService } from '../types';
import { formatAED } from '../utils/helpers';
import { getServiceById } from '../data/services';

// Create styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
    color: '#333333',
  },
  header: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  companyInfo: {
    marginBottom: 10,
  },
  companyName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#1E40AF',
  },
  contactInfo: {
    marginBottom: 2,
  },
  quoteTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
    color: '#1E40AF',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    paddingBottom: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    color: '#1E40AF',
  },
  clientSection: {
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  infoCol: {
    flex: 1,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 2,
  },
  value: {
    marginBottom: 6,
  },
  table: {
    marginVertical: 10,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: '#F3F4F6',
    paddingVertical: 8,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingVertical: 8,
  },
  description: {
    flex: 3,
  },
  subService: {
    marginLeft: 10,
    fontSize: 10,
    color: '#6B7280',
  },
  quantity: {
    flex: 1,
    textAlign: 'center',
  },
  rate: {
    flex: 1,
    textAlign: 'right',
  },
  amount: {
    flex: 1,
    textAlign: 'right',
  },
  totalsSection: {
    marginTop: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  grandTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    fontWeight: 'bold',
  },
  notes: {
    marginTop: 30,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  noteText: {
    fontSize: 10,
    color: '#4B5563',
  },
  footer: {
    marginTop: 40,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    fontSize: 10,
    color: '#6B7280',
    textAlign: 'center',
  },
});

interface PdfDocumentProps {
  data: EstimateData;
}

const PdfDocument: React.FC<PdfDocumentProps> = ({ data }) => {
  const getSubServiceNames = (item: LineItem): string[] => {
    const service = getServiceById(item.service);
    if (!service) return [];
    
    return service.subServices
      .filter(sub => item.selectedSubServices.includes(sub.id))
      .map(sub => sub.name);
  };

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with company info */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
            <Text style={styles.companyName}>{data.companyInfo.name}</Text>
            <Text style={styles.contactInfo}>{data.companyInfo.address}</Text>
            <Text style={styles.contactInfo}>Phone: {data.companyInfo.phone}</Text>
            <Text style={styles.contactInfo}>Email: {data.companyInfo.email}</Text>
            <Text style={styles.contactInfo}>Website: {data.companyInfo.website}</Text>
          </View>
        </View>

        <Text style={styles.quoteTitle}>QUOTATION</Text>

        {/* Quote Info and Client Info */}
        <View style={styles.infoGrid}>
          <View style={styles.infoCol}>
            <Text style={styles.sectionTitle}>Quote Details</Text>
            <View>
              <Text style={styles.label}>Quote Number:</Text>
              <Text style={styles.value}>{data.quoteNumber}</Text>
            </View>
            <View>
              <Text style={styles.label}>Date:</Text>
              <Text style={styles.value}>{data.date}</Text>
            </View>
            <View>
              <Text style={styles.label}>Valid Until:</Text>
              <Text style={styles.value}>{data.validUntil}</Text>
            </View>
          </View>

          <View style={styles.infoCol}>
            <Text style={styles.sectionTitle}>Client Information</Text>
            <Text style={styles.value}>{data.clientInfo.name}</Text>
            <Text style={styles.value}>{data.clientInfo.company}</Text>
            <Text style={styles.value}>{data.clientInfo.address}</Text>
            <Text style={styles.value}>Phone: {data.clientInfo.phone}</Text>
            <Text style={styles.value}>Email: {data.clientInfo.email}</Text>
          </View>
        </View>

        {/* Line Items */}
        <View style={styles.table}>
          <Text style={styles.sectionTitle}>Services</Text>
          <View style={styles.tableHeader}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.quantity}>Qty</Text>
            <Text style={styles.rate}>Rate</Text>
            <Text style={styles.amount}>Amount</Text>
          </View>

          {data.lineItems.map((item, index) => (
            <View key={index}>
              <View style={styles.tableRow}>
                <View style={styles.description}>
                  <Text>{item.description.split(':')[0]}</Text>
                  {getSubServiceNames(item).map((name, idx) => (
                    <Text key={idx} style={styles.subService}>- {name}</Text>
                  ))}
                </View>
                <Text style={styles.quantity}>{item.quantity}</Text>
                <Text style={styles.rate}>{formatAED(item.rate)}</Text>
                <Text style={styles.amount}>{formatAED(item.amount)}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text>Subtotal:</Text>
            <Text>{formatAED(data.subtotal)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Discount ({data.discount}%):</Text>
            <Text>{formatAED(data.subtotal * (data.discount / 100))}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text>Tax ({data.tax}%):</Text>
            <Text>{formatAED(data.subtotal * (1 - data.discount / 100) * (data.tax / 100))}</Text>
          </View>
          <View style={styles.grandTotalRow}>
            <Text>Total:</Text>
            <Text>{formatAED(data.total)}</Text>
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