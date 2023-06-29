from flask import Flask, render_template,jsonify, request
from flask_pymongo import PyMongo
app = Flask(__name__)



app = Flask(__name__)
app.config["MONGO_URI"] = "mongodb+srv://mohsin:vk1824@cluster0.pkpyiux.mongodb.net/chatGPT"
mongo = PyMongo(app)

@app.route("/")
def home():
    chats = mongo.db.chats.find({})
    myChats = [chat for chat in chats]
    print(myChats)
    return render_template("index.html", myChats = myChats)

@app.route("/api", methods=["GET","POST"])
def qa():
    if request.method=="POST":
        print(request.form, request.json)
        question = request.json.get("question")
        chat = mongo.db.chats.find_one({"question": question})
        print(chat)
        if chat:
            data = {"result": f"{chat['answer']}"}
            return jsonify(data)
        else:
            data = {"result": f"Answer of {question}"}
            mongo.db.chats.insert_one({"question":question, "answer": f"Answer from openai for {question}"})
        return jsonify(data)
    data = {"result": "Thankyou for asking"}
    return jsonify(data)

app.run(debug=True)

