from flask import Flask
from graphql_server.flask import GraphQLView
from .graphql.schema import my_schema


def create_app():
    app = Flask(__name__)

    app.add_url_rule(
        "/graphql",
        view_func=GraphQLView.as_view(
            "graphql",
            schema=my_schema,
            graphiql=True,
        ),
    )

    return app
