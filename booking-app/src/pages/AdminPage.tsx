import { useState } from 'react';
import { useBooking } from '../../context/BookingContext';
import { Service, Availability } from '../../types';

const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export function AdminPage() {
  const { services, availabilities, bookings, addService, updateService, deleteService, updateAvailability } = useBooking();
  const [activeTab, setActiveTab] = useState<'services' | 'availability' | 'bookings'>('services');
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [newService, setNewService] = useState({ name: '', description: '', duration: 30, price: 0 });

  const handleAddService = async () => {
    if (newService.name && newService.description) {
      await addService(newService);
      setNewService({ name: '', description: '', duration: 30, price: 0 });
    }
  };

  const handleUpdateService = async () => {
    if (editingService) {
      await updateService(editingService);
      setEditingService(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-primary-900">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Manage your booking system</p>
        </div>
      </header>

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex gap-4">
            {[
              { id: 'services', label: 'Services' },
              { id: 'availability', label: 'Availability' },
              { id: 'bookings', label: 'Bookings' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`py-4 px-2 border-b-2 font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary-900 text-primary-900'
                    : 'border-transparent text-gray-600 hover:text-gray-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 py-8">
        {/* Services Tab */}
        {activeTab === 'services' && (
          <div className="space-y-8">
            {/* Add New Service */}
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-primary-900 mb-4">Add New Service</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Service Name"
                  value={newService.name}
                  onChange={(e) => setNewService({ ...newService, name: e.target.value })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
                <input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={newService.duration}
                  onChange={(e) => setNewService({ ...newService, duration: parseInt(e.target.value) || 0 })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
                <input
                  type="number"
                  placeholder="Price ($)"
                  value={newService.price}
                  onChange={(e) => setNewService({ ...newService, price: parseFloat(e.target.value) || 0 })}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                />
              </div>
              <textarea
                placeholder="Description"
                value={newService.description}
                onChange={(e) => setNewService({ ...newService, description: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none mb-4 resize-none"
                rows={2}
              />
              <button
                onClick={handleAddService}
                className="px-6 py-2 bg-primary-900 text-white rounded-lg hover:bg-primary-800 transition-colors font-medium"
              >
                Add Service
              </button>
            </div>

            {/* Existing Services */}
            <div className="space-y-4">
              <h2 className="text-lg font-semibold text-primary-900">Existing Services</h2>
              {services.map((service) => (
                <div key={service.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  {editingService?.id === service.id ? (
                    <div className="space-y-4">
                      <input
                        type="text"
                        value={editingService.name}
                        onChange={(e) => setEditingService({ ...editingService, name: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <input
                          type="number"
                          value={editingService.duration}
                          onChange={(e) => setEditingService({ ...editingService, duration: parseInt(e.target.value) || 0 })}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                        <input
                          type="number"
                          value={editingService.price || 0}
                          onChange={(e) => setEditingService({ ...editingService, price: parseFloat(e.target.value) || 0 })}
                          className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none"
                        />
                      </div>
                      <textarea
                        value={editingService.description}
                        onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 outline-none resize-none"
                        rows={2}
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={handleUpdateService}
                          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingService(null)}
                          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-primary-900">{service.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{service.description}</p>
                        <p className="text-gray-500 text-sm mt-2">
                          {service.duration} min • ${service.price}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => setEditingService(service)}
                          className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => deleteService(service.id)}
                          className="px-3 py-1 text-sm border border-red-300 text-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Availability Tab */}
        {activeTab === 'availability' && (
          <div className="bg-white rounded-xl border border-gray-200 p-6">
            <h2 className="text-lg font-semibold text-primary-900 mb-6">Weekly Schedule</h2>
            <div className="space-y-4">
              {availabilities.map((avail) => (
                <div key={avail.dayOfWeek} className="flex items-center gap-4 py-3 border-b border-gray-100 last:border-0">
                  <div className="w-32">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={avail.isAvailable}
                        onChange={(e) => updateAvailability({ ...avail, isAvailable: e.target.checked })}
                        className="rounded border-gray-300 text-primary-900 focus:ring-primary-500"
                      />
                      <span className="font-medium text-gray-900">{dayNames[avail.dayOfWeek]}</span>
                    </label>
                  </div>
                  {avail.isAvailable && (
                    <div className="flex items-center gap-2">
                      <input
                        type="time"
                        value={avail.startTime}
                        onChange={(e) => updateAvailability({ ...avail, startTime: e.target.value })}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                      <span className="text-gray-500">to</span>
                      <input
                        type="time"
                        value={avail.endTime}
                        onChange={(e) => updateAvailability({ ...avail, endTime: e.target.value })}
                        className="px-3 py-1 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 outline-none"
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-primary-900">All Bookings</h2>
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <div key={booking.id} className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-primary-900">{booking.serviceName}</h3>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(booking.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })} at {booking.time}
                      </p>
                      <p className="text-sm text-gray-600">{booking.customerName} ({booking.customerEmail})</p>
                      {booking.notes && (
                        <p className="text-sm text-gray-500 mt-2 italic">"{booking.notes}"</p>
                      )}
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                      booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                      booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-600 text-center py-8">No bookings yet</p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
