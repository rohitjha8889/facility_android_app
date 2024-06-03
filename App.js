import React from "react";
import AllScreen from "./screens/AllScreen";
import { DataContextProvider } from './Data/DataContext';
import { enableScreens } from 'react-native-screens';
enableScreens();
const App = () => {
  return (
    <DataContextProvider>

    <AllScreen/>
    </DataContextProvider>
  );
};

export default App;
