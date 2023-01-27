export default class APIService {
    static UpdateArticle(id, body){
        return fetch(`https://flask-backend.onrender.com/article/${id}`, {
            'method':'PUT',
            headers:{
                'Content-Type':'application/json'
            }, 
            body: JSON.stringify(body)
            })
            .then(resp => resp.json())
    }

    static InsertArticle(body){
        return fetch(`https://flask-backend.onrender.com/add`, {
            'method':'POST',
            headers:{
                'Content-Type':'application/json'
            }, 
            body: JSON.stringify(body)
            })
            .then(resp => resp.json())
    }

    static RemoveArticle(id){
        return fetch(`https://flask-backend.onrender.com/remove/${id}`, {
            'method':'DELETE',
            headers:{
                'Content-Type':'application/json'
            }
            })
            .then(resp => resp.json())
    }
}