# INSTAWORK TEST APP

A full-stack application with Django/PostgreSQL backend and React frontend.

![Django](https://img.shields.io/badge/Django-092E20?style=flat&logo=django&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=flat&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2CA5E0?style=flat&logo=docker&logoColor=white)

## 🚀 Quick Start with Docker

### Prerequisites
- Docker 27.0+
- Docker Compose 2.0+

### Setup
```bash
# Clone the repository
git clone https://github.com/flushed058/instawork_test_app
cd instawork_test_app

# Build and start containers
docker-compose up -d --build

# Run database migrations
docker-compose run api python manage.py migrate
```

### Access apps:
- API: http://localhost:8000
- React: http://localhost:3000


## Manual Setup (without Docker)

### Prerequisites
- Python 3.9+
- Node.js 22.14+
- PostgreSQL 16+

### Setup
```bash
# 1. Clone repo and setup
git clone https://github.com/flushed058/instawork_test_app
cd instawork_test_app
cp api/.env.example api/.env - Replace the values with your db connection

# 2. Activate your env and install dependencies
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate  # Windows

pip install -r requirements.txt

# 3. Run migrations
python manage.py migrate

# 4. Start the server
python manage.py runserver
```

### Access apps:
- API: http://localhost:8000
- React: http://localhost:3000