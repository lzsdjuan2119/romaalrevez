export interface DedicationData {
  recipientName: string;
  message: string;
  photoUrl?: string | null;
}

export const DEFAULT_DEDICATION: DedicationData = {
  recipientName: "Mi Amor",
  message:
    "Te amo con todo mi corazón 💛\n\n" +
    "Este año tal vez no serán flores reales pero sí eternas.\n\n" +
    "¡Jamás volverás a ser espectador mi vida hermosa! ✨",
  photoUrl: null,
};

export const ROMANTIC_PHRASES: string[] = [
  "Te elijo hoy, mañana y siempre 💛",
  "3 GERBERAS significan te amo ✨",
  "Gerberas amarillas para iluminar tu sonrisa 🌼",
  "La distancia no es nada cuando alguien significa todo 💛",
  "Un detalle que florece con todo mi amor 💛",
  "Tienes los ojos más hermosos del universo 🌸",
  "Para ti, con todo mi corazón 🌻",
  "Ese live nos unió para siempre...",
  "Promesas de amor que nunca se apagan ✨",
  "No te olvides siempre serás mi suerte 💛",
  "De entre tantas estrellas, tú eres la luna que ilumina mi vida 🌟",
];
