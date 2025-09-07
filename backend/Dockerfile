FROM python:3.13-slim
WORKDIR /app
COPY requirements.txt ./
COPY requirements-dev.txt ./
RUN pip install --no-cache-dir -r requirements.txt -r requirements-dev.txt
COPY app/ ./app/
