# SEO del portfolio

El dominio canónico es `https://www.brunoesteve.com`, definido en
`src/data/site.ts`. Los alias de Vercel y el dominio sin `www` no se utilizan
en las URLs canónicas, el sitemap ni los datos estructurados.

## Metadatos y contenido

- La portada y los cuatro casos tienen título y descripción propios, URL
  canónica, Open Graph y tarjeta de X/Twitter con imagen y texto alternativo.
- `src/lib/seo.ts` comparte la estructura de los metadatos. Los textos de los
  proyectos se traducen con el catálogo existente.
- La portada incluye JSON-LD de Person, WebSite y ProfilePage a partir del
  perfil público. No incluye cifras ni credenciales adicionales.
- El idioma depende de la cookie `portfolio-language`. Sin cookie se sirve
  español. No se anuncian alternativas `hreflang`: aún no existen URLs
  independientes para español e inglés. Indexar ambas versiones por separado
  requeriría una migración de rutas, fuera de esta configuración.

## Rastreo

- `/sitemap.xml` se genera con la portada y los slugs de `src/data/projects.ts`.
  Incluye las imágenes de contenido y no inventa fechas de actualización.
- `/robots.txt` permite el contenido público, excluye `/api/` del rastreo y
  anuncia el sitemap.
- `/lab/hero` conserva `noindex, nofollow` y queda fuera del sitemap. Se permite
  rastrearla para que los buscadores puedan leer su directiva `noindex`.
- Robots no es una barrera de seguridad ni garantiza la indexación.

## Imágenes para compartir

La portada utiliza `/opengraph-image`, generado por `next/og` a 1200 × 630 con
la paleta del portfolio, Bricolage Grotesque y el retrato existente.
`src/assets/seo/` contiene el retrato JPEG optimizado y un subconjunto latino
estático de Bricolage Grotesque 700, obtenido de la distribución oficial de
[Google Fonts](https://github.com/google/fonts/tree/main/ofl/bricolagegrotesque),
junto con su licencia SIL OFL. Es la misma familia utilizada en el portfolio.
La generación no descarga recursos externos ni requiere nuevas dependencias.

Los casos utilizan JPEG de 1200 × 630 en `public/social/`, derivados de sus
imágenes WebP existentes, con un pie que las identifica como ilustraciones
conceptuales en español e inglés. No son capturas de sistemas reales.
Al cambiar una portada de proyecto, actualizar también su JPEG social.

## Publicación y Google

1. Ejecutar `npm run lint` y `npm run build`, y revisar los metadatos de las
   cinco páginas en español e inglés y las imágenes indicadas en `og:image`.
2. Publicar los cambios en GitHub para que Vercel despliegue la versión nueva.
3. Comprobar `https://www.brunoesteve.com/robots.txt`,
   `https://www.brunoesteve.com/sitemap.xml` y la vista previa de un enlace.
4. Añadir la propiedad de dominio `brunoesteve.com` en Google Search Console
   y verificarla mediante el registro DNS que indique Google en Cloudflare.
5. Enviar `https://www.brunoesteve.com/sitemap.xml` e inspeccionar la portada.
   La verificación y el sitemap no garantizan resultados ni plazos de indexación.

No hace falta guardar un token de Search Console en el código si se verifica
la propiedad por DNS. Las plataformas sociales pueden conservar vistas previas
antiguas hasta que vuelvan a rastrear la URL.
