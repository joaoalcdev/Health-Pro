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