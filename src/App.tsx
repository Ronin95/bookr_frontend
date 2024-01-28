import React from 'react';
import Header from './components/header/Header';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Library from './components/library/Library';
import Tools from './components/tools/Tools';
import Progress from './components/progress/Progress';
import RootLayout from './components/Root';
import ErrorPage from './components/error/ErrorPage';
import './components/services/axiosSetup';
import { AuthProvider } from './components/services/AuthContext';
import PDFViewer from './components/library/PDFViewer';
import PDFChat from './components/tools/PDFChat';
import WebSearch from './components/tools/WebSearch';
import Agent from './components/tools/Agent';
import CreateNote from './components/progress/CreateNote';
import ManageNote from './components/progress/ManageNote';
import Kanban from './components/progress/Kanban';

const engine = new Styletron();

const App = () => {
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <AuthProvider>
                    <Router>
                        <Header />
                        <Routes>
                            <Route path="/" element={<RootLayout />}>
                                <Route path="library/*" element={<Library />}>
                                    <Route path="pdf/:filename" element={<PDFViewer filename={undefined} />}/>
                                </Route>
                                <Route path="tools/*" element={<Tools />} >
                                    <Route path="pdfchat/" element={<PDFChat />} />
                                    <Route path="websearch/" element={<WebSearch />} />
                                    <Route path="agent/" element={<Agent />} />
                                </Route>
                                <Route path="progress" element={<Progress />} >
                                    <Route path="createNote" element={<CreateNote/>} />
                                    <Route path="manageNote" element={<ManageNote />} />
                                    <Route path="kanban" element={<Kanban/>} />
                                </Route>
                            </Route>
                            <Route path="*" element={<ErrorPage />} />
                        </Routes>
                    </Router>
                </AuthProvider>
            </BaseProvider>
        </StyletronProvider>
    );
}

export default App;


