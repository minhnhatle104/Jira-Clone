import React, { useEffect } from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { useDispatch } from 'react-redux';
import { SET_EDIT_FORM_PROJECT } from '../../../../redux/constants/CyberBugs/CyberBugs';

export default function FormEditProject(props) {
    const dispatch = useDispatch()

    const submitForm = (e) =>{
        e.preventDefault()
        alert("submit edit")
    }

    // ComponentDidMount
    useEffect(()=>{
        dispatch({
            type:SET_EDIT_FORM_PROJECT,
            setSubmitFunction: submitForm 
        })
    },[])

    const {
        setFieldValue
    } = props;

    const handleEditorChange = (content,editor) =>{
        console.log(content)
        setFieldValue("description",content)
    }

    return (
        <form className='container-fluid'>
            <div className='row'>
                <div className='col-4'>
                    <div className='form-group'>
                        <p>Project Id</p>
                        <input disabled className='form-control' name='id' />
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p>Project Name</p>
                        <input className='form-control' name='projectName' />
                    </div>
                </div>
                <div className='col-4'>
                    <div className='form-group'>
                        <p>Category Name</p>
                        <input className='form-control' name='categoryName' />
                    </div>
                </div>
            </div>
            <div className='row'>
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
        </form>
    )
}
