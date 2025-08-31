// PID Generation and Validation for Karapitiya Teaching Hospital
// Format: KTH-YYMM-SSSSS-C (Site-Year-Month-Sequence-CheckDigit)

import type { PIDComponents } from '@/types';

// Site code for Karapitiya Teaching Hospital
const SITE_CODE = 'KTH';

/**
 * Generate Mod-11 check digit for PID
 */
function calculateCheckDigit(pidWithoutCheck: string): string {
  const weights = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const digits = pidWithoutCheck.replace(/\D/g, ''); // Remove non-digits
  
  let sum = 0;
  for (let i = 0; i < digits.length; i++) {
    const digit = parseInt(digits[i]);
    const weight = weights[i % weights.length];
    sum += digit * weight;
  }
  
  const remainder = sum % 11;
  const checkDigit = remainder < 2 ? remainder : 11 - remainder;
  
  return checkDigit.toString();
}

/**
 * Generate next sequence number (mock implementation)
 * In production, this would query the database
 */
function getNextSequence(year: string, month: string): string {
  // Mock: generate a random sequence for demo
  // In production, this would be an auto-increment from database
  const mockSequence = Math.floor(Math.random() * 99999) + 1;
  return mockSequence.toString().padStart(5, '0');
}

/**
 * Generate a new PID
 */
export function generatePID(): { pid: string; components: PIDComponents } {
  const now = new Date();
  const year = now.getFullYear().toString().slice(-2);
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const sequence = getNextSequence(year, month);
  
  // Build PID without check digit
  const pidWithoutCheck = `${SITE_CODE}${year}${month}${sequence}`;
  const checkDigit = calculateCheckDigit(pidWithoutCheck);
  
  // Format final PID
  const pid = `${SITE_CODE}-${year}${month}-${sequence}-${checkDigit}`;
  
  const components: PIDComponents = {
    siteCode: SITE_CODE,
    year,
    month,
    sequence,
    checkDigit
  };
  
  return { pid, components };
}

/**
 * Validate PID format and check digit
 */
export function validatePID(pid: string): { isValid: boolean; error?: string } {
  // Check format: KTH-YYMM-SSSSS-C
  const pidRegex = /^KTH-\d{4}-\d{5}-\d$/;
  
  if (!pidRegex.test(pid)) {
    return { isValid: false, error: 'Invalid PID format. Expected: KTH-YYMM-SSSSS-C' };
  }
  
  // Extract components
  const parts = pid.split('-');
  const [siteCode, yearMonth, sequence, providedCheckDigit] = parts;
  
  if (siteCode !== SITE_CODE) {
    return { isValid: false, error: 'Invalid site code' };
  }
  
  // Validate check digit
  const pidWithoutCheck = `${siteCode}${yearMonth}${sequence}`;
  const calculatedCheckDigit = calculateCheckDigit(pidWithoutCheck);
  
  if (calculatedCheckDigit !== providedCheckDigit) {
    return { isValid: false, error: 'Invalid check digit' };
  }
  
  return { isValid: true };
}

/**
 * Parse PID into components
 */
export function parsePID(pid: string): PIDComponents | null {
  const validation = validatePID(pid);
  if (!validation.isValid) {
    return null;
  }
  
  const parts = pid.split('-');
  const [siteCode, yearMonth, sequence, checkDigit] = parts;
  
  return {
    siteCode,
    year: yearMonth.slice(0, 2),
    month: yearMonth.slice(2, 4),
    sequence,
    checkDigit
  };
}

/**
 * Generate QR code data for PID
 */
export function generatePIDQRData(pid: string): string {
  return `KTH:PID:${pid}`;
}

/**
 * Example PID for display
 */
export const EXAMPLE_PID = 'KTH-2508-00073-6';