type Users = {
  id?: string,
  firstName: string,
  lastName: string,
  phoneNumber: string,
  email: string,
  password: string,
  roleId: number,
  address: string,
  city: string,
  region: string,
  state: number,
  gender: number,
}

type Patients = {
  fullName: string,
  cpf: string,
  rg: string,
  bloodType: string,
  marital: string,
  gender: string,
  dateBirth: string,
  address: string,
  region: string,
  city: string,
  state: string,
  insurance: string,
  cardNumber: string,
  phoneNumber: string,
  emergencyContact: string,
  paternalFiliation: string,
  maternalFiliation: string,
  paternalFiliationContact: string,
  maternalFiliationContact: string,
}

type Professionals = {
  userId?: string,
  id?: string,
  fullName: string,
  rg: string,
  rgInssuance: string,
  cpf: string,
  specialty: number,
  council: number,
  councilInssuance: number,
  councilNumber: string,
}

type Appointment = {
  id?: number,
  patientId: number,
  professionalId: number,
  startTime: string,
  endTime: string,
  status: number,
  service: number,
  agreement: number,
  type: number,
  eventStatus: number
}

type Specialty = {
  id?: number,
  name: string,
  status: boolean,
  prices: Object,
}

type Price = {
  id?: number,
  specialtyId: number,
  serviceId?: number,
  agreementId: number,
  price: number,
}

type Service = {
  id?: number,
  name: string,
  status: boolean,
  specialtyId: number,
  initialPrice: number,
  recurringPrice: number,
}

type ScheduleEvent = {
  id?: number,
  eventInstanceId?: number,
  patientId: number,
  professionalId: number,
  serviceId?: number,
  startDate: object,
  agreementId: number,
  agAuthCode?: string,
  agAuthDate?: string,
  agPreCode?: string,
  agPreCodeDate?: string,
  endTime?: string,
  title?: string,
  eventType: number,
  dischargedDate?: object,
  hasConflict?: boolean,
  eventsPerWeek?: number,
  eventsQty?: number,
  checkInName?: string,
  timecodes?: [{
    day: number,
    time: object
  }]
}

interface SingleEvent {
  eventId: number; 
  startTime: string;
  endTime: string;
  agreementId: number;
}

