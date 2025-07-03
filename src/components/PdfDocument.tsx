import React from 'react';
import { 
  Document, 
  Page, 
  Text, 
  View, 
  StyleSheet, 
  Font,
  Image
} from '@react-pdf/renderer';
import { EstimateData, LineItem } from '../types';
import { formatINR } from '../utils/helpers';
import { getServiceById } from '../data/services';
import Logo from '../../Single logo with black gradient.png'

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

// Define terms and conditions text
const termsText = `
• This agreement will commence on the day of signing the contract.
• 100% of the total amount is due upon project commencement.
• The client agrees to provide timely access to necessary resources, information, and approvals required for the execution of services.
• The client agrees to provide all necessary materials and information required for the project within a reasonable timeframe as agreed upon by both parties.
• Both parties agree to keep confidential all information shared during the term of this agreement. Confidential information will not be disclosed to any third party without the prior written consent of the other party.
• The services quoted are currently offered on a freelance basis by independent professionals. However, we are in the process of formally registering our company. Upon registration, all future communications, agreements, and invoices will reflect the new business entity.
• All creative materials, strategies, and deliverables developed by aieera  during the term of this agreement remain the property of aieera  until full payment is received. Upon payment, the client will have full ownership of all materials and intellectual property created under this agreement.
• aieera  will not be liable for any indirect, incidental, or consequential damages arising out of or in connection with the services provided.
• If any hosting or domain issues arise, the client is responsible. aieera  is not liable for problems beyond our control.
• The total liability of aieera  will not exceed the amount paid by the client under this agreement.
• Any amendments to this agreement must be made in writing and signed by both parties.
• Both parties agree to maintain confidentiality regarding any proprietary or sensitive information shared during the contract.
• aieera  will provide an estimated project timeline. Delays caused by the client (e.g., late feedback, missing materials) may affect delivery dates and are not the responsibility of aieera .
• The project includes up to 3 revisions. Additional revisions beyond the agreed number may incur extra charges.
• Either party may terminate the agreement with 14 days' written notice. In the event of termination, the client will be invoiced for any work completed up to the termination date.
• Late payments may incur a 5% penalty after 7 days past the due date. Work may be paused until outstanding payments are cleared.
• aieera  reserves the right to showcase completed projects in its portfolio or marketing materials unless otherwise agreed upon in writing.
`;

