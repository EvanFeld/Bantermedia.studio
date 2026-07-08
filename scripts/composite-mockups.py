"""Composite Banter cube logo onto product mockup bases."""

from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
BASES = ROOT / "assets" / "branding-kit" / "bases"
MOCKUPS = ROOT / "assets" / "branding-kit" / "mockups"
LOGOS = ROOT / "assets" / "logos"

# Each entry: base filename, logo file, width %, center (x%, y%), optional treatment
PRODUCTS = [
    {
        "base": "coffee-mug.jpg",
        "logo": "logo-blue-icon.png",
        "width_pct": 0.20,
        "center": (0.44, 0.48),
        "opacity": 0.92,
        "treatment": "print",
    },
    {
        "base": "shirt.jpg",
        "logo": "logo-white.png",
        "width_pct": 0.09,
        "center": (0.58, 0.34),
        "opacity": 0.95,
        "treatment": "embroidery",
    },
    {
        "base": "pen.jpg",
        "logo": "logo-blue-icon.png",
        "width_pct": 0.08,
        "center": (0.72, 0.48),
        "opacity": 0.88,
        "treatment": "engrave",
    },
    {
        "base": "tote.jpg",
        "logo": "logo-blue-icon.png",
        "width_pct": 0.24,
        "center": (0.50, 0.45),
        "opacity": 0.90,
        "treatment": "print",
    },
    {
        "base": "cap.jpg",
        "logo": "logo-white.png",
        "width_pct": 0.16,
        "center": (0.50, 0.44),
        "opacity": 0.94,
        "treatment": "embroidery",
    },
    {
        "base": "vehicle.jpg",
        "logo": "logo-blue-icon.png",
        "width_pct": 0.12,
        "center": (0.32, 0.48),
        "opacity": 0.95,
        "treatment": "wrap",
    },
    {
        "base": "business-card.jpg",
        "logo": "logo-blue-icon.png",
        "width_pct": 0.14,
        "center": (0.52, 0.46),
        "opacity": 0.96,
        "treatment": "print",
    },
]


def load_rgba(path: Path) -> Image.Image:
    return Image.open(path).convert("RGBA")


def resize_logo(logo: Image.Image, target_width: int) -> Image.Image:
    ratio = target_width / logo.width
    target_height = int(logo.height * ratio)
    return logo.resize((target_width, target_height), Image.Resampling.LANCZOS)


def apply_treatment(logo: Image.Image, treatment: str) -> Image.Image:
    if treatment == "embroidery":
        shadow = logo.copy()
        shadow = ImageEnhance.Brightness(shadow).enhance(0.3)
        shadow = shadow.filter(ImageFilter.GaussianBlur(radius=2))
        canvas = Image.new("RGBA", logo.size, (0, 0, 0, 0))
        canvas.alpha_composite(shadow, (2, 2))
        canvas.alpha_composite(logo, (0, 0))
        return canvas
    if treatment == "engrave":
        return ImageEnhance.Brightness(logo).enhance(0.75)
    if treatment == "wrap":
        return ImageEnhance.Contrast(logo).enhance(1.08)
    return logo


def set_opacity(logo: Image.Image, opacity: float) -> Image.Image:
    if opacity >= 1.0:
        return logo
    r, g, b, a = logo.split()
    a = a.point(lambda px: int(px * opacity))
    return Image.merge("RGBA", (r, g, b, a))


def composite_product(spec: dict) -> None:
    base_path = BASES / spec["base"]
    logo_path = LOGOS / spec["logo"]
    out_name = base_path.stem + ".jpg"

    base = load_rgba(base_path)
    logo = load_rgba(logo_path)

    target_w = int(base.width * spec["width_pct"])
    logo = resize_logo(logo, target_w)
    logo = apply_treatment(logo, spec["treatment"])
    logo = set_opacity(logo, spec["opacity"])

    cx = int(base.width * spec["center"][0])
    cy = int(base.height * spec["center"][1])
    x = cx - logo.width // 2
    y = cy - logo.height // 2

    result = base.copy()
    result.alpha_composite(logo, (x, y))

    MOCKUPS.mkdir(parents=True, exist_ok=True)
    result.convert("RGB").save(MOCKUPS / out_name, quality=95, optimize=True)
    print(f"  {out_name}")


def main() -> None:
    print("Compositing mockups...")
    for spec in PRODUCTS:
        composite_product(spec)
    print(f"Done — {len(PRODUCTS)} mockups in {MOCKUPS}")


if __name__ == "__main__":
    main()