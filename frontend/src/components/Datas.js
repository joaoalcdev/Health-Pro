import { HiOutlineHome, HiOutlineMail, HiOutlineUsers } from 'react-icons/hi';

import { TbChartHistogram, TbUsers } from 'react-icons/tb';
import { getPatients } from '../api/PatientsAPI';
import { AiOutlineNotification } from "react-icons/ai";
import { FaRegCalendarAlt, FaTelegramPlane, FaWhatsapp } from 'react-icons/fa';
import { RiFileList3Line, RiMoneyDollarCircleLine, RiUserHeartLine, RiUserLine } from 'react-icons/ri';
import { LiaUserNurseSolid } from "react-icons/lia";
import { MdListAlt, MdOutlineInventory2, MdOutlineTextsms } from 'react-icons/md';
import { AiOutlineSetting } from 'react-icons/ai';
import { BiCalendar, BiUserPlus } from 'react-icons/bi';
import { IoIosRepeat } from "react-icons/io";


export const MenuDatas = [
  {
    title: 'Dashboard',
    path: '/home',
    icon: HiOutlineHome,
    roleAllowed: 3
  },
  {
    title: 'Usuários',
    path: '/users',
    icon: HiOutlineUsers,
    roleAllowed: 1
  },
  {
    title: 'Pacientes',
    path: '/patients',
    icon: TbUsers,
    roleAllowed: 2
  },
  // {
  //   title: 'Receptions',
  //   path: '/receptions',
  //   icon: HiOutlineUsers,
  //   roleAllowed: 2
  // },
  {
    title: 'Profissionais',
    path: '/professionals',
    icon: RiUserHeartLine,
    roleAllowed: 1
  },
  {
    title: 'Agendamentos',
    path: '/schedule',
    icon: FaRegCalendarAlt,
    roleAllowed: 3
  },
  {
    title: 'Pagamentos',
    path: '/payments',
    icon: MdListAlt,
    roleAllowed: 1
  },
  // {
  //   title: 'Invoices',
  //   path: '/invoices',
  //   icon: TbFileInvoice,
  //   roleAllowed: 1
  // },
  {
    title: 'Especialidades',
    path: '/specialties',
    icon: MdOutlineInventory2,
    roleAllowed: 1
  },
  // {
  //   title: 'Serviços',
  //   path: '/services',
  //   icon: MdOutlineInventory2,
  //   roleAllowed: 1
  // },
  // {
  //   title: 'Campaigns',
  //   path: '/campaigns',
  //   icon: MdOutlineCampaign,
  //   roleAllowed: 1
  // },
  {
    title: 'Settings',
    path: '/settings',
    icon: AiOutlineSetting,
    roleAllowed: 3
  },
];

export const eventTypes = [
  { id: 1, name: 'Sessão recorrente (sem previsão de alta)', color: '#5DADE2' },
  { id: 2, name: 'Sessão recorrente simples', color: '#F7DC6F' },
  { id: 3, name: 'Atendimento/Sessão', color: '#66b5a3' },
  { id: 4, name: 'Consulta', color: '#ff9900' },
  { id: 5, name: 'Retorno', color: '#ff0000' },
];

export const weekDays = [
  { id: 0, name: 'Domingo' },
  { id: 1, name: 'Segunda-feira' },
  { id: 2, name: 'Terça-feira' },
  { id: 3, name: 'Quarta-feira' },
  { id: 4, name: 'Quinta-feira' },
  { id: 5, name: 'Sexta-feira' },
  { id: 6, name: 'Sábado' },
];

export const timeOptions = [{ id: 1, name: '1x' }, { id: 2, name: '2x' }, { id: 3, name: '3x' }, { id: 4, name: '4x' }, { id: 5, name: '5x' }];

export const eventStatus = [
  { id: 1, name: 'Agendado', color: '#F7DC6F' },
  { id: 2, name: 'Concluído', color: '#66b5a3' },
];

export const roleOptions = {
  roles: [
    {
      id: 1,
      name: 'Administrador',
      description: 'All permissions'
    },
    {
      id: 2,
      name: 'Recepcionista',
      description: 'Paciente, Consulta '

    },
    {
      id: 3,
      name: 'Profissional',
      description: 'Dashboard'
    }

  ]
};

export const genderDatas = {
  gender: [
    {
      id: 1,
      name: 'Masculino',
    },
    {
      id: 2,
      name: 'Feminino',
    },
    {
      id: 3,
      name: 'Não informado',
    },
    {
      id: 4,
      name: 'Prefiro não dizer',
    }
  ]
};

