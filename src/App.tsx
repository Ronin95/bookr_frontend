import Header from './components/header/Header';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Library from './components/library/Library';
import Tools from './components/tools/Tools';
import Progress from './components/progress/Progress';
import RootLayout from './components/Root';
import ErrorPage from './components/error/ErrorPage';

const engine = new Styletron();

const router = createBrowserRouter([
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            { path: '/', element: <Header /> },
            { path: '/library', element: <Library /> },
        ]
    },
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            { path: '/', element: <Header /> },
            { path: '/tools', element: <Tools /> },
        ]
    },
    {
        path: '/',
        element: <RootLayout/>,
        errorElement: <ErrorPage/>,
        children: [
            { path: '/', element: <Header /> },
            { path: '/progress', element: <Progress /> },
        ]
    }
]);

const App = () => {
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <RouterProvider router={router} />
            </BaseProvider>
        </StyletronProvider>
      );
}

export default App;
