import { ROMANTIC_PHRASES, DEFAULT_DEDICATION } from './types';

/**
 * =========================================================================
 * 🌼 CONFIGURACIÓN DE LA DEDICATORIA DE FLORES AMARILLAS
 * Textos, frases románticas y reproducción musical.
 * =========================================================================
 */

export const DEDICATION_CONFIG = {
  // Destinatario
  recipientName: DEFAULT_DEDICATION.recipientName,

  // Título principal en la Escena 1 (tipografía manuscrita grande)
  scene1Title: "Con flores amarillas para ti",

  // Cita o verso de la canción bajo el título de la Escena 1
  scene1Quote:
    "«Ella sabía que él sabía, que algún día pasaría...\nque vendría a buscarla con sus flores amarillas»",

  // Texto del botón/indicador de scroll hacia la Escena 2
  scrollPrompt: "Toca para descubrir tu ramo",

  // Encabezado sobre el ramo en la Escena 2
  scene2Header: "Un ramo eterno para ti",

  // Mensaje romántico principal debajo del ramo (en tipografía manuscrita grande y emotiva)
  romanticMessage: DEFAULT_DEDICATION.message,

  // Firma al pie del mensaje
  signature: "Con todo mi amor 💛",

  // Frases románticas cortas que flotan suavemente en la Escena 1
  floatingPhrases: ROMANTIC_PHRASES,

  // Música de fondo
  music: {
    src: "/audio/flores-amarillas.mp3",
    title: "Flores Amarillas",
    artist: "Floricienta",
    loop: true,
    defaultVolume: 0.3, // Volumen medio-bajo (30%)
    autoplayDelaySeconds: 3, // Inicia a los 3 segundos de entrar
    autoplayOnInteraction: true,
  },
};