export const maritalDatas = {
  marital: [
    {
      id: 1,
      name: 'Solteiro(a)',
    },
    {
      id: 2,
      name: 'Casado(a)',
    },
    {
      id: 3,
      name: 'Não informado...',
    },
  ]
}

export const insuranceDatas = {
  insurance: [
    {
      id: 1,
      name: 'Particular',
    },
    {
      id: 2,
      name: 'Unimed',
    },
    {
      id: 3,
      name: 'CapSesp',
    },
    {
      id: 4,
      name: 'Cassi',
    },
    {
      id: 5,
      name: 'Outro...',
    },
  ]
}

export const councilDatas = {

  council: [
    {
      id: 1,
      name: "COREN",
      description: "Conselho Regional de Enfermagem (COREn)"
    },
    {
      id: 2,
      name: "CRM",
      description: "Conselho Regional de Medicina (CRM)"
    },
    {
      id: 3,
      name: "CRO",
      description: "Conselho Regional de Odontologia (CRO)"
    },
    {
      id: 4,
      name: "CRESS",
      description: "Conselho Regional de Serviço Social (CRESS)"
    },
    {
      id: 5,
      name: "CRF",
      description: "Conselho Regional de Farmácia (CRF)"
    },
    {
      id: 6,
      name: "CREFITO",
      description: "Conselho Regional de Fisioterapia e Terapia Ocupacional (CREFITO)"
    },
    {
      id: 7,
      name: "CRN",
      description: "Conselho Regional de Nutrição (CRN)"
    },
    {
      id: 8,
      name: "CRP",
      description: "Conselho Regional de Psicologia (CRP)"
    },
    {
      id: 9,
      name: "CRFA",
      description: "Conselho Regional de Fonoaudiologia (CRFa/CREFONO)"
    },
    {
      id: 10,
      name: "CRTR",
      description: "Conselho Regional de Técnicos em Radiologia (CRTR)"
    },
    {
      id: 11,
      name: "other",
      description: "Outro órgão não listado"
    }
  ]
}


export const specialties = {
  specialty: [
    { id: 1, name: 'Fonoaudiologia' },
    { id: 2, name: 'Assistente Social' },
    { id: 3, name: 'Endocrinologia' },
    { id: 4, name: 'Gastroenterologia' },
    { id: 5, name: 'Geriatria' },
    { id: 6, name: 'Ginecologia' },
    { id: 7, name: 'Hematologia' },
    { id: 8, name: 'Infectologia' },
    { id: 9, name: 'Cardiologia' },
  ],
}

export const agreements = {
  agreement: [
    { id: 1, name: 'Particular' },
    { id: 2, name: 'UNIMED' },
    { id: 3, name: 'CASSI' },
    { id: 4, name: 'CAPSESP' },
    { id: 5, name: 'Outro...' },
  ],
}

export const brStateDatas = {
  states: [
    { id: 1, name: "Acre", UF: "AC", available: true },
    { id: 2, name: "Alagoas", UF: "AL", available: true },
    { id: 3, name: "Amapá", UF: "AP", available: true },
    { id: 4, name: "Amazonas", UF: "AM", available: true },
    { id: 5, name: "Bahia", UF: "BA", available: true },
    { id: 6, name: "Ceará", UF: "CE", available: true },
    { id: 7, name: "Distrito Federal", UF: "DF", available: true },
    { id: 8, name: "Espírito Santo", UF: "ES", available: true },
    { id: 9, name: "Goiás", UF: "GO", available: true },
    { id: 10, name: "Maranhão", UF: "MA", available: true },
    { id: 11, name: "Mato Grosso", UF: "MT", available: true },
    { id: 12, name: "Mato Grosso do Sul", UF: "MS", available: true },
    { id: 13, name: "Minas Gerais", UF: "MG", available: true },
    { id: 14, name: "Pará", UF: "PA", available: true },
    { id: 15, name: "Paraíba", UF: "PB", available: true },
    { id: 16, name: "Paraná", UF: "PR", available: true },
    { id: 17, name: "Pernambuco", UF: "PE", available: true },
    { id: 18, name: "Piauí", UF: "PI", available: true },
    { id: 19, name: "Rio de Janeiro", UF: "RJ", available: true },
    { id: 20, name: "Rio Grande do Norte", UF: "RN", available: true },
    { id: 21, name: "Rio Grande do Sul", UF: "RS", available: true },
    { id: 22, name: "Rondônia", UF: "RO", available: true },
    { id: 23, name: "Roraima", UF: "RR", available: true },
    { id: 24, name: "Santa Catarina", UF: "SC", available: true },
    { id: 25, name: "São Paulo", UF: "SP", available: true },
    { id: 26, name: "Sergipe", UF: "SE", available: true },
    { id: 27, name: "Tocantins", UF: "TO", available: true }
  ]
}

