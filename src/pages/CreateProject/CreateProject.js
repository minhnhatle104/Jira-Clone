import { Editor } from '@tinymce/tinymce-react'
import {useSelector,useDispatch} from "react-redux"
import React,{useEffect} from 'react'
import {GET_ALL_PROJECT_CATEGORY_SAGA} from "../../redux/constants/CyberBugs/CyberBugs"
import { withFormik } from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';

function CreateProject(props) {
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch({
            type:GET_ALL_PROJECT_CATEGORY_SAGA
        })
    },[])

    const {
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;

    const handleEditorChange = (content,editor) =>{
        console.log(content)
        setFieldValue("description",content)
    }

    return (
        <div className='container m-5'>
            <h3>Create Project</h3>
            <form className='container' onSubmit={handleSubmit} onChange={handleChange}>
                <div className='form-group'>
                    <p>Name</p>
                    <input onChange={handleChange} className='form-control' name='projectName' />
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
                <div className='form-group'>
                    <p>Category</p>
                    <select onChange={handleChange} name="categoryId"  className='form-control'>
                        {arrProjectCategory.map((item,index)=>{
                            return <option value={item.id} key={index}>{item.projectCategoryName}</option>
                        })}
                    </select>
                </div>
                <button className='btn btn-outline-primary' type='submit'>Create Project</button>
            </form>
        </div>
    )
}

// Đây là 1 component được tạo ra từ formik, do đó không thể 
// trực tiếp lấy giá trị của của form bên trên mà phải thông qua props
// Mỗi lần props thay đổi (reducer) thì lập tức binding lại giá trị thông qua enableReinitialize
const createProjectForm = withFormik({
    enableReinitialize:true,
    mapPropsToValues: (props) => ({ 
        projectName: "",
        description:"",
        categoryId: props.arrProjectCategory[0]?.id
    }),
  
    // Custom sync validation
    validateSchema: Yup.object().shape({
        
    }),
  
    handleSubmit: (values, { props,setSubmitting }) => {
        props.dispatch({
            type:"CREATE_PROJECT_SAGA",
            newProject:values
        })
    },
  
    displayName: 'createProjectForm',
})(CreateProject);

const mapStateToProps = (state) => {
    return {
        arrProjectCategory: state.ProjectCategoryReducer.arrProjectCategory
    }
}

export default connect(mapStateToProps)(createProjectForm);