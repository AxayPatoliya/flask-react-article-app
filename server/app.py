from flask import Flask, jsonify, request
import datetime
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import desc
from flask_marshmallow import Marshmallow
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "mysql://sql12593189:Arpyd1hphn@sql12.freesqldatabase.com/sql12593189"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)

# cerate database setup
class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100))
    description = db.Column(db.String(1000))
    date = db.Column(db.DateTime, default=datetime.datetime.now)    

    def __init__(self, title, description):
        self.title = title
        self.description = description

# create database schema for table we created for serialization of data because to render it to frontend we need to serialize the data
class ArticlesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'title', 'description', 'date')

article_schema = ArticlesSchema() #if we want to serialize one article
articles_schema = ArticlesSchema(many=True) #if we want to serialize multiple article


# APIs for application
@app.route("/articles", methods=['GET'])
def home():
    all_articles = Articles.query.order_by(desc(Articles.date)).all()
    result = articles_schema.dump(all_articles)
    return jsonify(result)

@app.route("/article/<id>", methods=['GET', 'PUT']) #view as well as edit/update - based on request type
def article_details(id):
    article = Articles.query.filter(Articles.id==id).one_or_none()
    if request.method == 'PUT':
        title = request.json['title']
        description = request.json['description']

        article.title = title
        article.description = description

        db.session.add(article)
        db.session.commit()

    result = article_schema.jsonify(article)
    return result

@app.route("/add", methods=['POST'])
def add_article():
    title = request.json['title']
    description = request.json['description']

    articles = Articles(title, description)
    db.session.add(articles)
    db.session.commit()

    return article_schema.jsonify(articles)

@app.route("/remove/<id>", methods=['DELETE'])
def remove_article(id):
    article = Articles.query.filter(Articles.id==id).one_or_none()
    db.session.delete(article)
    db.session.commit()

    result = article_schema.jsonify(article)
    return result

with app.app_context():
    db.create_all()

if __name__ == "__main__":
    app.run(debug=True)