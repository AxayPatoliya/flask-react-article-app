import {React, useState, useEffect} from 'react'
import APIService from './APIService'

function Form(props) {

    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const updateArticle = () => {
        APIService.UpdateArticle(props.article.id, {title, description})
        .then(resp => props.updatedData(resp))
        .catch(err => console.log(err))
    }

    const insertArticle = () => {
        APIService.InsertArticle({title, description})
        .then(resp => props.insertedArticle(resp))
        .catch(err => console.log(err))
    }

    useEffect(() => {
        setTitle(props.article.title)
        setDescription(props.article.description)
    }, [props.article])

  return (
    <div>
        <div className="mb-3 container">
            <label htmlFor="title" className="form-label">Title</label>
            <input type="text" name="" id="title" placeholder="Please enter title..." onChange={(event)=>setTitle(event.target.value)} value={title} className="form-control"/>
            <label htmlFor="desc" className="form-label">Description</label>
            <textarea name="" id="desc" cols="30" rows="7" placeholder='Please enter description...' onChange={(event)=>setDescription(event.target.value)} value={description} className="form-control" />
            <button className='btn btn-success mt-3' onClick={props.article.id ? updateArticle : insertArticle}>{props.article.id ? 'Update' : 'Add'}</button>
        </div>
    </div>
  )
}

export default Form