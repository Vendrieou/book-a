export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // in minutes
  price?: number;
  bufferTime?: number; // buffer time after appointment in minutes
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
  reminderSent?: boolean;
  recurringBookingId?: string;
  isRecurring?: boolean;
}

export interface RecurringBooking {
  id: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  startTime: string;
  endTime: string;
  daysOfWeek: number[]; // 0-6 (Sunday-Saturday)
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  createdAt: string;
}

export interface WaitlistEntry {
  id: string;
  serviceId: string;
  serviceName: string;
  customerName: string;
  customerEmail: string;
  preferredDate: string;
  preferredTime: string;
  status: 'waiting' | 'notified' | 'booked' | 'expired';
  notifiedAt?: string;
  createdAt: string;
}

export interface Availability {
  dayOfWeek: number; // 0-6 (Sunday-Saturday)
  startTime: string;
  endTime: string;
  isAvailable: boolean;
}

export interface Reminder {
  id: string;
  bookingId: string;
  customerEmail: string;
  customerName: string;
  serviceName: string;
  appointmentDate: string;
  appointmentTime: string;
  sentAt?: string;
  status: 'scheduled' | 'sent' | 'failed';
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'customer' | 'admin';
}
