"""
Google Gemini API client — handles image/PDF/text analysis for grading.

Implemented in Bosqich 6.
"""

import google.generativeai as genai
from app.core.config import settings


class GeminiClient:
    """Wrapper around Google Gemini API for homework analysis."""

    def __init__(self):
        self.api_key = settings.GEMINI_API_KEY
        self.model_name = settings.GEMINI_MODEL
        genai.configure(api_key=self.api_key)
        self.model = genai.GenerativeModel(self.model_name)

    async def analyze_image(self, image_url: str, prompt: str) -> str:
        """
        Send an image to Google Gemini API and get analysis.
        Currently a placeholder that mimics async response.
        
        Args:
            image_url: URL or base64 of the homework image
            prompt: Grading instructions from prompts/

        Returns:
            Structured grading response (score, errors, feedback) as string.
        """
        # In a real scenario, fetch image bytes and pass to model.generate_content_async
        # response = await self.model.generate_content_async([prompt, image_bytes])
        # return response.text
        raise NotImplementedError("Gemini Vision client tez orada to'liq ulanadi")

    async def analyze_pdf(self, pdf_url: str, prompt: str) -> str:
        """
        Send PDF (or text) to Gemini.
        """
        raise NotImplementedError("Gemini PDF analysis tez orada to'liq ulanadi")
