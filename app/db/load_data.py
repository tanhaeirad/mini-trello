from .utils import create_board, create_list, create_task

list_1 = create_list("List 1", 1)
list_2 = create_list("List 2", 3)
list_3 = create_list("List 3", 2)


create_task(list_1.get("id"), "Task 1", 1)
create_task(list_1.get("id"), "Task 2", 2)
create_task(list_1.get("id"), "Task 3", 3)
create_task(list_1.get("id"), "Task 4", 4)


create_task(list_2.get("id"), "Task 1", 1)
create_task(list_2.get("id"), "Task 2", 2)
create_task(list_2.get("id"), "Task 3", 3)
create_task(list_2.get("id"), "Task 4", 4)
create_task(list_2.get("id"), "Task 5", 5)
create_task(list_2.get("id"), "Task 6", 6)

create_task(list_3.get("id"), "Task 1", 1)
create_task(list_3.get("id"), "Task 2", 2)
create_task(list_3.get("id"), "Task 3", 3)
