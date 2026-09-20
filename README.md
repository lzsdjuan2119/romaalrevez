# 🌼 Flores Amarillas — Dedicatoria Digital

Una landing page interactiva y romántica de dos escenas ("Lluvia de flores" y "El ramo"), inspirada en el trend de TikTok de las flores amarillas y la canción de *Floricienta*. Diseñada para personalizar con el nombre de esa persona especial, un mensaje y una foto, y compartirla como un regalo digital eterno.

---

## ✨ Características

- **100% Client-Side**: No requiere backend ni base de datos.
- **SVG Nativo**: Gerberas amarillas con pétalos en dos capas para dar volumen y realismo, más centro capitular texturizado con semillas en espiral dorada.
- **Web Audio API**: Acorde de arpegio suave en Mi Mayor 9 (`Emaj9`), sintetizado en tiempo real con osciladores y envolventes armónicas cálidas (sin archivos con copyright).
- **Personalización Completa**:
  - Modal inicial para configurar nombre, mensaje romántico (con ideas predeterminadas) y foto opcional (mediante `FileReader` en memoria).
  - Persistencia en **URL query parameters** (`?nombre=...&mensaje=...`) para generar un link compartible listo para enviar.
  - Respaldo en `localStorage` (protegido con `try/catch`).
- **Escena 1 — "Lluvia de flores"**:
  - Cielo nocturno en índigo y violeta profundo con estrellas titilantes dinámicas y manchas de luz bokeh.
  - Luna creciente con aura luminosa.
  - Caída de gerberas, corazones coral y destellos con balanceo pendular tipo péndulo.
  - Burbujas de texto flotantes ("LoveNotes") con frases románticas del trend y el nombre personalizado.
  - Botón de scroll fluido hacia la siguiente escena.
- **Escena 2 — "El ramo"**:
  - Medallón circular superior con la foto elegida (o emblema 💛 dorado) con anillo pulsante.
  - Ramo de 3 gerberas amarillas que florecen con *stagger*: el follaje y tallos se despliegan primero, y las flores abren sus pétalos progresivamente.
  - Lazo/moño decorativo dorado y coral.
  - Estallido de confeti con `canvas-confetti` y sonido armónico al florecer.
  - Tarjeta de dedicatoria de cristal translúcido con el mensaje personalizado.
  - Botón "Ver de nuevo" (repite la animación de florecer y confeti) y "Copiar enlace para enviar" (con notificación toast interactiva).
- **Música de Fondo & Reproductor Flotante**:
  - Canción temática *"Flores Amarillas"* de Floricienta en `/public/audio/flores-amarillas.mp3`.
  - Reproductor flotante con botón Play/Pause, barras de ecualizador animadas, título de la pista, control de silencio y volumen.
  - Inicio automático suave al interactuar con la página (respetando las políticas de autoplay de navegadores móviles y de escritorio).
  - Efectos sonoros mágicos al florecer el ramo (arpegio celestial `Emaj9`).
- **Accesibilidad & Responsive**: Mobile-first, compatible con safe-area insets (`env(safe-area-inset-*)`) y respeto a `prefers-reduced-motion`.

---

## 🛠️ Tecnologías

- **React 18** + **TypeScript**
- **Vite 5**
- **Tailwind CSS** (paleta personalizada índigo nocturno, amarillo gerbera, coral y follaje)
- **Framer Motion** (animaciones de entrada, floración y transiciones de interfaz)
- **canvas-confetti** (explosión floral dorada y corazones)
- **Lucide React** (iconos limpios y estilizados)
- **Google Fonts** (*Caveat*, *Playfair Display*, *Quicksand*)

---

## 🚀 Inicio Rápido

1. Instalar dependencias:
   ```bash
   npm install
   ```

2. Iniciar servidor de desarrollo:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

3. Compilar para producción:
   ```bash
   npm run build
   ```
# romaalrevez
