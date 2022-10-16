import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { connect, useDispatch, useSelector } from 'react-redux';
import { GET_ALL_PROJECT_CATEGORY_SAGA, SET_EDIT_FORM_PROJECT, UPDATE_EDIT_PROJECT_SAGA } from '../../../../redux/constants/CyberBugs/CyberBugs';
import { withFormik } from 'formik';
import * as Yup from "yup"

function FormEditProject(props) {
    const arrProjectCategory = useSelector(state => state.ProjectCategoryReducer.arrProjectCategory)

    const dispatch = useDispatch()

    // ComponentDidMount
    useEffect(() => {

        //Gọi api load project category
        dispatch({type:GET_ALL_PROJECT_CATEGORY_SAGA})

        // Load sự kiện submit lên drawer nút submit
        dispatch({
            type: SET_EDIT_FORM_PROJECT,
            setSubmitFunction: handleSubmit
        })
    }, [])

    const {
        values, // những giá trị sẽ được binding lên form từ withFormik
        handleChange,
        handleSubmit,
        setFieldValue
    } = props;

    const handleEditorChange = (content, editor) => {
        console.log(content)
        setFieldValue("description", content)
    }

    return (
        <form className='container-fluid' onSubmit={handleSubmit}>
            <div className='row'>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project Id</p>
                        <input onChange={handleChange} value={values.id} disabled className='form-control' name='id'/>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Project Name</p>
                        <input onChange={handleChange} value={values.projectName} className='form-control' name='projectName'/>
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p className='font-weight-bold'>Category Name</p>
                        <select onChange={handleChange} name="categoryId" value={values.categoryId} >
                            {arrProjectCategory.map((item,index)=>{
                                return <option key={index} value={item.id}>{item.projectCategoryName}</option>
                            })}
                        </select>
                    </div>
                </div>
            </div>
            <div className='row'>
                <p className='font-weight-bold'>Description</p>
                <Editor
                    name="description"
                    apiKey='your-api-key'
                    onEditorChange={handleEditorChange}
                    value={values.description}
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
const editProjectForm = withFormik({
    enableReinitialize: true,
    mapPropsToValues: (props) => {
        const {projectEdit} = props

        return {
            id: projectEdit?.id,
            projectName: projectEdit?.projectName,
            description: projectEdit?.description,
            categoryId: projectEdit?.categoryId,
        }
    },

    // Custom sync validation
    validateSchema: Yup.object().shape({

    }),

    handleSubmit: (values, { props, setSubmitting }) => {

        // Khi người dùng bấm submit => đưa dữ liệu về backend thông qua api
        console.log(values)
        props.dispatch({
            type:UPDATE_EDIT_PROJECT_SAGA,
            projectEdit: values
        })
    },

    displayName: 'editProjectForm',
})(FormEditProject);

// Dùng mapStateToProps để binding dữ liệu vào formik khi click nút edit, 
//formik không thể nhận Hook useSelector của function
const mapStateToProps = (state) => {
    return {
        projectEdit: state.ProjectReducer.projectEdit
    }
}

export default connect(mapStateToProps)(editProjectForm);
