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
import MainNavigation from './components/services/MainNavigation';

const engine = new Styletron();

const App = () => {
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <AuthProvider>
                    <Router>
                        <Routes>
                            <Route path="/" element={<RootLayout />}>
                                <Route index element={<Header />} />
                                <Route path="library" element={<Library />} />
                                <Route path="tools" element={<Tools />} />
                                <Route path="progress" element={<Progress />} />
                                <Route path="main" element={<MainNavigation/>} />
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
