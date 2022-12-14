import React from 'react'
import { Button, Input } from 'antd'
import { UserOutlined, LockOutlined, TwitterOutlined } from '@ant-design/icons';
import { withFormik } from 'formik'
import * as Yup from 'yup'
import {connect} from 'react-redux'
import { signinCyberBugsAction } from '../../redux/actions/CyberBugsAction';

function Login(props) {
    const {
        errors,
        handleChange,
        handleSubmit,
    } = props;

    return (
        <form onSubmit={handleSubmit}>
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: window.innerHeight }}>
                <h3 className='text-center'>Login Jira</h3>

                <div>
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} name="email" size='large' placeholder='email' prefix={<UserOutlined />}></Input>
                </div>
                <div className='text-danger'>{errors.email}</div>
                <div className='mt-3'>
                    <Input onChange={handleChange} style={{ width: '100%', minWidth: 300 }} type="password" name="password" size='large' placeholder='password' prefix={<LockOutlined />}></Input>
                </div>
                <div className='text-danger'>{errors.password}</div>

                <Button htmlType='submit' size='large' style={{ width: '50%', backgroundColor: 'rgb(102,117,223)', color: '#fff' }} className='mt-5'>Login</Button>

                <div className='social mt-3 d-flex'>
                    <Button style={{ backgroundColor: 'rgb(59,89,152)' }} shape="circle" size='large'>
                        <span className='font-weight-bold' style={{ color: '#fff' }}>F</span>
                    </Button>
                    <Button type="primary ml-3" shape="circle" size='large' icon={<TwitterOutlined />}>
                    </Button>
                </div>
            </div>
        </form>
    )
}

const LoginCyberBugsWithFormik = withFormik({
    mapPropsToValues: () => ({
        email: '',
        password: ''
    }),

    validationSchema:Yup.object().shape({
        email: Yup.string().required("Email is required").email("Email is invalid"),
        password:Yup.string().min(6,"password must have min 6 characters").max(32,"password must have max 32 characters")
    }),

    handleSubmit: ({email,password}, {props, setSubmitting }) => {
        props.dispatch(signinCyberBugsAction(email,password))
    },

    displayName: 'Login Jira',
})(Login);

export default connect()(LoginCyberBugsWithFormik)