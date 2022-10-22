import React, { useEffect, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Select, Slider } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PROJECT_SAGA } from '../../../../redux/constants/CyberBugs/ProjectConstants';
import { GET_ALL_TASK_TYPE_SAGA } from '../../../../redux/constants/CyberBugs/TaskTypeConstants';
import { GET_ALL_PRIORITY_SAGA } from '../../../../redux/constants/CyberBugs/PriorityConstansts';
const { Option } = Select;

const children = [];
for (let i = 10; i < 36; i++) {
    children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
}

export default function FormCreateTask(props) {
    const [size, setSize] = useState('middle');

    const [timeTracking, setTimeTracking] = useState({
        timeTrackingSpent: 0,
        timeTrackingRemaining: 0
    })

    const dispatch = useDispatch()

    const { arrProject } = useSelector(state => state.ProjectCyberbugsReducer)
    const { arrTaskType } = useSelector(state => state.TaskTypeReducer)
    const { arrPriority } = useSelector(state => state.PriorityReducer)
    
    useEffect(() => {
        dispatch({ type: GET_ALL_PROJECT_SAGA })
        dispatch({ type: GET_ALL_TASK_TYPE_SAGA })
        dispatch({ type: GET_ALL_PRIORITY_SAGA })
    }, [])

    const {
        setFieldValue
    } = props;

    const handleEditorChange = (content, editor) => {
        console.log(content)
        setFieldValue("description", content)
    }

    const handleChange = (value) => {
        console.log(`Selected: ${value}`);
    };


    return (
        <div className='container'>
            <div className='form-group'>
                <p>Project</p>
                <select name='projectId' className='form-control'>
                    {arrProject.map((project, index) => {
                        return <option key={index} value={project.id}>{project.projectName}</option>
                    })}
                </select>
            </div>
            <div className='form-group'>
                <div className='row'>
                    <div className='col-6'>
                        <p>Priority</p>
                        <select name='priorityId' className='form-control'>
                            {arrPriority.map((priority, index) => {
                                return <option key={index} value={priority.priorityId}>{priority.priority}</option>
                            })}
                        </select>
                    </div>
                    <div className='col-6'>
                        <p>Task type</p>
                        <select name='typeId' className='form-control'>
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
                            defaultValue={['a10', 'c12']}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                            }}
                        >
                            {children}
                        </Select>
                        <div className='row mt-3'>
                            <div className='col-12'>
                                <p>Original Estimate</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="originalEstimate" />
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
                                }} />
                            </div>
                            <div className='col-6'>
                                <p>Time remaining</p>
                                <input type="number" defaultValue="0" min="0" className="form-control" name="timeTrackingRemaining" onChange={(e) => {
                                    setTimeTracking({
                                        ...timeTracking,
                                        timeTrackingRemaining: e.target.value
                                    })
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
                    onEditorChange={handleEditorChange}
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
        </div>
    )
}
