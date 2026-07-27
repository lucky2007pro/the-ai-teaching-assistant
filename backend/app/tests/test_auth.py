"""
Auth module tests — register, login, refresh, me.
"""

import pytest
from httpx import AsyncClient


@pytest.mark.asyncio
class TestAuthRegister:
    """Test user registration."""

    async def test_register_success(self, client: AsyncClient):
        response = await client.post(
            "/auth/register",
            json={
                "email": "test@example.com",
                "password": "secret123",
                "full_name": "Test User",
                "role": "student",
            },
        )
        assert response.status_code == 201
        data = response.json()
        assert data["email"] == "test@example.com"
        assert data["full_name"] == "Test User"
        assert data["role"] == "student"
        assert "id" in data

    async def test_register_duplicate_email(self, client: AsyncClient):
        # First registration
        await client.post(
            "/auth/register",
            json={
                "email": "dup@example.com",
                "password": "secret123",
                "full_name": "User One",
            },
        )
        # Second registration with same email
        response = await client.post(
            "/auth/register",
            json={
                "email": "dup@example.com",
                "password": "secret456",
                "full_name": "User Two",
            },
        )
        assert response.status_code == 409


@pytest.mark.asyncio
class TestAuthLogin:
    """Test login and token flow."""

    async def test_login_success(self, client: AsyncClient):
        # Register first
        await client.post(
            "/auth/register",
            json={
                "email": "login@example.com",
                "password": "secret123",
                "full_name": "Login User",
            },
        )
        # Login
        response = await client.post(
            "/auth/login",
            json={"email": "login@example.com", "password": "secret123"},
        )
        assert response.status_code == 200
        data = response.json()
        assert "access_token" in data
        assert "refresh_token" in data
        assert data["token_type"] == "bearer"

    async def test_login_wrong_password(self, client: AsyncClient):
        await client.post(
            "/auth/register",
            json={
                "email": "wrong@example.com",
                "password": "correct123",
                "full_name": "Wrong Pass",
            },
        )
        response = await client.post(
            "/auth/login",
            json={"email": "wrong@example.com", "password": "incorrect"},
        )
        assert response.status_code == 401


@pytest.mark.asyncio
class TestAuthMe:
    """Test /auth/me endpoint."""

    async def test_get_me(self, client: AsyncClient):
        # Register
        await client.post(
            "/auth/register",
            json={
                "email": "me@example.com",
                "password": "secret123",
                "full_name": "Me User",
            },
        )
        # Login
        login_resp = await client.post(
            "/auth/login",
            json={"email": "me@example.com", "password": "secret123"},
        )
        token = login_resp.json()["access_token"]

        # Get me
        response = await client.get(
            "/auth/me",
            headers={"Authorization": f"Bearer {token}"},
        )
        assert response.status_code == 200
        assert response.json()["email"] == "me@example.com"

    async def test_get_me_unauthorized(self, client: AsyncClient):
        response = await client.get("/auth/me")
        assert response.status_code in [401, 403]