export const memberData = [
  {
    id: 1,
    title: 'Hugo Lloris',
    image: '/images/user1.png',
    admin: false,
    email: 'hugolloris@gmail.com',
    phone: '+1 234 567 890',
    age: 25,
    gender: 'Male',
    blood: 'A+',
    totalAppointments: 5,
    date: '20 Aug 2021',
  },
  {
    id: 2,
    title: 'Mauris auctor',
    image: '/images/user2.png',
    admin: false,
    email: 'maurisauctor@gmail.com',
    phone: '+1 456 789 123',
    age: 34,
    gender: 'Female',
    blood: 'B+',
    totalAppointments: 3,
    date: '22 Nov 2023',
  },
  {
    id: 3,
    title: 'Michael Owen',
    image: '/images/user3.png',
    admin: false,
    phone: '+1 890 123 456',
    email: 'michaelowen@gmail.com',
    age: 45,
    gender: 'Male',
    blood: 'O+',
    totalAppointments: 26,
    date: '12 Jan 2020',
  },
  {
    id: 4,
    title: 'Amina Smith',
    image: '/images/user4.png',
    admin: true,
    phone: '+1 908 765 432',
    email: 'aminasmith@gmail.com',
    age: 28,
    gender: 'Female',
    blood: 'AB+',
    totalAppointments: 17,
    date: '07 Feb 2001',
  },
  {
    id: 5,
    title: 'Minahil Khan',
    image: '/images/user5.png',
    admin: false,
    phone: '+1 890 123 456',
    email: 'minahilkhan@gmail.com',
    age: 35,
    gender: 'Female',
    blood: 'A+',
    totalAppointments: 9,
    date: '30 Dec 2019',
  },
  {
    id: 6,
    title: 'Alex Morgan',
    image: '/images/user6.png',
    admin: false,
    phone: '+1 908 765 432',
    email: 'alexmorgan@gmail.com',
    age: 29,
    gender: 'Male',
    blood: 'B+',
    totalAppointments: 34,
    date: '12 Jan 2020',
  },
  {
    id: 7,
    title: 'John Doe',
    image: '/images/user7.png',
    admin: false,
    phone: '+1 234 567 890',
    email: 'johndoe@gmail.com',
    age: 32,
    gender: 'Male',
    blood: 'O-',
    totalAppointments: 12,
    date: '18 Mar 2023',
  },
  {
    id: 8,
    title: 'David Beckham',
    image: '/images/user8.png',
    admin: false,
    phone: '+1 456 789 123',
    email: 'davidbackham@gmail.com',
    age: 27,
    gender: 'Female',
    blood: 'AB+',
    totalAppointments: 70,
    date: '01 June 2018',
  },
];

