import subprocess, re

scss = open('flower.scss', encoding='utf-8').read()
scss = scss.replace('rgb(0, 0, 0, 0.2)', 'rgba(0, 0, 0, 0.2)')
open('flower.scss', 'w', encoding='utf-8').write(scss)
subprocess.run([r'C:\Users\admin\AppData\Local\Python\pythoncore-3.14-64\Scripts\pysassc.exe', 'flower.scss', 'flower.css'])

css = open('flower.css', encoding='utf-8').read()

# We only want `.growing-grass`, `.flower__grass`, `.long-g`, `.grow-ans` and their keyframes
# The easiest way is to let the browser have them, but apply them only within .organic-flower-wrapper
# Let's extract the whole thing, but we ONLY append what we need.

lines = css.split('\n')
new_css = []
keep = False
for line in lines:
    if line.startswith('.long-g {') or line.startswith('.growing-grass {') or line.startswith('.grow-ans {') or line.startswith('.flower__grass {') or line.startswith('@keyframes leaf-ans') or line.startswith('@keyframes grow-ans') or line.startswith('@keyframes growing-grass') or line.startswith('@keyframes moving-grass'):
        keep = True
    if line.startswith('.flower {') or line.startswith('.night {') or line.startswith('.flowers {'):
        keep = False
        
    if keep:
        new_css.append(line)

css_filtered = '\n'.join(new_css)

# We also need .flower__grass and .long-g since they might be inside .flower in SASS?
# No, .long-g is root level.
# Wait, .flower__grass is nested inside .flower in SASS!
# Let's just do a regex replace to scale vmin and disable the bad blurs.

def scale_vmin(match):
    val = float(match.group(1))
    return f'{val * 2}px'

css_scaled = re.sub(r'([0-9.]+)vmin', scale_vmin, css)

# We will inject the grass CSS, but we must remove `.flower__grass__overlay` which had heavy blur,
# and also filter out `.night`.
css_scaled += '''
.flower__grass__overlay { display: none !important; }
.night { display: none !important; }
'''

open('grass.css', 'w', encoding='utf-8').write(css_scaled)

