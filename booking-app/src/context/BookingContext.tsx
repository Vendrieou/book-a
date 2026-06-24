import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Booking, Service, Availability, RecurringBooking, WaitlistEntry, Reminder } from '../types';

interface BookingContextType {
  services: Service[];
  bookings: Booking[];
  availabilities: Availability[];
  recurringBookings: RecurringBooking[];
  waitlist: WaitlistEntry[];
  reminders: Reminder[];
  isLoading: boolean;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  updateService: (service: Service) => Promise<void>;
  deleteService: (serviceId: string) => Promise<void>;
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  updateAvailability: (availability: Availability) => Promise<void>;
  addToWaitlist: (entry: Omit<WaitlistEntry, 'id' | 'status' | 'createdAt'>) => Promise<void>;
  processWaitlist: (slot: { date: string; time: string; serviceId: string }) => Promise<void>;
  createRecurringBooking: (recurring: Omit<RecurringBooking, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  sendReminder: (bookingId: string) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Mock data with buffer times
const mockServices: Service[] = [
  { id: '1', name: 'Consultation', description: 'Initial consultation session', duration: 30, price: 50, bufferTime: 10 },
  { id: '2', name: 'Follow-up', description: 'Follow-up appointment', duration: 20, price: 30, bufferTime: 5 },
  { id: '3', name: 'Full Session', description: 'Complete service session', duration: 60, price: 100, bufferTime: 15 },
];

const mockAvailabilities: Availability[] = [
  { dayOfWeek: 1, startTime: '09:00', endTime: '17:00', isAvailable: true },
  { dayOfWeek: 2, startTime: '09:00', endTime: '17:00', isAvailable: true },
  { dayOfWeek: 3, startTime: '09:00', endTime: '17:00', isAvailable: true },
  { dayOfWeek: 4, startTime: '09:00', endTime: '17:00', isAvailable: true },
  { dayOfWeek: 5, startTime: '09:00', endTime: '17:00', isAvailable: true },
];

export function BookingProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [availabilities, setAvailabilities] = useState<Availability[]>([]);
  const [recurringBookings, setRecurringBookings] = useState<RecurringBooking[]>([]);
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data from localStorage or use mock data
    const storedServices = localStorage.getItem('booking_services');
    const storedBookings = localStorage.getItem('booking_bookings');
    const storedAvailabilities = localStorage.getItem('booking_availabilities');
    const storedRecurring = localStorage.getItem('booking_recurring');
    const storedWaitlist = localStorage.getItem('booking_waitlist');
    const storedReminders = localStorage.getItem('booking_reminders');

    if (storedServices) {
      setServices(JSON.parse(storedServices));
    } else {
      setServices(mockServices);
      localStorage.setItem('booking_services', JSON.stringify(mockServices));
    }

    if (storedBookings) {
      setBookings(JSON.parse(storedBookings));
    } else {
      setBookings([]);
    }

    if (storedAvailabilities) {
      setAvailabilities(JSON.parse(storedAvailabilities));
    } else {
      setAvailabilities(mockAvailabilities);
      localStorage.setItem('booking_availabilities', JSON.stringify(mockAvailabilities));
    }

    if (storedRecurring) {
      setRecurringBookings(JSON.parse(storedRecurring));
    }

    if (storedWaitlist) {
      setWaitlist(JSON.parse(storedWaitlist));
    }

    if (storedReminders) {
      setReminders(JSON.parse(storedReminders));
    }

    setIsLoading(false);
  }, []);

  const addBooking = async (bookingData: Omit<Booking, 'id' | 'createdAt' | 'status'>) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newBooking: Booking = {
      ...bookingData,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    };

    const updatedBookings = [...bookings, newBooking];
    setBookings(updatedBookings);
    localStorage.setItem('booking_bookings', JSON.stringify(updatedBookings));
    
    // Process waitlist after booking is cancelled
    await processWaitlist({ date: bookingData.date, time: bookingData.time, serviceId: bookingData.serviceId });
  };

  const cancelBooking = async (bookingId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('booking_bookings', JSON.stringify(updatedBookings));
    
    // Get the cancelled booking details to process waitlist
    const cancelledBooking = bookings.find(b => b.id === bookingId);
    if (cancelledBooking) {
      await processWaitlist({ 
        date: cancelledBooking.date, 
        time: cancelledBooking.time, 
        serviceId: cancelledBooking.serviceId 
      });
    }
  };

  const updateService = async (service: Service) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const updatedServices = services.map(s => s.id === service.id ? service : s);
    setServices(updatedServices);
    localStorage.setItem('booking_services', JSON.stringify(updatedServices));
  };

  const deleteService = async (serviceId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const updatedServices = services.filter(s => s.id !== serviceId);
    setServices(updatedServices);
    localStorage.setItem('booking_services', JSON.stringify(updatedServices));
  };

  const addService = async (serviceData: Omit<Service, 'id'>) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newService: Service = {
      ...serviceData,
      id: Date.now().toString(),
    };

    const updatedServices = [...services, newService];
    setServices(updatedServices);
    localStorage.setItem('booking_services', JSON.stringify(updatedServices));
  };

  const updateAvailability = async (availability: Availability) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const updatedAvailabilities = availabilities.map(a =>
      a.dayOfWeek === availability.dayOfWeek ? availability : a
    );
    setAvailabilities(updatedAvailabilities);
    localStorage.setItem('booking_availabilities', JSON.stringify(updatedAvailabilities));
  };

  const addToWaitlist = async (entryData: Omit<WaitlistEntry, 'id' | 'status' | 'createdAt'>) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newEntry: WaitlistEntry = {
      ...entryData,
      id: Date.now().toString(),
      status: 'waiting',
      createdAt: new Date().toISOString(),
    };

    const updatedWaitlist = [...waitlist, newEntry];
    setWaitlist(updatedWaitlist);
    localStorage.setItem('booking_waitlist', JSON.stringify(updatedWaitlist));
  };

  const processWaitlist = async (slot: { date: string; time: string; serviceId: string }) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    // Find first waiting person for this service
    const waitingEntry = waitlist.find(
      w => w.serviceId === slot.serviceId && w.status === 'waiting' &&
           w.preferredDate === slot.date && w.preferredTime === slot.time
    );

    if (waitingEntry) {
      const updatedWaitlist = waitlist.map(w =>
        w.id === waitingEntry.id ? { ...w, status: 'notified' as const, notifiedAt: new Date().toISOString() } : w
      );
      setWaitlist(updatedWaitlist);
      localStorage.setItem('booking_waitlist', JSON.stringify(updatedWaitlist));
      
      // In a real app, send email/SMS notification here
      console.log(`Notifying ${waitingEntry.customerName} about available slot`);
    }
  };

  const createRecurringBooking = async (recurringData: Omit<RecurringBooking, 'id' | 'createdAt' | 'status'>) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const newRecurring: RecurringBooking = {
      ...recurringData,
      id: Date.now().toString(),
      status: 'active',
      createdAt: new Date().toISOString(),
    };

    const updatedRecurring = [...recurringBookings, newRecurring];
    setRecurringBookings(updatedRecurring);
    localStorage.setItem('booking_recurring', JSON.stringify(updatedRecurring));
    
    // Create individual bookings for each occurrence
    // This would be expanded in a real implementation
  };

  const sendReminder = async (bookingId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const booking = bookings.find(b => b.id === bookingId);
    if (!booking) return;

    const reminder: Reminder = {
      id: Date.now().toString(),
      bookingId,
      customerEmail: booking.customerEmail,
      customerName: booking.customerName,
      serviceName: booking.serviceName,
      appointmentDate: booking.date,
      appointmentTime: booking.time,
      sentAt: new Date().toISOString(),
      status: 'sent',
    };

    const updatedReminders = [...reminders, reminder];
    setReminders(updatedReminders);
    localStorage.setItem('booking_reminders', JSON.stringify(updatedReminders));
    
    // Update booking to mark reminder as sent
    const updatedBookings = bookings.map(b =>
      b.id === bookingId ? { ...b, reminderSent: true } : b
    );
    setBookings(updatedBookings);
    localStorage.setItem('booking_bookings', JSON.stringify(updatedBookings));
  };

  return (
    <BookingContext.Provider value={{
      services,
      bookings,
      availabilities,
      recurringBookings,
      waitlist,
      reminders,
      isLoading,
      addBooking,
      cancelBooking,
      updateService,
      deleteService,
      addService,
      updateAvailability,
      addToWaitlist,
      processWaitlist,
      createRecurringBooking,
      sendReminder,
    }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
}
