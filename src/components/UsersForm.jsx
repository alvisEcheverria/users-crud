import axios from 'axios';
import React from 'react';
import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const UsersForm = ({getUsers, 
                        selectedUser, 
                            deselectUser, 
                                createEdit, 
                                    setCreateEdit, 
                                        setChangeAlertSubmit, 
                                            setChangeAlertAct,
                                                create_Edit}) => {
    
    const {register,handleSubmit, reset} = useForm()
        const [password, setPassword] = useState(true)

    useEffect( ()=> {

            if(selectedUser){
                reset(selectedUser)
            }
           
    }, [selectedUser])

    const submit = (data) =>{
            
        if(selectedUser){
            axios.put(`https://users-crud1.herokuapp.com/users/${selectedUser.id}/`, data)
                .then(()=> getUsers())
                    .catch(error => console.log(error.response))
            
            changeStateAlert()

        }else{
            axios.post('https://users-crud1.herokuapp.com/users/', data)
                .then(()=> getUsers())
                    .catch(error => console.log(error.response))
            changeStateAlert()
        }

        clear()
        setCreateEdit(!createEdit)
    }

    const changeStateAlert = ()=> {

        if(selectedUser){
            setChangeAlertAct(true)
        }else{
             setChangeAlertSubmit(true)
        }

        setTimeout(() =>{
            if(selectedUser){
                setChangeAlertAct(false)
            }else{
                 setChangeAlertSubmit(false)
            }
        }, 1500)
        
    }

    const clear = () =>{

        deselectUser()

        reset({
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            birthday: ''
        })
    }

    const closeForm = () => {
        setCreateEdit(!createEdit)
        clear()
    }

    return (
        <div className='form-container'>
            <form onSubmit={handleSubmit(submit)} >
                <div className='card-form'>
                    <div className='container-closed-btn-form'>
                        {create_Edit? <h1>Create User</h1> : <h1>Edit User</h1>}
                        <button className='btn-closed' type='button' onClick={closeForm}><i class="fa-solid fa-circle-xmark"></i></button> 
                    </div>
                    <div className='description-form'>
                        <div>
                            <label htmlFor="name">First Name</label>
                            <br />
                            <input 
                                type="text" 
                                id='name' {...register('first_name')}
                                required
                                placeholder='First Name'
                                className='input'
                            />
                        </div>
                        <div>
                            <label htmlFor="last_name">Last Name</label>
                            <br />
                            <input 
                                type="text"
                                id='last_name' {...register('last_name')} 
                                required
                                placeholder='Last Name'
                                className='input'
                            />  
                        </div>
                        <div>
                            <label htmlFor="email">Email</label>
                            <br />
                            <input 
                                type="email"
                                id='email' {...register('email')}
                                required
                                placeholder='Email' 
                                className='input'
                            />
                        </div>
                        <div>
                            <label htmlFor="password">Password</label>
                            <br />
                            <div className='container-password-form'>
                                <input 
                                    type={password? 'password' : 'text'}
                                    id='password' {...register('password')}
                                    required
                                    placeholder='Password'
                                    className='input-password-form'
                                />
                                <button className='btn-show-hide-form' type='button' onClick={()=> setPassword(!password)}>{password? <i class="fa-solid fa-eye-slash"></i> : <i class="fa-solid fa-eye"></i>}</button>
                            </div>
                            
                        </div>
                        <div>
                            <label htmlFor="birthday">Birthday</label>
                            <br />
                            <input 
                                type="date" 
                                id='birthday' {...register('birthday')}
                                required
                                className='input'
                            />
                        </div> 
                    </div>
                </div>
                <div className='container-btn-form'>
                    <button className='btn-form btn-submit' type='submit'><i class="fa-solid fa-circle-check"></i></button>
                    <button className='btn-form btn-clear' type='button' onClick={clear}><i class="fa-solid fa-mattress-pillow"></i></button>
                </div>
            </form>
        </div>
           
    );
};

export default UsersForm;