import boto3
import json
import psutil
from dotenv import load_dotenv
import os
from botocore.config import Config
from decimal import Decimal

#load environment variabes from .env file
load_dotenv()

#collect the system name (hard coded for now)
employee_name = "Gabriel Mazza"
 

#collecting CPU data 
cpuUsage = psutil.cpu_percent(interval=5)
cpuFreq = psutil.cpu_freq()
currFreq = cpuFreq.current

#collecting RAM usage
ramInfo = psutil.virtual_memory()
ramUsage = ramInfo.active
ramUsageGB = ramUsage / (1024 **3)

#collecting free diskspace
diskInfo = psutil.disk_usage('/')
#accessing the free object from named tuple
freeSpace = diskInfo.free
freeSpaceGB = freeSpace / (1024 **3) # converting from bytes to GB

#create dictionary to store data
userData = {
    "cpuUsage": Decimal(str(cpuUsage)),
    "CPUFreq": Decimal(str(currFreq)),
    "ramUsage": Decimal(str(ramUsageGB)),
    "freeSpace": Decimal(str(freeSpaceGB))
}
#convert from python object to JSON


#acquire aws credentials
aws_access_key_id = os.getenv("aws_access_key_id")
aws_secret_access_key = os.getenv("aws_secret_access_key")
aws_session_token = os.getenv("aws_session_token")



#create dynamodb resource to input data

dynamodb = boto3.resource(
    'dynamodb',
    region_name='us-east-1',
    aws_access_key_id = aws_access_key_id,
    aws_secret_access_key = aws_secret_access_key,
    aws_session_token = aws_session_token
)

#specify's specific table
table = dynamodb.Table('metricJSON')

#input data into table 
table.put_item(
    Item={
        'name': employee_name,
        'cpuUsage': userData
    }
)

 