import { Route } from "react-router-dom"
import MenuCyberbugs from "../../components/Cyberbugs/MenuCyberbugs"
import ModalCyberbugs from "../../components/Cyberbugs/ModalCyberbugs/ModalCyberbugs"
import SidebarCyberbugs from "../../components/Cyberbugs/SidebarCyberbugs"


export const CyberbugsTemplate = (props) =>{
    const {Component,...restParam} = props

    return <Route {...restParam} render={(propsRoute)=>{
        return <>
            <div className="jira">
                <SidebarCyberbugs/>
                <MenuCyberbugs/>
                    <Component {...propsRoute}/>
                <ModalCyberbugs/>
            </div>
        </>
    }}/>
}