export const sortsDatas = {
  status: [
    {
      id: 1,
      name: 'Status...',
    },
    {
      id: 2,
      name: 'Pending',
    },
    {
      id: 3,
      name: 'Approved',
    },
    {
      id: 4,
      name: 'Cancelled',
    },
  ],
  method: [
    {
      id: 1,
      name: 'Payment method',
    },
    {
      id: 2,
      name: 'Cash',
    },
    {
      id: 3,
      name: 'NHCF Insurance',
    },
    {
      id: 4,
      name: 'Britam Insurance',
    },
  ],
  currency: [
    {
      id: 1,
      name: 'Select Currency',
    },
    {
      id: 2,
      name: 'USD (US Dollar)',
    },
    {
      id: 3,
      name: 'EUR (Euro)',
    },
    {
      id: 4,
      name: 'TSH (Tanzanian Shilling)',
    },
  ],
  instractions: [
    {
      id: 1,
      name: 'Select Instraction',
    },
    {
      id: 2,
      name: 'After Meal',
    },
    {
      id: 3,
      name: 'Before Meal',
    },
  ],
  measure: [
    {
      id: 1,
      name: 'Select Measure',
    },
    {
      id: 2,
      name: 'mg',
    },
    {
      id: 3,
      name: 'ml',
    },
    {
      id: 4,
      name: 'gm',
    },
    {
      id: 5,
      name: 'kg',
    },
    {
      id: 6,
      name: 'lb',
    },
    {
      id: 7,
      name: 'tbsp',
    },
    {
      id: 8,
      name: 'tablet',
    },
    {
      id: 9,
      name: 'capsule',
    },
  ],
  stocks: [
    {
      id: 1,
      name: 'All',
    },
    {
      id: 2,
      name: 'Available',
    },
    {
      id: 3,
      name: 'Out of Stock',
    },
  ],
  service: [
    {
      id: 1,
      name: 'All',
    },
    {
      id: 2,
      name: 'Enabled',
    },
    {
      id: 3,
      name: 'Disabled',
    },
  ],
  title: [
    {
      id: 1,
      name: 'Dr.',
    },
    {
      id: 2,
      name: 'Mr.',
    },
    {
      id: 3,
      name: 'Mrs.',
    },
    {
      id: 4,
      name: 'Ms.',
    },
  ],
  filterPatient: [
    {
      id: 1,
      name: 'Sort by...',
    },
    {
      id: 2,
      name: 'Newest Patients',
    },
    {
      id: 3,
      name: 'Oldest Patients',
    },
  ],
  genderFilter: [
    {
      id: 1,
      name: 'Gênero...',
    },
    {
      id: 2,
      name: 'Feminino',
    },
    {
      id: 3,
      name: 'Masculino',
    },
    {
      id: 4,
      name: 'Prefiro não dizer',
    },
  ],
  bloodTypeFilter: [
    {
      id: 1,
      name: 'Não informado...',
      available: true,
    },
    {
      id: 2,
      name: 'A+',
      available: true,
    },
    {
      id: 3,
      name: 'A-',
      available: true,
    },
    {
      id: 4,
      name: 'B+',
      available: true,
    },
    {
      id: 5,
      name: 'B-',
      available: true,
    },
    {
      id: 6,
      name: 'AB+',
      available: true,
    },
    {
      id: 7,
      name: 'AB-',
      available: true,
    },
    {
      id: 8,
      name: 'O+',
      available: true,
    },
    {
      id: 9,
      name: 'O-',
      available: true,
    },
  ],
  dosage: [
    {
      id: 1,
      name: 'Morning (M)',
      value: 'morning',
    },
    {
      id: 2,
      name: 'Afternoon (A)',
      value: 'afternoon',
    },
    {
      id: 3,
      name: 'Evening (E)',
      value: 'evening',
    },
  ],
};

export const campaignData = [
  {
    id: 1,
    title: 'Offer on Dental Checkup',
    date: '3 days ago',
    type: 'email',
    sendTo: 'All Patients',
    action: {
      subject: 'Delight patients with a free dental checkup',
      message:
        'Dear Patient, We are delighted to offer you a free dental checkup. Please visit our clinic to avail this offer. Thank you. and have a nice day. and welcome to our clinic.',
      subHeader: 'Offer on Dental Checkup',
      header: 'How to avail this offer?',
      footer: 'This offer is valid till 30th June, 2021',
    },
  },
  {
    id: 2,
    title: 'Britam Insurance Offer',
    date: '8 days ago',
    type: 'whatsapp',
    sendTo: 'Britam Patients',
    action: {
      message:
        'Hellow Patient, are you looking for a free dental checkup? We are delighted to offer you a free dental checkup. Please visit our clinic to avail this offer. Thank you.',
    },
  },
  {
    id: 3,
    title: 'NHCF Insurance Offer',
    date: '10 days ago',
    type: 'sms',
    sendTo: 'NHCF Patients',
    action: {
      message:
        'Hola, Delight patient with NHCF Insurance, We are delighted to offer you a free dental checkup. Please visit our clinic to avail this offer. Thank you.',
    },
  },
  {
    id: 4,
    title: 'Cash patients offer',
    date: '15 days ago',
    type: 'sms',
    sendTo: 'Cash Patients',
    action: {
      message:
        'Delight Patient, now get 50% off on dental checkup. Please visit our clinic to avail this offer. Thank you. and have a nice day. and welcome to our clinic.',
    },
  },
  {
    id: 5,
    title: 'Braces Offer',
    date: '12 days ago',
    type: 'email',
    sendTo: 'Britam Patients',
    action: {
      subject: 'Delight patients with a free dental checkup',
      message:
        'Dear Patient, Britam Insurance is delighted to offer you a free dental checkup. Please visit our clinic to avail this offer. Thank you. and have a nice day. and welcome to our clinic.',
      subHeader: 'Braces Offer for Britam Patients',
      header: 'Now get braces at 50% off',
      footer: 'This offer is valid till 30th June, 2021',
    },
  },
  {
    id: 6,
    title: 'Teeth Whitening Offer',
    date: '20 days ago',
    type: 'whatsapp',
    sendTo: 'All Patients',
    action: {
      message:
        'Hola, Delight patient with Teeth Whitening Offer, We are delighted to offer you a free dental checkup. Please visit our clinic to avail this offer. Thank you.',
    },
  },
];
export const servicesData = [
  {
    id: 1,
    name: 'Select service.. ',
  },
  {
    id: 2,
    name: 'Root Canal',
    price: 40000,
    date: '23 June, 2021',
    status: true,
  },
  {
    id: 3,
    name: 'Teeth Whitening',
    price: 20000,
    date: '12 Jan, 2022',
    status: true,
  },
  {
    id: 4,
    name: 'Dental Implants',
    price: 50000,
    date: '11 April, 2023',
    status: false,
  },
  {
    id: 5,
    name: 'Dental Crowns',
    price: 34000,
    date: '10 Agst, 2021',
    status: true,
  },
  {
    id: 6,
    name: 'Dental Bridges',
    price: 10400,
    date: '23 June, 2021',
    status: false,
  },
  {
    id: 7,
    name: 'Dental Veneers',
    price: 150000,
    date: '09 Dec, 2023',
    status: false,
  },
  {
    id: 8,
    name: 'Dental Braces',
    price: 23000,
    date: '05 Feb, 2019',
    status: true,
  },
  {
    id: 9,
    name: 'Dental Sealants',
    price: 40000,
    date: '16 Nov, 2022',
    status: true,
  },
  {
    id: 10,
    name: 'Dentures',
    price: 19000,
    date: '02 Jun, 2022',
    status: false,
  },
  {
    id: 11,
    name: 'Tooth Extraction',
    price: 160000,
    date: '23 June, 2021',
    status: true,
  },
];

