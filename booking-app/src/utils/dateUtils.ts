import { format, addDays, setHours, setMinutes, isBefore, isToday, parse, addMinutes } from 'date-fns';
import { TimeSlot, Availability } from '../types';

export function generateTimeSlots(
  date: Date,
  availabilities: Availability[],
  bookedSlots: { time: string; duration?: number; bufferTime?: number }[]
): TimeSlot[] {
  const dayOfWeek = date.getDay();
  const availability = availabilities.find(a => a.dayOfWeek === dayOfWeek && a.isAvailable);

  if (!availability) {
    return [];
  }

  const slots: TimeSlot[] = [];
  const startTime = parse(availability.startTime, 'HH:mm', new Date());
  const endTime = parse(availability.endTime, 'HH:mm', new Date());

  // Generate 30-minute slots
  let currentTime = startTime;
  while (isBefore(currentTime, endTime)) {
    const timeStr = format(currentTime, 'HH:mm');
    
    // Check if this slot overlaps with any booked appointment (including buffer time)
    const currentMinutes = parseInt(timeStr.split(':')[0]) * 60 + parseInt(timeStr.split(':')[1]);
    let isBooked = false;
    
    for (const booking of bookedSlots) {
      const bookingStartMinutes = parseInt(booking.time.split(':')[0]) * 60 + parseInt(booking.time.split(':')[1]);
      const duration = booking.duration || 30;
      const bufferTime = booking.bufferTime || 0;
      const bookingEndMinutes = bookingStartMinutes + duration + bufferTime;
      
      // Check if current slot overlaps with this booking
      if (currentMinutes >= bookingStartMinutes && currentMinutes < bookingEndMinutes) {
        isBooked = true;
        break;
      }
    }

    // Only show slots that are in the future for today
    const now = new Date();
    const slotDateTime = setMinutes(setHours(date, parseInt(timeStr.split(':')[0])), parseInt(timeStr.split(':')[1]));

    const isPast = isToday(date) && isBefore(slotDateTime, now);

    slots.push({
      id: `${format(date, 'yyyy-MM-dd')}-${timeStr}`,
      date: format(date, 'yyyy-MM-dd'),
      time: timeStr,
      available: !isBooked && !isPast,
    });

    currentTime = addMinutes(currentTime, 30);
  }

  return slots;
}

export function getNextDays(days: number): Date[] {
  const result: Date[] = [];
  const today = new Date();

  for (let i = 0; i < days; i++) {
    result.push(addDays(today, i));
  }

  return result;
}

export function formatDate(date: Date): string {
  return format(date, 'EEEE, MMMM d');
}

export function formatShortDate(date: Date): string {
  return format(date, 'MMM d');
}

export function formatDayName(date: Date): string {
  return format(date, 'EEE');
}

export function calculateNextOccurrences(
  startDate: Date,
  endDate: Date,
  daysOfWeek: number[]
): Date[] {
  const occurrences: Date[] = [];
  let currentDate = new Date(startDate);

  while (currentDate <= endDate) {
    if (daysOfWeek.includes(currentDate.getDay())) {
      occurrences.push(new Date(currentDate));
    }
    currentDate = addDays(currentDate, 1);
  }

  return occurrences;
}

export function formatReminderTime(appointmentDate: string, appointmentTime: string): string {
  const date = parse(appointmentDate, 'yyyy-MM-dd', new Date());
  const timeParts = appointmentTime.split(':');
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  
  const ampm = hours >= 12 ? 'PM' : 'AM';
  const displayHours = hours % 12 || 12;
  const displayMinutes = minutes.toString().padStart(2, '0');
  
  return `${format(date, 'EEEE, MMMM d')} at ${displayHours}:${displayMinutes} ${ampm}`;
}
