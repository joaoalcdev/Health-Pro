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
  bloodType: string,
  marital: string,
  gender: string,
  dateBirth: string,
  address: string,
  region: string,
  city: string,
  state: string,
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