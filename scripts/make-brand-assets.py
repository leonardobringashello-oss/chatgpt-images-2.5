"""Genera favicon PNG, apple-touch-icon y og-image a partir de los assets locales.
Uso: python scripts/make-brand-assets.py
Requiere: Pillow (ya disponible). Fuentes: Arial de Windows.
"""
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
PUB = ROOT / "public"
LETTERS = PUB / "assets" / "letters"

ARIAL = Path("C:/Windows/Fonts/arial.ttf")
ARIAL_BD = Path("C:/Windows/Fonts/arialbd.ttf")


def font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont:
    path = str(ARIAL_BD if bold else ARIAL)
    return ImageFont.truetype(path, size)


def rounded_icon(size: int) -> Image.Image:
    img = Image.new("RGBA", (size, size), (0, 0, 0, 0))
    d = ImageDraw.Draw(img)
    d.rounded_rectangle([0, 0, size - 1, size - 1], radius=int(size * 0.22), fill=(0, 0, 0, 255))
    # "a" blanca centrada (como el título)
    f = font(int(size * 0.68), bold=True)
    d.text((size * 0.5, size * 0.55), "a", font=f, fill=(255, 255, 255, 255),
           anchor="mm")
    # punto mantequilla (guiño al hover de la tostada)
    r = size * 0.10
    cx, cy = size * 0.72, size * 0.30
    d.ellipse([cx - r, cy - r, cx + r, cy + r], fill=(245, 192, 74, 255))
    return img


def make_favicons() -> None:
    rounded_icon(32).save(PUB / "favicon-32.png")
    # apple-touch-icon: fondo negro pleno (Apple ignora transparencias)
    icon = Image.new("RGB", (180, 180), (0, 0, 0))
    big = rounded_icon(180)
    icon.paste(big, (0, 0), big)
    icon.save(PUB / "apple-touch-icon.png")
    print("ok favicon-32.png + apple-touch-icon.png")


def make_og() -> None:
    W, H = 1200, 630
    img = Image.new("RGB", (W, H), (0, 0, 0))
    d = ImageDraw.Draw(img)
    # Títulos centrados
    f1 = font(64)
    f2 = font(88, bold=True)
    l1 = "Introducing"
    l2 = "ChatGPT Images 2.5"
    b1 = d.textbbox((0, 0), l1, font=f1)
    b2 = d.textbbox((0, 0), l2, font=f2)
    d.text(((W - (b1[2] - b1[0])) / 2, 84), l1, font=f1, fill=(191, 191, 191))
    d.text(((W - (b2[2] - b2[0])) / 2, 168), l2, font=f2, fill=(255, 255, 255))
    # Tira de letras-imagen como muestra del efecto
    thumbs = [
        ("Custom_g-1.png", 150, -8),
        ("Custom_P-1.png", 165, 5),
        ("Custom_t-1.png", 155, -4),
    ]
    total_w = sum(w for _, w, _ in thumbs) + 60 * (len(thumbs) - 1)
    x = (W - total_w) / 2
    for name, h, rot in thumbs:
        p = LETTERS / name
        t = Image.open(p).convert("RGBA")
        w = int(t.width * h / t.height)
        t = t.resize((w, h), Image.LANCZOS)
        t = t.rotate(rot, expand=True, resample=Image.BICUBIC)
        y = 400 + (170 - t.height) / 2
        img.paste(t, (int(x), int(y)), t)
        x += w + 60
    img.save(PUB / "og-image.png")
    print("ok og-image.png (1200x630)")


if __name__ == "__main__":
    make_favicons()
    make_og()
