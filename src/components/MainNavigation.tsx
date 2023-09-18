import { Link } from 'react-router-dom';

function MainNavigation() {
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/library">Library</Link></li>
                    <li><Link to="/tools">AI Tools</Link></li>
                    <li><Link to="/progress">Progress</Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;