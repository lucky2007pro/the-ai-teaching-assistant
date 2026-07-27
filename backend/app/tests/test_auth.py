"""
Auth module tests — register, login, refresh, logout, me.
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
        await client.post(
            "/auth/register",
            json={
                "email": "dup@example.com",
                "password": "secret123",
                "full_name": "User One",
            },
        )
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
        await client.post(
            "/auth/register",
            json={
                "email": "login@example.com",
                "password": "secret123",
                "full_name": "Login User",
            },
        )
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
class TestAuthRefreshAndLogout:
    """Test token refresh and logout."""

    async def test_refresh_and_logout_flow(self, client: AsyncClient):
        # 1. Register & Login
        await client.post(
            "/auth/register",
            json={
                "email": "flow@example.com",
                "password": "secret123",
                "full_name": "Flow User",
            },
        )
        login_resp = await client.post(
            "/auth/login",
            json={"email": "flow@example.com", "password": "secret123"},
        )
        refresh_token = login_resp.json()["refresh_token"]

        # 2. Refresh token
        refresh_resp = await client.post(
            "/auth/refresh",
            json={"refresh_token": refresh_token},
        )
        assert refresh_resp.status_code == 200
        new_tokens = refresh_resp.json()
        assert "access_token" in new_tokens
        assert "refresh_token" in new_tokens

        # 3. Logout using new refresh token
        logout_resp = await client.post(
            "/auth/logout",
            json={"refresh_token": new_tokens["refresh_token"]},
        )
        assert logout_resp.status_code == 200
        assert "muvaffaqiyatli" in logout_resp.json()["message"]

        # 4. Try refresh again after logout -> should fail (401)
        fail_refresh = await client.post(
            "/auth/refresh",
            json={"refresh_token": new_tokens["refresh_token"]},
        )
        assert fail_refresh.status_code == 401


@pytest.mark.asyncio
class TestAuthMe:
    """Test /auth/me endpoint."""

    async def test_get_me(self, client: AsyncClient):
        await client.post(
            "/auth/register",
            json={
                "email": "me@example.com",
                "password": "secret123",
                "full_name": "Me User",
            },
        )
        login_resp = await client.post(
            "/auth/login",
            json={"email": "me@example.com", "password": "secret123"},
        )
        token = login_resp.json()["access_token"]

        response = await client.get(
            "/auth/me",
            headers={"Authorization": f"Bearer {token}"},
        )
        assert response.status_code == 200
        assert response.json()["email"] == "me@example.com"

    async def test_get_me_unauthorized(self, client: AsyncClient):
        response = await client.get("/auth/me")
        assert response.status_code in [401, 403]
