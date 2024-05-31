import React, { createContext, useState, useEffect } from 'react';
const DataContext = createContext();
import AsyncStorage from '@react-native-async-storage/async-storage';


const DataContextProvider = ({ children }) => {

  // const IP_Address = 'http://192.168.1.3:5001';
  const IP_Address = 'https://apifacility.metrolite.co.in';
  const [userDetail, setUserDetail] = useState()


  const fetchData = async () => {
    try {
      const employeeData = await AsyncStorage.getItem('employeeData');
      if (employeeData !== null) {
        // console.log('Stored Employee Data:', JSON.parse(employeeData));
        setUserDetail(JSON.parse(employeeData))
        return JSON.parse(employeeData)
      }
    } catch (error) {
      console.error('Error fetching employee data from AsyncStorage', error);
    }
  };


  async function loginEmployee(employeePhone) {
    try {
      const response = await fetch(`${IP_Address}/employee/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ employeePhone })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to login');
      }

      const employeeData = await response.json();
      // console.log('Employee data:', employeeData);
      return employeeData;
    } catch (error) {
      //   console.error('Error logging in:', error.message);
      throw error;
    }
  }



  const [services, setServices] = useState([]);

  useEffect(() => {


    fetchServices();
  }, []);


  const fetchServices = async () => {
    try {
      const response = await fetch(`${IP_Address}/service/getallservices`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      //   console.log(jsonData);
      setServices(jsonData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };


  const [allClient, setAllClient] = useState([]);
  const [clientDetail, setClientDetail] = useState()
  useEffect(() => {
    fetchAllClient()
  }, [])

  const fetchAllClient = async () => {
    try {
      const response = await fetch(`${IP_Address}/client/allclients`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      //   console.log(jsonData);
      setAllClient(jsonData);
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };

  const [employees, setEmployees] = useState([]);
  const fetchEmployees = async (hospitalName, service) => {
    try {
      const url = `${IP_Address}/employee/getemployee?hospitalName=${hospitalName}&service=${service}`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      setEmployees(jsonData);
    } catch (error) {
      console.error('Failed to fetch employees:', error);
    }
  };


  const handleSaveEmployee = async (formData) => {
    try {
      
      // const hospital = formData.get('hospitalName');
      // const service = formData.get('service')

      // console.log(hospital, service)
      const response = await fetch(`${IP_Address}/employee/addemployees`, {
        method: "POST",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.ok) {
        const data = await response.json();
        // console.log("Employee added successfully:", data);
        
        return { success: true, data };
      } else {
        const errorData = await response.json();
        console.error("Error adding employee:", errorData);
        return { success: false, error: errorData };
      }
    } catch (error) {
      console.error("Error:", error);
      return { success: false, error };
    }
  };


  // Add attendance

  const addAttendance = async (data) => {
    try {

      // console.log(data)
      const response = await fetch(`${IP_Address}/attendance/checkinout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        throw new Error('Failed to save Attendance data');
      }

      // console.log('Attendance data saved successfully');
      // Optionally, you can fetch services again after posting client data
      // fetchAttendanceData();
      // fetchAttendanceDetail()
    } catch (error) {
      console.error('Error saving Employee data:', error);
    }
  };


  const [attendanceData, setAttendanceData] = useState()

  const [employeeAttendance, setEmployeeAttendance] = useState([])


  async function fetchFilteredAttendance(checkInTime) {
    try {
      // Construct the URL with the provided checkInTime
      const url = `${IP_Address}/attendance/filteredattendance/${checkInTime}`;

      // Fetch data from the API
      const response = await fetch(url);

      // Check if the response is successful
      if (!response.ok) {
        throw new Error('Failed to fetch attendance data');
      }

      // Parse the JSON response
      const data = await response.json();

      // Return the fetched data
      setAttendanceData(data.data)
      return data;
    } catch (error) {
      console.error('Error fetching attendance data:', error.message);
      throw error;
    }



  }

  const fetchAttendanceData = async (employeeId) => {
    try {
      const response = await fetch(`${IP_Address}/attendance/employee/${employeeId}`); // Replace 'employeeId_here' with the actual employee ID
      if (!response.ok) {
        throw new Error('Failed to fetch attendance data');
      }
      const data = await response.json();
      // console.log(data)
      setEmployeeAttendance(data)

    } catch (error) {
      console.error("error Fetching Attendance of employee")
    }
  }


  const [employeeDetail, setEmployeeDetail] = useState()
  const fetchEmployeeDetail = async (employeeId) => {
    try {
      const response = await fetch(`${IP_Address}/employee/employees/${employeeId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const jsonData = await response.json();
      // console.log(jsonData);
      setEmployeeDetail(jsonData)
      return jsonData
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  };




  return (
    <DataContext.Provider value={{
      IP_Address,

      // Login Employeee
      loginEmployee,
      fetchData,
      userDetail,


      // Organization and Service
      services,
      allClient,

      // Employess
      fetchEmployees,
      employees,
      fetchEmployeeDetail,
      employeeDetail,
      handleSaveEmployee,

      addAttendance,
      fetchFilteredAttendance,
      attendanceData,



      fetchAttendanceData,
      employeeAttendance


    }}>
      {children}
    </DataContext.Provider>
  )
}

export { DataContext, DataContextProvider }