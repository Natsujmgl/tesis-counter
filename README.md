# Con amor · Tu próxima gran era

Una cuenta regresiva romántica para una defensa de tesis. React + TypeScript + Vite, Tailwind CSS y Framer Motion. Todo estático; no necesita backend ni variables de entorno.

## Arrancar

Requiere Node.js 22.12 o superior.

```bash
npm ci
npm run dev
```

Abrí la URL que imprime Vite. Para verificar y generar la versión publicable:

```bash
npm test
npm run build
npm run preview
```

## Personalizar antes de compartir

Editá **`src/config.ts`**:

| Campo | Qué cambiar |
| --- | --- |
| `name` | El nombre o apodo de ella; el ejemplo es «Mi bb preciosa». |
| `career` | El nombre de su carrera. |
| `defenseDate` | Fecha y hora de la defensa: `2026-12-19T10:00:00` (19 de diciembre de 2026, 10:00). |
| `startDate` | El comienzo de la tesis, anterior a la defensa. |
| `quotes` | Sus frases, apodos y mensajes personales. Hay 21 frases iniciales. |
| `spotifyPlaylistId` | ID de tu playlist en el reproductor oficial de Spotify. |
| `affection` | Los tres párrafos y la firma de la carta, las tres notitas y el abrazo. Si cambia la defensa, actualizá también la fecha escrita en la carta. |

La cuenta regresiva termina el **19 de diciembre de 2026 a las 10:00**. Al llegar esa fecha se verá «¡Lo lograste, Licenciada!», el contador en cero y confeti. El estado se activa por fecha; no consulta el resultado real de la defensa.

Sin offset, la fecha usa la zona horaria del dispositivo. Si la defensa es a las 10 de Argentina y querés un mismo instante en todos los países, usá por ejemplo `2027-12-15T10:00:00-03:00`. El texto de fecha y hora se presenta en la zona local de quien abre la página.

La frase inicial se calcula con el día del año local (incluye años bisiestos); «Otra frase» elige una distinta de la actual. Se reinicia al cambiar de día. No se guarda información personal ni preferencias en servidores.

## Música y temas

