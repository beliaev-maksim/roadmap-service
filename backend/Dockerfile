# Backend Dockerfile
FROM python:3.11-slim
WORKDIR /app
# Install Poetry
RUN pip install --upgrade pip && pip install poetry
# Copy project files
COPY pyproject.toml poetry.lock* ./
# Install dependencies
RUN poetry config virtualenvs.create false && poetry install --no-root --no-interaction --no-ansi
# Copy source code
COPY ./src /app/src
CMD ["uvicorn", "src.api:app", "--host", "0.0.0.0", "--port", "8000"]