import ToolsImg from '../../assets/img/tools.png';
import pdfchat from '../../assets/img/conversePDF.png';
import aiwebsearch from '../../assets/img/web-search.png';
import aiagent from '../../assets/img/agentAI.png';
import PDFChat from './PDFChat';
import WebSearch from './WebSearch';
import Agent from './Agent';
import './ToolsStyle.css';
import { Outlet, Link } from 'react-router-dom';

function Tools() {

    return(
        <div className='tools-style'>
            <div className='txt-logo-tools'>
                <img className='logo-tools' src={ToolsImg} alt="tools-logo" />
                <h1>Tools</h1>
                <div className="blue-line-tools"></div>
            </div>
            <div className='tools-display'>
                <div className="tools-bar">
                    <div className="files-styles">
                        <img className="menu-img-style" src={pdfchat} alt="pdfchat" />
                        <Link to={'pdfchat'}><p>PDF Chat</p></Link>
                    </div>
                    <div className="files-styles">
                        <img className="menu-img-style" src={aiwebsearch} alt="search" />
                        <Link to={'websearch'}><p>AI Web Search</p></Link>
                    </div>
                    <div className="files-styles">
                        <img className="menu-img-style" src={aiagent} alt="agent" />
                        <Link to={'agent'}><p>AI Agent</p></Link>
                    </div>
                </div>
                <div className='tool-chosen'>
                    <Outlet />
                </div>
            </div>
        </div>
    );
}

export default Tools;