import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import DepartmentList from '../components/DepartmentList';

const SecondPage = () => {
  const [data, setData] = useState([]);
    const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem('userData');
    if(!userData){
        navigate('/',{state:{message:'Please enter your details on the first page.'}})
    }else{
        fetch('https://jsonplaceholder.typicode.com/posts')
        .then((response) => response.json())
        .then((jsonData) => setData(jsonData));
    }
    }, [navigate]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'title', headerName: 'Title', width: 300 },
    { field: 'body', headerName: 'Body', width: 500 },
  ];

  return (
    <div>
      <h2>Second Page</h2>
      <DataGrid rows={data} columns={columns} 
      />
      <DepartmentList />
    </div>
  );
};

export default SecondPage;