# Asistente de «Hablemos»

El chat usa `openai/gpt-oss-20b` mediante la API de Groq, con `stream: true`.
No utiliza SDKs adicionales ni base de datos. El navegador recibe fragmentos de
texto en cuanto llegan del proveedor. Como un fragmento puede agrupar varios
tokens, revela sus caracteres uno a uno desde el primer fragmento (12 ms por
carácter), mientras continúa recibiendo el resto. No espera a tener la respuesta
completa para iniciar la escritura. «Detener» interrumpe tanto la petición como
la escritura pendiente. Con movimiento reducido se muestran directamente los
fragmentos recibidos.

## Activación local

1. Crea una cuenta **Free** en [Groq](https://console.groq.com/keys) y una clave.
2. Copia `.env.example` a `.env.local` y establece `GROQ_API_KEY` ahí.
3. Arranca o reinicia `npm run dev`.

No pegues la clave en el chat, en componentes ni en variables `NEXT_PUBLIC_`.
`.env.local` está excluido de Git. Sin clave se muestra un error comprensible y
los enlaces de contacto siguen funcionando. No hay respuestas ficticias ni
proveedor de pago alternativo cuando falta configuración o se agota la cuota.

Los límites y la disponibilidad del plan gratuito dependen de Groq y pueden
cambiar. Usa una cuenta que permanezca en Free: elegir este modelo no evita
cargos si la organización tiene un plan de pago. Referencia:
[límites oficiales](https://console.groq.com/docs/rate-limits).

## Contenido

`src/data/profile.ts` se comparte con el hero y el pie. El contexto del asistente
reutiliza `experience`, `education`, los resúmenes de los cuatro proyectos y sus
casos públicos. Selecciona hasta tres apartados por coincidencia de palabras con
las preguntas recientes para mantener acotado el contexto y la cuota gratuita.
Al editar estos datos, el chat se actualiza al desplegar la nueva versión.

No se leen documentos privados, CV, `PRODUCT.md`, memorias fuente, variables de
entorno ni perfiles ficticios de los demostradores. El contenido es información
publicada, no un repositorio privado. El asistente debe reconocer lo que no sabe
y distinguir resultados reales, prototipos y ejemplos ficticios.

## Protecciones implementadas

- Clave y llamada al proveedor exclusivamente en servidor, protegidas mediante
  `server-only`. Destino y modelo fijos; el visitante no puede sustituirlos.
- POST del mismo origen y JSON obligatorio. No se habilita CORS. Estas medidas
  impiden solicitudes desde otras webs, pero no autentican a un bot.
- Máximo 16 KiB de cuerpo leído, 5 segundos para recibirlo, pregunta de 800
  caracteres, hasta 9 mensajes alternados y 10.000 caracteres de conversación.
  No se aceptan roles `system`, herramientas ni instrucciones del cliente.
- Por identificador: espera de 8 segundos, 4 solicitudes/minuto,
  20/día y una generación simultánea. Presupuesto de proceso: 2 solicitudes por
  minuto, 80/día y como máximo 2 generaciones simultáneas. Los intentos admitidos,
  incluidos los inválidos y cancelados, consumen el límite.
- Identificadores efímeros derivados de IP con SHA-256 y sal aleatoria; caducidad
  de contadores y máximo 2.000 entradas. Nunca se confía automáticamente en
  cabeceras de IP suministradas por clientes. Sin proxy verificado se usa una
  única bolsa compartida, para que falsificar cabeceras no amplíe la cuota.
- 30 segundos de generación, 1.024 tokens y 4.000 caracteres de salida como
  máximo; interrupción del proveedor cuando se cancela o desconecta el cliente.
- Solo se envía al navegador el texto de respuesta; se excluyen razonamiento,
  metadatos, errores internos y cabeceras del proveedor. Las respuestas se
  representan como texto escapado por React: no ejecutan HTML, enlaces o código.
- Instrucciones de alcance y resistencia a prompt injection; el modelo no tiene
  herramientas ni acceso a secretos. Ningún prompt garantiza por sí solo que un
  modelo nunca alucine o responda fuera de contexto; no se le confían permisos.
- Respuestas sin caché y buffering desactivado; errores de cuota con `429` y
  `Retry-After`. El navegador bloquea envíos simultáneos y respeta la espera.

## Producción sin base de datos

Los contadores viven **en memoria de un proceso**, se reinician al arrancar y no
son límites globales entre funciones serverless, réplicas ni reinicios. Por ello,
el endpoint permanece desactivado en producción mientras no se configure un
modo de protección explícito. Una variable declara la configuración; no instala
ni verifica reglas del firewall automáticamente.

**Vercel u otro alojamiento con varias instancias:** antes de poner
`CHAT_PROTECTION_MODE=edge`, configura en el firewall de la plataforma una regla
publicada para `POST /api/chat`, como máximo 4 solicitudes/minuto por IP, junto
con protección de bots/DDoS. Añade un límite global de solicitudes/tokens en el
proveedor cuando esté disponible; la cuota Free de Groq constituye el límite
compartido final. Los límites diarios locales no deben interpretarse como una
cuota global persistente. Configura `CHAT_ALLOWED_ORIGIN` con el dominio real.
Vercel sobrescribe `x-forwarded-for`; en otro proveedor debes indicar
`CHAT_TRUSTED_IP_HEADER` únicamente detrás de un proxy que sobrescriba la
cabecera y bloquee el acceso directo al servidor. No cambies este ajuste para
aceptar una cabecera enviada libremente por usuarios.

Referencias: [cabeceras de Vercel](https://vercel.com/docs/headers/request-headers)
y [límites del firewall](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting).
Comprueba la disponibilidad y el coste del firewall en tu plan de alojamiento;
el modelo gratuito no garantiza que todo el alojamiento sea gratuito.

**Servidor propio con un único proceso persistente:** usa
`CHAT_PROTECTION_MODE=single-instance` y el origen real. La bolsa global protege
el presupuesto aunque no haya cabecera de IP confiable. Un proxy con límites
de tráfico es recomendable para proteger también CPU y ancho de banda antes
de que la petición llegue a Next.js. No uses este modo en Vercel ni con réplicas.

No se despliega ni cambia la cuenta del proveedor con esta implementación.

## Privacidad y experiencia

El sitio no escribe conversaciones en disco, base de datos, cookies, analítica
ni almacenamiento del navegador. Conserva temporalmente el historial en el
estado del componente, hasta reiniciarlo o recargar. El proveedor procesa las
preguntas y el historial reciente. Revisa y activa
Zero Data Retention en la cuenta de Groq si corresponde; su política permite
retención excepcional por seguridad y fiabilidad sin ese ajuste:
[política de datos](https://console.groq.com/docs/your-data).

El chat identifica al asistente como IA, permite detener y reiniciar, conserva
respuestas parciales indicando su estado y no fuerza el scroll si el visitante
está leyendo mensajes anteriores. Enter envía; Mayús+Enter inserta una línea.
Hay etiquetas, estados anunciados, foco visible y controles usables en móvil.

## Verificación

`npm run test:chat` prueba validación, protección de origen, límites, lectura
acotada, decodificación real de fragmentos y comportamiento del endpoint con un
proveedor simulado. Requiere Node 22.15+ por el cargador de pruebas. Completar con
`npm run lint`, `npm run build` y revisión en móvil y escritorio.

La respuesta real del modelo y su calidad se deben comprobar con una clave
válida del plan Free. Las pruebas simuladas no certifican resistencia del modelo
a todas las formas de prompt injection ni verifican un firewall externo.

## Avatar

El avatar digital se generó con la herramienta integrada de ImageGen, tomando
el hero como referencia de identidad, y se optimizó a WebP de 256 × 256
(aproximadamente 5,5 KB) en `public/chat/bruno-avatar.webp`.
El avatar del visitante es un icono vectorial neutro sin rasgos de género.

Prompt final utilizado:

> Use case: identity-preserve. Asset type: square digital avatar for the chat in a minimalist editorial personal portfolio. Reference image is the real hero portrait of Bruno Esteve. Create a modern polished digital character avatar based on this same person's face: young adult, wavy dark hair with off-center part, dark eyebrows, light mustache and short beard, recognizable facial proportions, friendly direct gaze. Digitally sculpted stylized avatar, softly rounded character modeling and subtle matte clay-like surfaces, a contemporary Memoji-like head and shoulders with natural eyes and a subtle smile. This must look like a digital avatar, NOT a drawing, sketch, engraving or photograph. Monochrome grayscale only, charcoal hair and jacket, soft neutral-gray skin, plain off-white #f4f3ef background. Clean diffuse studio lighting, restrained editorial finish. Center the head with generous margins so the hair and shoulders fit inside a circular chat avatar crop; readable at 44px. No text, no borders, no logos, no interface, no additional person, no bright colors.
