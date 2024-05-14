import React from "react";
import AllScreen from "./screens/AllScreen";
import { DataContextProvider } from './Data/DataContext';
const App = () => {
  return (
    <DataContextProvider>

    <AllScreen/>
    </DataContextProvider>
  );
};

export default App;