La sección **Canciones para acompañarte, amorshito** reúne una sola playlist, el botón **Escuchar nuestra música** y el enlace **Abrir en Spotify**, sin tarjetas de álbumes ni descargas de audio. Abre el mismo panel que el botón fijo **Nuestra música ♫** del header, accesible mientras scrolleás. El panel empieza oculto: al abrirlo muestra el reproductor oficial compacto de [tu playlist](https://open.spotify.com/playlist/7ckbHF0HVh7FyP6J0XpgaO), con carga diferida y sin reproducción automática.

- **Expandir playlist** permite elegir canciones con los controles oficiales de Spotify; **Minimizar playlist** vuelve al tamaño compacto.
- **Ocultar** guarda el panel; Escape desde la página también lo oculta y devuelve el foco al botón que lo abrió. Dentro del iframe, Spotify maneja su propio teclado; podés volver a los controles del panel con Tab o Mayús+Tab.
- **Abrir en Spotify** sigue disponible tanto en la invitación como en el panel abierto, incluso si el reproductor no carga.

Hay un solo iframe, fuera de las secciones animadas. Scrollear, cambiar de tema, expandir, minimizar u ocultar el panel no lo desmonta ni cambia su URL. Esto evita recargar el embed durante esas acciones; **no garantiza continuidad de audio**, que depende de Spotify, el navegador y la sesión. Recargar o abandonar la página sí crea un reproductor nuevo.

Para cambiarla, editá `spotifyPlaylistId` en `src/config.ts`: ahora es `7ckbHF0HVh7FyP6J0XpgaO`. Copiá solo el ID que aparece después de `/playlist/`, sin parámetros. La integración es estática: no usa OAuth, credenciales, SDK ni backend.

Spotify controla la reproducción y puede pedir inicio de sesión u ofrecer solo vistas previas según navegador y cuenta. No se garantiza reproducción completa para cada visitante. Al cargar el reproductor pueden hacerse solicitudes a Spotify y utilizarse cookies de terceros. Tener Premium no da permiso para redistribuir música: **no se incluyen ni descargan canciones de Spotify**.

Los cuatro temas siguen disponibles en los botones del footer: lavanda, ARIRANG/BTS, AMERI/Duki y SWAG/Justin. Cambian la atmósfera visual sin cambiar la playlist ni recargar el reproductor.

## Apariencia y detalles

- Colores y variantes: tokens al inicio de `src/styles.css`.
- Google Fonts: Playfair Display e Inter, con alternativas locales si no hay conexión. Las fuentes externas requieren acceso a Google Fonts.
- Junto al contador, «Te escribí algo, bbshita» abre y guarda una carta de papel con sello de corazón. El mismo botón funciona con Enter o Espacio y anuncia si está abierta.
- «Abrí esto cuando…» despliega una notita para nervios, cansancio o dudas; se abre una por vez y se puede volver a cerrar. «Necesito un abrazo» deja una respuesta al lado, sin ventanas ni sonidos. Sus cinco corazones se animan una sola vez por toque y no aparecen con movimiento reducido.
- Textos del regalo: `affection` en `src/config.ts`; componentes `LoveLetter.tsx` y `LittleHugs.tsx`. El mensaje de cierre y las referencias a La boticaria, Demon Slayer y Re:Zero siguen en `src/App.tsx`.
- Mensaje final: «Hecho con amor para la futura Licenciada 💜».
- Easter egg: doble clic en el contador; el texto inferior también es un botón, usable con teclado o toque simple.
- Animaciones suaves, partículas y confeti respetan `prefers-reduced-motion`. En ese modo se conserva el mensaje celebratorio sin lanzar partículas.
- El contador no anuncia cada segundo al lector de pantalla; las frases y la celebración sí tienen estados accesibles.
- No se cambia el cursor del sistema para preservar precisión y accesibilidad.

## Pruebas de navegador

Las pruebas de Chromium verifican el contador, frases, temas, confeti, movimiento reducido y el ancho de pantalla a 320, 375 y 1440 px. El iframe de Spotify se sustituye por contenido local determinístico: se comprueban su URL y el enlace alternativo, no la reproducción real. Una prueba del dock verifica teclado, foco, modos, identidad del iframe y una única solicitud del embed al scrollear y cambiar de tema, con anchos de 320, 375 y 1440 px y una pantalla horizontal de poca altura. Una prueba móvil recorre carta, notitas y abrazo con teclado, comprueba que no haya desborde horizontal y captura el regalo abierto. Las capturas se generan en `.artifacts/`.

```bash
PLAYWRIGHT_BROWSERS_PATH=.cache/playwright npx playwright install chromium
PLAYWRIGHT_BROWSERS_PATH=.cache/playwright npx playwright test
```

En PowerShell, definí `$env:PLAYWRIGHT_BROWSERS_PATH='.cache/playwright'` y después ejecutá los comandos sin el prefijo. No necesitás instalar Chromium para compilar o desplegar.

## Organización

```text
src/
  config.ts                # Fechas, nombre, frases, música y temas
  time.ts                  # Cálculo de tiempo, progreso y frase diaria
  App.tsx                  # Composición y estado celebratorio
  components/
    Countdown.tsx          # Dígitos animados y confeti manual
    MotivationalQuote.tsx  # Frase diaria y otra frase
    ProgressBar.tsx        # Trayecto hacia la defensa
    Particles.tsx          # Fondo decorativo
    MusicCorner.tsx        # Una playlist: acceso al panel y enlace a Spotify
    MusicDock.tsx          # Panel persistente, modos, foco y enlace alternativo
    SpotifyPlaylist.tsx    # Único iframe oficial, URL estable
    LoveLetter.tsx         # Carta desplegable con sello de corazón
    LittleHugs.tsx         # Notitas y abrazo en la misma página
  styles.css               # Tokens, responsive y animaciones
```

## Deploy en Vercel

1. Subí el proyecto a tu repositorio de GitHub, GitLab o Bitbucket.
2. En Vercel elegí **Add New → Project** e importá ese repositorio.
3. Framework: **Vite**. Build command: **`npm run build`**. Output directory: **`dist`**. Install command: **`npm ci`**.
4. Elegí Node.js **22.x** o superior compatible. No hacen falta variables de entorno.
5. Presioná **Deploy** y compartí la URL.

Alternativa desde tu máquina: `npx vercel` para vincular y previsualizar; `npx vercel --prod` publica en producción. Esos comandos requieren tu cuenta y autorización: no se ejecutaron como parte de la creación del proyecto.

Los cambios de configuración requieren un nuevo deploy. No hay rutas de servidor ni base de datos. Vercel sirve los archivos generados en `dist/`.
