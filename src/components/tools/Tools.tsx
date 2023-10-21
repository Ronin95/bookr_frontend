import ToolsImg from '../../assets/img/tools.png';
import converse from '../../assets/img/conversePDF.png';
import websearch from '../../assets/img/web-search.png';
import agent from '../../assets/img/agentAI.png';
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
                    <img className="menu-img-style" src={converse} alt="converse-PDF" />
                    <h2>Converse with files</h2>
                </div>
                <div className="files-styles">
                    <img className="menu-img-style" src={websearch} alt="search" />
                    <h2>Web Search</h2>
                </div>
                <div className="files-styles">
                    <img className="menu-img-style" src={agent} alt="agent" />
                    <h2>AI Agent</h2>
                </div>
            </div>
        </div>
    );
}

export default Tools;