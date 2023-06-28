from flask import Flask, render_template,jsonify, request
app = Flask(__name__)

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/api", methods=["GET","POST"])
def qa():
    if request.method=="POST":
        print(request.form, request.json)
        question = request.json.get("question")
        data = {"result": f"Answer of {question}"}
        return jsonify(data)
    data = {"result": "Thankyou for asking"}
    return jsonify(data)

app.run(debug=True)

