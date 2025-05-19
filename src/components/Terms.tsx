import React from 'react';
import { FileText } from 'lucide-react';

const termsText = `
• This agreement will commence on the day of signing the contract and is a monthly contract.
• 100% of the total amount is due upon project commencement.
• The client agrees to provide timely access to necessary resources, information, and approvals required for the execution of services.
• The client agrees to provide all necessary materials and information required for the project within a reasonable timeframe as agreed upon by both parties.
• Both parties agree to keep confidential all information shared during the term of this agreement. Confidential information will not be disclosed to any third party without the prior written consent of the other party.
• All creative materials, strategies, and deliverables developed by aieera future marketing during the term of this agreement remain the property of aieera future marketing until full payment is received. Upon payment, the client will have full ownership of all materials and intellectual property created under this agreement.
• aieera future marketing will not be liable for any indirect, incidental, or consequential damages arising out of or in connection with the services provided.
• If any hosting or domain issues arise, the client is responsible. aieera future marketing is not liable for problems beyond our control.
• The total liability of aieera future marketing will not exceed the amount paid by the client under this agreement.
• Any amendments to this agreement must be made in writing and signed by both parties.
• Both parties agree to maintain confidentiality regarding any proprietary or sensitive information shared during the contract.
• aieera future marketing will provide an estimated project timeline. Delays caused by the client (e.g., late feedback, missing materials) may affect delivery dates and are not the responsibility of aieera future marketing.
• The project includes up to 3 revisions. Additional revisions beyond the agreed number may incur extra charges.
• Either party may terminate the agreement with 14 days' written notice. In the event of termination, the client will be invoiced for any work completed up to the termination date.
• Late payments may incur a 5% penalty after 7 days past the due date. Work may be paused until outstanding payments are cleared.
• aieera future marketing reserves the right to showcase completed projects in its portfolio or marketing materials unless otherwise agreed upon in writing.
`;

const TermsSection: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6 mb-6 border border-gray-100">
      <div className="flex items-center mb-4">
        <FileText className="h-5 w-5 text-green-600 mr-2" />
        <h2 className="text-lg font-semibold text-gray-800">Terms & Conditions</h2>
      </div>

      <div className="text-gray-700 whitespace-pre-line text-sm">
        {termsText}
      </div>
    </div>
  );
};

export default TermsSection;
