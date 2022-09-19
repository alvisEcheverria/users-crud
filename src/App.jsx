import axios from 'axios'
import { useEffect, useState } from 'react'
import UpdatePop from './components/UpdatePop'
import EnterPassword from './components/EnterPassword'
import SuccessfulPop from './components/SuccessfulPop'
import UsersForm from './components/UsersForm'
import UsersList from './components/UsersList'
import IncorrectPassPop from './components/IncorrectPassPop'
import DeleteUserPop from './components/DeleteUserPop'
import './styles.css'

function App() {

      const [users, setUsers] = useState([])
        const [selectedUser, setSelectedUser] = useState(null)
          const [clickEdit, setClickEdit] = useState(false)
            const [create_Edit, setCreate_Edit ] = useState(true)

      /****CHANGE STATE POP UP *******/

      const [changeAlertSubmit, setChangeAlertSubmit] = useState(false)
        const [changeAlertAct, setChangeAlertAct] = useState(false)
          const [changeAlertDel, setChangeAlertDel] = useState(false)
            const [changeAlertInPass,setChangeAlertInPass] = useState(false)
            
      /** COMPARATIVE EDIT PASSWORD**/

      const [clickUserEdit, setClickUserEdit] = useState(null)

      /** COMPARATIVE DELETE PASSWORD**/

      const [clickUserDelete, setClickUserDelete] = useState(null)
      
      /*******************************/

      /********** MODAL CREATE / EDIT BTN************/

      const [createEdit, setCreateEdit] = useState(false)
  
  useEffect( ()=>{

    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsers(res.data))

  }, [])

  const getUsers = () =>{
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsers(res.data))
  }

  const selectUser = (user) => {

    setSelectedUser(user)

  }

  const deselectUser = ()=> {

    setSelectedUser(null)
    setClickUserEdit(null)

  }

  const editUser = (user) =>{

    setClickEdit(!clickEdit)
    setClickUserEdit(user)

  }

  const deleteUser = (user) => {

    setClickEdit(!clickEdit)
    setClickUserDelete(user)

  }

  const btnCreate = () =>{
    setCreateEdit(!createEdit)
    setCreate_Edit(true)
  }

  return (
    <div className="container-cards">
      <div className='create-user'>
          {users.length === 0 ? (
            <div className='position-question-gif'>
              <h1 className='users'>Where are the users?</h1>
              <img className='duck-cry' src="./img/duckcry.gif" alt="" />
            </div>
          
          ) : (
            <div className='position-question-gif'>
              <h1 className='users color-hi-users'>Hi Users!</h1> 
              <img className='duck-cry' src="./img/duckhappy.gif" alt="" />
            </div> 
          )
          }

          <button type='button' onClick={btnCreate} className='btn-create'>
          <i class="fa-solid fa-circle-plus"></i> Create New User
        </button> 
      </div>

      { createEdit?
          <UsersForm 
            getUsers={getUsers} 
            selectedUser={selectedUser} 
            deselectUser={deselectUser}
            createEdit={createEdit}
            setCreateEdit={setCreateEdit}
            setChangeAlertSubmit={setChangeAlertSubmit}
            setChangeAlertAct={setChangeAlertAct}
            create_Edit={create_Edit}
            setCreate_Edit={setCreate_Edit}
          />
        :
        null
      }
      <UsersList 
        users={users} 
        editUser={editUser} 
        deleteUser={deleteUser}
      />
      

      {users.length === 0 ? 
        (
          <div className='snorlax-center'>
            <img className='snorlax-img' src="./img/snorlaxsleep.gif" alt="snorlax-sleep"/>
          </div>
        ) 
        : 
          <div className='snorlax-center'>
            <img className='snorlax-img' src="./img/snorlaxhi.gif" alt="snorlax-hi"/>
          </div>
       }

      {
        clickEdit?
            <EnterPassword 
              clickUserEdit={clickUserEdit} 
              selectUser={selectUser} 
              clickEdit={clickEdit} 
              setClickEdit={setClickEdit} 
              clickUserDelete={clickUserDelete} 
              setClickUserDelete={setClickUserDelete} 
              getUsers={getUsers}
              createEdit={createEdit}
              setCreateEdit={setCreateEdit}
              setChangeAlertDel={setChangeAlertDel}
              setChangeAlertInPass={setChangeAlertInPass}
              setCreate_Edit={setCreate_Edit}
            />
        : 
          null
      }

      {
        changeAlertSubmit? <SuccessfulPop/> : null
      }
      {
        changeAlertAct? <UpdatePop/> : null
      }
      {
        changeAlertInPass? <IncorrectPassPop/> : null
      }
      {
        changeAlertDel? <DeleteUserPop/> : null
      }

    </div>
  )
}

export default App
