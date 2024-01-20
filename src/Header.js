import { FaLaptop, FaTabletAlt, FaMobileAlt } from 'react-icons/fa';
import { useWindowSize } from './hooks/useWindowSize'
import { Link } from 'react-router-dom';



const Header = ({ title }) => {

  const dimension = useWindowSize();
  const width = dimension.width;
  console.log(" we are printing width ")
  console.log(width);

  // const width = 44;
  return (
    <header className="Header">
      <Link to={'/'}>
        <h1>{title}</h1>
      </Link>
      {width < 768 ? <FaMobileAlt />
      : width < 992 ? <FaTabletAlt /> 
      :<FaLaptop/> }
    </header>
  )
}

export default Header