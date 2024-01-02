import boto3
from botocore.exceptions import ClientError
from datetime import datetime

table_name = "Board"


def get_dynamodb():
    return boto3.resource(
        "dynamodb",
        endpoint_url="http://localhost:8000",
        region_name="dummy-region",
        aws_access_key_id="dummy",
        aws_secret_access_key="dummy",
    )


def create_dynamodb_table(table_name):
    dynamodb = get_dynamodb()

    try:
        table = dynamodb.create_table(
            TableName=table_name,
            KeySchema=[
                {"AttributeName": "PK", "KeyType": "HASH"},
                {"AttributeName": "SK", "KeyType": "RANGE"},
            ],
            AttributeDefinitions=[
                {"AttributeName": "PK", "AttributeType": "S"},
                {"AttributeName": "SK", "AttributeType": "S"},
            ],
            ProvisionedThroughput={"ReadCapacityUnits": 5, "WriteCapacityUnits": 5},
        )
        table.wait_until_exists()
        table.put_item(
            Item={
                "PK": f"BOARD#{1}",
                "SK": f"#METADATA#{1}",
                "id": "1",
                "name": "Board 1",
                "created_at": datetime.now().isoformat(),
                "updated_at": datetime.now().isoformat(),
            }
        )

        print(f"Table {table_name} created successfully.")
    except ClientError as e:
        if e.response["Error"]["Code"] == "ResourceInUseException":
            print(f"Table {table_name} already exists.")
        else:
            raise


if __name__ == "__main__":
    create_dynamodb_table(table_name)
