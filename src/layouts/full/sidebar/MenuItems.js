import {
  IconAperture,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconUserPlus,
  IconBuilding,
  IconBriefcase,
  IconFolders,
  IconMailbox,
  IconDevices2,
  IconCertificate,
  IconUsers,
  IconClipboardList,
  IconReportMoney,
  IconBadge4k,
  IconBeach,
} from '@tabler/icons';

import { uniqueId } from 'lodash';

const Menuitems = [
  {
    navlabel: true,
    subheader: 'Home',
  },

  {
    id: uniqueId(),
    title: 'Dashboard',
    icon: IconLayoutDashboard,
    href: '/dashboard',
  },
  {
    navlabel: true,
    subheader: 'Cadastros',
  },
  {
    id: uniqueId(),
    title: 'Empresa',
    icon: IconBuilding,
    href: '/empresa',
  },
  {
    id: uniqueId(),
    title: 'Cliente PF',
    icon: IconBriefcase,
    href: '/pf',
  },
  {
    id: uniqueId(),
    title: 'Cliente PJ',
    icon: IconFolders,
    href: '/pj',
  },
  {
    id: uniqueId(),
    title: 'Locais',
    icon: IconMailbox,
    href: '/locais',
  },
  {
    id: uniqueId(),
    title: 'Contratos',
    icon: IconCertificate,
    href: '/contratos',
  },
  {
    id: uniqueId(),
    title: 'Ativos',
    icon: IconDevices2,
    href: '/ativos',
  },
  {
    id: uniqueId(),
    title: 'Funcionários',
    icon: IconUsers,
    href: '/funcionarios',
  },
  {
    id: uniqueId(),
    title: 'Visitas',
    icon: IconClipboardList,
    href: '/visitas',
  },
  {
    id: uniqueId(),
    title: 'Fechamentos',
    icon: IconReportMoney,
    href: '/fechamentos',
  },
  {
    navlabel: true,
    subheader: 'Administrativo',
  },
  {
    id: uniqueId(),
    title: 'Férias',
    icon: IconBeach,
    href: '/ferias',
  },
  {
    id: uniqueId(),
    title: 'Login',
    icon: IconLogin,
    href: '/auth/login',
  },
  {
    id: uniqueId(),
    title: 'Register',
    icon: IconUserPlus,
    href: '/auth/register',
  },
  {
    navlabel: true,
    subheader: 'Extra',
  },
  {
    id: uniqueId(),
    title: 'Icons',
    icon: IconMoodHappy,
    href: '/icons',
  },
  {
    id: uniqueId(),
    title: 'Sample Page',
    icon: IconAperture,
    href: '/sample-page',
  },
];

export default Menuitems;
