import Layout, { Content } from "antd/lib/layout/layout";
import Sider from "antd/lib/layout/Sider";
import React from "react";
import { Route } from "react-router-dom";

export const UserLoginTemplate = (props) => {
    let {Component,...restRoute} = props

    return <Route {...restRoute} render={(propsRoute)=>{
        return <>
        <Layout>
            <Sider width={window.innerWidth/2} style={{height:window.innerHeight,backgroundImage:'url(https://picsum.photos/500)',backgroundSize:'100%'}}></Sider>
            <Content>
            <Component {...propsRoute}/>
            </Content>
        </Layout>
            
        </>
    }}/>
}