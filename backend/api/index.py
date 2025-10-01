import json
import os
import psycopg2
from psycopg2.extras import RealDictCursor
from typing import Dict, Any

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: API для управления вакансиями, заявками и скриншотами
    Args: event с httpMethod, body, queryStringParameters
    Returns: HTTP response с данными из БД
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    
    try:
        if method == 'GET':
            params = event.get('queryStringParameters', {})
            resource = params.get('resource', 'jobs')
            
            if resource == 'jobs':
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT id, title, requirements, status FROM jobs ORDER BY created_at DESC")
                    jobs = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(jobs, default=str)
                }
            
            if resource == 'applications':
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT id, job_title, vk, age, created_at FROM job_applications ORDER BY created_at DESC")
                    apps = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(apps, default=str)
                }
            
            if resource == 'screenshots':
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT id, url FROM screenshots ORDER BY created_at DESC")
                    screenshots = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(screenshots, default=str)
                }
            
            if resource == 'settings':
                with conn.cursor(cursor_factory=RealDictCursor) as cur:
                    cur.execute("SELECT key, value FROM settings")
                    settings = cur.fetchall()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps(settings, default=str)
                }
        
        if method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            resource = body_data.get('resource', 'jobs')
            
            if resource == 'jobs':
                with conn.cursor() as cur:
                    cur.execute(
                        "INSERT INTO jobs (title, requirements, status) VALUES (%s, %s, %s) RETURNING id",
                        (body_data['title'], body_data['requirements'], body_data.get('status', 'Открыта'))
                    )
                    job_id = cur.fetchone()[0]
                    conn.commit()
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'id': job_id, 'message': 'Job created'})
                }
            
            if resource == 'applications':
                with conn.cursor() as cur:
                    cur.execute(
                        "INSERT INTO job_applications (job_title, vk, age) VALUES (%s, %s, %s) RETURNING id",
                        (body_data['jobTitle'], body_data['vk'], body_data['age'])
                    )
                    app_id = cur.fetchone()[0]
                    conn.commit()
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'id': app_id, 'message': 'Application submitted'})
                }
            
            if resource == 'screenshots':
                with conn.cursor() as cur:
                    cur.execute(
                        "INSERT INTO screenshots (url) VALUES (%s) RETURNING id",
                        (body_data['url'],)
                    )
                    screenshot_id = cur.fetchone()[0]
                    conn.commit()
                return {
                    'statusCode': 201,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'id': screenshot_id, 'message': 'Screenshot added'})
                }
        
        if method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            resource = body_data.get('resource', 'jobs')
            
            if resource == 'jobs':
                jobs_to_save = body_data.get('jobs', [])
                with conn.cursor() as cur:
                    cur.execute("DELETE FROM jobs")
                    for job in jobs_to_save:
                        cur.execute(
                            "INSERT INTO jobs (id, title, requirements, status) VALUES (%s, %s, %s, %s)",
                            (job['id'], job['title'], job['requirements'], job['status'])
                        )
                    conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Jobs updated'})
                }
            
            if resource == 'settings':
                settings = body_data.get('settings', {})
                with conn.cursor() as cur:
                    for key, value in settings.items():
                        cur.execute(
                            "UPDATE settings SET value = %s, updated_at = CURRENT_TIMESTAMP WHERE key = %s",
                            (value, key)
                        )
                    conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Settings updated'})
                }
        
        if method == 'DELETE':
            params = event.get('queryStringParameters', {})
            resource = params.get('resource', 'jobs')
            
            if resource == 'jobs' and params.get('id'):
                with conn.cursor() as cur:
                    cur.execute("DELETE FROM jobs WHERE id = %s", (params['id'],))
                    conn.commit()
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'message': 'Job deleted'})
                }
        
        return {
            'statusCode': 404,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Not found'})
        }
    
    finally:
        conn.close()