# Efecto ChatGPT Images 2.5 — recreación open-source

Recrea el efecto del hero de [Introducing ChatGPT Images 2.5](https://openai.com/index/introducing-chatgpt-images-2-5/) (OpenAI, 8-sep-2026):
título blanco sobre negro donde **al pasar el cursor (o tocar / enfocar con teclado) cada letra de la segunda línea cambia a una imagen con forma de esa letra**, ligeramente más grande y rotada.

- `C` → perro golden / C manuscrita
- `a` (Chat) → tostada con mantequilla
- `t` (Chat) → globo plateado / origami naranja
- `2` → globo aerostático / LED, etc.

Solo el efecto, no una página completa. Demo mínima incluida.

## Stack

- **Astro 5** → estructura y componentes (`HoverLetter.astro`, `HoverTitle.astro`)
- **Tailwind CSS v4** (`@tailwindcss/vite`) → layout, tipografía, spacing, responsive
- **CSS puro** (`src/styles/hover-effect.css`) → crossfade + `scale/rotate`
- **JS/TS mínimo** → ciclar variantes `-1/-2`, toggle táctil, autoplay en cascada, `prefers-reduced-motion`

## Uso

```bash
npm install
npm run download-assets  # ya ejecutado: 26 imgs en public/assets/letters
npm run dev              # http://localhost:4321
npm run build            # salida estática en dist/
npm run preview          # previsualizar el build
```

## Marca: favicon + og:image

- `public/favicon.svg` + `public/favicon-32.png` + `public/apple-touch-icon.png`: cuadrado negro con “a” blanca y punto mantequilla (guiño al hover de la tostada).
- `public/og-image.png` (1200×630): tarjeta negra con el título y muestra de letras-imagen (C manuscrita, tostada, globo 2).
- Regenerar tras cambiar assets: `python scripts/make-brand-assets.py` (requiere Pillow).

## Publicar en GitHub Pages

URL final: `https://leonardobringashello-oss.github.io/chatgpt-images-hover-title/`

1. En tu cuenta secundaria crea el repo **`chatgpt-images-hover-title`** (público, sin README inicial).
2. Sube el código:
   ```bash
   git init
   git add .
   git commit -m "Efecto hover estilo ChatGPT Images 2.5 (Astro + Tailwind)"
   git branch -M main
   git remote add origin https://github.com/leonardobringashello-oss/chatgpt-images-hover-title.git
   git push -u origin main
   ```
3. En el repo → **Settings → Pages → Source: “GitHub Actions”**.
4. Cada push a `main` ejecuta `.github/workflows/deploy.yml` (instala, construye y publica `dist/`).
5. Comprueba: favicon en pestaña, tarjeta al compartir el enlace, y DevTools → Lighthouse (contrastes ya en ~10:1).

> Si mantienes el nombre `efecto-chatgpt-images-2.5`, cambia `base` en `astro.config.mjs` por `'/efecto-chatgpt-images-2.5/'` (con ambas barras).

## Cómo funciona

- `src/data/letters.ts`: mapa `char -> images[]` (las variantes `-1/-2` ciclan en cada `mouseenter`, como el `2` globo/LED original).
- `HoverLetter.astro`: `<span class="hl">` con `.hl-char` (texto) + `.hl-img` (absoluta, `opacity:0`, `scale(.7)`). En `:hover/:focus-visible/.is-active` el texto se oculta y la imagen aparece a `scale(1)`.
- `HoverTitle.astro`: `h1` con `aria-label`, línea 1 `Introducing` estática + línea 2 interactiva. `autoplay` activa cada letra 600 ms en cascada (`staggerMs`, por defecto 90).
- Accesible: `tabindex`, `Enter/Espacio`, `aria-label` por letra, respeta `prefers-reduced-motion`. Táctil: tap = toggle.

## Atribución importante

- **Código**: MIT (ver `LICENSE`).
- **Imágenes** en `public/assets/letters/` (26 ficheros `Custom_*.png`, `t-v2.webp`): **© OpenAI**, descargadas de `images.ctfassets.net` vía `scripts/download-assets.mjs` **solo para estudio/recreación**. No están cubiertas por el MIT. Si publicas un fork, sustitúyelas por assets propios o pide permiso. En la demo se indica: _“Imágenes © OpenAI — solo para estudio”_.

## Personalizar

Edita `src/data/letters.ts` para cambiar frase o imágenes. Todo es local, sin hotlinks.
