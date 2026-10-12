# Chatbot generativo del portfolio: modelo, seguridad y despliegue

Revisión de fuentes oficiales: 12 de octubre de 2026. Esta guía sustituye la recomendación anterior de usar respuestas locales como modo principal.

## Decisión

**GPT-OSS-120B, servido por Groq en su Free Plan.** El modo predeterminado es `groq`. La IA redacta cada respuesta con fuentes del portfolio y una segunda llamada revisa el borrador antes de mostrarlo. No se sustituye silenciosamente por respuestas prefijadas cuando falta la clave o se agota la cuota.

La elección es un criterio de ingeniería para este portfolio, no una clasificación universal de inteligencia ni un benchmark propio: combina razonamiento, soporte de JSON estricto, una integración directa y cuota gratuita publicada. Frente a GPT-OSS-20B, Groq publica los mismos límites gratuitos y OpenAI describe 120B como su modelo abierto más capaz. Qwen 3.8 27B es un competidor fuerte, pero Groq lo marca Preview; priorizo estabilidad para una web pública. No comparo puntuaciones de benchmarks distintos como si fueran equivalentes.

Fuentes: [GPT-OSS-120B, OpenAI](https://developers.openai.com/api/docs/models/gpt-oss-120b), [modelo en Groq](https://console.groq.com/docs/model/openai/gpt-oss-120b), [Qwen en Groq](https://console.groq.com/docs/model/qwen/qwen3.8-27b).

## Comparación de opciones gratuitas

RPM = solicitudes/minuto; RPD = solicitudes/día; TPM/TPD = tokens/minuto/día. Un token es una unidad de texto, no una palabra ni una consulta. La cuota se comparte en la cuenta/organización/proyecto según el proveedor.

| Opción | Límites gratuitos publicados | Valoración para este portfolio |
| --- | --- | --- |
| Groq / GPT-OSS-120B | 30 RPM, 1.000 RPD, 8.000 TPM, 200.000 TPD | Elegido: razonamiento, JSON estricto y modelo de producción. |
| Groq / GPT-OSS-20B | Los mismos: 30 RPM, 1.000 RPD, 8.000 TPM, 200.000 TPD | No aporta más cuota; prefiero la capacidad de 120B. |
| Groq / Qwen 3.8 27B | Los mismos límites | Multilingüe y JSON estricto, pero Preview; no lo elijo para la versión pública. |
| Google / Gemini 2.5 Flash y 3.5 Flash-Lite | La tabla de precios incluye nivel gratuito; las cuotas activas se consultan en AI Studio | Alternativas válidas. No publico cifras antiguas de 15 RPM/1.500 RPD como si siguieran garantizadas. La cuota exacta requiere acceder a la cuenta. |
| OpenRouter / modelos gratuitos | El plan Free publica 50 solicitudes/día | Con generación + revisión serían como máximo 25 respuestas de dos llamadas, antes de otros límites. Añade un intermediario y políticas de proveedor. |
| Cerebras / GPT-OSS-120B | Trial: 5 RPM, 30.000 TPM no cacheados, 90.000 TPM totales, 1 millón TPD | Descartado para gratuidad continuada: 5 USD de crédito, caducidad de 30 días y método de pago verificado; la documentación indica que no existe nivel permanentemente gratuito. |

Fuentes: [límites Groq](https://console.groq.com/docs/rate-limits), [precios Gemini](https://ai.google.dev/gemini-api/docs/pricing), [límites Gemini](https://ai.google.dev/gemini-api/docs/rate-limits), [OpenRouter Free](https://openrouter.ai/pricing), [Cerebras](https://inference-docs.cerebras.ai/support/rate-limits).

Los valores pueden cambiar y la página Limits de tu cuenta prevalece. La inteligencia real en español y la fidelidad al portfolio requieren evaluación con preguntas reales; no se han medido con una clave durante esta revisión.

## Capacidad real y coste

**1.000 llamadas al día no significan 1.000 conversaciones.** El límite de tokens suele agotarse primero. Una respuesta aceptada usa dos llamadas: generación y revisión. Un rechazo puede usar una; los intentos de inyección más evidentes no llegan a Groq.

El contexto recuperado se limita a 6.000 caracteres completos y hasta dos preguntas de 800 caracteres; las respuestas se limitan a 1.600 caracteres más referencias. Generación: máximo 1.024 tokens de salida, incluidos los de razonamiento; revisión: 512. No son medidas exactas del consumo: lo determina el tokenizador del proveedor.

Como ejemplo de planificación, con 4.000 tokens totales por respuesta (las dos llamadas), 200.000 TPD equivalen a unas 50 respuestas/día. No es una medición ni una garantía. La aplicación empieza conservadoramente con 1 consulta/minuto y 40/día por proceso; por visitante, 20/día. El aviso de espera evita reintentos continuos. Es una limitación visible de esta configuración gratuita con doble revisión, no capacidad ilimitada. Ajustar estos umbrales requiere medir consumo real; no aumentar a ciegas hasta 30 consultas/minuto.

En serverless esos contadores no son un presupuesto distribuido: cada instancia/reinicio tiene los suyos. La regla WAF protege por IP entre instancias y Groq impone la cuota global de su organización. Un ataque distribuido todavía podría agotar la cuota y dejar temporalmente el chat sin servicio. No se promete disponibilidad garantizada.

Para mantener coste cero: conserva **Groq Free** y **Vercel Hobby**, no actives Developer/Pro ni facturación de pago. La aplicación no cambia de modelo/proveedor, no compra créditos y no reintenta automáticamente. No puede comprobar ni controlar si tú cambias el plan de tu cuenta. Cuando Groq devuelve 429, se informa al visitante y se respeta `Retry-After`.

## Qué se ha implementado

1. `provider.ts`: modelo fijo `openai/gpt-oss-120b`, endpoint fijo, salida estructurada estricta, sin herramientas ni redirecciones. Sin SDK o dependencia adicional.
2. `context.ts`: índice de datos públicos preparado una vez por proceso. Recupera textos completos, prioriza el proyecto mencionado, incluye sus notas y contribución individual y ofrece un índice compacto de los cuatro proyectos. No lee documentos privados ni `.env` como conocimiento.
3. `guardrails.ts`: detección preliminar de algunas inyecciones, validación de estructura, longitud y fuentes; rechaza URLs generadas, HTML y patrones de claves. Estos patrones son una capa adicional, no un detector universal.
4. `answer.ts`: genera un borrador, comprueba que cite fuentes permitidas y solicita una revisión separada. El revisor ve fuentes citadas y notas del proyecto padre. Si no aprueba, se muestra una respuesta fija de falta de evidencia. Rechazos temáticos y datos desconocidos nunca reutilizan el texto libre devuelto por el modelo.
5. `route.ts`: no entrega tokens del borrador al navegador. Solo envía la respuesta final después de revisar. La interfaz conserva la aparición gradual del texto; ya no es streaming directo del modelo. Un fallo del revisor bloquea la respuesta completa.
6. Interfaz: identifica al asistente como IA y explica que las consultas se envían a Groq. Se conserva el modo `local` únicamente como alternativa explícita, no como sustitución automática.
7. Pruebas: contratos, límites, configuración, recuperación, historial manipulado, JSON malformado, borradores rechazados, errores del proveedor y cancelación. `test:chat:live` permite comprobar después una generación y revisión reales sin imprimir secretos.

## Medidas de seguridad y límites honestos

- **Clave en servidor:** `GROQ_API_KEY` solo se lee en servidor. No es una variable `NEXT_PUBLIC_`, no se incluye en el prompt, en HTML, en logs de la aplicación ni en respuestas. Los errores externos se sustituyen por mensajes genéricos.
- **Conocimiento autorizado:** únicamente datos editoriales ya publicados. No se envían CV privados, documentos fuente, archivos de configuración ni perfiles ficticios de los demostradores.
- **Historial no fiable:** el navegador no puede introducir mensajes de sistema; las respuestas del asistente aportadas por el cliente no se reenvían al modelo. Se usan como máximo las dos últimas preguntas para referencias como «¿y su arquitectura?», nunca como evidencia de hechos.
- **Ámbito y fidelidad:** prompt restrictivo, salida estructurada, fuentes verificadas en código y segundo pase semántico. Peticiones generales o mixtas deben rechazarse. JSON estricto garantiza formato, no veracidad. Ambos pases usan el mismo modelo y pueden compartir errores: no son verificadores infalibles ni independientes estadísticamente.
- **Sin capacidad de actuar:** no se habilitan navegación, ejecución de código, herramientas, acceso al sistema de archivos, búsqueda externa ni subida de documentos. Mencionar esas capacidades en la ficha del modelo no las activa en esta aplicación.
- **Salida:** texto React, sin `dangerouslySetInnerHTML`; las referencias proceden del servidor. No se expone razonamiento interno ni metadatos del proveedor.
- **Abuso:** origen exacto, JSON obligatorio, cuerpo máximo de 16 KiB reales, pregunta de 800 caracteres, historial de nueve mensajes y 10.000 caracteres. Tiempo de lectura de cinco segundos; presupuesto de 30 segundos para la petición completa; cancelación al desconectar.
- **Infraestructura:** HTTPS en producción, origen canónico sin rutas ni credenciales, limitación por IP de confianza y WAF para Vercel. `Origin` se puede falsificar desde un cliente externo: no es autenticación. Los hashes de IP en memoria no constituyen anonimización absoluta.

**No existe garantía absoluta de «solo portfolio» con generación libre y filtros basados en modelos.** Esta implementación reduce el riesgo y falla cerrada cuando detecta un problema. Un adversario puede encontrar desviaciones que ambos pases no detecten. La ausencia de herramientas y secretos en el contexto limita el daño: el modelo no puede leer una clave que nunca recibe. Para una garantía determinista de contenido haría falta volver a extractos cerrados, sacrificando la redacción generativa que has solicitado.

## Privacidad

Se envían a Groq las dos últimas preguntas, fuentes públicas y el borrador para revisión. No se registra el texto en la aplicación ni se persiste el chat en base de datos o almacenamiento local; el historial está en memoria de la pestaña y desaparece al recargar/reiniciar. Hosting y proveedor mantienen sus propias políticas de metadatos y retención.

Groq documenta retención excepcional de entradas/salidas para errores o abuso, hasta 30 días, y controles de exclusión en Data Controls. Revisa esas opciones antes de publicar. No escribas datos sensibles en el chat. [Política de datos de Groq](https://console.groq.com/docs/your-data).

## Paso a paso: desarrollo local

«Local» aquí significa que la web corre en tu ordenador. La inferencia sigue ejecutándose en Groq y requiere Internet; no se descarga el modelo de 120B a tu equipo.

1. Usa Node.js 22.15 o posterior compatible (recomendado LTS). Ejecuta `npm ci` en la carpeta del portfolio.
2. Crea una cuenta en [Groq Console](https://console.groq.com). Mantén el Free Plan. Comprueba acceso a `openai/gpt-oss-120b` y sus cuotas en Settings → Limits.
3. Crea una API key de Groq. No es una clave de OpenAI/ChatGPT. Copia su valor directamente al editor del archivo local, nunca a una conversación, captura o comando de terminal.
4. Copia `.env.example` a `.env.local` **solo si no tienes ya ese archivo**. Si existe, edita únicamente las variables del chat. No pongas la clave real en `.env.example`.
5. En `.env.local`, establece `CHAT_MODE=groq` y pega la clave real como valor de `GROQ_API_KEY`. Deja `CHAT_ALLOWED_ORIGIN`, `CHAT_PROTECTION_MODE` y `CHAT_TRUSTED_IP_HEADER` vacíos para `npm run dev`.
6. Verifica que el archivo está excluido con `git check-ignore .env.local`. Debe mostrar su nombre; no muestra el contenido. Si el archivo hubiese sido versionado antes, ignorarlo no lo retira del historial: revoca cualquier clave expuesta y elimina ese archivo del seguimiento antes de publicar.
7. Ejecuta `npm run dev` y abre la dirección que indique la terminal. Ve a «Hablemos» y pregunta por Alina o Baleària. Deja pasar al menos un minuto entre consultas con esta configuración conservadora.
8. Ejecuta `npm run test:chat:live` una sola vez para probar conexión, generación y revisión reales. Consume hasta dos llamadas a Groq y solo imprime el resultado, no la clave ni las respuestas. No ejecutes esta prueba en paralelo con consultas del navegador.
9. Prueba manualmente una pregunta fuera de tema («Escribe una receta»), una solicitud de clave, una pregunta sin evidencia («¿Cuál es el salario de Bruno?»), una comparación entre proyectos y una continuación. Revisa que rechace, no invente y conserve atribuciones colectivas.

Si cambias `.env.local`, reinicia el servidor. No publiques `.env.local` ni lo sitúes en `public/`.

## Paso a paso: web gratuita con Vercel

[Vercel Hobby](https://vercel.com/docs/plans/hobby) está destinado al uso personal no comercial y tiene límites. Comprueba que el uso de tu portfolio encaja. Esta vía no requiere base de datos, Redis, Cloudflare ni otro proveedor.

1. Sube el código revisado a tu repositorio personal. Revisa `git status --short`; no añadas `.env.local`, credenciales, documentos privados o artefactos de compilación. Puedes usar un repositorio privado.
2. Importa el repositorio en Vercel Hobby, selecciona Next.js y conserva `npm run build`. No actives opciones de pago.
3. En Settings → Environment Variables, añade `CHAT_MODE=groq` y `GROQ_API_KEY` con el valor real desde el panel. Márcala Sensitive cuando el panel lo permita. Limítala a Production si no necesitas IA en previews. No compartas capturas con el valor visible.
4. Realiza un primer despliegue para obtener la URL pública. El chatbot estará bloqueado hasta terminar la configuración: es intencionado.
5. Añade `CHAT_ALLOWED_ORIGIN` con el origen exacto, por ejemplo `https://tu-portfolio.vercel.app`, sin rutas, query ni fragmentos. Un único origen; si usas dominio propio, usa ese y redirige allí el resto.
6. Configura **Firewall → Configure → New Rule**: nombre `portfolio-chat`; condición Path equals `/api/chat`; acción Rate Limit; clave de conteo IP; ventana fija de 60 segundos; límite de **1 petición por IP**; acción de mitigación Deny. No filtres únicamente por método: así se limita también el abuso sobre otros métodos de esa ruta.
7. Guarda, revisa y pulsa **Publish** para activar la regla. Comprueba que la regla usa la inclusión de Hobby, sin activar un plan de pago. La documentación consultada incluye 1 regla y 1.000.000 de peticiones permitidas en Hobby. Si tu panel muestra condiciones distintas o ya utilizas la única regla, resuelve eso antes de activar el chat.
8. Solo después, añade `CHAT_PROTECTION_MODE=edge`. Esta variable declara que has configurado la protección; no la crea ni comprueba su existencia.
9. Deja `CHAT_TRUSTED_IP_HEADER` vacío: en Vercel se utiliza el encabezado gestionado por la plataforma.
10. Vuelve a desplegar. Es necesario porque el aviso del modo se compila en la página y las variables nuevas deben aplicarse al despliegue.
11. Prueba desde la URL canónica. Envía dos consultas seguidas y verifica el bloqueo en Firewall/Logs. Comprueba primero generación correcta, rechazo temático y datos desconocidos, esperando a la siguiente ventana entre consultas. Una regla WAF puede devolver su propia página de bloqueo; la interfaz muestra un error genérico sin exponerla.
12. Controla Usage en Vercel y Limits en Groq. La cuota de IA se comparte con otros usos de tu organización: dedica una organización/proyecto cuando proceda. En previews, mantén el chat sin clave o configura explícitamente origen y protección; no abras comodines de origen.

Fuentes: [reglas y cuota WAF](https://vercel.com/docs/vercel-firewall/vercel-waf/rate-limiting), [uso y precios WAF](https://vercel.com/docs/vercel-firewall/vercel-waf/usage-and-pricing), [encabezados de IP](https://vercel.com/docs/headers/request-headers).

## Diagnóstico y mantenimiento

- 403: origen incorrecto o regla del firewall. Revisa la URL canónica y el despliegue.
- 400: formato o tamaño de pregunta no válido.
- 429: espera local, regla WAF o cuota de Groq. No hagas reintentos automáticos en bucle.
- 503: clave/configuración ausente o errónea, modelo no disponible, timeout o fallo en cualquiera de los dos pases. Consulta el panel del proveedor sin registrar claves ni cuerpos de conversaciones.
- Respuesta de falta de evidencia: fuentes insuficientes, salida no válida o revisión rechazada; no significa necesariamente caída del proveedor.

`CHAT_MODE=local` activa explícitamente el modo antiguo de extractos si alguna vez lo necesitas. No cumple el objetivo de IA generativa y no es el modo recomendado ahora.

Antes de publicar: `npm run test:chat`, `npm run lint`, `npm run build` y `npm run test:chat:live` con tu clave. Las pruebas automáticas normales simulan al proveedor: comprueban el código, no prueban que el modelo sea inmune a ataques. Revisa ejemplos reales en español y otros idiomas de tus visitantes antes de abrir el chat al público.

No se ha encontrado una clave de Groq configurada en este entorno. No se ha creado ni mostrado ninguna clave, ni llamado realmente a Groq, ni publicado la web. La conexión real y la configuración del firewall deben validarse al seguir estos pasos.

## Resultado de validación de esta implementación

- `npm run test:chat`: 15 pruebas aprobadas con proveedor simulado.
- `npm run lint` y `npm run build`: correctos.
- `git diff --check`: sin errores.
- Bundle público revisado: sin referencias a `GROQ_API_KEY`, al endpoint de Groq ni al patrón de sus claves.
- Navegador a 375×812 y 1440×1000: aviso de IA, envío por teclado, fallo seguro sin credenciales, reinicio y ausencia de desbordamiento horizontal.
- `npm run test:chat:live`: no completado por ausencia de clave; se comprobó que explica cómo configurarla sin imprimir secretos.

La recuperación de fuentes es léxica, sin embeddings ni base vectorial para mantener la sencillez. Una paráfrasis compleja o una pregunta muy amplia puede no recuperar toda la evidencia relevante y producir una negativa prudente. No es una búsqueda semántica exhaustiva. La revisión adicional aumenta la latencia y puede rechazar respuestas correctas; conviene evaluar ambos tipos de error cuando configures la clave.
