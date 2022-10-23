import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Select, Slider } from 'antd';
import { connect, useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PROJECT_SAGA } from '../../../../redux/constants/CyberBugs/ProjectConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../../redux/constants/CyberBugs/TaskTypeConstants';
import { GET_ALL_PRIORITY_SAGA } from '../../../../redux/constants/CyberBugs/PriorityConstansts';
import { GET_USER_API, SET_SUBMIT_CREATE_TASK } from '../../../../redux/constants/CyberBugs/CyberBugs';
import { withFormik } from 'formik';
import * as Yup from "yup"
import { GET_ALL_STATUS_SAGA } from '../../../../redux/constants/CyberBugs/StatusConstants';
import { GET_USER_BY_PROJECT_ID_SAGA } from '../../../../redux/constants/CyberBugs/UserConstants';

const children = []

function FormCreateTask(props) {
    const [size, setSize] = useState('middle');

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })

    const dispatch = useDispatch()

    const { arrProject } = useSelector(state => state.ProjectCyberbugsReducer)
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer)
    const { arrPriority } = useSelector(state => state.PriorityReducer)
    const { arrStatus } = useSelector(state => state.StatusReducer)
    const { arrUser } = useSelector(state => state.UserLoginCyberBugsReducer)
    const userOptions = arrUser.map((item, index) => {
        return { value: item.userId, label: item.name }
    })

    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_SAGA })
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA })
        dispatch({ type: GET_ALL_PRIORITY_SAGA })
        dispatch({ type: GET_USER_API, keyword: "" })
        dispatch({ type: GET_ALL_STATUS_SAGA })

        // Đưa hàm handle submit lên drawer reducer để cập nhật lại sự kiện cho nút submit
        dispatch({
            type:SET_SUBMIT_CREATE_TASK,
            setSubmitFunction: handleSubmit
        }) 

    }, [])

    const {
        values, // những giá trị sẽ được binding lên form từ withFormik
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;


    return (
        <form className='container' onSubmit={handleSubmit}>
            <div className='form-group'>
                <p>Project</p>
                <select name='projectId' className='form-control' onChange={(e) => {

                    // dispatch làm thay đổi dữ liệu arrUser
                    dispatch({
                        type: GET_USER_BY_PROJECT_ID_SAGA,
                        projectId: e.target.value
                    })

                    setFieldValue("projectId", e.target.value)
                }}>
                    {arrProject.map((project, index) => {
                        return <option key={index} value={project.id}>{project.projectName}</option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <p>Task name</p>
                <input name="taskName" className='form-control' onChange={handleChange} />
            </div>
            <div className='form-group'>
                <p>Status Id</p>
                <select name='statusId' className='form-control' onChange={handleChange}>
                    {arrStatus.map((statusItem, index) => {
                        return <option key={index} value={statusItem.statusId}>{statusItem.statusName}</option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Priority</p>
                        <select name='priorityId' className='form-control' onChange={handleChange}>
                            {arrPriority.map((priority, index) => {
                                return <option key={index} value={priority.priorityId}>{priority.priority}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p>Task type</p>
                        <select name='typeId' className='form-control' onChange={handleChange}>
                            {arrTaskType.map((taskType, index) => {
                                return <option key={index} value={taskType.id}>{taskType.taskType}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Assignees</p>
                        <Select
                            mode="multiple"
                            size={size}
                            placeholder="Please select"
                            options={userOptions}
                            optionFilterProp="label"
                            onChange={(values) => {


                                // set lại giá trị cho lstUserAssign
                                setFieldValue("listUserAsign", values)
                            }}
                            style={{
                                width: '100%',
                            }}
                        >
                            {children}
                        </Select>
                        <div className='row mt-3'>
                            <div className='col-12'>
                                <p>Original Estimate</p>
                                <input type="number" defaultValue="0" min="0" onChange={handleChange} className="form-control" name="originalEstimate" />
                            </div>
                        </div>
                    </div>
                    <div className='col-6'>
                        <p>Time tracking</p>
                        <Slider defaultValue={30} value={timeTracking.timeTrackingSpent} max={Number(timeTracking.timeTrackingSpent) + Number(timeTracking.timeTrackingRemaining)} />
                        <div className='row'>
                            <div className='col-6 text-left font-weight-bold'>{timeTracking.timeTrackingSpent}h logged</div>
                            <div className='col-6 text-right font-weight-bold'>{timeTracking.timeTrackingRemaining}h remaining</div>
                        </div>
                        <div className='row' style={{ marginTop: '5px' }}>
                            <div className='col-6'>
                                <p>Time spent</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingSpent" onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingSpent: e.target.value
                                    })

                                    setFieldValue("timeTrackingSpent", e.target.value)
                                }} />
                            </div>
                            <div className='col-6'>
                                <p>Time remaining</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingRemaining" onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    })

                                    setFieldValue("timeTrackingRemaining", e.target.value)
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='form-group'>
                <p>Description</p>
                <Editor
                    name="description"
                    apiKey='your-api-key'
                    onEditorChange={(content, editor) => {
                        setFieldValue("description", content)
                    }}
                    initialValue=""
                    init={{
                        height: 500,
                        menubar: false,
                        plugins: [
                            'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                            'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                            'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                        ],
                        toolbar: 'undo redo | blocks | ' +
                            'bold italic forecolor | alignleft aligncenter ' +
                            'alignright alignjustify | bullist numlist outdent indent | ' +
                            'removeformat | help',
                        content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                    }}
                />
            </div>
        </form>
    )
}


// Đây là 1 component được tạo ra từ formik, do đó không thể 
// trực tiếp lấy giá trị của của form bên trên mà phải thông qua props
// Mỗi lần props thay đổi (reducer) thì lập tức binding lại giá trị thông qua enableReinitialize
const createTaskForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const { arrProject, arrTaskType, arrPriority, arrStatus } = props

        return {
            listUserAsign: [],
            taskName: "",
            description: "",
            statusId: arrStatus[0]?.statusId,
            originalEstimate: 0,
            timeTrackingSpent: 0,
            timeTrackingRemaining: 0,
            projectId: arrProject[0]?.id,
            typeId: arrTaskType[0]?.id,
            priorityId: arrPriority[0]?.priorityId
        }
    },

    // Custom sync validation
    validateSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {

        // Khi người dùng bấm submit => đưa dữ liệu về backend thông qua api
        console.log(values)
        props.dispatch({
            type: "CREATE_TASK_SAGA",
            taskObject: values
        })
    },

    displayName: 'createTaskForm',
})(FormCreateTask);


// const { arrProject } = useSelector(state => state.ProjectCyberbugsReducer)
// const { arrTaskType } = useSelector(state => state.TaskTypeReducer)
// const { arrPriority } = useSelector(state => state.PriorityReducer)
// const { arrStatus } = useSelector(state => state.StatusReducer)
// const { userSearch } = useSelector(state => state.UserLoginCyberBugsReducer)

const mapStateToProps = (state) => {
    return {
        arrProject: state.ProjectCyberbugsReducer.arrProject,
        arrTaskType: state.TaskTypeReducer.arrTaskType,
        arrPriority: state.PriorityReducer.arrPriority,
        arrStatus: state.StatusReducer.arrStatus
    }
}

export default connect(mapStateToProps)(createTaskForm);
