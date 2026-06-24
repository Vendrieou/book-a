import { Service } from '../../types';

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
  isSelected: boolean;
}

export function ServiceCard({ service, onSelect, isSelected }: ServiceCardProps) {
  return (
    <button
      onClick={() => onSelect(service)}
      className={`w-full text-left p-6 rounded-xl border-2 transition-all duration-200 ${
        isSelected
          ? 'border-primary-900 bg-primary-50 shadow-md'
          : 'border-gray-200 hover:border-primary-300 hover:bg-gray-50'
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-primary-900">{service.name}</h3>
        {service.price && (
          <span className="text-accent-600 font-bold">${service.price}</span>
        )}
      </div>
      <p className="text-gray-600 mb-3">{service.description}</p>
      <div className="flex items-center text-sm text-gray-500">
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {service.duration} minutes
      </div>
    </button>
  );
}
