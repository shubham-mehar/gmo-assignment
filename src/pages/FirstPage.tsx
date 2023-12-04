import {useState} from "react";
import { useNavigate } from 'react-router-dom';

const FirstPage = () => {
    const [formData, seFormData] = useState({
        name:'',
        phoneNumber:'',
        email:''
    });
    const navigate = useNavigate();
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        seFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = ()=>{
        if(formData.name && formData.phoneNumber && formData.email){
            localStorage.setItem('userData', JSON.stringify(formData));
            navigate('/second-page')
        }        
        else{
            alert('Please enter all details before submitting.');
        }
    }

  return (
    <div>
        <h2>First Page</h2>
        <form>
            <label>Name: </label>
            <input type="text" name="name" value={formData.name} onChange={handleInputChange}/>
            <label>Phone Number: </label>
            <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleInputChange}/>
            <label>Email: </label>
            <input type="text" name="email" value={formData.email} onChange={handleInputChange}/>
            <button type="button" onClick={handleSubmit}>Submit</button>
        </form>
    </div>
  )
}

export default FirstPage;