import React, { useState, useEffect } from 'react'

import { db, auth } from '../firebase'

import { getDoc, doc } from 'firebase/firestore'

const Profile = () => {
  const [user, setUser] = useState()

  useEffect(() => {
    getDoc(doc(db, 'users', auth.currentUser.uid)).then((docSnap) => {
      if (docSnap.exists) {
        setUser(docSnap.data())
      }
    })
  })

  return user ? (
    <section>
      <div className='text_container' style={{ height: '150px' }}>
        <h2 style={{ marginBottom: '8px' }}>{user.name}</h2>
        <p style={{ marginBottom: '10px' }}>Email : {user.email}</p>
        <hr />
        <small style={{ marginTop: '25px' }}>
          Joined on - {user.createdAt.toDate().toDateString()}
        </small>
      </div>
    </section>
  ) : null
}

export default Profile