export const invoicesData = [
  {
    id: 206719,
    to: memberData[5],
    total: 6070,
    createdDate: '12/06/2021',
    dueDate: '16/06/2021',
    items: [
      {
        id: 1,
        name: servicesData[0].name,
        price: 500,
        description:
          'Root Canal Treatment with X-Ray and Consultation is included in this package',
      },
      {
        id: 2,
        name: servicesData[1].name,
        price: 300,
        description: 'Teeth Whitening Treatment',
      },
      {
        id: 3,
        name: servicesData[2].name,
        price: 260,
        description: 'Dental Implants Treatment',
      },
      {
        id: 4,
        name: servicesData[3].name,
        price: 190000,
        description: 'Dental Crowns Treatment',
      },
      {
        id: 5,
        name: servicesData[4].name,
        price: 15000,
        description: 'Dental Bridges Treatment',
      },
    ],
  },
  {
    id: 198772,
    to: memberData[6],
    total: 5000,
    createdDate: '10/02/2023',
    dueDate: '14/02/2023',
    items: [
      {
        id: 1,
        name: servicesData[3].name,
        price: 190000,
        description: 'Dental Crowns Treatment',
      },
      {
        id: 2,
        name: servicesData[4].name,
        price: 15000,
        description: 'Dental Bridges Treatment',
      },
      {
        id: 3,
        name: servicesData[8].name,
        price: 20000,
        description: 'Dentures Treatment',
      },
      {
        id: 4,
        name: servicesData[3].name,
        price: 190000,
        description: 'Dental Crowns Treatment',
      },
    ],
  },
  {
    id: 456789,
    to: memberData[7],
    total: 10000,
    createdDate: '09/01/2023',
    dueDate: '13/01/2023',
    items: [
      {
        id: 1,
        name: servicesData[5].name,
        price: 5000,
        description: 'Dental Veneers Treatment',
      },
      {
        id: 2,
        name: servicesData[6].name,
        price: 16000,
        description: 'Dental Braces Treatment',
      },
      {
        id: 3,
        name: servicesData[7].name,
        price: 10000,
        description: 'Dental Sealants Treatment',
      },
      {
        id: 4,
        name: servicesData[8].name,
        price: 20000,
        description: 'Dentures Treatment',
      },
    ],
  },
  {
    id: 876543,
    to: memberData[4],
    total: 19000,
    createdDate: '08/01/2023',
    dueDate: '12/01/2023',
    items: [
      {
        id: 1,
        name: servicesData[5].name,
        price: 5000,
        description: 'Dental Veneers Treatment',
      },
      {
        id: 2,
        name: servicesData[6].name,
        price: 16000,
        description: 'Dental Braces Treatment',
      },
      {
        id: 3,
        name: servicesData[7].name,
        price: 10000,
        description: 'Dental Sealants Treatment',
      },
      {
        id: 4,
        name: servicesData[8].name,
        price: 20000,
        description: 'Dentures Treatment',
      },
      {
        id: 5,
        name: servicesData[3].name,
        price: 190000,
        description: 'Dental Crowns Treatment',
      },
      {
        id: 6,
        name: servicesData[4].name,
        price: 15000,
        description: 'Dental Bridges Treatment',
      },
    ],
  },
];

