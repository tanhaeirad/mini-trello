import graphene
from .types import (
    Task,
    List,
    Board,
    CreateTaskInput,
    CreateListInput,
    CreateBoardInput,
    UpdateBoardInput,
    UpdateListInput,
    UpdateTaskInput,
)
from .test_data import TASKS, LISTS, BOARDS


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


class UpdateBoard(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        board_data = UpdateBoardInput(required=True)

    board = graphene.Field(lambda: Board)

    def mutate(root, info, id, board_data):
        board = next((item for item in BOARDS if item["id"] == id), None)

        if not board:
            raise Exception("Board not found")

        for key, value in board_data.items():
            if value is not None:
                board[key] = value

        return UpdateBoard(board=board)


class CreateList(graphene.Mutation):
    class Arguments:
        list_data = CreateListInput(required=True)

    ok = graphene.Boolean()
    list = graphene.Field(lambda: List)

    def mutate(root, info, list_data=None):
        list = {
            "id": list_data.id,
            "title": list_data.title,
            "board_id": list_data.board_id,
            "index_order": list_data.index_order,
        }
        ok = True
        LISTS.append(list)
        return CreateList(list=list, ok=ok)


class UpdateList(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        list_data = UpdateListInput(required=True)

    list = graphene.Field(lambda: List)

    def mutate(root, info, id, list_data):
        list = next((item for item in LISTS if item["id"] == id), None)

        if not list:
            raise Exception("list not found")

        for key, value in list_data.items():
            if value is not None:
                list[key] = value

        return UpdateList(list=list)


class DeleteList(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)

    id = graphene.ID()
    ok = graphene.Boolean()

    def mutate(root, info, id):
        list = next((item for item in LISTS if item["id"] == id), None)
        if not list:
            raise Exception("list not found")

        LISTS.remove(list)
        ok = True
        return DeleteList(id=id, ok=ok)


class CreateTask(graphene.Mutation):
    class Arguments:
        task_data = CreateTaskInput(required=True)

    ok = graphene.Boolean()
    task = graphene.Field(lambda: Task)

    def mutate(root, info, task_data=None):
        task = {
            "id": task_data.id,
            "content": task_data.content,
            "board_id": task_data.board_id,
            "list_id": task_data.list_id,
            "index_order": task_data.index_order,
        }
        ok = True
        TASKS.append(task)
        return CreateTask(task=task, ok=ok)


class UpdateTask(graphene.Mutation):
    class Arguments:
        id = graphene.ID(required=True)
        task_data = UpdateTaskInput(required=True)

    task = graphene.Field(lambda: Task)

    def mutate(root, info, id, task_data):
        task = next((item for item in TASKS if item["id"] == id), None)

        if not task:
            raise Exception("task not found")

        for key, value in task_data.items():
            if value is not None:
                task[key] = value

        return UpdateTask(task=task)
