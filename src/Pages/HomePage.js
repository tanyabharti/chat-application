import React, { useState, useEffect } from 'react'
import { db, auth } from '../firebase'
import User from '../components/User'
import {
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  Timestamp,
  orderBy,
  setDoc,
  doc,
} from 'firebase/firestore'

import MessageForm from '../components/MessageForm'
import Message from '../components/Message'

export const HomePage = () => {
  const [users, setUsers] = useState([])
  const [chat, setChat] = useState('')
  const [text, setText] = useState('')
  const [msgs, setMsgs] = useState([])

  //cureently logged-in user
  const user1 = auth.currentUser.uid

  useEffect(() => {
    const usersRef = collection(db, 'users')
    // create query object
    const q = query(usersRef, where('uid', 'not-in', [user1]))
    // execute query
    const unsub = onSnapshot(q, (querySnapshot) => {
      let users = []
      querySnapshot.forEach((doc) => {
        users.push(doc.data())
      })
      setUsers(users)
    })
    return () => unsub()
  })

  //select user for chatting
  const selectUser = async (user) => {
    console.log(user)
    setChat(user)

    const user2 = user.uid
    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

    // real time message tracking in ascenidng order(latest message will be shown up in db)
    const msgsRef = collection(db, 'messages', id, 'chat')
    const q = query(msgsRef, orderBy('createdAt', 'asc'))

    onSnapshot(q, (querySnapshot) => {
      let msgs = []
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data())
      })
      setMsgs(msgs)
    })
  }

  // message sending handler
  const handleSubmit = async (e) => {
    e.preventDefault()

    const user2 = chat.uid

    const id = user1 > user2 ? `${user1 + user2}` : `${user2 + user1}`

    // // image upload in message

    await addDoc(collection(db, 'messages', id, 'chat'), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
    })

    // create a document for last message in firebase

    await setDoc(doc(db, 'lastMsg', id), {
      text,
      from: user1,
      to: user2,
      createdAt: Timestamp.fromDate(new Date()),
    })

    setText('')
  }

  return (
    <div className='home_container'>
      <div className='users_container'>
        {users.map((user) => (
          <User
            key={user.uid}
            user={user}
            selectUser={selectUser}
            user1={user1}
            chat={chat}
          />
        ))}
      </div>
      <div className='messages_container'>
        {chat ? (
          <>
            <div className='messages_user'>
              <h3>{chat.name}</h3>
            </div>
            <div className='messages'>
              {msgs.length
                ? msgs.map((msg, i) => (
                    <Message key={i} msg={msg} user1={user1} />
                  ))
                : null}
            </div>
            <MessageForm
              handleSubmit={handleSubmit}
              text={text}
              setText={setText}
            />
          </>
        ) : (
          <>
            <h3 className='no_conv' style={{ marginTop: '5px' }}>
              Select a user to start conversation
            </h3>
          </>
        )}
      </div>
    </div>
  )
}
