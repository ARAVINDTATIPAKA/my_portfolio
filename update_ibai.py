import base64, re

path = '/Users/aravindtatipaka/Desktop/Code files/Antigravity/index.html'
with open(path, 'r') as f:
    content = f.read()

# Read images and encode
imgs = {}
src_files = [
    ('/mnt/user-data/uploads/1780530616630_image.png', 1, 'Home screen — Discovery'),
    ('/mnt/user-data/uploads/1780530802610_image.png', 2, 'Intent capture — What to focus on'),
    ('/mnt/user-data/uploads/1780530889855_image.png', 3, 'Context qualification — Experience level'),
    ('/mnt/user-data/uploads/1780531129376_image.png', 4, 'AI Interview — In session'),
]

print('Reading images...')
for src, num, caption in src_files:
    try:
        with open(src, 'rb') as f:
            data = base64.b64encode(f.read()).decode()
        imgs[num] = (f'data:image/jpeg;base64,{data}', caption)
        print(f'  OK: screen {num} ({len(data)} chars)')
    except Exception as e:
        print(f'  FAIL: {e}')
        imgs[num] = ('', caption)

def phone_img(num):
    src, caption = imgs[num]
    return f'''<div class="cs-phone-row">
  <div class="cs-phone-frame">
    <img src="{src}" alt="{caption}" loading="lazy" />
    <div class="cs-phone-caption">{caption}</div>
  </div>
</div>'''

# 1. Add Figma embed at top of IBAI body (after border-top:none section with "The Real Problem")
figma_section = '''    <!-- Figma embed -->
    <div class="cs-section" style="border-top:none;padding-top:36px;">
      <div class="cs-section-label">Live Design File</div>
      <h3 class="cs-section-title">Explore the designs.</h3>
      <div class="figma-embed-wrap">
        <iframe src="https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/2e2EaiNgDUcBwFFgqWjR6t/AI-Play?node-id=545-12530" allowfullscreen loading="lazy"></iframe>
        <div class="figma-embed-hint"><span>&#8598; Pan &amp; zoom inside the frame</span></div>
      </div>
    </div>

    '''

content = content.replace(
    '''    <div class="cs-section" style="border-top:none;padding-top:36px;">
      <div class="cs-section-label">The Real Problem</div>''',
    figma_section + '''    <div class="cs-section" style="border-top:none;padding-top:36px;">
      <div class="cs-section-label">The Real Problem</div>''',
    1
)

# 2. Add screen 1 after Decision 01 callout
content = content.replace(
    '''      <div class="cs-callout"><strong style="color:var(--lime);">Outcome:</strong> Reduced cognitive load and simplified product discovery. Users no longer need to understand our product taxonomy — they just describe their situation.</div>
    </div>

    <div class="cs-section">
      <div class="cs-section-label">Decision 02</div>''',
    f'''      <div class="cs-callout"><strong style="color:var(--lime);">Outcome:</strong> Reduced cognitive load and simplified product discovery. Users no longer need to understand our product taxonomy — they just describe their situation.</div>
      {phone_img(1)}
    </div>

    <div class="cs-section">
      <div class="cs-section-label">Decision 02</div>''',
    1
)

# 3. Add screen 2 after Decision 02 callout
content = content.replace(
    '''      <div class="cs-callout"><strong style="color:var(--lime);">Design Principle:</strong> Freedom where it matters, structure where it helps. The experience feels conversational without becoming an unstructured chatbot.</div>
    </div>

    <div class="cs-section">
      <div class="cs-section-label">Decision 03</div>''',
    f'''      <div class="cs-callout"><strong style="color:var(--lime);">Design Principle:</strong> Freedom where it matters, structure where it helps. The experience feels conversational without becoming an unstructured chatbot.</div>
      {phone_img(2)}
    </div>

    <div class="cs-section">
      <div class="cs-section-label">Decision 03</div>''',
    1
)

# 4. Add screen 3 after Decision 03 callout
content = content.replace(
    '''      <div class="cs-callout"><strong style="color:var(--lime);">Design Principle:</strong> Users care about progress, not conversation logs. Faster task completion, reduced interface complexity.</div>
    </div>

    <div class="cs-section">
      <div class="cs-section-label">Decision 04</div>''',
    f'''      <div class="cs-callout"><strong style="color:var(--lime);">Design Principle:</strong> Users care about progress, not conversation logs. Faster task completion, reduced interface complexity.</div>
      {phone_img(3)}
    </div>

    <div class="cs-section">
      <div class="cs-section-label">Decision 04</div>''',
    1
)

# 5. Add screen 4 after Decision 04 callout
content = content.replace(
    '''      <div class="cs-callout"><strong style="color:var(--lime);">Strategic shift:</strong> The app evolved from a sales channel to a career preparation companion. Higher downloads, session frequency, retention, and upsell opportunities.</div>
    </div>

    <div class="cs-section">
      <div class="cs-section-label">AI Architecture</div>''',
    f'''      <div class="cs-callout"><strong style="color:var(--lime);">Strategic shift:</strong> The app evolved from a sales channel to a career preparation companion. Higher downloads, session frequency, retention, and upsell opportunities.</div>
      {phone_img(4)}
    </div>

    <div class="cs-section">
      <div class="cs-section-label">AI Architecture</div>''',
    1
)

with open(path, 'w') as f:
    f.write(content)

print(f'Done. File size: {len(content)} bytes')
