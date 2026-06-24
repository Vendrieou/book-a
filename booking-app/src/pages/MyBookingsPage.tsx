import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useBooking } from '../../context/BookingContext';
import { BookingCard } from '../../components/BookingCard';

export function MyBookingsPage() {
  const { user } = useAuth();
  const { bookings, cancelBooking } = useBooking();
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-primary-900 mb-2">Sign in required</h2>
          <p className="text-gray-600">Please sign in to view your bookings</p>
        </div>
      </div>
    );
  }

  const now = new Date();
  const userBookings = bookings.filter(b => b.customerEmail === user.email);
  
  const filteredBookings = userBookings.filter(booking => {
    const bookingDate = new Date(`${booking.date}T${booking.time}`);
    const isUpcoming = bookingDate >= now;
    return filter === 'upcoming' ? isUpcoming : !isUpcoming;
  });

  const handleCancel = async (bookingId: string) => {
    if (confirm('Are you sure you want to cancel this booking?')) {
      await cancelBooking(bookingId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-primary-900">My Bookings</h1>
          <p className="text-gray-600 mt-1">Manage your appointments</p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Filter Tabs */}
        <div className="flex gap-2 mb-6">
          <button
            onClick={() => setFilter('upcoming')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'upcoming'
                ? 'bg-primary-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Upcoming
          </button>
          <button
            onClick={() => setFilter('past')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'past'
                ? 'bg-primary-900 text-white'
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            Past
          </button>
        </div>

        {/* Bookings List */}
        {filteredBookings.length > 0 ? (
          <div className="space-y-4">
            {filteredBookings.map((booking) => (
              <BookingCard
                key={booking.id}
                booking={booking}
                onCancel={handleCancel}
                showCancel={filter === 'upcoming' && booking.status === 'confirmed'}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
            <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bookings found</h3>
            <p className="text-gray-600">
              {filter === 'upcoming' 
                ? "You don't have any upcoming bookings" 
                : "You don't have any past bookings"}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
