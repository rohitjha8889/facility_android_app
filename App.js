// App.js
import React from "react";
import { enableScreens } from 'react-native-screens';
import AllScreen from "./screens/AllScreen";
import { DataContextProvider } from './Data/DataContext';
import { ComplaintContextProvider } from "./Data/complaintContext";

// Optimize screens for better performance
enableScreens();

const App = () => {
  return (
    <DataContextProvider>
      <ComplaintContextProvider>
        <AllScreen />
      </ComplaintContextProvider>
    </DataContextProvider>
  );
};

export default App;
