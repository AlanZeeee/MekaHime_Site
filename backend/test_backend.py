import requests
import time
import sys

BASE_URL = "http://localhost:8000"

def test_health():
    print("Testing /health...")
    try:
        response = requests.get(f"{BASE_URL}/health")
        assert response.status_code == 200
        print("✅ Health check passed")
    except Exception as e:
        print(f"❌ Health check failed: {e}")
        sys.exit(1)

def test_tts():
    print("Testing /api/generate-tts...")
    payload = {"text": "Hello world", "voice_id": "default"}
    try:
        response = requests.post(f"{BASE_URL}/api/generate-tts", json=payload)
        assert response.status_code == 200
        data = response.json()
        assert "audio_url" in data
        print(f"✅ TTS generation passed. URL: {data['audio_url']}")
        return data['audio_url']
    except Exception as e:
        print(f"❌ TTS generation failed: {e}")
        sys.exit(1)

def test_subscribe():
    print("Testing /api/subscribe...")
    # Use a random email to avoid unique constraint errors on repeated runs
    email = f"test_{int(time.time())}@example.com"
    payload = {"email": email}
    try:
        response = requests.post(f"{BASE_URL}/api/subscribe", json=payload)
        assert response.status_code == 200
        print("✅ Subscription passed")
    except Exception as e:
        print(f"❌ Subscription failed: {e}")
        sys.exit(1)

if __name__ == "__main__":
    # Wait for server to start
    print("Waiting for server to start...")
    time.sleep(2)
    
    test_health()
    test_tts()
    test_subscribe()
    print("🎉 All backend tests passed!")
