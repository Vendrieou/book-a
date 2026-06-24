import { useState } from 'react';
import { TimeSlot } from '../../types';
import { formatDayName, formatShortDate } from '../../utils/dateUtils';
import { cn } from '../../utils/cn';

interface DateTimePickerProps {
  selectedDate: Date | null;
  selectedTime: string | null;
  availableSlots: TimeSlot[];
  onDateSelect: (date: Date) => void;
  onTimeSelect: (time: string) => void;
}

export function DateTimePicker({
  selectedDate,
  selectedTime,
  availableSlots,
  onDateSelect,
  onTimeSelect,
}: DateTimePickerProps) {
  const [viewedWeek, setViewedWeek] = useState(0);

  const getNextDays = (weekOffset: number) => {
    const days: Date[] = [];
    const start = new Date();
    start.setDate(start.getDate() + weekOffset * 7);
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(start);
      date.setDate(start.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const days = getNextDays(viewedWeek);

  const handlePrevWeek = () => {
    if (viewedWeek > 0) {
      setViewedWeek(viewedWeek - 1);
    }
  };

  const handleNextWeek = () => {
    setViewedWeek(viewedWeek + 1);
  };

  return (
    <div className="space-y-6">
      {/* Week Navigation */}
      <div className="flex items-center justify-between">
        <button
          onClick={handlePrevWeek}
          disabled={viewedWeek === 0}
          className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <h3 className="text-lg font-semibold text-primary-900">
          {viewedWeek === 0 ? 'This Week' : `Week of ${formatShortDate(days[0])}`}
        </h3>
        <button
          onClick={handleNextWeek}
          className="p-2 rounded-lg hover:bg-gray-100"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Date Selection */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((date) => {
          const isSelected = selectedDate?.toDateString() === date.toDateString();
          const isToday = date.toDateString() === new Date().toDateString();
          
          return (
            <button
              key={date.toISOString()}
              onClick={() => onDateSelect(date)}
              className={cn(
                'flex flex-col items-center p-3 rounded-xl transition-all duration-200',
                isSelected
                  ? 'bg-primary-900 text-white shadow-md'
                  : 'hover:bg-gray-100 border border-gray-200'
              )}
            >
              <span className={cn('text-xs font-medium mb-1', isToday && !isSelected && 'text-accent-600')}>
                {formatDayName(date)}
              </span>
              <span className="text-lg font-bold">{date.getDate()}</span>
            </button>
          );
        })}
      </div>

      {/* Time Selection */}
      {selectedDate && (
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">Available Times</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {availableSlots.length > 0 ? (
              availableSlots.map((slot) => (
                <button
                  key={slot.id}
                  onClick={() => slot.available && onTimeSelect(slot.time)}
                  disabled={!slot.available}
                  className={cn(
                    'py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200',
                    slot.available
                      ? selectedTime === slot.time
                        ? 'bg-accent-500 text-white shadow-md'
                        : 'border border-gray-300 hover:border-accent-500 hover:text-accent-600'
                      : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  )}
                >
                  {slot.time}
                </button>
              ))
            ) : (
              <p className="col-span-full text-gray-500 text-center py-4">
                No available slots for this date
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
