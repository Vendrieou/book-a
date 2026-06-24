export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price?: number;
}

export interface TimeSlot {
  id: string;
  date: string;
  time: string;
  available: boolean;
}

export interface Booking {
  id: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  date: string;
  time: string;
  notes?: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface Availability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
}
