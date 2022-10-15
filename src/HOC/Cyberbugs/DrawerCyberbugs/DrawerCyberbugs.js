import { Button, Drawer, Space } from 'antd';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CLOSE_DRAWER, OPEN_DRAWER } from '../../../redux/constants/CyberBugs/CyberBugs';

export default function DrawerCyberbugs() {
   
    const {visible,size,ComponentContentDrawer,callBackSubmit} = useSelector(state => state.DrawerReducer);

    const dispatch = useDispatch()
    
    const onClose = () => {
        dispatch({
            type:CLOSE_DRAWER
        })
    };
    return (
        <>
            <Drawer
                title={`Drawer`}
                placement="right"
                onClose={onClose}
                size={size}
                open={visible}
                footer={
                    <div style={{textAlign:"right"}}>
                        <Button onClick={onClose}>Cancel</Button>
                        <Button onClick={callBackSubmit} className="ml-2" type="primary">
                            Submit
                        </Button>
                    </div>
                }
            >
                {/* Nội dung thay đổi của drawer */}
                {ComponentContentDrawer}
            </Drawer>
        </>
    );
}
