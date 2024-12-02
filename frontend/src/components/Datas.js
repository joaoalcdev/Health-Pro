import { HiOutlineUsers } from 'react-icons/hi';

import { TbChartHistogram, TbUsers } from 'react-icons/tb';
import { AiOutlineNotification } from "react-icons/ai";
import { FaRegCalendarAlt } from 'react-icons/fa';
import { RiFileList3Line, RiServiceLine, RiUserHeartLine, RiUserLine } from 'react-icons/ri';
import { LiaUserNurseSolid } from "react-icons/lia";
import { MdListAlt, MdOutlineInventory2 } from 'react-icons/md';
import { BiCalendar } from 'react-icons/bi';
import { IoIosRepeat } from "react-icons/io";
import { LuListStart } from "react-icons/lu";
import { GiThreeFriends } from 'react-icons/gi';


export const MenuDatas = [
  {
    title: 'Calendário',
    path: '/schedule',
    icon: FaRegCalendarAlt,
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
  {
    title: 'Profissionais',
    path: '/professionals',
    icon: RiUserHeartLine,
    roleAllowed: 1
  },
  {
    title: 'Pagamentos',
    path: '/payments',
    icon: MdListAlt,
    roleAllowed: 1
  },
  {
    title: 'Especialidades',
    path: '/specialties',
    icon: MdOutlineInventory2,
    roleAllowed: 1
  },
  {
    title: 'Lista de Espera',
    path: '/waitlist',
    icon: LuListStart,
    roleAllowed: 2
  },
  {
    title: 'Serviços Externos',
    path: '/external-services',
    icon: RiServiceLine,
    roleAllowed: 1
  }
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


export const sortsDatas = {
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
};


export const patientTab = [
  {
    id: 1,
    title: 'Informações do Paciente',
    icon: RiUserLine,
  },
  {
    id: 2,
    title: 'Histórico/Frequência',
    icon: TbChartHistogram,
  },
  {
    id: 3,
    title: 'Próximos Agendamentos',
    icon: BiCalendar,
  },
  {
    id: 4,
    title: 'Controle de Autorizações',
    icon: RiFileList3Line,
  }
];

export const externalServicesTabs = [
  {
    id: 1,
    title: 'Serviços Externos',
    icon: RiServiceLine,
  },
  {
    id: 2,
    title: 'Empresas Parceiras',
    icon: GiThreeFriends,
  },
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
];

export const professionalTab = [
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
    title: 'Pacientes',
    icon: TbUsers,
  },
  {
    id: 4,
    title: 'Histórico/Frequência',
    icon: TbChartHistogram,
  },
];