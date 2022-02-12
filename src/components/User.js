import React, { useState } from 'react'

const User = ({ user1, user, selectUser, chat }) => {
  // const user2 = user?.uid
  const [data, setData] = useState('')

  return (
    <>
      <div
        className={`user_wrapper ${chat.name === user.name && 'selected_user'}`}
        onClick={() => selectUser(user)}
      >
        <div className='user_info'>
          <div className='user_detail'>
            <h4>{user.name}</h4>
          </div>
        </div>
        {data && (
          <p className='truncate'>
            <strong>{data.from === user1 ? 'Me:' : null}</strong>
            {data.text}
          </p>
        )}
      </div>
      <div
        onClick={() => selectUser(user)}
        className={`sm_container ${chat.name === user.name && 'selected_user'}`}
      ></div>
    </>
  )
}

export default User
