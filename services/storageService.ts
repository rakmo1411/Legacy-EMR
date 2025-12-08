import { PatientRecord } from '../types';

const STORAGE_KEY = 'emr_portal_data';

export const getRecords = (): PatientRecord[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading from local storage", error);
    return [];
  }
};

export const saveRecord = (record: PatientRecord): PatientRecord[] => {
  const currentRecords = getRecords();
  // Prepend to show newest first, or append. Let's prepend for visibility.
  const updatedRecords = [record, ...currentRecords];
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedRecords));
  } catch (error) {
    console.error("Error saving to local storage", error);
  }
  return updatedRecords;
};

export const clearRecords = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};