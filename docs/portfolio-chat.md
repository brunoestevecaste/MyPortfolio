# Asistente de «Hablemos»

El chat usa `openai/gpt-oss-120b` mediante la API de Groq. No utiliza SDKs
adicionales ni base de datos. El modo predeterminado es `CHAT_MODE=groq`.

El servidor solicita un borrador con JSON estructurado estricto y comprueba su
formato, contenido e identificadores de fuentes. Después, una segunda llamada
al mismo modelo verifica y, si hace falta, corrige el borrador con todas las
fuentes recuperadas. Devuelve una respuesta final estructurada, comprobada de
nuevo por el servidor, en lugar de un simple aprobado/rechazado. Se mantienen
las dos llamadas por respuesta, también cuando el borrador inicial declara
que no tiene información. Los rechazos de ámbito pueden necesitar menos.

El revisor acepta resúmenes fieles y preguntas en segunda persona referidas a
Bruno. Puede completar omisiones o retirar afirmaciones sin evidencia. La
respuesta de falta de información se reserva para cuando la revisión confirma
que falta la información del asunto principal. Los errores de formato o de
identificadores del modelo producen un fallo de generación (`503`), no una
falsa falta de conocimiento.

Ambas llamadas usan `stream: false`: el navegador recibe únicamente la respuesta
completa y revisada, seguida del evento de fin, en formato NDJSON. Después revela
sus caracteres uno a uno (12 ms por carácter). Esta escritura es una animación
local, no streaming de tokens del proveedor. «Detener» interrumpe la petición o
la escritura pendiente. Con movimiento reducido se muestra el texto recibido
directamente.

## Formato de las respuestas

Las respuestas empiezan por la información solicitada, con párrafos cortos,
listas cuando hay varios elementos comparables y negritas moderadas para nombres
y conceptos clave. El chat representa esos bloques como `p`, `ul`, `ol`, `li`
y `strong`, con texto de 14 px, interlineado amplio y separación entre bloques.
El formato se aplica solo a respuestas del asistente; las preguntas del visitante
conservan su texto literal.

La voz es la primera persona del singular de Bruno: «trabajo», «estudié»,
«mi experiencia», «mi contribución». Se aplica al borrador, a la revisión, al
saludo, a las respuestas fijas y al modo explícito `local`. El revisor conserva
esa voz o transforma una narración en tercera persona sin rechazarla por
personificar el perfil. Se siguen distinguiendo la contribución individual y
el trabajo del equipo; no se inventan recuerdos, opiniones ni datos privados.
La etiqueta «Bruno · asistente de IA» identifica el modo generativo. Si preguntan
quién responde, se explica que es el asistente de IA escribiendo con su voz,
sin afirmar que Bruno esté escribiendo en directo.

No se añade «Fuentes del portfolio», bibliografía, identificadores ni rutas de
casos. Las fuentes y sus identificadores siguen siendo necesarios para validar
la respuesta en el servidor, pero no se envían como un bloque de referencias al
navegador. El modo explícito `local` también omite los enlaces de procedencia;
los datos de contacto se conservan cuando el visitante los solicita.

El renderer reconoce únicamente párrafos, listas y `**negrita**`, sin una
dependencia adicional de Markdown. React escapa todo el contenido: no se ejecuta
HTML, no se crean enlaces automáticos ni se interpreta código. Las marcas de
negrita incompletas se conservan como texto durante la escritura progresiva.

## Activación local

