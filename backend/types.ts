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
  professionalPayment: number | null,
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
  payRate: number,
}

type EventInstance = {
  id?: number,
  eventId: number,
  startDate: string,
  endDate: string,
  status: number,
  agreementId: number,
  professionalId: number,
  patientId: number,
  serviceId: number,
  eventType: number,
  dischargedDate: string,
  hasConflict: boolean,
  eventsPerWeek: number,
  eventsQty: number,
  checkInName: string,
  timecodes: [{
    day: number,
    time: string
  }]
  grossValue: number,
  professionalRate: number,
  tax: number,
  profit: number,
}

type Fee = {
  id?: number,
  agreementId: number,
  professionalId: number,
  fee: number,
}

type ServicePrice = {
  id?: number,
  specialtyId: number,
  agreementId: number,
  serviceId: number,
  price: number,
  professionalPayment: number,
}

type RegularPrice = {
  id?: number,
  specialtyId: number,
  agreementId: number,
  price: number,
  professionalPayment: number,
}

type fee = {
  id?: number,
  agreementId: number,
  professionalId: number,
  fee: number,
}

type PayrollByService = {
  amountDue: number,
  events: Array<EventInstance>,
  profit: number,
  qty: number,
  serviceId: number,
  serviceName: string,
  tax: number,
  total: number,
}

type PayrollByAgreement = {
  agreementId: number,
  agreementName: string,
  amountDue: number,
  qty: number,
  tax: number,
  total: number,
  profit: number, 
  events: Array<PayrollByService>,
}



type PayrollData = {
  professionalAmountDue: number,
  professionalGrossValue: number,
  professionalId: number,
  professionalName: string,
  professionalProfit: number,
  professionalTax: number,
  qty: number,
  specialtyId: number,
  events: Array<PayrollByAgreement>,
}

type Payroll = {
  payrollData: PayrollData
}

type WaitlistItem = {
  id: number,
  patientId: number,
  specialtyId: number,
  listType: number,
  createdAt: string,
  deletedAt: string,
}

type Company = {
  id?: number,
  name: string,
  status: boolean,
}

type ExternalService = {
  id?: number,
  companyId: string,
  professionalName: string,
  date: string,
  value: number,
  service: string,
}

interface ProfessionalPayment {
  professionalId: number,
  agreementId: number,
  professionalPayment: number,
  agreementName?: string,
}



interface SingleEvent {
  eventId: number; 
  startTime: string;
  endTime: string;
  agreementId: number;
}