export const appointmentsData = [
  {
    id: 1,
    time: '2 hrs later',
    user: memberData[4],
    from: '10:00 AM',
    to: '12:00 PM',
    hours: 2,
    status: 'Pending',
    doctor: memberData[0],
    date: 'Jun 12, 2021',
  },
  {
    id: 2,
    time: '1 hrs ago',
    user: memberData[5],
    from: '13:00 Pm',
    to: '18:00 PM',
    hours: 5,
    status: 'Cancel',
    doctor: memberData[1],
    date: 'Feb 24, 2021',
  },
  {
    id: 3,
    time: '2 hrs ago',
    user: memberData[6],
    from: '10:00 AM',
    to: '12:00 PM',
    hours: 2,
    status: 'Approved',
    doctor: memberData[2],
    date: 'Mar 12, 2023',
  },
  {
    id: 4,
    time: '3 hrs later',
    user: memberData[7],
    from: '06:00 AM',
    to: '08:00 AM',
    hours: 3,
    status: 'Pending',
    doctor: memberData[3],
    date: 'Apr 06, 2023',
  },
  {
    id: 5,
    time: '4 hrs ago',
    user: memberData[3],
    from: '10:00 AM',
    to: '12:00 PM',
    hours: 7,
    status: 'Approved',
    doctor: memberData[4],
    date: 'May 18, 2023',
  },
];

export const transactionData = [
  {
    id: 1,
    user: memberData[0],
    date: 'Mar 12, 2022',
    amount: 1000,
    status: 'Paid',
    method: 'Cash',
    doctor: memberData[3],
  },
  {
    id: 2,
    user: memberData[1],
    date: 'Agus 12, 2023',
    amount: 2300,
    status: 'Paid',
    method: 'NHCF',
    doctor: memberData[4],
  },
  {
    id: 3,
    user: memberData[2],
    date: 'Jan 06, 2024',
    amount: 1200,
    status: 'Pending',
    method: 'Britam',
    doctor: memberData[5],
  },
  {
    id: 4,
    user: memberData[3],
    date: 'Feb 18, 2025',
    amount: 1400,
    status: 'Cancel',
    method: 'NHCF',
    doctor: memberData[6],
  },
  {
    id: 5,
    user: memberData[4],
    date: 'Mar 12, 2026',
    amount: 1230,
    status: 'Pending',
    method: 'Cash',
    doctor: memberData[7],
  },
  {
    id: 6,
    user: memberData[5],
    date: 'Apr 12, 2027',
    amount: 1000,
    status: 'Paid',
    method: 'NHCF',
    doctor: memberData[0],
  },
  {
    id: 7,
    user: memberData[6],
    date: 'May 12, 2028',
    amount: 8900,
    status: 'Cancel',
    method: 'Britam',
    doctor: memberData[1],
  },
  {
    id: 8,
    user: memberData[7],
    date: 'Jun 12, 2029',
    amount: 1000,
    status: 'Pending',
    method: 'Britam',
    doctor: memberData[2],
  },
];


export const notificationsData = [
  {
    id: 1,
    action: 1,
    user: memberData[0],
    time: '2 hours ago',
  },
  {
    id: 2,
    action: 2,
    user: memberData[1],
    time: '2 days ago',
  },
  {
    id: 3,
    action: 1,
    user: memberData[2],
    time: '3 days ago',
  },
  {
    id: 4,
    action: 2,
    user: memberData[3],
    time: '4 days ago',
  },
];

export const shareData = [
  {
    id: 1,
    icon: HiOutlineMail,
    title: 'Email',
    description: 'Send to patient email address',
  },
  {
    id: 2,
    icon: MdOutlineTextsms,
    title: 'SMS',
    description: 'Send to patient phone number',
  },
  {
    id: 3,
    icon: FaWhatsapp,
    title: 'WhatsApp',
    description: 'Send to patient WhatsApp account',
  },
  {
    id: 4,
    icon: FaTelegramPlane,
    title: 'Telegram',
    description: 'Send to patient Telegram account',
  },
];

