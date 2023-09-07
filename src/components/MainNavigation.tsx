import { Link } from 'react-router-dom';

function MainNavigation() {
    return (
        <header>
            <nav>
                <ul>
                    <li>Test<Link to="/library"></Link></li>
                    <li>Test<Link to="/tools"></Link></li>
                    <li>Test<Link to="/progress"></Link></li>
                </ul>
            </nav>
        </header>
    );
}

export default MainNavigation;