const styles = StyleSheet.create({
  page: {
    padding: 40,
    fontFamily: 'Roboto',
    fontSize: 10,
    lineHeight: 1.5,
    color: '#4A4A4A',
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 70,
    height: 60,
    marginBottom: 5,
  },
  spacer: {
    height: 15,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 20,
  },
  headerLeft: {
    flex: 2,
  },
  headerRight: {
    flex: 1,
    alignItems: 'flex-end',
  },
  companyName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#303030',
    marginBottom: 5,
  },
  companyDetail: {
    fontSize: 9,
    color: '#707070',
  },
  documentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#303030',
    marginVertical: 25,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#303030',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 5,
    letterSpacing: 0.5,
  },
  infoGrid: {
    flexDirection: 'row',
    marginBottom: 30,
    backgroundColor: '#F9F9F9',
    padding: 15,
    borderRadius: 4,
  },
  infoCol: {
    flex: 1,
    paddingRight: 15,
  },
  infoItem: {
    marginBottom: 8,
  },
  infoLabel: {
    fontWeight: 'bold',
    fontSize: 9,
    color: '#606060',
  },
  infoValue: {
    fontSize: 10,
  },
  clientValue: {
    fontSize: 10,
    marginBottom: 4,
  },
  table: {
    marginVertical: 20,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#F0F0F0',
    borderBottomWidth: 1,
    borderBottomColor: '#D0D0D0',
    paddingVertical: 10,
    paddingHorizontal: 8,
    fontWeight: 'bold',
    fontSize: 9,
    color: '#303030',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E8E8E8',
    paddingVertical: 8,
    paddingHorizontal: 8,
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
    color: '#808080',
    paddingTop: 3,
  },
  totalsSection: {
    marginTop: 30,
    alignItems: 'flex-end',
    backgroundColor: '#F5F5F5',
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignSelf: 'flex-end',
    width: '40%',
  },
  totalRow: {
    flexDirection: 'row',
    marginBottom: 6,
  },
  totalLabel: {
    width: 100,
    textAlign: 'right',
    paddingRight: 15,
    fontWeight: 500,
  },
  totalValue: {
    width: 100,
    textAlign: 'right',
  },
  grandTotal: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#D0D0D0',
    marginTop: 8,
    paddingTop: 8,
    fontWeight: 'bold',
  },
  notes: {
    marginTop: 30,
    paddingTop: 10,
    paddingHorizontal: 10,
    paddingBottom: 10,
    backgroundColor: '#F9F9F9',
    borderRadius: 4,
  },
  noteText: {
    fontSize: 9,
    color: '#606060',
    lineHeight: 1.4,
  },
  termsSection: {
    marginTop: 30,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  termItem: {
    fontSize: 8,
    color: '#606060',
    marginBottom: 3,
    paddingLeft: 10,
    textIndent: -10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 40,
    right: 40,
    textAlign: 'center',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    fontSize: 8,
    color: '#808080',
  },
  quoteBox: {
    backgroundColor: '#F0F0F0',
    padding: 10,
    borderRadius: 4,
    marginTop: 5,
  },
  quoteNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#303030',
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

  // Format terms text by splitting into bullet points
  const termsLines = termsText.trim().split('\n').filter(line => line.trim());

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* Header with company info */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image source={Logo} style={styles.logo} resizeMode="contain" />
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
            <View style={styles.quoteBox}>
              <Text style={styles.quoteNumber}>#{data.quoteNumber || 'Q0001'}</Text>
            </View>
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
              <View style={[
                styles.tableRow, 
                { backgroundColor: index % 2 === 0 ? '#FFFFFF' : '#FAFAFA' }
              ]}>
                <View style={styles.tableCellDescription}>
                  <Text>{(item.description && item.description.split(':')[0]) || 'Service'}</Text>
                  {getSubServiceNames(item).map((name, idx) => (
                    <Text key={idx} style={styles.subServiceItem}>• {name}</Text>
                  ))}
                </View>
                <Text style={styles.tableCellQuantity}>{item.quantity || 1}</Text>
                <Text style={styles.tableCellRate}>
                  {formatINR(item.rate || 0)}
                </Text>
                <Text style={styles.tableCellAmount}>
                  {formatINR(item.amount || 0)}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Totals */}
        <View style={styles.totalsSection}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Subtotal:</Text>
            <Text style={styles.totalValue}>{formatINR(data.subtotal || 0)}</Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Discount ({data.discount || 0}%):</Text>
            <Text style={styles.totalValue}>
              {formatINR((data.subtotal || 0) * ((data.discount || 0) / 100))}
            </Text>
          </View>
         
          <View style={[styles.totalRow, styles.grandTotal]}>
            <Text style={styles.totalLabel}>Total:</Text>
            <Text style={styles.totalValue}>{formatINR(data.total || 0)}</Text>
          </View>
        </View>

        {/* Notes */}
        {data.notes && (
          <View style={styles.notes}>
            <Text style={styles.sectionTitle}>Notes</Text>
            <Text style={styles.noteText}>{data.notes}</Text>
          </View>
        )}

        {/* Terms & Conditions */}
        <View style={styles.termsSection}>
          <Text style={styles.sectionTitle}>Terms & Conditions</Text>
          {termsLines.map((line, index) => (
            <Text key={index} style={styles.termItem}>{line.trim()}</Text>
          ))}
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text>Thank you for your business!</Text>
        </View>
      </Page>
    </Document>
  );
};

export default PdfDocument;