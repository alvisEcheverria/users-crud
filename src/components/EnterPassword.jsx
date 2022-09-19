import axios from 'axios';
import React from 'react';
import { useState } from 'react';

const EnterPassword = ({
                        clickUserEdit, 
                            selectUser, 
                                clickEdit, 
                                    setClickEdit, 
                                        clickUserDelete, 
                                            setClickUserDelete, 
                                                getUsers,
                                                    createEdit,
                                                        setCreateEdit,
                                                            setChangeAlertInPass,
                                                                setChangeAlertDel,
                                                                    setCreate_Edit}) => {

    const [addPassword, setAddPassword] = useState('')
        const [pass, setPass] = useState(true)

    const submit = event =>{
        event.preventDefault()

        if(clickUserEdit){
            
            if(clickUserEdit.password === addPassword){

                selectUser(clickUserEdit)
                setClickEdit(!clickEdit)
                setCreateEdit(!createEdit)
                setCreate_Edit(false)

            }
            else{
                changeStateAlert(clickUserEdit.password)
            }
        }
        else if(clickUserDelete){

            if(clickUserDelete.password === addPassword){

                axios.delete(`https://users-crud1.herokuapp.com/users/${clickUserDelete.id}/`)
                    .then(()=> getUsers())

                setClickEdit(!clickEdit)
                setClickUserDelete(null)
                changeStateAlert(clickUserDelete.password)
            }
            else{
                changeStateAlert(clickUserDelete.password)
            }
        }
         
        setAddPassword('')
        
    }

    const changeStateAlert = (user)=> {

        if(user === addPassword){
            setChangeAlertDel(true)
        }
        else{
            setChangeAlertInPass(true)
        }

        setTimeout(() =>{
            if(user === addPassword){
                setChangeAlertDel(false)
            }
            else{
                setChangeAlertInPass(false)
            }
        }, 1000)
        
    }

    return (
        <div className='password-form' >
            <form onSubmit={submit}>
                <div className='add-password-card'>
                    <div className='btn-container-pass-closed'>
                        <button className='btn-closed-pass' onClick={()=> setClickEdit(!clickEdit)} ><i class="fa-solid fa-circle-xmark"></i></button>
                    </div>
                    <label className='label-pass' htmlFor="pass">Enter your password</label>
                    <div className='container-password-form'>
                        <input 
                            type={pass? 'password' : 'text'}
                            id='pass'
                            required
                            placeholder='Password'
                            value={addPassword}
                            onChange={event => setAddPassword(event.target.value)}
                            className='input-password-form'
                        />
                        <button className='btn-show-hide-form' type='button' onClick={()=> setPass(!pass)}>{pass? <i class="fa-solid fa-eye-slash"></i> : <i class="fa-solid fa-eye"></i>}</button>
                    </div>
                </div>
                <button className='btn-submit-pass' type='submit'><i class="fa-solid fa-circle-check"></i></button>
            </form>
        </div>
    );
};

export default EnterPassword;