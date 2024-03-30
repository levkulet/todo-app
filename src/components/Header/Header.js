import './Header.scss';
import { FaTasks } from 'react-icons/fa';
import { GiBleedingEye } from 'react-icons/gi';
import MainMenu from '../MainMenu/MainMenu';

function Header() {
    return (
        <>
            <header>
                <div className="title"> <FaTasks /> Todo App</div>
                <div className="author">by Leviel Nicolas <GiBleedingEye /></div>
            </header>

            <MainMenu />
        </>
    );
}

export default Header;