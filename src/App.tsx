import React from 'react';
import RootPage from "./components/pages/Root";
import {Provider as ReduxProvider} from "react-redux";
import {store} from "./redux-store/store";

function App() {
  return (
    <ReduxProvider store={store}>
      <RootPage />
    </ReduxProvider>
  );
}

export default App;
