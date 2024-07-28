# FROM nginx
FROM node:latest

# CREATE OUR PROJECT ROOT DIR IN OUR IMAGE
RUN mkdir /app

# SET WORKDIR
WORKDIR /app

# COPY ./dist/olffront /usr/share/nginx/html

# COPY THE PROJECT TO OUR WORKDIR
COPY . /app

# INSTALL ANGULAR CLI
RUN npm install -g @angular/cli@16.0.0

ENTRYPOINT [ "sh","./entrypoint.sh" ]
