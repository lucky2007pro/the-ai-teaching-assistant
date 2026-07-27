"""
OpenAI Vision API client — handles image/PDF analysis for grading.

TODO: Implement in Bosqich 6.
"""

from app.core.config import settings


class VisionClient:
    """Wrapper around OpenAI Vision API for homework analysis."""

    def __init__(self):
        self.api_key = settings.OPENAI_API_KEY
        self.model = settings.OPENAI_MODEL

    async def analyze_image(self, image_url: str, prompt: str) -> dict:
        """
        Send an image to OpenAI Vision API and get structured analysis.

        Args:
            image_url: URL or base64 of the homework image
            prompt: Grading instructions from prompts/

        Returns:
            Structured grading response (score, errors, feedback)

        TODO: Implement with openai.AsyncOpenAI client
        """
        raise NotImplementedError("Vision client tez orada qo'shiladi")

    async def analyze_pdf(self, pdf_url: str, prompt: str) -> dict:
        """
        Convert PDF pages to images and analyze each.

        TODO: Implement with PDF → image conversion + Vision API
        """
        raise NotImplementedError("PDF analysis tez orada qo'shiladi")
