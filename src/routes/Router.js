import React, { lazy } from 'react';
import { Navigate } from 'react-router-dom';
import Loadable from '../layouts/full/shared/loadable/Loadable';
import Empresa from '../views/empresa/Empresa';
import PJ from '../views/cliente/PJ';
import PF from '../views/cliente/PF';
import Locais from '../views/cliente/Locais';
import Ativo from '../views/ativo/Ativo';
import Contrato from '../views/contrato/Contrato';
import Funcionario from '../views/funcionario/Funcionario';
import Visita from '../views/visita/Visita';
import Fechamento from '../views/fechamento/Fechamento';

/* ***Layouts**** */
const FullLayout = Loadable(lazy(() => import('../layouts/full/FullLayout')));
const BlankLayout = Loadable(lazy(() => import('../layouts/blank/BlankLayout')));

/* ****Pages***** */
const Dashboard = Loadable(lazy(() => import('../views/dashboard/Dashboard')))
const SamplePage = Loadable(lazy(() => import('../views/sample-page/SamplePage')))
const Icons = Loadable(lazy(() => import('../views/icons/Icons')))
const TypographyPage = Loadable(lazy(() => import('../views/utilities/TypographyPage')))
const Shadow = Loadable(lazy(() => import('../views/utilities/Shadow')))
const Error = Loadable(lazy(() => import('../views/authentication/Error')));
const Register = Loadable(lazy(() => import('../views/authentication/Register')));
const Login = Loadable(lazy(() => import('../views/authentication/Login')));

const Router = [
  {
    path: '/',
    element: <FullLayout />,
    children: [
      { path: '/', element: <Navigate to="/dashboard" /> },
      { path: '/dashboard', exact: true, element: <Dashboard /> },
      { path: '/empresa', exact: true, element: <Empresa /> },
      { path: '/pj', exact: true, element: <PJ /> },
      { path: '/pf', exact: true, element: <PF /> },
      { path: '/locais', exact: true, element: <Locais /> },
      { path: '/ativos', exact: true, element: <Ativo /> },
      { path: '/contratos', exact: true, element: <Contrato /> },
      { path: '/funcionarios', exact: true, element: <Funcionario /> },
      { path: '/visitas', exact: true, element: <Visita /> },
      { path: '/fechamentos', exact: true, element: <Fechamento /> },
      { path: '/sample-page', exact: true, element: <SamplePage /> },
      { path: '/icons', exact: true, element: <Icons /> },
      { path: '/ui/typography', exact: true, element: <TypographyPage /> },
      { path: '/ui/shadow', exact: true, element: <Shadow /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
  {
    path: '/auth',
    element: <BlankLayout />,
    children: [
      { path: '404', element: <Error /> },
      { path: '/auth/register', element: <Register /> },
      { path: '/auth/login', element: <Login /> },
      { path: '*', element: <Navigate to="/auth/404" /> },
    ],
  },
];

export default Router;
