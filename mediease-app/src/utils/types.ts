// Doctor availability status enum
export type DoctorAvailabilityStatus = 'Available' | 'Booked' | 'Busy' | 'On Leave';

// Doctor specialization type
export type DoctorSpecialization = 
  | 'Dental'
  | 'Eye'
  | 'Nose'
  | 'General'
  | 'Heart'
  | 'Brain'
  | 'Skin';

export interface Doctor {
  id: number;
  name: string;
  profile_image: string; // static file path
  availability_status: DoctorAvailabilityStatus;
  description: string;
  specialization: DoctorSpecialization[]; // Array for supporting multi-specialization
}

// Patient type for booking form
export interface Patient {
  id: number;
  name: string;
  email: string;
  phone: string;
  booking_date: string; // ISO-formatted date string
}