export const medicineData = [
  {
    id: 1,
    name: 'Paracetamol',
    measure: 'Tablet',
    stock: 400,
    price: 1000,
    status: 'Available',
    instraction: 'After meal',
  },
  {
    id: 2,
    name: 'Amoxicillin',
    measure: 'Capsule',
    stock: 200,
    price: 2300,
    status: 'Available',
    instraction: 'After meal',
  },
  {
    id: 3,
    name: 'Ibuprofen',
    measure: 'mm',
    stock: 0,
    price: 5000,
    status: 'Out of stock',
    instraction: 'Before meal',
  },
  {
    id: 4,
    name: 'Aspirin',
    measure: 'cm',
    stock: 370,
    price: 3500,
    status: 'Available',
    instraction: 'After meal',
  },
  {
    id: 5,
    name: 'Diazepam',
    measure: 'gm',
    stock: 0,
    price: 12000,
    status: 'Out of stock',
    instraction: 'Before meal',
  },
  {
    id: 6,
    name: 'Lorazepam',
    measure: 'mg',
    stock: 123,
    price: 15500,
    status: 'Available',
    instraction: 'Before meal',
  },
  {
    id: 7,
    name: 'nameine',
    measure: 'ml',
    stock: 1,
    price: 30000,
    status: 'Available',
    instraction: 'After meal',
  },
  {
    id: 8,
    name: 'Tramadol',
    measure: 'lb',
    stock: 0,
    price: 200,
    status: 'Out of stock',
    instraction: 'Before meal',
  },
];

export const patientTab = [
  {
    id: 1,
    title: 'Histórico',
    icon: TbChartHistogram,
  },
  {
    id: 2,
    title: 'Informações do Paciente',
    icon: RiUserLine,
  },
  {
    id: 3,
    title: 'Consultas',
    icon: BiCalendar,
  },
  {
    id: 4,
    title: 'Invoices',
    icon: RiFileList3Line,
  },
  {
    id: 5,
    title: 'Pagamentos',
    icon: RiMoneyDollarCircleLine,
  },
  // {
  //   id: 5,
  //   title: 'Images',
  //   icon: RiImageLine,
  // },
  // {
  //   id: 6,
  //   title: 'Dental Chart',
  //   icon: RiStethoscopeLine,
  // },
  // {
  //   id: 8,
  //   title: 'Health Information',
  //   icon: RiHeartLine,
  // },
];

export const eventsTab = [
  {
    id: 1,
    title: 'Informações',
    icon: BiCalendar,
  },
  {
    id: 2,
    title: 'Informações do Paciente',
    icon: RiUserLine,
  },
  {
    id: 3,
    title: 'Informações do Profissional',
    icon: LiaUserNurseSolid,
  },
  {
    id: 4,
    title: 'Recorrência',
    icon: IoIosRepeat,
  },
  {
    id: 5,
    title: 'Lembrete',
    icon: AiOutlineNotification,
  },
  // {
  //   id: 5,
  //   title: 'Invoices',
  //   icon: RiFileList3Line,
  // },
  // {
  //   id: 6,
  //   title: 'Access Control',
  //   icon: TbLockAccess,
  // },
  // {
  //   id: 7,
  //   title: 'Change Password',
  //   icon: RiLockPasswordLine,
  // },
];


export const doctorTab = [
  {
    id: 1,
    title: 'Calendário',
    icon: BiCalendar,
  },
  {
    id: 2,
    title: 'Informações do Profissional',
    icon: RiUserLine,
  },
  {
    id: 3,
    title: 'Agenda',
    icon: BiCalendar,
  },
  {
    id: 4,
    title: 'Pagamentos',
    icon: RiMoneyDollarCircleLine,
  },
  // {
  //   id: 5,
  //   title: 'Invoices',
  //   icon: RiFileList3Line,
  // },
  // {
  //   id: 6,
  //   title: 'Access Control',
  //   icon: TbLockAccess,
  // },
  // {
  //   id: 7,
  //   title: 'Change Password',
  //   icon: RiLockPasswordLine,
  // },
  {
    id: 8,
    title: 'Pacientes',
    icon: BiUserPlus,
  }
];

