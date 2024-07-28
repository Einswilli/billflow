# PYTHON VERSION
FROM python:3.11

# ENVIRONMENT VARIABLES
ENV PYTHONUNBUFFERED 1

# CREATE OUR PROJECT ROOT DIR IN OUR IMAGE
RUN mkdir /app

# SET WORKDIR
WORKDIR /app

# COPY THE PROJECT TO OUR WORKDIR
COPY . /app

# COPY .ENV FILE
# COPY .env ./

# COPY PIPFILE & Pipfile.lock TO OUR DOCKER IMAGE ROOT DIR
COPY Pipfile Pipfile.lock ./

# UPGRADING PIP
RUN pip install --upgrade pip pipenv gunicorn

# GENERATE DEPENDENCIES FILE
RUN pipenv requirements > requirements.txt

# INSTALL DEPENDENCIES
RUN pip install -r requirements.txt

ENTRYPOINT [ "sh","./entrypoint.sh" ]

# port where the Django app runs
# EXPOSE 8000

# START OUR SERVER ON PORT 8000
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]