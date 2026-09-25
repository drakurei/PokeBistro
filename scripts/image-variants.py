# Generates the image variants used by <DishImage>: an AVIF twin for every dish (same size) and a
# 256 px wide WebP/AVIF pair for the high-definition dishes (thumbnails in the cart and formules).
# Legacy 198x168 dishes are never upscaled. Existing files are kept, so the script can be re-run
# after adding a new dish.
#
# Usage: python scripts/image-variants.py .   (needs Pillow >= 11 with AVIF support)
import glob, os, sys
from PIL import Image

root = sys.argv[1]
src = os.path.join(root, 'src', 'assets', 'products')
count = {'avif': 0, 'small': 0}
for path in sorted(glob.glob(os.path.join(src, '*.webp'))):
    name = os.path.basename(path)[:-5]
    if name.endswith('-256') or name.endswith('-tall'):
        continue
    im = Image.open(path).convert('RGB')
    avif = os.path.join(src, name + '.avif')
    if not os.path.exists(avif):
        im.save(avif, 'AVIF', quality=62, speed=4)
        count['avif'] += 1
    if im.width >= 512:
        small = im.resize((256, round(im.height * 256 / im.width)), Image.LANCZOS)
        small_webp = os.path.join(src, name + '-256.webp')
        if not os.path.exists(small_webp):
            small.save(small_webp, 'WEBP', quality=82, method=6)
            small.save(os.path.join(src, name + '-256.avif'), 'AVIF', quality=60, speed=4)
            count['small'] += 1
print(count)
total_webp = sum(os.path.getsize(p) for p in glob.glob(os.path.join(src, '*.webp')) if not p.endswith('-256.webp'))
total_avif = sum(os.path.getsize(p) for p in glob.glob(os.path.join(src, '*.avif')) if not p.endswith('-256.avif'))
print('webp KB', round(total_webp / 1024), 'avif KB', round(total_avif / 1024))
