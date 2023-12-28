from flask import Flask
from flask_cors import CORS
from graphql_server.flask import GraphQLView
from .graphql.schema import my_schema


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r"/graphql": {"origins": "http://localhost:5173"}})

    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view(
            "graphql",
            schema=my_schema,
            graphiql=True,
        ),
    )

    return app
