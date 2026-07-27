.PHONY: dev test lint migrate migrate-create docker-up docker-down

# ---- Development ----
dev:
	uvicorn app.main:app --reload --host 0.0.0.0 --port 8000

# ---- Database Migrations ----
migrate:
	alembic upgrade head

migrate-create:
	@read -p "Migration message: " msg; \
	alembic revision --autogenerate -m "$$msg"

migrate-downgrade:
	alembic downgrade -1

# ---- Testing ----
test:
	pytest -v --tb=short

test-cov:
	pytest --cov=app --cov-report=html

# ---- Linting ----
lint:
	ruff check app/
	ruff format --check app/

format:
	ruff check --fix app/
	ruff format app/

# ---- Docker ----
docker-up:
	docker compose up -d

docker-down:
	docker compose down

docker-dev:
	docker compose -f docker-compose.yml -f docker-compose.dev.yml up
