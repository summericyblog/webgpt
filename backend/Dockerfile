FROM python:3.11.3-slim
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1
WORKDIR /backend
COPY ./requirements.txt .
COPY ./.env .
RUN python -m pip install --no-cache-dir --upgrade -r requirements.txt