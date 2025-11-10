// import { Link } from 'react-router-dom';
// import { ReactComponent as LogoDark } from 'src/assets/images/logos/Logo_Nova_1.svg';
import logo from 'src/assets/images/logos/logo.jpg';
import { styled } from '@mui/material';

/*
const LinkStyled = styled(Link)(() => ({
  height: '70px',
  width: '180px',
  overflow: 'hidden',
  display: 'block',
}));
*/

const Logo = () => {
  return (
  <img src={logo} alt= "logo" height={70} />

  )
};

export default Logo;
