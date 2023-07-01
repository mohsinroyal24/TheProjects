# ChatGPT Clone using Flask API, MongoDB, and Tailwind CSS

This is a ChatGPT clone web application that is built using Flask API and MongoDB on the backend and styled with Tailwind CSS. The application allows users to interact with the OpenAI GPT-3.5 language model to generate human-like text based on the input provided.

## Prerequisites
- Python 3.x is installed
- MongoDB is installed and running on your system
- You have a valid API key from OpenAI

## Installation

### 1. Clone the repository

Start by cloning this repository to your local machine:

```
$ git clone https://github.com/your-username/chatgpt-clone.git
$ cd chatgpt-clone
```

### 2. Set up virtual environment

It's always a good idea to create a virtual environment before installing Python packages. You can use `venv` or `conda` for this:

#### Using venv:

```bash
$ python3 -m venv venv
$ source venv/bin/activate   # On Windows: venv\Scripts\activate
```

#### Using conda:

```bash
$ conda create --name chatgpt-clone-env python=3.x
$ conda activate chatgpt-clone-env
```

### 3. Install dependencies

Next, install the required dependencies from the `requirements.txt` file:

```bash
$ pip install -r requirements.txt
```

### 4. Set up MongoDB

Create a new MongoDB database for the application. You can do this through the MongoDB shell or a GUI client like Compass.

### 5. Add environment variables

Create a new file named `.env` in the project root and add the following variables:

```bash
MONGODB_URI=your_mongodb_uri
OPENAI_API_KEY=your_openai_api_key
```

Replace `your_mongodb_uri` with the MongoDB connection URI, and `your_openai_api_key` with your actual OpenAI API key.

### 6. Run the application

You can start the Flask development server using the following command:

```bash
$ python app.py
```

The application should now be running at `http://localhost:5000`.

## Usage

1. Open your web browser and navigate to `http://localhost:5000`.
2. Enter your message in the chat window and submit it.
3. The application will send your message to the OpenAI GPT-3.5 model via the Flask API.
4. The model will process your request and generate a human-like text response.
5. The response will be displayed in the chat window.

Feel free to interact with the ChatGPT clone as much as you like!

## Acknowledgments

This project uses the OpenAI GPT-3.5 language model, which is an incredibly powerful tool for natural language generation.

## Disclaimer

This project is a clone of the ChatGPT application provided by OpenAI. It is intended for educational and non-commercial use only.

---

Happy Chatting! 😄
