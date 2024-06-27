import React, { createContext, useContext, useState } from 'react';
import { DataContext } from './DataContext'; // Adjust the path as per your file structure

const ComplaintContext = createContext();

const ComplaintContextProvider = ({ children }) => {
  const { IP_Address } = useContext(DataContext);

  const [allComplaints, setAllComplaints] = useState([])

  // State and functions related to complaints
  const pass = '1234';
  const addComplaint = async (newComplaint) => {
    try {
      const formData = new FormData();
      formData.append('employeeID', newComplaint.employeeID);
      formData.append('complainType', newComplaint.complaintType);
      formData.append('complaint', newComplaint.complaintText);
      formData.append('complaintTime', newComplaint.complaintTime);

      if (newComplaint.image) {
        formData.append('complaintImage', {
          uri: newComplaint.image.uri,
          type: 'image/jpeg',
          name: 'complaintImage.jpg',
        });
      }

      const response = await fetch(`${IP_Address}/complaint/addcomplaint`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      
      console.log('Complaint created successfully:', result);
    } catch (error) {
      console.error('Error creating complaint:', error);
      throw error;
    }
  };

  const fetchAllComplaints = async (employeeID) => {
    try {
        const response = await fetch(`${IP_Address}/complaint/complaints/employee/${employeeID}`); // Replace '12345' with your employeeId variable

        if (!response.ok) {
            throw new Error('Failed to fetch complaints');
        }

        const data = await response.json();
        // console.log(data)
        setAllComplaints(data); // Update state with fetched data
    } catch (error) {
        console.error('Error fetching complaints:', error);
    }
};



  return (
    <ComplaintContext.Provider value={{ pass, 
    addComplaint,
    fetchAllComplaints,
    allComplaints
     }}>
      {children}
    </ComplaintContext.Provider>
  );
};

export { ComplaintContext, ComplaintContextProvider };