export const medicalRecodData = [
  {
    id: 1,
    date: '13, Jan 2021',
    amount: 150000,
    data: [
      {
        id: 1,
        title: 'Complaint',
        value: 'Bleeding Gums, Toothache, bad breath',
      },
      {
        id: 2,
        title: 'Diagnosis',
        value: 'Gingivitis, Caries, Periodontitis',
      },
      {
        id: 3,
        title: 'Treatment',
        value: 'Filling, Post&Core, Implant, Extraction',
      },
      {
        id: 4,
        title: 'Prescription',
        value: 'Paracetamol, Amoxicillin, Ibuprofen, Aspirin',
      },
    ],
    attachments: [
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
    ],
    vitalSigns: [
      'Blood Pressure: 120/80 mmHg',
      'Pulse Rate: 80 bpm',
      'Respiratory Rate: 16 bpm',
      'Temperature: 36.5 °C',
      'Oxygen Saturation: 98%',
    ],
  },
  {
    id: 2,
    date: '10, Feb 2022',
    amount: 300000,
    data: [
      {
        id: 1,
        title: 'Complaint',
        value: 'Food impaction, Replacing Missing Teeth, bad breath',
      },
      {
        id: 2,
        title: 'Diagnosis',
        value: 'Caries, Periodontitis, Malocclusion',
      },
      {
        id: 3,
        title: 'Treatment',
        value: 'Superficial Scaling, Root Planing, Extraction',
      },
      {
        id: 4,
        title: 'Prescription',
        value: 'Benzocaine, Lidocaine, Mepivacaine, Prilocaine',
      },
    ],
    attachments: [
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
    ],
    vitalSigns: [
      'Weight: 60 kg',
      'Height: 170 cm',
      'BMI: 20.76 kg/m2',
      'Blood Pressure: 120/80 mmHg',
    ],
  },
  {
    id: 3,
    date: '20, Mar 2022',
    amount: 500000,
    data: [
      {
        id: 1,
        title: 'Complaint',
        value: 'Broken Teeth, Bridge, Cap in the front teeth',
      },
      {
        id: 2,
        title: 'Diagnosis',
        value: 'Unspecified Gingival Recession, Unspecified Caries',
      },
      {
        id: 3,
        title: 'Treatment',
        value: 'Consultation, Scaling, Root Planing, Extraction',
      },
      {
        id: 4,
        title: 'Prescription',
        value: 'Gingival Gel, Chlorhexidine, Fluoride, Calcium',
      },
    ],
    attachments: [
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
    ],
    vitalSigns: [
      'Temperature: 36.5 °C',
      'Oxygen Saturation: 98%',
      'Blood Pressure: 120/80 mmHg',
      'Pulse Rate: 80 bpm',
      'Respiratory Rate: 16 bpm',
    ],
  },
  {
    id: 4,
    date: '10, Apr 2022',
    amount: 760000,
    data: [
      {
        id: 1,
        title: 'Complaint',
        value: 'Toothache, bad breath, Bleeding Gums',
      },
      {
        id: 2,
        title: 'Diagnosis',
        value: 'Necrotizing Ulcerative Gingivitis, Periodontitis',
      },
      {
        id: 3,
        title: 'Treatment',
        value: 'Crowns, Bridges, Veneers, Implants',
      },
      {
        id: 4,
        title: 'Prescription',
        value: 'Tramadol, nameine, Morphine, Oxycodone',
      },
    ],
    attachments: [
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
      'https://placehold.it/300x300',
    ],
    vitalSigns: [
      'Sugar Level: 120 mg/dL',
      'Oxygen Saturation: 98%',
      'Cholesterol: 200 mg/dL',
      'Blood Pressure: 120/80 mmHg',
    ],
  },
];

export const doctorsData = [
  {
    id: 1,
    user: memberData[0],
    title: 'Dr.',
  },
  {
    id: 2,
    user: memberData[1],
    title: 'Dr.',
  },
  {
    id: 3,
    user: memberData[2],
    title: 'Dr.',
  },
  {
    id: 4,
    user: memberData[3],
    title: 'Dr.',
  },
];

export const receptionsData = [
  {
    id: 1,
    user: memberData[6],
    title: 'Dr.',
  },
  {
    id: 2,
    user: memberData[7],
    title: 'Dr.',
  },
  {
    id: 3,
    user: memberData[5],
    title: 'Dr.',
  },
  {
    id: 4,
    user: memberData[4],
    title: 'Dr.',
  },
  {
    id: 5,
    user: memberData[2],
    title: 'Dr.',
  },
  {
    id: 6,
    user: memberData[1],
    title: 'Dr.',
  },
];
