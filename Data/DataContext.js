import React, { createContext, useState, useEffect } from 'react';
const DataContext = createContext();


const DataContextProvider = ({ children }) => {
    const IP_ADDRESS = 'https://metrolite.co.in:5000';


    return(
        <DataContext.Provider value={{
            IP_ADDRESS
        }}>
            {children}
        </DataContext.Provider>
    )
}

export {DataContext, DataContextProvider}