import React from 'react'
import { HomePage } from './Pages/HomePage'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Navbar } from './components/Navbar'
import { RegisterPage } from './Pages/RegisterPage'
import LoginPage from './Pages/LoginPage'
import AuthProvider from './context/auth'
import PrivateRoute from './components/PrivateRoute'
import Profile from './Pages/Profile'

function App() {
  return (
    <div className='App'>
      <AuthProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/register' element={<RegisterPage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route
              exact
              path='/profile'
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path='/'
              element={
                <PrivateRoute>
                  <HomePage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  )
}

export default App
