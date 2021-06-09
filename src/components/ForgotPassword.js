import React, { useRef, useState } from "react"
import { Form, Button } from "react-bootstrap"
import Alert from '@material-ui/lab/Alert';
import { useAuth } from "../contexts/AuthContext"
import { Link } from "react-router-dom"

export default function ForgotPassword() {
  const emailRef = useRef()
  const { resetPassword } = useAuth()
  const [error, setError] = useState("")
  const [message, setMessage] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()

    try {
      setMessage("")
      setError("")
      setLoading(true)
      await resetPassword(emailRef.current.value)
      setMessage("Check your inbox for further instructions")
    } catch {
      setError("Failed to reset password")
    }

    setLoading(false)
  }

  return (
    <>
        <div className="loginformcontainer">
          <h2 className="header">Password Reset</h2>
          {error && <Alert style={{paddingBottom:'20px'}} severity="error">{error}</Alert>}
          {message && <Alert style={{paddingBottom:'20px'}} severity="success">{message}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label className="lab">Email</Form.Label>
              <Form.Control className="inp" type="email" ref={emailRef} required />
            </Form.Group>
            <Button disabled={loading} className="form_btn" type="submit">
              Reset Password
            </Button>
          </Form>
          <p>
            <Link style={{textDecoration:'none', color:'blue'}} to="/login">Login</Link>
          </p>
          <p>
            Need an account? <Link style={{textDecoration:'none', color:'blue'}} to="/signup">Sign Up</Link>
          </p>
        </div>
        
    </>
  )
}