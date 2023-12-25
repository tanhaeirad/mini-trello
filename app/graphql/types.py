import graphene
from .test_data import LISTS, TASKS


# TODO: default value for created_at updated_at
class Board(graphene.ObjectType):
    id = graphene.ID(required=True)
    name = graphene.String(required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
    lists = graphene.List(lambda: List)

    def resolve_lists(self, info):
        return [lst for lst in LISTS if lst["board_id"] == self["id"]]


class List(graphene.ObjectType):
    id = graphene.String(required=True)
    board_id = graphene.String(required=True)
    name = graphene.String(required=True)
    index_order = graphene.Int(required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
    tasks = graphene.List(lambda: Task)

    def resolve_tasks(self, info):
        return [tsk for tsk in TASKS if tsk["list_id"] == self["id"]]


class Task(graphene.ObjectType):
    id = graphene.String(required=True)
    board_id = graphene.String(required=True)
    list_id = graphene.String(required=True)
    name = graphene.String(required=True)
    index_order = graphene.Int(required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
