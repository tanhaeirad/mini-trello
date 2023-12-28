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
    id = graphene.ID(required=True)
    board_id = graphene.ID(required=True)
    title = graphene.String(required=True)
    index_order = graphene.Int(required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)
    tasks = graphene.List(lambda: Task)

    def resolve_tasks(self, info):
        return [tsk for tsk in TASKS if tsk["list_id"] == self["id"]]


class Task(graphene.ObjectType):
    id = graphene.ID(required=True)
    board_id = graphene.ID(required=True)
    list_id = graphene.ID(required=True)
    content = graphene.String(required=True)
    index_order = graphene.Int(required=True)
    created_at = graphene.DateTime(required=True)
    updated_at = graphene.DateTime(required=True)


class CreateBoardInput(graphene.InputObjectType):
    id = graphene.ID()
    name = graphene.String()


class UpdateBoardInput(graphene.InputObjectType):
    name = graphene.String(required=False)


class CreateListInput(graphene.InputObjectType):
    id = graphene.ID()
    title = graphene.String()
    board_id = graphene.ID()
    index_order = graphene.Int()


class UpdateListInput(graphene.InputObjectType):
    title = graphene.String(required=False)
    board_id = graphene.ID(required=False)
    index_order = graphene.Int(required=False)


class CreateTaskInput(graphene.InputObjectType):
    id = graphene.ID(required=True)
    content = graphene.String(required=True)
    board_id = graphene.ID(required=True)
    list_id = graphene.ID(required=True)
    index_order = graphene.Int(required=True)


class UpdateTaskInput(graphene.InputObjectType):
    content = graphene.String(required=False)
    board_id = graphene.ID(required=False)
    list_id = graphene.ID(required=False)
    index_order = graphene.Int(required=False)
