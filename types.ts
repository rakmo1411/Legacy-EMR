export interface PatientRecord {
  id: string; // Unique ID for the record
  patientName: string;
  insuranceCompanyName: string;
  diagnosisCode: string;
  approvalStatus: string;
  notes: string;
  timestamp: string;
}

export type FormData = Omit<PatientRecord, 'id' | 'timestamp'>;