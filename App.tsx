import React, { useState, useEffect } from 'react';
import { PatientRecord } from './types';
import { getRecords, saveRecord } from './services/storageService';
import { LegacyHeader } from './components/LegacyHeader';

const App: React.FC = () => {
  // State for form fields
  const [patientName, setPatientName] = useState('');
  const [insuranceCompanyName, setInsuranceCompanyName] = useState('');
  const [diagnosisCode, setDiagnosisCode] = useState('');
  const [approvalStatus, setApprovalStatus] = useState('Approved'); // Default to Approved
  const [notes, setNotes] = useState('');

  // State for application data
  const [records, setRecords] = useState<PatientRecord[]>([]);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);

  // Load data on mount
  useEffect(() => {
    const loadedRecords = getRecords();
    setRecords(loadedRecords);
  }, []);

  // Handle Submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!patientName || !insuranceCompanyName || !diagnosisCode || !approvalStatus) {
      alert("Validation Error: Please fill in all required fields.");
      return;
    }

    const newRecord: PatientRecord = {
      id: Date.now().toString(),
      patientName,
      insuranceCompanyName,
      diagnosisCode,
      approvalStatus,
      notes,
      timestamp: new Date().toLocaleString(),
    };

    const updatedRecords = saveRecord(newRecord);
    setRecords(updatedRecords);

    // Clear form
    setPatientName('');
    setInsuranceCompanyName('');
    setDiagnosisCode('');
    setApprovalStatus('Approved');
    setNotes('');

    // Show success message
    setStatusMessage("Record Saved Successfully");
    setTimeout(() => {
      setStatusMessage(null);
    }, 3000);
  };

  return (
    <div className="min-h-screen p-6 md:p-12 flex flex-col items-center gap-8 bg-[#f4f6f8]">
      
      {/* Main Container - Card Style */}
      <div className="w-full max-w-5xl card bg-white">
        <LegacyHeader title="Hospital EMR Portal - Prior Authorization" />
        
        <div className="p-6">
          {/* Breadcrumb / Nav */}
          <div className="flex items-center gap-2 mb-6 text-sm text-gray-500 border-b border-gray-200 pb-2">
            <span className="text-blue-600 hover:underline cursor-pointer">Dashboard</span> 
            <span>/</span>
            <span className="text-blue-600 hover:underline cursor-pointer">Authorizations</span>
            <span>/</span>
            <span className="font-semibold text-gray-700">New Request</span>
          </div>

          <div className="flex flex-col lg:flex-row gap-8">
            
            {/* Input Form */}
            <div className="flex-1">
              <div className="bg-gray-50 p-6 rounded border border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Prior Auth Request</h2>
                
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="flex flex-col">
                    <label htmlFor="txt_patientName" className="mb-1 font-semibold text-gray-700 text-sm">Patient Name <span className="text-red-500">*</span></label>
                    <input
                      id="txt_patientName"
                      type="text"
                      value={patientName}
                      onChange={(e) => setPatientName(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="e.g. John Doe"
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="txt_insuranceCo" className="mb-1 font-semibold text-gray-700 text-sm">Insurance Company <span className="text-red-500">*</span></label>
                    <input
                      id="txt_insuranceCo"
                      type="text"
                      value={insuranceCompanyName}
                      onChange={(e) => setInsuranceCompanyName(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="e.g. Blue Cross Blue Shield"
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="txt_diagCode" className="mb-1 font-semibold text-gray-700 text-sm">Diagnosis Code <span className="text-red-500">*</span></label>
                    <input
                      id="txt_diagCode"
                      type="text"
                      value={diagnosisCode}
                      onChange={(e) => setDiagnosisCode(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="e.g. ICD-10-CM"
                      autoComplete="off"
                    />
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="txt_approvalStatus" className="mb-1 font-semibold text-gray-700 text-sm">Decision <span className="text-red-500">*</span></label>
                    <select
                      id="txt_approvalStatus"
                      value={approvalStatus}
                      onChange={(e) => setApprovalStatus(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                    >
                      <option value="Approved">Approved</option>
                      <option value="Declined">Declined</option>
                    </select>
                  </div>

                  <div className="flex flex-col">
                    <label htmlFor="txt_notes" className="mb-1 font-semibold text-gray-700 text-sm">Clinical Notes</label>
                    <textarea
                      id="txt_notes"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      className="border border-gray-300 rounded px-3 py-2 text-gray-900 bg-white h-24 resize-none focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors"
                      placeholder="Enter additional clinical context here..."
                    />
                  </div>

                  <div className="flex justify-between items-center pt-2">
                     <span className="text-sm text-gray-500">* Required fields</span>
                    <button
                      id="btn_submit"
                      type="submit"
                      className="bg-[#3c8dbc] hover:bg-[#367fa9] text-white font-semibold py-2 px-6 rounded shadow-sm transition-colors duration-200 active:translate-y-0.5"
                    >
                      Submit Request
                    </button>
                  </div>
                </form>
              </div>

              {/* Status Bar */}
              <div className="mt-4 h-10 flex items-center">
                {statusMessage && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-2 rounded flex items-center w-full animate-fade-in-down">
                    <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                    {statusMessage}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar Info */}
            <div className="w-full lg:w-72 flex flex-col gap-4">
              <div className="card p-4 text-sm text-gray-600 bg-blue-50 border-blue-100">
                <h3 className="font-bold text-blue-800 mb-2 border-b border-blue-200 pb-1">System Status</h3>
                <ul className="space-y-1">
                  <li className="flex justify-between"><span>Database:</span> <span className="text-green-600 font-semibold">Online</span></li>
                  <li className="flex justify-between"><span>Latency:</span> <span>24ms</span></li>
                  <li className="flex justify-between"><span>User:</span> <span>Admin_01</span></li>
                </ul>
              </div>
               <div className="card p-4 flex-1 flex flex-col justify-center items-center text-center bg-gray-50">
                 <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-2">
                   <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                 </div>
                 <p className="text-xs text-gray-500 font-semibold">SECURE CONNECTION</p>
                 <p className="text-[10px] text-gray-400 mt-1">256-bit Encryption</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Grid Section - Card Style */}
      <div className="w-full max-w-5xl card bg-white">
        <LegacyHeader title="History of Approvals" />
        <div className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 border-b border-gray-300">
                <tr>
                  <th className="px-4 py-3 font-semibold text-sm">Entry ID</th>
                  <th className="px-4 py-3 font-semibold text-sm">Patient Name</th>
                  <th className="px-4 py-3 font-semibold text-sm">Insurance</th>
                  <th className="px-4 py-3 font-semibold text-sm">Diagnosis</th>
                  <th className="px-4 py-3 font-semibold text-sm">Decision</th>
                  <th className="px-4 py-3 font-semibold text-sm">Notes</th>
                  <th className="px-4 py-3 font-semibold text-sm">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 text-sm text-black">
                {records.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="text-center py-8 text-gray-500 italic">No records found.</td>
                  </tr>
                ) : (
                  records.map((record, index) => (
                    <tr 
                      key={record.id} 
                      id={`row_${index}`} // RPA REQUIREMENT: Static Row ID
                      className="hover:bg-blue-50 transition-colors duration-150"
                    >
                      <td className="px-4 py-3 text-black">{record.id}</td>
                      <td className="px-4 py-3 font-medium text-black">{record.patientName}</td>
                      <td className="px-4 py-3 text-black">{record.insuranceCompanyName}</td>
                      <td className="px-4 py-3 text-black">
                        <span className="bg-gray-100 px-2 py-1 rounded text-xs border border-gray-300 font-mono">
                          {record.diagnosisCode}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-black">
                        {record.approvalStatus === 'Approved' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            Approved
                          </span>
                        ) : record.approvalStatus === 'Declined' ? (
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                            Declined
                          </span>
                        ) : (
                          <span className="text-black">{record.approvalStatus}</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-black max-w-xs truncate" title={record.notes}>
                        {record.notes || <span className="text-gray-400 italic">-</span>}
                      </td>
                      <td className="px-4 py-3 text-black">{record.timestamp}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 px-4 py-2 border-t border-gray-200 text-xs text-gray-600 flex justify-between items-center rounded-b">
            <span>Total Records: {records.length}</span>
            <span>Last Updated: {new Date().toLocaleTimeString()}</span>
          </div>
        </div>
      </div>
      
      <div className="text-sm text-gray-500">
        © 2015 Hospital Systems Corp. <span className="mx-2">•</span> <span className="hover:text-blue-600 cursor-pointer">Privacy Policy</span> <span className="mx-2">•</span> <span className="hover:text-blue-600 cursor-pointer">Terms of Service</span>
      </div>
    </div>
  );
};

export default App;