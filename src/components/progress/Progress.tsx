import allNotes from '../../assets/img/allNotes.png';
import createTask from '../../assets/img/createTask.png';
import manageTask from '../../assets/img/manageTask.png';
import ProgressLogo from '../../assets/img/progress.png';
import './ProgressStyle.css';

function Progress() {
    return(
        <div className='progress-style'>
            <div className='txt-logo-progress'>
                <img className='logo-tools' src={ProgressLogo} alt="tools-logo" />
                <h1>Progress</h1>
                <div className="blue-line-tools"></div>
            </div>
            <div className="progress-bar">
                <div className="files-styles-progress">
                    <img className="img-style-progress" src={createTask} alt="converse-PDF" />
                    <h2>Create Task</h2>
                </div>
                <div className="files-styles-progress">
                    <img className="img-style-progress" src={manageTask} alt="search" />
                    <h2>Manage Tasks</h2>
                </div>
                <div className="files-styles-progress">
                    <img className="img-style-progress" src={allNotes} alt="agent" />
                    <h2>All Notes</h2>
                </div>
            </div>
        </div>
    );
}

export default Progress;