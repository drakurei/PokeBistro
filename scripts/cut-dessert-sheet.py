# Cuts the 6 x 4 Gemini sheet of Pokémon profiteroles (2816 x 1536) into product images.
#
# Each cell keeps its own background, shadow and scale; the title strip printed at the bottom of
# the cell is removed and the top is extended with the plain background so every output is 5:4
# (512 x 410, like the rest of the high-definition series). The croquembouche spans two rows: it is
# composed on a 5:4 canvas for the cards and also kept as a tall image for the home page.
#
# Usage: python scripts/cut-dessert-sheet.py "C:\Users\jonat\Downloads\Gemini_Generated_Image_hx04jmhx04jmhx04.jpg"
# The original sheet is never modified.
import os, sys
import numpy as np
from PIL import Image, ImageFilter

SRC = sys.argv[1]
ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
OUT = os.path.join(ROOT, 'src', 'assets', 'products')
DOCS = os.path.join(ROOT, 'docs', 'images')
COLS, ROWS = 6, 4
OUT_W, OUT_H = 512, 410
INSET = 7  # skip the thin separators between cells
INK_T = 40

# (row, col) -> slug. Cells left out are duplicates of another Pokémon on the sheet.
CELLS = {
    (0, 0): 'pikachu-spark-profiteroles',
    (0, 1): 'evoli-praline-profiteroles',
    (0, 2): 'rondoudou-cloud-profiteroles',
    (0, 4): 'salameche-flame-profiteroles',
    (0, 5): 'carapuce-aqua-profiteroles',
    (1, 1): 'bulbizarre-garden-profiteroles',
    (1, 3): 'goupix-fire-profiteroles',
    (1, 4): 'psykokwak-lemon-profiteroles',
    (2, 0): 'togepi-egg-profiteroles',
    (2, 1): 'ectoplasma-dark-profiteroles',
    (2, 2): 'mew-rose-profiteroles',
    (2, 3): 'lucario-aura-profiteroles',
    (3, 1): 'marill-bubble-profiteroles',
    (3, 2): 'mentali-violette-profiteroles',
}
TOWER = ((2, 5), (3, 5), 'pikachu-croquembouche')

im = Image.open(SRC).convert('RGB')
W, H = im.size
cw, ch = W / COLS, H / ROWS
arr = np.asarray(im).astype(np.int16)
os.makedirs(OUT, exist_ok=True)
report, finals = [], []


def cell_region(r0, r1, c):
    x0, x1 = int(round(c * cw)) + INSET, int(round((c + 1) * cw)) - INSET
    y0, y1 = int(round(r0 * ch)) + INSET, int(round((r1 + 1) * ch)) - INSET
    return arr[y0:y1, x0:x1]


def analyse(cell):
    h = cell.shape[0]
    bg = np.median(np.concatenate([cell[:20, :].reshape(-1, 3), cell[:, :12].reshape(-1, 3)]), axis=0)
    dist = np.sqrt(((cell - bg) ** 2).sum(axis=2))
    dark = (cell.max(axis=2) < 110).sum(axis=1)
    # the title, if any, is a band of dark pixels in the lower quarter
    text_rows = [y for y in range(int(h * 0.74), h) if dark[y] > 6]
    text_start = min(text_rows) - 6 if text_rows else h
    ink = (dist > INK_T).sum(axis=1)
    rows = np.where(ink[:text_start] > 3)[0]
    return bg, text_start, (int(rows[0]), int(rows[-1])) if len(rows) else (0, text_start)


def to_ratio(cell, text_start, dish):
    """5:4 crop: the full width, the height above the title, the top extended with background.

    The sheet background is a soft vertical gradient: the added rows continue that gradient
    (measured on the dish-free side margins) instead of repeating the first row, so no band shows.
    """
    width = cell.shape[1]
    target_h = int(round(width * OUT_H / OUT_W))
    usable = cell[: max(text_start, dish[1] + 8)]
    if usable.shape[0] >= target_h:
        # keep the dish centred if there is room to spare
        extra = usable.shape[0] - target_h
        top = min(extra, max(0, dish[0] - 24))
        return usable[top : top + target_h]
    pad = target_h - usable.shape[0]
    margins = np.concatenate([usable[:, :10], usable[:, -10:]], axis=1).astype(np.float32)
    ys = np.arange(margins.shape[0])
    profile = margins.mean(axis=1)  # colour per row
    slope = np.array([np.polyfit(ys, profile[:, k], 1)[0] for k in range(3)])
    base = usable[:6].astype(np.float32).mean(axis=0)  # colour per column at the top
    offsets = -np.arange(pad, 0, -1).reshape(-1, 1, 1)
    rows = base[None, :, :] + offsets * slope[None, None, :]
    noise = np.random.default_rng(7).normal(0, 0.8, rows.shape)
    top_rows = np.clip(rows + noise, 0, 255)
    return np.concatenate([top_rows, usable.astype(np.float32)], axis=0)


