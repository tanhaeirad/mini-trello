import graphene
from .test_data import BOARDS, LISTS, TASKS
from .types import Board, List, Task
from .mutations import CreateTask, CreateBoard, CreateList


class Query(graphene.ObjectType):
    boards = graphene.Field(graphene.List(Board))
    board = graphene.Field(Board, id=graphene.ID(required=True))
    lists = graphene.Field(graphene.List(List))
    tasks = graphene.Field(graphene.List(Task))

    def resolve_boards(self, info):
        return BOARDS

    def resolve_board(self, info, id):
        return next((item for item in BOARDS if item["id"] == id), None)

    def resolve_lists(self, info):
        return LISTS

    def resolve_tasks(self, info):
        return TASKS


class Mutation(graphene.ObjectType):
    create_task = CreateTask.Field()
    create_list = CreateList.Field()
    create_board = CreateBoard.Field()


my_schema = graphene.Schema(query=Query, mutation=Mutation)
