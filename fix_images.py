import re

path = '/Users/aravindtatipaka/Desktop/Code files/Antigravity/index.html'
with open(path, 'r') as f:
    content = f.read()

replacements = [
    ('Home screen — Discovery',            'ib-ai-screen-1.webp'),
    ('Intent capture — What to focus on',  'ib-ai-screen-2.webp'),
    ('Context qualification — Experience level', 'ib-ai-screen-3.webp'),
    ('AI Interview — In session',          'ib-ai-screen-4.webp'),
]

for alt, filename in replacements:
    old = f'<img src="" alt="{alt}" loading="lazy" />'
    new = f'<img src="{filename}" alt="{alt}" loading="lazy" />'
    if old in content:
        content = content.replace(old, new, 1)
        print(f'✅ Fixed: {alt}')
    else:
        print(f'⚠️  Already set or not found: {alt}')

with open(path, 'w') as f:
    f.write(content)

print(f'\nDone. File size: {len(content):,} bytes')
