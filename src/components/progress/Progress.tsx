import allNotes from '../../assets/img/allNotes.png';
import createTask from '../../assets/img/createTask.png';
import manageTask from '../../assets/img/manageTask.png';
import ProgressLogo from '../../assets/img/progress.png';
import './ProgressStyle.css';
import { Outlet, Link } from 'react-router-dom';


function Progress() {
    return(
        <div className='progress-style'>
            <div className='txt-logo-progress'>
                <img className='logo-tools' src={ProgressLogo} alt="tools-logo" />
                <h1>Kanban</h1>
                <div className="blue-line-tools"></div>
            </div>
            <div className="progress-bar-display">
                <div className='progress-bar'>
                    <div className="files-styles-progress">
                        <img className="img-style-progress" src={createTask} alt="converse-PDF" />
                        <Link to={'createNote'}><p>Create Note</p></Link>
                    </div>
                    <div className="files-styles-progress">
                        <img className="img-style-progress" src={manageTask} alt="search" />
                        <Link to={"manageNote"}><p>Edit Notes</p></Link>
                    </div>
                    <div className="files-styles-progress">
                        <img className="img-style-progress" src={allNotes} alt="agent" />
                        <Link to={'kanban'}><p>Kanban</p></Link>
                    </div>
                </div>
                <div className='tool-chosen'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Progress;