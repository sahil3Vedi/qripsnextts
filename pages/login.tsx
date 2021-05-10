// REACT
import React, { useState } from 'react'
// COMPONENTS
import Navbar from '../components/navbar'
import GlobalStyle from '../stylesheets/globalStyle'
import Footer from '../components/footer'
// ANT
import { Form, Input, Button, Divider, message } from 'antd';
// CSS
import signinStyles from '../stylesheets/signin.module.css'

const LoginPage = () => {
    const [signup, setSignup] = useState(false)
    const toggleSignup = () => setSignup(!signup)
    const signinForm = (
        <Form name="basic" onFinish={()=>message.error("Not Available, Coming Soon")} onFinishFailed={()=>console.log("Fail")}>
            <p className={signinStyles.label}>Username</p>
            <Form.Item name="signin_username" rules={[{ required: true, message: 'Please input your username' }]}>
                <Input placeholder="Enter Username"/>
            </Form.Item>
            <p className={signinStyles.label}>Password</p>
            <Form.Item name="signin_password" rules={[{ required: true, message: 'Please input your password' }]}>
                <Input.Password placeholder="Enter Password"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Sign In</Button>
            </Form.Item>
        </Form>
    )

    const signupForm = (
        <Form name="basic" onFinish={()=>message.error("Not Available, Coming Soon")} onFinishFailed={()=>console.log("Fail")}>
            <p className={signinStyles.label}>Username</p>
            <Form.Item name="signup_username" rules={[{ required: true, message: 'Please input your username' }]}>
                <Input placeholder="Enter Username"/>
            </Form.Item>
            <p className={signinStyles.label}>Password</p>
            <Form.Item name="signup_password" rules={[{ required: true, message: 'Please input your password' }]}>
                <Input.Password placeholder="Enter Password"/>
            </Form.Item>
            <p className={signinStyles.label}>Confirm Password</p>
            <Form.Item name="signup_confirm_password" rules={[{ required: true, message: 'Please input your password' }]}>
                <Input.Password placeholder="Enter Confirm Password"/>
            </Form.Item>
            <Form.Item>
                <Button type="primary" htmlType="submit">Create Account</Button>
            </Form.Item>
        </Form>
    )
    return (
        <div>
            <GlobalStyle/>
            <div className="pageWrapper">
                <Navbar/>
                <div className="pageContent">
                    <h1 className="primaryColorUnderline pageTitle">{signup ? "Sign Up" : "Sign In"}</h1>
                    {signup ? signupForm : signinForm}
                    <Divider>{signup ? "Already Registered?" : "New To Qrips?"}</Divider>
                    <div className={signinStyles.signupLink}><Button type="primary" onClick={toggleSignup}>{signup ? "Sign In" : "Create Account"}</Button></div>
                </div>
                <Footer/>
            </div>
        </div>
    )
}

export default LoginPage