for (r, c), slug in CELLS.items():
    cell = cell_region(r, r, c)
    bg, text_start, dish = analyse(cell)
    crop = np.clip(np.rint(to_ratio(cell, text_start, dish)), 0, 255).astype(np.uint8)
    out = Image.fromarray(crop).resize((OUT_W, OUT_H), Image.LANCZOS)
    path = os.path.join(OUT, f'{slug}.webp')
    out.save(path, 'WEBP', quality=86, method=6)
    finals.append((slug, out))
    report.append((slug, cell.shape[:2], text_start, dish, crop.shape[:2], os.path.getsize(path) // 1024))

# The croquembouche: two cells high, kept tall for the home page and the dish page
(r0, c), (r1, _), slug = TOWER
tall = cell_region(r0, r1, c)
bg, text_start, dish = analyse(tall)
tall_crop = tall[: max(text_start, dish[1] + 8)].astype(np.uint8)
tall_img = Image.fromarray(tall_crop)
tall_path = os.path.join(OUT, f'{slug}-tall.webp')
tall_img.save(tall_path, 'WEBP', quality=86, method=6)
tall_img.save(os.path.join(OUT, f'{slug}-tall.avif'), 'AVIF', quality=62, speed=4)

# 5:4 composition for the cards: the tower scaled to the canvas height, background continued
# background of the canvas: the sheet's own vertical gradient, sampled on the left margin of the tower
margin = tall_crop[:, :12].astype(np.float32).mean(axis=1)  # colour per row
ys = np.linspace(0, len(margin) - 1, OUT_H)
column = np.stack([np.interp(ys, np.arange(len(margin)), margin[:, k]) for k in range(3)], axis=1)
canvas_arr = np.repeat(column[:, None, :], OUT_W, axis=1)
canvas_arr += np.random.default_rng(3).normal(0, 0.8, canvas_arr.shape)
canvas = Image.fromarray(np.clip(np.rint(canvas_arr), 0, 255).astype(np.uint8))
scale = (OUT_H - 6) / tall_img.height
scaled = tall_img.resize((int(tall_img.width * scale), OUT_H - 6), Image.LANCZOS)
mask = Image.new('L', scaled.size, 255)
fade = 28
m = np.asarray(mask).astype(np.float32)
ramp = np.linspace(0, 1, fade)
m[:, :fade] *= ramp
m[:, -fade:] *= ramp[::-1]
mask = Image.fromarray(m.astype(np.uint8)).filter(ImageFilter.GaussianBlur(2))
x = (OUT_W - scaled.width) // 2
canvas.paste(scaled, (x, 3), mask)
path = os.path.join(OUT, f'{slug}.webp')
canvas.save(path, 'WEBP', quality=86, method=6)
finals.append((slug, canvas))
report.append((slug, tall.shape[:2], text_start, dish, tall_crop.shape[:2], os.path.getsize(path) // 1024))

for line in report:
    print(line)

# Contact sheet for a visual check (docs) and a strip of the bottoms (title removal check)
tw, th = 384, 308
cols = 5
rows = (len(finals) + cols - 1) // cols
sheet = Image.new('RGB', (cols * tw + (cols + 1) * 12, rows * th + (rows + 1) * 12), '#ffffff')
for i, (slug, img) in enumerate(finals):
    sheet.paste(img.resize((tw, th), Image.LANCZOS), (12 + (i % cols) * (tw + 12), 12 + (i // cols) * (th + 12)))
sheet.save(os.path.join(DOCS, 'desserts-preview.webp'), 'WEBP', quality=80)
sheet.save(os.path.join(os.path.dirname(SRC), 'pokebistro-desserts-check.jpg'), quality=88)
bottoms = Image.new('RGB', (len(finals) * 256, 60), '#ffffff')
for i, (slug, img) in enumerate(finals):
    bottoms.paste(img.resize((256, 205), Image.LANCZOS).crop((0, 145, 256, 205)), (i * 256, 0))
bottoms.save(os.path.join(os.path.dirname(SRC), 'pokebistro-desserts-bottoms.jpg'), quality=90)
print('done', len(finals))
