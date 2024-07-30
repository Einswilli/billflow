## BILLFLOW
Billflow is a open source self-hosted billing and invoicing software designed for businesses of all sizes. BillFlow is built with Django (python) and Angular (TypeScript) Frameworks.

## INSTALLATION
To install Billflow, follow these steps:
1. Clone the repository using the following command:<br>
`git clone https://github.com/Einswilli/billflow.git`
2. Change into the cloned directory:<br> `cd billflow`
3. Run the projects: <br>
- a. using Docker: <br>
`docker-compose up --build -d` <br><br>
- b. using classic commands:
    - i. Frontend <br>
        - navigate into frontend folder: `cd  frontend` <br>
        - Install requirements: `npm install` <br>
        - Run the project: `ng serve` <br>

    - ii. Backend<br>
        - navigate into backend folder: `cd backend` <br>
        - install pipenv: `pip install pipenv` <br>
        - Activate the virtual environment: `pipenv shell` <br>
        - Install requirements: `pipenv install` <br>
        - Run the project: `python manage.py runserver 12000` <br>

4. Open `http://localhost:4200` in your browser :tada:

## NOTE:
<!-- Please note that this is a self-hosted solution and you will need to set up your own database. -->
You need authentication to access the dashboard.
You can use the following credentials to login:
- Email: `exemple@exemple.com`
- Phone number: `+22890000102`
- Password: `password@123`

*The authentication is email or phone number based.*

<p align = "center">Made with ❤️ by #Einswilli</p>