import './App.css';
import {React, useState, useEffect, props} from 'react'
import ArticleLists from './components/ArticleLists';
import Form from './components/Form';
import AddArticle from './components/AddArticle';

function App() {

    const [articles, setArticles] = useState([]);
    const [editedArticle, setEditedArticle] = useState(null);

    useEffect(() => {
        fetch('https://flask-backend.onrender.com/articles', {
        'method':'GET',
        headers:{
            'Content-Type':'application/json'
        }
        })
        .then(data => data.json())
        .then(data => setArticles(data))
        .catch(err => console.log(err))
    }, []) //no array dependency because we want all the articles to be fetched only once in the starting

    const editArticle = (article) => {
      setEditedArticle(article);
      console.log("update clicked");
    }

    

    const updatedData = (article) => {
      const new_article_list = articles.map(my_article => {
        if(my_article.id===article.id){
          return article
        } else {
          return my_article
        }
      })
      setArticles(new_article_list)
    }

    const removedData = (article) => {
      const new_article_list = articles.filter(my_article => {
        if(my_article.id===article.id){
          return false
        }
        return true
      })
      setArticles(new_article_list)
    }


    const insertedArticle = (article) => {
      const new_article_list = [...articles, article]
      setArticles(new_article_list)
    }

    const openForm = () => {
      setEditedArticle({title:'', description:''})
    }




    return (
      <>
        <AddArticle openForm={openForm}/>
        <ArticleLists articles={articles} editArticle={editArticle} removedData={removedData} />
        {editedArticle ? <Form article={editedArticle} updatedData={updatedData} insertedArticle={insertedArticle} /> : null}
      </>
    );
}

export default App;
