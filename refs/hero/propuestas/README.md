# Propuestas de retrato para el hero

Generadas con la herramienta integrada de imágenes (image_gen), como ediciones independientes del retrato original. Bruno seleccionó la propuesta 02 (duotono rojo) el 01/10/2026; está integrada en el hero como `public/hero/bruno-esteve-hero-duotono-rojo.webp`, conservando su máscara y animación originales.

Referencia de identidad, postura y encuadre: `public/hero/bruno-esteve-hero-umbral-editorial.webp`.
Paleta de referencia: rojo #C1282E, carbón #121416, grises y fondo #F9F4F4.
Las propuestas son interpretaciones generativas; conservar la identidad no implica coincidencia píxel a píxel. Antes de integrar la elegida, comprobar su ajuste a la máscara de silueta existente y optimizar el activo para web.

1. **Trama editorial**: la más cercana al lenguaje impreso actual; rojo localizado en el hombro. Recomendación para mantener el equilibrio con el titular rojo.
2. **Duotono rojo**: más presencia visual, tinta roja en un lateral del rostro y la ropa.
3. **Trama digital**: raster y pequeños detalles rojos; acentúa la conexión con datos e IA.

## Prompts completos

### 01-trama-editorial

```text
Use case: identity-preserve.
Asset type: alternative hero portrait for Bruno Esteve's personal data and AI portfolio.
Input image 1 is the EDIT TARGET and the sole reference for identity, anatomy, pose and exact composition. Edit this existing portrait, do not invent another person.
INVARIANTS: preserve the exact man, his facial proportions and distinctive features, eyes, eyebrows, nose, lips, moustache, stubble, voluminous wavy hair and hairstyle, neutral serious expression, direct frontal gaze, head tilt, neck, black clothing, shoulder slope and outer silhouette. Keep precisely the same head and shoulders framing, scale, position and margins as the reference. Landscape 4:3 composition matching the input. No crop change, no pose change, no new body parts. Never beautify or change age. Preserve the recognizability of the existing portrait.
Palette restricted to charcoal #121416, neutral grays, paper pale pink #F9F4F4 and a restrained single red #C1282E.
Backdrop: uniform flat #F9F4F4 matching the website, spacious outside the subject, with no scene, no frame, no background graphic. Any accent or texture must remain WITHIN the subject silhouette so it works as a cutout in the website.
No typography, text, labels, logos, badges, watermarks, neon, blue, purple, gradients, 3D or generic tech circuitry.
Primary request: refine the current black-and-white halftone portrait into a precise contemporary editorial print. Fine crisp charcoal halftone with clear facial structure, controlled midgray detail, slightly softer dot transitions than the source. A single very subtle red ink overprint sits inside the right shoulder and collar shadow at image right, less than 8 percent of the silhouette, becoming a few fine red printed dots at the lower cheek edge. The face, eyes and hair remain overwhelmingly monochrome and clearly legible. This should feel like a carefully printed Swiss editorial portrait and be the quietest proposal. Sparse fine texture, no exaggerated distressed effects, no offset of the face.
```

### 02-duotono-rojo

```text
Use case: identity-preserve.
Asset type: alternative hero portrait for Bruno Esteve's personal data and AI portfolio.
Input image 1 is the EDIT TARGET and the sole reference for identity, anatomy, pose and exact composition. Edit this existing portrait, do not invent another person.
INVARIANTS: preserve the exact man, his facial proportions and distinctive features, eyes, eyebrows, nose, lips, moustache, stubble, voluminous wavy hair and hairstyle, neutral serious expression, direct frontal gaze, head tilt, neck, black clothing, shoulder slope and outer silhouette. Keep precisely the same head and shoulders framing, scale, position and margins as the reference. Landscape 4:3 composition matching the input. No crop change, no pose change, no new body parts. Never beautify or change age. Preserve the recognizability of the existing portrait.
Palette restricted to charcoal #121416, neutral grays, paper pale pink #F9F4F4 and a restrained single red #C1282E.
Backdrop: uniform flat #F9F4F4 matching the website, spacious outside the subject, with no scene, no frame, no background graphic. Any accent or texture must remain WITHIN the subject silhouette so it works as a cutout in the website.
No typography, text, labels, logos, badges, watermarks, neon, blue, purple, gradients, 3D or generic tech circuitry.
Primary request: create a distinctive red and charcoal editorial duotone print of this EXACT portrait. Preserve original halftone structure and recognizable features. Charcoal defines the hair, eyes, eyebrows, moustache, mouth, deepest facial shadows and clothing. Restrained #C1282E red halftone ink occupies selected middle-tone shadows on the side of the neck and cheek at image right and some shirt folds. Pale gray and paper dominate lit facial areas. Approximately 20-25 percent of printed subject is red, the rest charcoal and grayscale. Red is printed ink, not colored studio light or a gradient. Subtle analog two-ink risograph texture, elegant and contemporary, no registration drift over the eyes or mouth, no added shapes or decorations.
```

### 03-trama-digital

```text
Use case: identity-preserve.
Asset type: alternative hero portrait for Bruno Esteve's personal data and AI portfolio.
Input image 1 is the EDIT TARGET and the sole reference for identity, anatomy, pose and exact composition. Edit this existing portrait, do not invent another person.
INVARIANTS: preserve the exact man, his facial proportions and distinctive features, eyes, eyebrows, nose, lips, moustache, stubble, voluminous wavy hair and hairstyle, neutral serious expression, direct frontal gaze, head tilt, neck, black clothing, shoulder slope and outer silhouette. Keep precisely the same head and shoulders framing, scale, position and margins as the reference. Landscape 4:3 composition matching the input. No crop change, no pose change, no new body parts. Never beautify or change age. Preserve the recognizability of the existing portrait.
Palette restricted to charcoal #121416, neutral grays, paper pale pink #F9F4F4 and a restrained single red #C1282E.
Backdrop: uniform flat #F9F4F4 matching the website, spacious outside the subject, with no scene, no frame, no background graphic. Any accent or texture must remain WITHIN the subject silhouette so it works as a cutout in the website.
No typography, text, labels, logos, badges, watermarks, neon, blue, purple, gradients, 3D or generic tech circuitry.
Primary request: convert the existing portrait to a controlled digital raster editorial treatment. Preserve the face in a crisp grayscale fine ordered-dither rendering with visibly accurate eyes, nose and mouth. Shadows and clothing form a grid of very fine charcoal square pixels instead of round print dots. A few short and restrained #C1282E raster interruptions are contained within the lower right shoulder and lateral hair shadow only, about 5-8 percent of the subject. Pixel density varies with tone and suggests information being organized into a portrait. The silhouette remains intact. Very subtle 1-3 short horizontal texture shifts limited to the clothing, no facial displacement. Visually refined and readable at small hero sizes, no chaotic glitch, no cyan or RGB separation, no holograms, no background grid, no ASCII text.
```
