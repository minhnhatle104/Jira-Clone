import { Button, Input } from 'antd'
import { UserOutlined,LockOutlined ,TwitterOutlined} from '@ant-design/icons';
import React from 'react'


export default function Login() {
  return (
    <form>
        <div className='d-flex flex-column justify-content-center align-items-center' style={{height:window.innerHeight}}>
            <h3 className='text-center'>Login Jira</h3>

            <div>
                <Input style={{width:'100%',minWidth:300}} name="email" size='large' placeholder='email' prefix={<UserOutlined/>}></Input>
            </div>
            <div className='mt-3'>
                <Input style={{width:'100%',minWidth:300}} name="password" size='large' placeholder='password' prefix={<LockOutlined/>}></Input>
            </div>

            <Button size='large' style={{width:'50%',backgroundColor:'rgb(102,117,223)',color:'#fff'}} className='mt-5'>Login</Button>

            <div className='social mt-3 d-flex'>
                <Button style={{backgroundColor:'rgb(59,89,152)'}} shape="circle" size='large'>
                <span className='font-weight-bold' style={{color:'#fff'}}>F</span>
                </Button>
                <Button type="primary ml-3" shape="circle" size='large' icon={<TwitterOutlined/>}>
                </Button>
            </div>
        </div>
    </form>
  )
}
