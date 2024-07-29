#! /bin/sh

# RUN MIGRATIONS
# python manage.py makemigrations
python manage.py migrate --no-input

# COLLECT STATIC
python manage.py collectstatic --no-input

# RUN CELERY WORKERS
celery -A server.celery worker -l info &
celery -A server.celery beat -l info &

# RUN GUNICORN
gunicorn --bind localhost:8000 --workers 4 server.wsgi:application