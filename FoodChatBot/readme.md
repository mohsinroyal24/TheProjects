# FoodChatBot

FoodChatBot is a smart chatbot that can take food orders, remove items from orders, track orders, and provide information about business hours. It's designed to work with Dialogflow, a language understanding platform, and uses FastAPI as its backend to handle incoming requests. The chatbot stores orders and order statuses in a MySQL database.

## Table of Contents

- [Getting Started](#getting-started)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Usage](#usage)
- [Endpoints](#endpoints)
- [Contributing](#contributing)
- [License](#license)

## Getting Started

To get started with the FoodChatBot project, you need to follow the installation instructions and set up the necessary components.

## Prerequisites

Before running the FoodChatBot, ensure you have the following installed:

- Python 3.x
- MySQL database
- ngrok (for testing with Dialogflow)

## Installation

1. Clone the repository to your local machine.
2. Create a virtual environment and activate it.
3. Install the required dependencies using `pip install -r requirements.txt`.
4. Set up the MySQL database and create the necessary tables. You can use the `db_helper.py` script for this purpose.

## Usage

1. Start the FastAPI server by running `uvicorn main:app --reload`.
2. Use ngrok to create a secure tunnel to your local FastAPI server by running `ngrok http 8000`.
3. Update the Dialogflow webhook URL with the secure ngrok URL to enable communication between Dialogflow and the FastAPI server.
4. Train and test your Dialogflow agent to interact with the FoodChatBot.

## Endpoints

The FoodChatBot provides the following endpoints:

- `/` (GET): A simple endpoint to check if the server is running.
- `/` (POST): The main endpoint to handle requests from Dialogflow and process user interactions.

## Contributing

Contributions to the FoodChatBot project are welcome! If you find any issues or have improvements to suggest, please feel free to create a pull request.

## License

The FoodChatBot project is licensed under the [MIT License](LICENSE). You are free to use, modify, and distribute the code as per the terms of the license.

