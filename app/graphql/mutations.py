import graphene
from .types import Task, List, Board, CreateTaskInput, CreateListInput, CreateBoardInput
from .test_data import TASKS, LISTS, BOARDS


class CreateTask(graphene.Mutation):
    class Arguments:
        task_data = CreateTaskInput(required=True)

    ok = graphene.Boolean()
    task = graphene.Field(lambda: Task)

    def mutate(root, info, task_data=None):
        task = {
            "id": task_data.id,
            "name": task_data.name,
            "board_id": task_data.board_id,
            "list_id": task_data.list_id,
            "index_order": task_data.index_order,
        }
        ok = True
        TASKS.append(task)
        return CreateTask(task=task, ok=ok)


class CreateList(graphene.Mutation):
    class Arguments:
        list_data = CreateListInput(required=True)

    ok = graphene.Boolean()
    list = graphene.Field(lambda: List)

    def mutate(root, info, list_data=None):
        list = {
            "id": list_data.id,
            "name": list_data.name,
            "board_id": list_data.board_id,
            "index_order": list_data.index_order,
        }
        ok = True
        LISTS.append(list)
        return CreateList(list=list, ok=ok)


class CreateBoard(graphene.Mutation):
    class Arguments:
        board_data = CreateBoardInput(required=True)

    ok = graphene.Boolean()
    board = graphene.Field(lambda: Board)

    def mutate(root, info, board_data=None):
        board = {
            "id": board_data.id,
            "name": board_data.name,
        }

        ok = True
        BOARDS.append(board)
        return CreateBoard(board=board, ok=ok)
