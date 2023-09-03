import Header from './components/header/Header';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import Home from './components/home/Home';

const engine = new Styletron();

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route>
            <Route path="/" element={<Header />} />
            {/* <Route path="/welcome" element={<Header />} /> */}
        </Route>
    )
); 

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
