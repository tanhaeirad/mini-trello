import graphene
from .test_data import BOARDS, LISTS, TASKS
from .types import Board, List, Task
from .mutations import (
    CreateTask,
    CreateBoard,
    CreateList,
    DeleteList,
    UpdateBoard,
    UpdateList,
    UpdateTask,
    DeleteTask,
)

from app.db.utils import get_board_by_id


class Query(graphene.ObjectType):
    # boards = graphene.Field(graphene.List(Board))
    board = graphene.Field(Board, id=graphene.ID(required=True))
    # lists = graphene.Field(graphene.List(List))
    # tasks = graphene.Field(graphene.List(Task))

    # def resolve_boards(self, info):
    #     return BOARDS

    def resolve_board(self, info, id):
        return get_board_by_id(id)

    # def resolve_lists(self, info):
    #     return LISTS

    # def resolve_tasks(self, info):
    #     return TASKS


class Mutation(graphene.ObjectType):
    # create_board = CreateBoard.Field()
    # update_board = UpdateBoard.Field()
    create_list = CreateList.Field()
    update_list = UpdateList.Field()
    delete_list = DeleteList.Field()
    create_task = CreateTask.Field()
    update_task = UpdateTask.Field()
    delete_task = DeleteTask.Field()


my_schema = graphene.Schema(query=Query, mutation=Mutation)
# my_schema = graphene.Schema(query=Query)
