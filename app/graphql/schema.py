import graphene
from .test_data import BOARDS, LISTS, TASKS
from .types import Board, List, Task



class Query(graphene.ObjectType):
    boards = graphene.Field(graphene.List(Board))
    board = graphene.Field(Board, id=graphene.ID(required=True))
    lists = graphene.Field(graphene.List(List))
    tasks = graphene.Field(graphene.List(Task))

    def resolve_boards(self, info):
        return BOARDS

    def resolve_board(self, info, id):
        print("im here")
        print(id)
        res = next((item for item in BOARDS if item["id"] == id), None)
        print(res)
        return {"id": 1, "name": "Board 1"}


    def resolve_lists(self, info):
        return LISTS

    def resolve_tasks(self):
        return TASKS

my_schema = graphene.Schema(query=Query)
