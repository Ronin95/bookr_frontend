import Header from './components/header/Header';
import React, { useState } from 'react';
import { Client as Styletron } from 'styletron-engine-atomic';
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider, styled } from 'baseui';
import { StatefulInput } from 'baseui/input';

const engine = new Styletron();

function App() {
    return (
        <StyletronProvider value={engine}>
            <BaseProvider theme={LightTheme}>
                <Header />
            </BaseProvider>
        </StyletronProvider>
      );
}

export default App;
