import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, db } from '../firebase'
import { signOut } from 'firebase/auth'
import { updateDoc, doc } from 'firebase/firestore'
import { AuthContext } from '../context/auth'

export const Navbar = () => {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleSignout = async () => {
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      isOnline: false,
    })
    await signOut(auth)
    navigate('/login')
  }
  return (
    <nav>
      <h3>
        <Link to='/'>ChatBuzz</Link>
      </h3>
      <div>
        {auth.currentUser ? (
          <>
            <Link to='/profile'>Profile</Link>
            <button className='button' onClick={handleSignout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to='/register'>Register</Link>
            <Link to='/login'>Login</Link>
          </>
        )}
      </div>
    </nav>
  )
}
