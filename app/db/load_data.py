from .utils import create_board, create_list, create_task

response, board_id = create_board("Board 1")

response, list_id1 = create_list(1, "List 1", 1)
response, list_id2 = create_list(1, "List 2", 3)
response, list_id3 = create_list(1, "List 3", 2)

response, list_id4 = create_list(board_id, "LLLLL1111", 3)
response, list_id5 = create_list(board_id, "LLLL222", 2)


response, task_id = create_task("1", list_id1, "Task 1", 1)
response, task_id = create_task("1", list_id1, "Task 2", 2)
response, task_id = create_task("1", list_id1, "Task 3", 3)
response, task_id = create_task("1", list_id1, "Task 4", 4)

response, task_id = create_task(board_id, list_id4, "TTTTTTT1", 3)
response, task_id = create_task(board_id, list_id5, "TTTTTT2", 4)


response, task_id = create_task("1", list_id2, "Task 1", 1)
response, task_id = create_task("1", list_id2, "Task 2", 2)
response, task_id = create_task("1", list_id2, "Task 3", 3)
response, task_id = create_task("1", list_id2, "Task 4", 4)
response, task_id = create_task("1", list_id2, "Task 5", 5)
response, task_id = create_task("1", list_id2, "Task 6", 6)

response, task_id = create_task("1", list_id3, "Task 1", 1)
response, task_id = create_task("1", list_id3, "Task 2", 2)
response, task_id = create_task("1", list_id3, "Task 3", 3)
