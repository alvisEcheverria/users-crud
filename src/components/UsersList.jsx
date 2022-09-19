import { useEffect } from "react";

const UsersList = ({users, editUser, deleteUser}) => {

    useEffect(()=>{

        colorsCards()

    }, [users])

    const colorsCards = () =>{
        const colors = ['#ff8b66', 
                            '#56c2e5', 
                                '#fd5d7e', 
                                    '#4cd084', 
                                        '#7236d2', 
                                            '#f1c75b', 
                                                '#f94144', 
                                                    '#4ecdc4', 
                                                        '#ffe66d', 
                                                            '#c8553d' ]

    const randomColor = Math.floor(Math.random() * colors.length)
        const color = colors[randomColor]
            return  color
    }

    return (
            <ul className="item-card">
                {
                    users.map(user =>(
                        <div key={user.id}  className="color-card" style={{backgroundColor: colorsCards()}}>
                                <li className="user-card">
                                <div className="description-card">
                                    <div>
                                        <h2>
                                            {user.first_name} {''}
                                            {user.last_name} 
                                        </h2>
                                    </div>
                                    <div className="email-list">
                                        <i class="fa-solid fa-envelope"></i>{user.email}
                                    </div>
                                    <div className="birthday-list">
                                        <i class="fa-solid fa-cake-candles"></i> {user.birthday}
                                    </div>
                                </div>
                                <div className="area-btn-edit-del">
                                    <button className="btn" type='button' onClick={()=> editUser(user)}><i class="fa-solid fa-pen"></i></button>
                                    <button className="btn" type='button' onClick={()=> deleteUser(user)}><i class="fa-solid fa-trash-can"></i></button>
                                </div>
                            </li>
                        </div>
                       
                    ))
                }
            </ul>
    );
};

export default UsersList;