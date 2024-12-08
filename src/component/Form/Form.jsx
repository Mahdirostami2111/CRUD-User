import React, { useEffect, useState } from 'react';  
import { useNavigate } from 'react-router-dom';  
import './Form.css';  

function Form() {  
    const [error, setError] = useState({});  
    const [data, setData] = useState({  
        name: '',  
        lastname: '',  
        username: '',  
        email: '',  
        password: '',  
        confirmPassword: '',  
    });  

    const navigate = useNavigate();  

    const changeHandler = (e) => {  
        setData({ ...data, [e.target.name]: e.target.value });  
    };  

    const formValidation = (data) => {  
        const newError = {};  
        if (!data.name) {  
            newError.name = 'name required!';  
        }  
        if (!data.password) {  
            newError.password = 'Password is required!';  
        } else if (data.password.length < 6) {  
            newError.password = 'Password needs to be 6 characters or more';  
        }  
        if (data.confirmPassword !== data.password) {  
            newError.confirmPassword = 'Passwords do not match!';  
        }  
        return newError;  
    };  

    useEffect(() => {  
        setError(formValidation(data));  
    }, [data]);  

    const handleSubmit = async (e) => {  
        e.preventDefault();  
        const validationErrors = formValidation(data);  

        if (Object.keys(validationErrors).length > 0) {  
            console.log('Validation errors:', validationErrors);   
            setError(validationErrors);  
            return;  
        }  

        const newDatas = {  
            name: data.name,  
            lastname: data.lastname,  
            username: data.username,  
            email: data.email,  
            password: data.password,  
            confirmPassword: data.confirmPassword,
        };  


        const res = await fetch('http://localhost:5890/api/users', {  
            method: 'POST',  
            headers: {  
                'Content-Type': 'application/json'  
            },  
            body: JSON.stringify(newDatas)  
        });  


        if (!res.ok) {  
            const errorData = await res.json();  
            console.error('Error creating user:', errorData);  
            return;  
        }  

        
        navigate('/dashboard');  
    };  

    return (  
        <div className='container'>  
            <form className='login_form' onSubmit={handleSubmit}>  
                <div className='name_input'>  
                    <label>Name</label>  
                    <input type='text' name='name' onChange={changeHandler} />  
                </div>  
                <div className='name_input'>  
                    <label>Lastname</label>  
                    <input type='text' name='lastname' onChange={changeHandler} />  
                </div>  
                <div className='name_input'>  
                    <label>Email</label>  
                    <input type='email' name='email' onChange={changeHandler} />  
                </div>  
                <div className='passwordd_input'>  
                    <label>Password</label>  
                    <input type='password' name='password' onChange={changeHandler} />  
                </div>  
                <div className='passwordd_input'>  
                    <label>Confirm Password</label>  
                    <input type='password' name='confirmPassword' onChange={changeHandler} />  
                </div>  
                {error.name && <p className="error">{error.username}</p>}  
                {error.password && <p className="error">{error.password}</p>}  
                {error.confirmPassword && <p className="error">{error.confirmPassword}</p>}  
                <div className='button'>  
                    <button className='btnn' type='submit'>Login</button>  
                </div>  
            </form>  
        </div>  
    );  
}  

export default Form;  