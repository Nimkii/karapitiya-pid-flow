// Core types for Karapitiya PRMS

export type UserRole = 'admin' | 'registrar_clerk' | 'ward_doctor' | 'nurse';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  ward?: string;
  avatar?: string;
}

export interface Patient {
  id: string;
  pid: string;
  name: {
    first: string;
    last: string;
  };
  nic: string;
  dateOfBirth: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  address: {
    line1: string;
    line2?: string;
    city: string;
    district: string;
  };
  contacts: {
    phone: string;
    emergency: {
      name: string;
      relationship: string;
      phone: string;
    };
  };
  photo?: string;
  allergies?: string[];
  chronicConditions?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Admission {
  id: string;
  patientId: string;
  pid: string;
  wardId: string;
  wardName: string;
  bedNumber: string;
  admissionDate: string;
  dischargeDate?: string;
  status: 'registered' | 'admitted' | 'discharged';
  admittedBy: string;
  reason: string;
  notes?: string;
}

export interface Ward {
  id: string;
  code: string;
  name: string;
  totalBeds: number;
  occupiedBeds: number;
  department: string;
}

export interface Bed {
  id: string;
  wardId: string;
  number: string;
  status: 'free' | 'occupied' | 'reserved' | 'maintenance';
  patientId?: string;
}

export interface Order {
  id: string;
  patientId: string;
  type: 'test' | 'medication';
  code: string;
  description: string;
  priority: 'routine' | 'urgent' | 'stat';
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled';
  orderedBy: string;
  createdAt: string;
  completedAt?: string;
  results?: string;
  notes?: string;
}

export interface PIDComponents {
  siteCode: string;
  year: string;
  month: string;
  sequence: string;
  checkDigit: string;
}