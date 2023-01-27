import {React, useState, useEffect, props} from 'react'
import APIService from './APIService';

function ArticleLists(props) {

    const editArticle = (article) => {
        props.editArticle(article); //will send this to App.js and will write method over there only
    }
    
    const removeArticle = (article) => {
        APIService.RemoveArticle(article.id)
        .then(() => props.removedData(article))
        .catch(err => console.log(err))
    }


    return (
        <div className="container">
        {props.articles && props.articles.map(article => { //if articles are passed from App.js as a props then map it
            return (
            <div key={article.id}>
                <h1>{article.title}</h1>
                <p>{article.description}</p>
                <b>{article.date}</b>
                <div className="row">
                    <div className="col-md-1">
                        <button className="btn btn-info" onClick={() => editArticle(article)}>Update</button>
                    </div>
                    <div className="col">
                        <button className="btn btn-danger" onClick={() => removeArticle(article)}>Delete</button>
                    </div>
                </div>
                <br /> <hr /> <br /> 
            </div>
            )
        })}
        </div>
    )

}

export default ArticleLists;