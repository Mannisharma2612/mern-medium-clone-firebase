import React, { useRef, useState } from "react"
import { Form, Button } from "react-bootstrap"
import Alert from '@material-ui/lab/Alert';
import { useAuth } from "../contexts/AuthContext"
import { Link, useHistory } from "react-router-dom"
import '../App.scss';

export default function Login() {
  const emailRef = useRef()
  const passwordRef = useRef()
  const { login } = useAuth()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setError("")
      setLoading(true)
      await login(emailRef.current.value, passwordRef.current.value)
      history.push("/")
      
    } catch {
      setError("Failed to log in")
    }

    setLoading(false)
  }

  return (
    <>
      <div className="loginformcontainer">
            <h2 className="header">Log In</h2>
            {error && <Alert style={{paddingBottom:'20px'}} severity="error">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group id="email">
                <Form.Label className="lab">Email</Form.Label>
                <Form.Control className="inp"   type="email" ref={emailRef} required />
                </Form.Group>
                <Form.Group id="password">
                <Form.Label className="lab">Password</Form.Label>
                <Form.Control className="inp"   type="password" ref={passwordRef} required />
                </Form.Group>
                <Button disabled={loading} className="form_btn" type="submit">
                Log In
                </Button>
            </Form>
            <p>
                <Link style={{textDecoration:'none', color:'blue'}} to="/forgot-password">Forgot Password?</Link>
            </p>
            <p>
                Need an account? <Link to="/signup" style={{textDecoration:'none', color:'blue'}}>Sign Up</Link>
            </p>
      </div>
    </>
  )
}