import { format, addDays, setHours, setMinutes, isBefore, isToday, parse } from 'date-fns';
import { TimeSlot, Availability } from '../types';

export function generateTimeSlots(
  date: Date,
  availabilities: Availability[],
  bookedSlots: { time: string }[]
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
    const isBooked = bookedSlots.some(slot => slot.time === timeStr);
    
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

function addMinutes(date: Date, minutes: number): Date {
  return new Date(date.getTime() + minutes * 60000);
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
