import { Link } from 'react-router-dom';
import './MainNavigation.css';
import Library from '../../assets/img/library.png';
import Progress from '../../assets/img/progress.png';
import Tools from '../../assets/img/tools.png';

function MainNavigation() {
    return (
        <header className='overall'>
            <nav>
                <div className="links-style">
                    <div className='txt-logo'>
                        <img className='img-style' src={Library} alt="library-logo" />
                        <Link to="/library">Library</Link>
                    </div>
                    <div className="rectangleBlue"></div>
                </div>
                <div className="links-style">
                    <div className='txt-logo'>
                        <img className='img-style' src={Tools} alt="tool-logo" />
                        <Link to="/tools">Tools</Link>
                    </div>
                    <div className="rectangleBlue"></div>
                </div>
                <div className="links-style">
                    <div className='txt-logo'>
                        <img className='img-style' src={Progress} alt="progress-logo" />
                        <Link to="/progress">Progress</Link>
                    </div>
                    <div className="rectangleBlue"></div>
                </div>
            </nav>
        </header>
    );
}

export default MainNavigation;