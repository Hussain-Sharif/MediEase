// Doctor availability status enum
export type DoctorAvailabilityStatus = 'Available' | 'Booked' | 'Busy' | 'On Leave';

export enum AvailabilityStatus {
    Available = "Available",
    Busy = "Busy",
    Booked = "Booked",
    OnLeave = "On Leave"
}

// Doctor specialization type
export type DoctorSpecialization = 
  | 'Dental'
  | 'Eye'
  | 'Nose'
  | 'General'
  | 'Heart'
  | 'Brain'
  | 'Skin';

export enum Specialization {
    Dental = "Dental",
    Eye = "Eye",
    Nose = "Nose",
    General = "General",
    Heart = "Heart",
    Brain = "Brain",
    Skin = "Skin"
}

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
  name: string;
  email: string;
  phone: string;
  appointmentDate: string; 
  appointmentTime: string;
}

export interface Bookings{
  user:Patient,
  doctor:Doctor|undefined
}
