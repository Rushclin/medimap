import { number } from "zod";

export interface Facility {
   id           :string;
  type         :FacilityType ;
  name         :string;
  address      :string;
  city         :string;
  postalCode   :string;
  country      :string;        
  phone        :string;
  email        :string;
  website      :string;
  latitude     :number; 
  longitude    :number; 
  openingHours :OpeningHour[]
  doctors      :Doctor[]
  stocks       :Stock[]
}


export type FacilityType = 'PHARMACY' | 'HOSPITAL';
export type WeekDay = "MONDAY" |
  "TUESDAY" |
  "WEDNESDAY"|
  "THURSDAY"|
  "FRIDAY"|
  "SATURDAY"|
  "SUNDAY"

export interface OpeningHour {
  id               :string;         
  healthFacility   :Facility ;
  healthFacilityId :string;
  day              :WeekDay
  openTime         :string; // Format "HH:MM"
  closeTime        :string; // Format "HH:MM"
  isClosed         : Boolean
}

export interface Doctor {
  id               :string;               
  healthFacility   :Facility  ;     
  healthFacilityId :string;
  firstName        :string;
  lastName         :string;
  specialty        :string;
  phone            :string;
  email            :string;
  availability     :DoctorAvailability[];
}

export interface DoctorAvailability {
  id       :string;
  doctor   :Doctor;  
  doctorId :string;
  date     :Date // Date et heure de disponibilité
  isBooked :Boolean
}

export interface  Stock {
  id               :string;         
  healthFacility   :Facility 
  healthFacilityId :string;
  medication       :Medication    ;
  medicationId     :string;
  quantity         :number;
  available        :Boolean;
  lastRestocked?    :Date;
  price            :number;
}

export interface Medication {
  id          :string;    
  name        :string; 
  description :string; 
  code        :string; 
  stocks      :Stock[]
}