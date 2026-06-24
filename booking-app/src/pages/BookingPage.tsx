import { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { useAuth } from '../../context/AuthContext';
import { ServiceCard } from './ServiceCard';
import { DateTimePicker } from './DateTimePicker';
import { BookingForm } from './BookingForm';
import { generateTimeSlots } from '../../utils/dateUtils';
import { Service, TimeSlot } from '../../types';

type BookingStep = 'service' | 'datetime' | 'details' | 'confirmation';

export function BookingPage() {
  const { services, availabilities, bookings, addBooking } = useBooking();
  const { user } = useAuth();
  
  const [step, setStep] = useState<BookingStep>('service');
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [bookingId, setBookingId] = useState<string | null>(null);

  const availableSlots: TimeSlot[] = selectedDate
    ? generateTimeSlots(
        selectedDate,
        availabilities,
        bookings.filter(b => b.date === selectedDate.toISOString().split('T')[0])
      )
    : [];

  const handleServiceSelect = (service: Service) => {
    setSelectedService(service);
    setStep('datetime');
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleContinueToDetails = () => {
    if (selectedService && selectedDate && selectedTime) {
      setStep('details');
    }
  };

  const handleBookingSubmit = async ({ name, email, notes }: { name: string; email: string; notes: string }) => {
    if (!selectedService || !selectedDate || !selectedTime) return;

    await addBooking({
      serviceId: selectedService.id,
      serviceName: selectedService.name,
      customerName: name,
      customerEmail: email,
      date: selectedDate.toISOString().split('T')[0],
      time: selectedTime,
      notes,
    });

    setBookingId(Date.now().toString());
    setStep('confirmation');
  };

  const handleNewBooking = () => {
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setBookingId(null);
    setStep('service');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-primary-900">Book an Appointment</h1>
          <p className="text-gray-600 mt-1">Schedule your visit with us</p>
        </div>
      </header>

      {/* Progress Steps */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {['Service', 'Date & Time', 'Your Details', 'Confirmation'].map((label, index) => {
              const stepNames: BookingStep[] = ['service', 'datetime', 'details', 'confirmation'];
              const currentStepIndex = stepNames.indexOf(step);
              const isCompleted = index < currentStepIndex;
              const isCurrent = index === currentStepIndex;

              return (
                <div key={label} className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-sm font-medium ${
                    isCompleted ? 'bg-accent-500 text-white' :
                    isCurrent ? 'bg-primary-900 text-white' :
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isCurrent ? 'text-primary-900' : 'text-gray-600'
                  }`}>
                    {label}
                  </span>
                  {index < 3 && (
                    <div className={`w-12 sm:w-24 h-0.5 mx-2 ${
                      isCompleted ? 'bg-accent-500' : 'bg-gray-200'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8">
        {step === 'service' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold text-primary-900 mb-6">Select a Service</h2>
            {services.map((service) => (
              <ServiceCard
                key={service.id}
                service={service}
                onSelect={handleServiceSelect}
                isSelected={false}
              />
            ))}
          </div>
        )}

        {step === 'datetime' && selectedService && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-primary-900 mb-2">Choose Date & Time</h2>
              <p className="text-gray-600">For {selectedService.name} ({selectedService.duration} min)</p>
            </div>
            <DateTimePicker
              selectedDate={selectedDate}
              selectedTime={selectedTime}
              availableSlots={availableSlots}
              onDateSelect={handleDateSelect}
              onTimeSelect={handleTimeSelect}
            />
            <button
              onClick={handleContinueToDetails}
              disabled={!selectedDate || !selectedTime}
              className="w-full py-3 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Continue
            </button>
          </div>
        )}

        {step === 'details' && (
          <div className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold text-primary-900 mb-2">Your Information</h2>
              <p className="text-gray-600">Complete your booking details</p>
            </div>
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="font-medium text-primary-900">{selectedService?.name}</h3>
              <p className="text-sm text-gray-600">
                {selectedDate?.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })} at {selectedTime}
              </p>
            </div>
            <BookingForm
              onSubmit={handleBookingSubmit}
              onCancel={() => setStep('datetime')}
            />
          </div>
        )}

        {step === 'confirmation' && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-primary-900 mb-2">Booking Confirmed!</h2>
            <p className="text-gray-600 mb-6">
              Your appointment has been successfully scheduled. We've sent a confirmation to your email.
            </p>
            {user?.role === 'customer' && (
              <p className="text-sm text-gray-500 mb-6">
                You can view and manage your bookings in the "My Bookings" section.
              </p>
            )}
            <button
              onClick={handleNewBooking}
              className="px-8 py-3 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors font-medium"
            >
              Book Another Appointment
            </button>
          </div>
        )}
      </main>
    </div>
  );
}
