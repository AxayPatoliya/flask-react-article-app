import React from 'react'

function AddArticle(props) {
  return (
    <div className='container'>
        <button className='btn btn-sm btn-info w-100 my-4' onClick={props.openForm}>Add Article</button>
    </div>
  )
}

export default AddArticle