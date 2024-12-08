import React from 'react';
import './Dashboard.css';
import { useEffect, useState } from 'react';  


function Dashboard() {

    const [data, setData] = useState([]); 
    const [newData, setNewData] = useState({ name:'', lastname: '', email: '', password:'', confirmPassword: ''}); 
    const [editingId, setEditingId] = useState(null)    
    const [isLoading, setIsLoading] = useState(false);  
    const [responseMessage, setResponseMessage] = useState('');  
 
  

    useEffect(() => {  
      const fetchData = async () => {  
        
        
          const response = await fetch('http://localhost:5890/api/users');

          const result = await response.json();  
          console.log(result);
          setData(result); 
       
      };  
  
      fetchData();
    }, []);

    const toggleForm = (item) => {
      setEditingId(editingId === item._id ? null : item._id);  

      if (item._id !== editingId) {  
          setNewData(item);  
      } else {  
          setNewData({ name: '', lastname: '', email: '', password: '', confirmPassword: '' });  
      }  
    };

    

    const deleteUser = async (_id) => {
        const res = await fetch(`http://localhost:5890/api/users/${_id}`, {
            method: 'DELETE'
        });

        if(res.ok) {
            setData(prevData => prevData.filter(item => item._id !== _id));
           
        }

        console.log(`delete id: ${_id}`);
    };

    const changeHandeler = (e) => {
        setNewData((prevData) => ({...prevData,[e.target.name] : e.target.value}));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

      
        const res = await fetch(`http://localhost:5890/api/users/${newData._id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newData),
        });

        const updateDatas = await res.json()
        console.log(updateDatas);
      if(res.ok) {
        setData(prevData => prevData.map(item => (item._id === newData._id ? updateDatas : item)));
        setEditingId(null)
        setNewData({ name: '', lastname: '', email: '', password: '', confirmPassword: '' });
      }


    
     
    
  };
  
  return (

    
    
    <div className="containerr">
        <div className="user-profile-wrap">
            {data.map((item, index) => 
                <div className='user-profile-box' key={index}>  
                    <h3 className='user-profile-name'>name & lastname: {item.name}-{item.lastname}</h3> 
                    <p>Email: {item.email}</p>
                    <div className="btn-groups-column">
                        <button onClick={() => deleteUser(item._id)} className="delete-user-btn">delete</button>
                        <button onClick={() => toggleForm(item)} className="edit-user-btn">
                          {editingId === item._id ? 'Hide Form' : 'Edit'}
                          </button>
                    </div>
                 </div>  
            )}  
      </div>
        
      {editingId && (        
        <div className="edit-user" id='edit-modal'>
            <div className="edit-user-content">
                <form className='login_form' onSubmit={handleSubmit}>
                <div className='username_input'>
                    <label>Name</label>
                    <input  type='text' name='name' onChange={changeHandeler}></input>

                </div>
                <div className='username_input'>
                <label>Lastname</label>
                <input  type='text' name='lastname' onChange={changeHandeler}></input>
                </div>

                <div className='username_input'>
                <label>Email</label>
                <input  type='email' name='email' onChange={changeHandeler}></input>
                </div>
                <div className='password_input'>
                <label>Password</label>
                <input type='password' name='password' onChange={changeHandeler}></input>
                </div>
                <div className='password_input'>
                <label>Confirm Password</label>
                <input type='password' name='confirmPassword' onChange={changeHandeler}></input>
                </div>

                <div className='button'>

                <button className='btn'  onClick={changeHandeler} type='submit'>Update User</button>

                </div>
                 </form>
            </div>
        </div> 
      )}

    </div>
  );
};

export default Dashboard