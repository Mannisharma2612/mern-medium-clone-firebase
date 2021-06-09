import React, {useRef, useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import Alert from '@material-ui/lab/Alert';
import { useAuth } from '../contexts/AuthContext';
import {Link, useHistory} from 'react-router-dom';
import '../App.scss';

export default function Signup() {

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)
    const history = useHistory()
  
    async function handleSubmit(e) {
      e.preventDefault()
  
      if (passwordRef.current.value !== passwordConfirmRef.current.value) {
        return setError("Passwords do not match")
      }
  
      try {
        setError("")
        setLoading(true)
        await signup(emailRef.current.value, passwordRef.current.value)
        history.push("/")
        alert('New User created !!!')
      } catch {
        setError("Failed to create an account")
      }
  
      setLoading(false)
    }


    return (
      <>
        <div className="formcontainer">
          <h2 className="header">Sign Up</h2>
          
          <Form onSubmit={handleSubmit}>
            {error && <Alert style={{paddingBottom:'20px'}} severity="error">{error}</Alert>}
            <Form.Group id="email">
              <Form.Label className="lab" >Email</Form.Label>
              <Form.Control  className="inp"   type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label className="lab" >Password</Form.Label>
              <Form.Control className="inp"  type="password" ref={passwordRef} required />
            </Form.Group>
            <Form.Group id="password-confirm">
              <Form.Label className="lab">Password Confirmation</Form.Label>
              <Form.Control className="inp" type="password" ref={passwordConfirmRef} required />
            </Form.Group>
            <Button disabled={loading} className="form_btn btn-fluid" type="submit">
              Sign Up
            </Button>
          </Form>
          <p>
            Already have an account? <Link style={{textDecoration:'none', color:'blue'}} to="/login">Log In</Link>
          </p>
        </div>
      </>
    )
}
