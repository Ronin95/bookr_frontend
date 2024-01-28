import { Link } from 'react-router-dom';
import './MainNavigation.css';
import Library from '../../assets/img/library.png';
import Progress from '../../assets/img/progress.png';
import Tools from '../../assets/img/tools.png';

interface MainNavigationProps {
    onHideCoverImg: () => void;
}

/**
 * The `function MainNavigation() {` is defining a functional component called `MainNavigation`. This component returns a
 * JSX element, which represents the navigation bar of a website.
 * 
 * @function
 * @name MainNavigation
 * @kind function
 * @returns {JSX.Element}
 */
function MainNavigation({ onHideCoverImg }: MainNavigationProps) {
    const handleLinkClick = () => {
      onHideCoverImg();
    };

    return (
        <header>
            <nav className='overall' onClick={handleLinkClick}>
                <div className="links-style">
                    <div className='txt-logo'>
                        <img className='img-style' src={Library} alt="library-logo" />
                        <Link to="/library">Library</Link>
                    </div>
                    <div className="rectangleBlue"></div>
                </div>
                <div className="rectangleGreen"></div>
                <div className="links-style">
                    <div className='txt-logo'>
                        <img className='img-style' src={Tools} alt="tool-logo" />
                        <Link to="/tools">Tools</Link>
                    </div>
                    <div className="rectangleBlue"></div>
                </div>
                <div className="rectangleGreen"></div>
                <div className="links-style">
                    <div className='txt-logo'>
                        <img className='img-style' src={Progress} alt="progress-logo" />
                        <Link to="/progress">Kanban</Link>
                    </div>
                    <div className="rectangleBlue"></div>
                </div>
            </nav>
        </header>
    );
}

export default MainNavigation;