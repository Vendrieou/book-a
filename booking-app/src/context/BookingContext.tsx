import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Booking, Service, Availability } from '../types';

interface BookingContextType {
  services: Service[];
  bookings: Booking[];
  availabilities: Availability[];
  isLoading: boolean;
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt' | 'status'>) => Promise<void>;
  cancelBooking: (bookingId: string) => Promise<void>;
  updateService: (service: Service) => Promise<void>;
  deleteService: (serviceId: string) => Promise<void>;
  addService: (service: Omit<Service, 'id'>) => Promise<void>;
  updateAvailability: (availability: Availability) => Promise<void>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

// Mock data
const mockServices: Service[] = [
  { id: '1', name: 'Consultation', description: 'Initial consultation session', duration: 30, price: 50 },
  { id: '2', name: 'Follow-up', description: 'Follow-up appointment', duration: 20, price: 30 },
  { id: '3', name: 'Full Session', description: 'Complete service session', duration: 60, price: 100 },
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load data from localStorage or use mock data
    const storedServices = localStorage.getItem('booking_services');
    const storedBookings = localStorage.getItem('booking_bookings');
    const storedAvailabilities = localStorage.getItem('booking_availabilities');

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
  };

  const cancelBooking = async (bookingId: string) => {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const updatedBookings = bookings.map(booking =>
      booking.id === bookingId ? { ...booking, status: 'cancelled' as const } : booking
    );
    setBookings(updatedBookings);
    localStorage.setItem('booking_bookings', JSON.stringify(updatedBookings));
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

  return (
    <BookingContext.Provider value={{
      services,
      bookings,
      availabilities,
      isLoading,
      addBooking,
      cancelBooking,
      updateService,
      deleteService,
      addService,
      updateAvailability,
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
