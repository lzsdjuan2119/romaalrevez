export interface DedicationData {
  recipientName: string;
  message: string;
  photoUrl?: string | null;
}

export const DEFAULT_DEDICATION: DedicationData = {
  recipientName: "Mi Amor",
  message: "Ella sabía que él sabía, que algún día pasaría... que vendría a buscarla con sus flores amarillas. 💛 Hoy estas flores son para ti, para recordarte lo especial que eres en mi vida y lo mucho que iluminas cada uno de mis días.",
  photoUrl: null,
};

export const ROMANTIC_PHRASES = [
  "Te elijo hoy, mañana y siempre 💛",
  "El amarillo del sol iluminaba la esquina ✨",
  "Flores amarillas para iluminar tu sonrisa 🌼",
  "Ella sabía que él vendría a buscarla...",
  "Un detalle que florece con todo mi amor 💛",
  "Tu luz brilla más que mil primaveras 🌸",
  "Para ti, con todo mi corazón 🌻",
  "En ese bar desierto los esperaba el encuentro...",
  "Promesas de amor que nunca se apagan ✨",
  "No te olvides que la vida es un milagro 💛",
];
