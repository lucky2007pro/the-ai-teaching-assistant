import asyncio
import httpx
import uuid
from time import time

API_BASE_URL = "http://localhost:8000/api/v1"

async def register_user(client: httpx.AsyncClient, i: int):
    email = f"testuser_{uuid.uuid4().hex[:8]}@example.com"
    password = "StrongPassword123!"
    payload = {
        "email": email,
        "password": password,
        "full_name": f"Test{i} User"
    }
    
    start_time = time()
    response = await client.post(f"{API_BASE_URL}/auth/register", json=payload)
    elapsed = time() - start_time
    
    if response.status_code == 201:
        print(f"[Agent {i}] Registered successfully in {elapsed:.3f}s: {email}")
        return email, password
    else:
        print(f"[Agent {i}] Register failed with {response.status_code}: {response.text}")
        return None, None

async def login_user(client: httpx.AsyncClient, i: int, email: str, password: str):
    payload = {
        "email": email,
        "password": password
    }
    
    start_time = time()
    response = await client.post(f"{API_BASE_URL}/auth/login", json=payload)
    elapsed = time() - start_time
    
    if response.status_code == 200:
        data = response.json()
        print(f"[Agent {i}] Logged in successfully in {elapsed:.3f}s. Token: {data.get('access_token')[:15]}...")
    else:
        print(f"[Agent {i}] Login failed with {response.status_code}: {response.text}")

async def run_agent(i: int):
    async with httpx.AsyncClient() as client:
        email, password = await register_user(client, i)
        if email and password:
            await login_user(client, i, email, password)

async def main():
    print("Starting Parallel Auth Agents (Load Test)...")
    agents = 5
    tasks = [run_agent(i) for i in range(1, agents + 1)]
    await asyncio.gather(*tasks)
    print("Parallel Auth Testing Completed!")

if __name__ == "__main__":
    asyncio.run(main())
