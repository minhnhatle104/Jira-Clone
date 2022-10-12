import { Editor } from '@tinymce/tinymce-react'
import {useSelector,useDispatch} from "react-redux"
import React,{useEffect} from 'react'
import {GET_ALL_PROJECT_CATEGORY_SAGA} from "../../redux/constants/CyberBugs/CyberBugs"

export default function CreateProject() {
    const handleEditorChange = (content,editor) =>{
        console.log(content)
    }
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch({
            type:GET_ALL_PROJECT_CATEGORY_SAGA
        })
    },[])

    return (
        <div className='container m-5'>
            <h3>Create Project</h3>
            <form className='container'>
                <div className='form-group'>
                    <p>Name</p>
                    <input className='form-control' name='projectName' />
                </div>
                <div className='form-group'>
                    <p>Description</p>
                    <Editor
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
                <div className='form-group'>
                    <p>Category</p>
                    <select name="categoryId"  className='form-control'>
                        {arrProjectCategory.map((item,index)=>{
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button className='btn btn-primary'>Create Project</button>
            </form>
        </div>
    )
}
