# MyPortfolio

Portfolio personal de Bruno Esteve, construido con Next.js.

- Desarrollo: `npm ci` y `npm run dev`.
- Validación: `npm run test:chat`, `npm run lint`, `npm run build`.
- [Chatbot generativo: comparación de modelos, seguridad y despliegue gratuito](docs/CHATBOT.md).

El chatbot utiliza GPT-OSS-120B en Groq por defecto. Requiere una clave de servidor
configurada en `.env.local` (nunca en Git) o en el gestor de variables del hosting.
Genera respuestas con fuentes públicas y las revisa antes de mostrarlas.

Comprobación opcional con la clave configurada: `npm run test:chat:live`.
Consume hasta dos llamadas y no imprime claves ni respuestas.