1. Crea una cuenta **Free** en [Groq](https://console.groq.com/keys) y una clave.
2. Copia `.env.example` a `.env.local` y establece `GROQ_API_KEY` ahí.
3. Arranca o reinicia `npm run dev`.

No pegues la clave en el chat, en componentes ni en variables `NEXT_PUBLIC_`.
`.env.local` está excluido de Git. Sin clave se muestra un error comprensible y
los enlaces de contacto siguen funcionando. No hay respuestas ficticias ni
proveedor de pago alternativo cuando falta configuración o se agota la cuota.

`CHAT_MODE=local` permite activar explícitamente un modo no generativo que
selecciona extractos del contenido público y no necesita clave ni llama a Groq.
Nunca se activa automáticamente por un error del proveedor.

Los límites y la disponibilidad del plan gratuito dependen de Groq y pueden
cambiar. Usa una cuenta que permanezca en Free: elegir este modelo no evita
cargos si la organización tiene un plan de pago. Referencia:
[límites oficiales](https://console.groq.com/docs/rate-limits).

## Contenido

`src/data/profile.ts` se comparte con el hero y el pie. El contexto del asistente
reutiliza `experience`, `education`, los resúmenes de los cuatro proyectos y sus
casos públicos. Recupera hasta cinco fuentes completas, incluido el perfil,
dentro de un máximo de 6.000 caracteres de contexto serializado. Usa las dos
últimas preguntas del visitante para seleccionar las fuentes y resolver
referencias; no envía mensajes previos del asistente como hechos fiables. Si la
pregunta actual cambia a experiencia, formación, proyectos o perfil, se prioriza
ese tema y se deja de heredar el proyecto de la pregunta anterior. Las
continuaciones elípticas, como «¿y su arquitectura?», conservan esa referencia.
El perfil incluye la presentación pública del hero. Los
detalles de un proyecto conservan su fuente principal, contribución y avisos de
confidencialidad. Las respuestas aprobadas declaran hasta tres fuentes internas
para su comprobación; sus identificadores y enlaces no se añaden a la respuesta.
Al editar estos datos, el chat
se actualiza al desplegar la nueva versión.

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
- Límites de consultas del modo generativo:

  | Ámbito | Solicitudes/minuto | Solicitudes/24 h | Generaciones simultáneas |
  | --- | ---: | ---: | ---: |
  | Identificador del visitante | 4 | 100 | 1 |
  | Proceso del servidor | 10 | 400 | 2 |

  Hay una espera mínima de 8 segundos entre solicitudes admitidas del mismo
  identificador. Una pregunta de seguimiento puede admitirse a partir de esos
  8 segundos si la anterior ha terminado y quedan consultas disponibles; no
  necesita esperar un minuto completo. Otro identificador puede consultar sin
  esperar por el primero, dentro de los límites compartidos. La ventana por
  minuto es móvil; el contador diario se reinicia 24 horas después del inicio
  de su periodo. Los intentos admitidos, incluidos los inválidos, fallidos y
  cancelados, consumen el límite. Los rechazados por el limitador no lo consumen.

  Estos contadores miden solicitudes al chat, no llamadas ni tokens de Groq.
  Diez respuestas aprobadas requieren hasta veinte llamadas al modelo. La cuota
  de la organización en Groq se aplica además a solicitudes y tokens, y puede
  agotarse antes que estos límites locales. Un `429` del proveedor conserva su
  espera `Retry-After` (acotada a 24 horas; 60 segundos si no es válida), sin
  reintentos automáticos. Consulta los [límites oficiales de Groq](https://console.groq.com/docs/rate-limits)
  y los límites concretos de tu organización en su consola.

  El modo explícito `local` conserva límites independientes: 4 solicitudes/minuto
  y 200/24 h por identificador; 120/minuto, 5.000/24 h y 20 consultas simultáneas
  por proceso. Mantiene los 8 segundos entre envíos y una consulta simultánea
  por identificador.
- Identificadores efímeros derivados de IP con SHA-256 y sal aleatoria; caducidad
  de contadores y máximo 2.000 entradas. Nunca se confía automáticamente en
  cabeceras de IP suministradas por clientes. Sin proxy verificado se usa una
  única bolsa compartida, para que falsificar cabeceras no amplíe la cuota.
  En ese caso, todos los visitantes comparten también los límites por
  identificador; en localhost es el comportamiento esperado.
- 30 segundos para completar generación y revisión; hasta 1.024 tokens en el
  borrador y 1.024 en la revisión. Se aceptan borradores de hasta 1.600 caracteres
  y el cliente limita cualquier salida a 4.000 caracteres. Se interrumpe
  el proveedor cuando se cancela o desconecta el cliente.
- Solo se envía al navegador el texto de respuesta; se excluyen razonamiento,
  metadatos, errores internos y cabeceras del proveedor. Las respuestas se
  representan con párrafos, listas y negritas de texto escapado por React: no
  ejecutan HTML, enlaces o código.
- Instrucciones de alcance y resistencia a prompt injection; el modelo no tiene
  herramientas ni acceso a secretos. Ningún prompt garantiza por sí solo que un
  modelo nunca alucine o responda fuera de contexto; no se le confían permisos.
- Respuestas revisadas sin caché; errores de cuota con `429` y
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
estado del componente, hasta reiniciarlo o recargar. En modo generativo, el
proveedor procesa las dos últimas preguntas del visitante, las fuentes públicas
seleccionadas y el borrador durante su revisión. La revisión puede devolver una
versión corregida usando esas mismas fuentes. Revisa y activa
Zero Data Retention en la cuenta de Groq si corresponde; su política permite
retención excepcional por seguridad y fiabilidad sin ese ajuste:
[política de datos](https://console.groq.com/docs/your-data).

El chat identifica al asistente como IA, permite detener y reiniciar, conserva
respuestas parciales indicando su estado y no fuerza el scroll si el visitante
está leyendo mensajes anteriores. Enter envía; Mayús+Enter inserta una línea.
Hay etiquetas, estados anunciados, foco visible y controles usables en móvil.

## Verificación

`npm run test:chat` prueba validación, protección de origen, límites por visitante
y proceso, ventanas y reinicio diario, consultas de seguimiento tras 8 segundos,
lectura acotada, generación y revisión estructuradas, comportamiento del endpoint
con un proveedor simulado, ausencia de referencias visibles, renderizado seguro
de párrafos/listas/negritas y escritura progresiva con cancelación y movimiento
reducido. Requiere Node 22.15+ por el cargador de pruebas. Completar con
`npm run lint`, `npm run build` y revisión en móvil y escritorio.

`npm run test:chat:live` carga `.env.local` si existe y comprueba una respuesta
real generada y revisada por Groq, sin añadir referencias visibles. No imprime
ni guarda claves, borradores ni
respuestas. Sin `GROQ_API_KEY`, termina con un error de configuración.

Se puede elegir un caso público con `npm run test:chat:live -- experience`,
`education`, `projects`, `followup`, `unknown` o `scope`. Sin argumento se prueba
`alina`. Ejecuta los casos de uno en uno y respeta cualquier espera de Groq;
no se reintentan automáticamente. Los casos positivos comprueban que no aparezca
una negativa genérica y que la respuesta contenga términos del tema esperado;
también verifican señales de primera persona en las respuestas positivas.
`unknown` verifica un salario no publicado y `scope` una petición de receta.
Estas comprobaciones son ejemplos de regresión, no una evaluación exhaustiva
de exactitud semántica.

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
