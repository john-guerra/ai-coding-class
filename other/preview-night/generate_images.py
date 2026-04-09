"""Generate presentation images using Gemini's image generation API."""

import os
import base64
from pathlib import Path
from dotenv import load_dotenv
from google import genai

# Load API key from .env
load_dotenv(Path(__file__).parent / ".env")
client = genai.Client(api_key=os.environ["GEMINI_API_KEY"])

OUTPUT_DIR = Path(__file__).parent / "images"
OUTPUT_DIR.mkdir(exist_ok=True)

# Image prompts keyed by slide number
PROMPTS = {
    "slide1_title": (
        "A modern developer workspace seen from above at a slight angle. A laptop screen "
        "shows colorful code with subtle glowing AI suggestion highlights appearing inline. "
        "Around the laptop: a coffee cup, sticky notes with architecture diagrams, and a small "
        "robot assistant figurine. The scene has warm, inviting lighting with a clean dark desk. "
        "Style: digital illustration, slightly stylized, professional but approachable. "
        "Color palette includes red (#CC0000) accents. 16:9 aspect ratio, no text."
    ),
    "slide2_vibe_vs_pro": (
        "A split-screen illustration comparing two developer scenarios. "
        "LEFT SIDE: a developer casually typing prompts into a chatbot, surrounded by messy "
        "code snippets, error messages, and chaos — fun but disorganized energy. "
        "RIGHT SIDE: the same developer now with a professional setup — clean code on screen "
        "with green test checkmarks, a CI/CD pipeline visualization, monitoring dashboards, "
        "and a deployed application badge. The right side feels polished and confident. "
        "Style: flat vector illustration, playful but clear contrast. 16:9 aspect ratio, no text."
    ),
    "slide3_three_modalities": (
        "Three connected panels flowing left to right, showing the evolution of AI-assisted coding. "
        "PANEL 1: a chat interface with architecture diagrams and wireframes emerging from "
        "conversation bubbles. PANEL 2: a code editor with AI autocomplete suggestions appearing "
        "as ghost text, with colored inline annotations. PANEL 3: a terminal with multiple "
        "autonomous AI agents working in parallel — file trees changing, tests running, code "
        "being refactored simultaneously. Connected by flowing arrows showing progression. "
        "Style: clean tech illustration, slightly futuristic, blue-to-purple gradient background. "
        "16:9 aspect ratio, no text."
    ),
    "slide5_three_projects": (
        "Three application screenshots arranged in a cascading layout showing increasing complexity. "
        "FIRST (smallest, back): a clean personal utility app on a phone screen — simple, elegant. "
        "SECOND (medium, middle): a full-stack web dashboard with login screen, data tables, and "
        "a green 'All tests passing' badge. THIRD (largest, front): a production application with "
        "monitoring dashboards, performance graphs, and a CI/CD pipeline visualization. "
        "Each has a small 'DEPLOYED' badge. Style: realistic UI mockup illustration with slight "
        "depth and shadow, modern design aesthetic. 16:9 aspect ratio, minimal text."
    ),
    "slide8_outcomes": (
        "A diverse group of three graduate students (different ethnicities and genders) standing "
        "confidently, each holding a laptop showing a different deployed web application. Behind them: "
        "a wall of floating achievement badges showing skills like Full-Stack, TDD, CI/CD, and "
        "GitHub contribution graphs. The scene has upward, aspirational energy — like a tech "
        "graduation moment. Style: modern illustration, warm and inspiring, slightly stylized "
        "characters, professional tech setting. 16:9 aspect ratio, no text on badges."
    ),
    "slide9_cta": (
        "A clean, bold design with an abstract husky dog silhouette combined with AI and code "
        "elements — circuit patterns forming the shape, code brackets as design accents. "
        "Red (#CC0000) as the primary accent color against a dark navy (#1A1A2E) background. "
        "Leave center-right area empty for text overlay. Style: minimal, branded, professional. "
        "16:9 aspect ratio, no text."
    ),
}


def generate_image(name: str, prompt: str) -> Path:
    """Generate a single image using Gemini 2.5 Flash image model."""
    print(f"Generating {name}...")

    response = client.models.generate_content(
        model="gemini-2.5-flash-image",
        contents=f"Generate an illustration image (no text in the image): {prompt}",
        config=genai.types.GenerateContentConfig(
            response_modalities=["TEXT", "IMAGE"],
        ),
    )

    # Extract image from response parts
    for part in response.candidates[0].content.parts:
        if part.inline_data and part.inline_data.mime_type.startswith("image/"):
            img_data = part.inline_data.data
            output_path = OUTPUT_DIR / f"{name}.png"
            output_path.write_bytes(img_data)
            print(f"  ✓ Saved to {output_path}")
            return output_path

    print(f"  ✗ No image generated for {name}")
    return None


def main():
    print(f"Generating {len(PROMPTS)} images...\n")
    results = {}
    for name, prompt in PROMPTS.items():
        try:
            path = generate_image(name, prompt)
            results[name] = path
        except Exception as e:
            print(f"  ✗ Error generating {name}: {e}")
            results[name] = None

    print(f"\n{'='*50}")
    success = sum(1 for v in results.values() if v is not None)
    print(f"Generated {success}/{len(PROMPTS)} images")
    print(f"Output directory: {OUTPUT_DIR}")


if __name__ == "__main__":
    main()
