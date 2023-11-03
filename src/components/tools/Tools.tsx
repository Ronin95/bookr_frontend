import ToolsImg from '../../assets/img/tools.png';
import pdfchat from '../../assets/img/conversePDF.png';
import aiwebsearch from '../../assets/img/web-search.png';
import aiagent from '../../assets/img/agentAI.png';
import './ToolsStyle.css';

function Tools() {
    return(
        <div className='tools-style'>
            <div className='txt-logo-tools'>
                <img className='logo-tools' src={ToolsImg} alt="tools-logo" />
                <h1>Tools</h1>
                <div className="blue-line-tools"></div>
            </div>
            <div className="tools-bar">
                <div className="files-styles">
                    <img className="menu-img-style" src={pdfchat} alt="converse-PDF" />
                    <h2>PDF Chat</h2>
                </div>
                <div className="files-styles">
                    <img className="menu-img-style" src={aiwebsearch} alt="search" />
                    <h2>AI Web Search</h2>
                </div>
                <div className="files-styles">
                    <img className="menu-img-style" src={aiagent} alt="agent" />
                    <h2>AI Agent</h2>
                </div>
            </div>
        </div>
    );
}

export default Tools;