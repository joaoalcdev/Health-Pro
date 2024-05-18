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
  state: string,
}

type Patients = {
  fullName: string,
  cpf: string,
  age: number,
  bloodType: string,
  gender: string,
  address: string,
  region: string,
  city: string,
  state: string,
  phoneNumber: string,
  emergencyContact: string,
}

type Professionals = {
  id?: string,
  fullName: string,
  rg: string,
  rgInssuance: string,
  cpf: string,
  gender: string,
  specialty: string,
  council: string,  
  councilInssuance: string,
  councilNumber: string,
}