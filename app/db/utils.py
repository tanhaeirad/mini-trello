import uuid
from datetime import datetime
from .setup_dynamodb import table_name, get_dynamodb
from boto3.dynamodb.conditions import Key


def get_table(table_name):
    dynamodb = get_dynamodb()
    return dynamodb.Table(table_name)


def create_board(name):
    table = get_table(table_name)
    board_id = str(uuid.uuid4())
    response = table.put_item(
        Item={
            "PK": f"BOARD#{board_id}",
            "SK": f"#METADATA#{board_id}",
            "id": board_id,
            "name": name,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat(),
        }
    )
    return response, board_id


def create_list(board_id, title, index_order):
    table = get_table(table_name)
    list_id = str(uuid.uuid4())
    response = table.put_item(
        Item={
            "PK": f"BOARD#{board_id}",
            "SK": f"LIST#{list_id}",
            "id": list_id,
            "title": title,
            "index_order": index_order,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat(),
        }
    )
    return response, list_id


def create_task(board_id, list_id, content, index_order):
    table = get_table(table_name)
    task_id = str(uuid.uuid4())
    response = table.put_item(
        Item={
            "PK": f"BOARD#{board_id}",
            "SK": f"TASK#{task_id}",
            "id": task_id,
            "content": content,
            "list_id": list_id,
            "index_order": index_order,
            "created_at": datetime.now().isoformat(),
            "updated_at": datetime.now().isoformat(),
        }
    )
    return response, task_id


def get_all_tasks_of_board(board_id):
    table = get_table(table_name)
    response = table.query(
        KeyConditionExpression=Key("PK").eq(f"BOARD#{board_id}")
        & Key("SK").begins_with("TASK#")
    )
    return response["Items"]


def get_all_lists_of_board(board_id):
    table = get_table(table_name)
    response = table.query(
        KeyConditionExpression=Key("PK").eq(f"BOARD#{board_id}")
        & Key("SK").begins_with("LIST#")
    )
    return response["Items"]


def get_board_by_id(board_id):
    table = get_table(table_name)
    response = table.get_item(
        Key={"PK": f"BOARD#{board_id}", "SK": f"#METADATA#{board_id}"}
    )
    return response.get("Item")


def update_list(list_id, update_data, board_id="1"):
    table = get_table(table_name)
    update_expression = "set " + ", ".join(f"{k}=:{k}" for k in update_data.keys())
    attribute_values = {f":{k}": v for k, v in update_data.items()}

    response = table.update_item(
        Key={"PK": f"BOARD#{board_id}", "SK": f"LIST#{list_id}"},
        UpdateExpression=update_expression,
        ExpressionAttributeValues=attribute_values,
        ReturnValues="ALL_NEW",
    )
    return response.get("Attributes")
