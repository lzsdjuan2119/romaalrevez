import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Upload, Trash2, Heart, Sparkles, Wand2 } from 'lucide-react';
import { DedicationData, DEFAULT_DEDICATION } from '../types';
import { saveDedication } from '../utils/storage';
import { soundController } from '../utils/audio';

interface SetupModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentData: DedicationData;
  onSave: (newData: DedicationData) => void;
}

const PRESET_MESSAGES = [
  {
    label: "Floricienta",
    text: "Ella sabía que él sabía, que algún día pasaría... que vendría a buscarla con sus flores amarillas. 💛 Hoy estas flores son para ti, para recordarte lo especial que eres en mi vida y lo mucho que iluminas cada uno de mis días."
  },
  {
    label: "Amor Eterno",
    text: "Dicen que regalar flores amarillas significa querer que esa persona se quede para siempre en tu vida. Y yo no tengo dudas: te elijo hoy, mañana y en cada uno de mis días. Eres mi sol."
  },
  {
    label: "Para Iluminar Tu Día",
    text: "No necesitaba una fecha especial para recordarte cuánto te amo, pero hoy quería llenarte de flores amarillas para que nunca olvides lo mucho que iluminas mi mundo. 🌼✨"
  }
];

export const SetupModal: React.FC<SetupModalProps> = ({
  isOpen,
  onClose,
  currentData,
  onSave,
}) => {
  const [recipientName, setRecipientName] = useState(currentData.recipientName || '');
  const [message, setMessage] = useState(currentData.message || '');
  const [photoUrl, setPhotoUrl] = useState<string | null>(currentData.photoUrl || null);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMsg('Por favor selecciona un archivo de imagen válido.');
      return;
    }

    // Check size limit: max 4MB for smooth in-memory dataURL
    if (file.size > 4 * 1024 * 1024) {
      setErrorMsg('La imagen es algo pesada (máx 4MB recomendada).');
      return;
    }

    setErrorMsg('');
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        setPhotoUrl(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setPhotoUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    soundController.playSparkle();

    const finalizedData: DedicationData = {
      recipientName: recipientName.trim() || DEFAULT_DEDICATION.recipientName,
      message: message.trim() || DEFAULT_DEDICATION.message,
      photoUrl,
    };

    saveDedication(finalizedData);
    onSave(finalizedData);
    onClose();
  };

  const handleDefaultContinue = () => {
    soundController.playSparkle();
    const defaultData = {
      ...DEFAULT_DEDICATION,
      recipientName: recipientName.trim() || DEFAULT_DEDICATION.recipientName,
    };
    saveDedication(defaultData);
    onSave(defaultData);
    onClose();
  };

  const applyPreset = (presetText: string) => {
    setMessage(presetText);
    soundController.playSparkle();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
        {/* Backdrop blur */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-night-950/80 backdrop-blur-md"
          onClick={onClose}
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="relative w-full max-w-lg bg-[#140e32]/95 border border-amber-500/30 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(245,158,11,0.2)] p-6 sm:p-8 z-10 text-amber-50"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 text-amber-200/60 hover:text-amber-100 bg-night-900/60 hover:bg-night-800 p-2 rounded-full transition-colors"
            title="Cerrar"
          >
            <X size={18} />
          </button>

          {/* Header */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-medium mb-3">
              <Sparkles size={13} className="text-yellow-400" />
              <span>Personaliza tu dedicatoria</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-serifDisplay italic font-semibold text-yellow-200">
              Flores Amarillas
            </h2>
            <p className="text-xs sm:text-sm text-amber-100/70 mt-1 font-sans">
              Crea un recuerdo digital único para esa persona especial 💛
            </p>
          </div>

          <form onSubmit={handleSave} className="space-y-4">
            {/* Destinatario Name */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-200/90 mb-1.5 font-sans">
                ¿Para quién es la dedicatoria?
              </label>
              <input
                type="text"
                value={recipientName}
                onChange={(e) => setRecipientName(e.target.value)}
                placeholder="Ej. Mi Amor, Valentina, Sofía..."
                maxLength={40}
                className="w-full px-4 py-3 bg-night-900/80 border border-yellow-500/25 rounded-2xl text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 font-sans text-sm transition-all"
              />
            </div>

            {/* Photo Upload (Optional) */}
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-amber-200/90 mb-1.5 font-sans flex items-center justify-between">
                <span>Foto especial (Opcional)</span>
                <span className="text-[11px] font-normal text-amber-300/60 lowercase">
                  Solo en tu navegador
                </span>
              </label>

              {photoUrl ? (
                <div className="flex items-center gap-3 p-3 bg-night-900/60 border border-yellow-400/30 rounded-2xl">
                  <img
                    src={photoUrl}
                    alt="Foto elegida"
                    className="w-14 h-14 rounded-full object-cover border-2 border-yellow-400 shadow-md"
                  />
                  <div className="flex-1 text-xs text-amber-200/80">
                    <p className="font-medium text-amber-100">Foto cargada con éxito</p>
                    <p className="text-[11px] text-amber-300/60">Aparecerá en el medallón del ramo</p>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-red-400 hover:text-red-300 p-2 rounded-xl hover:bg-red-400/10 transition-colors"
                    title="Quitar foto"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              ) : (
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="cursor-pointer border-2 border-dashed border-yellow-400/25 hover:border-yellow-400/60 rounded-2xl p-3.5 text-center bg-night-900/40 hover:bg-night-900/70 transition-colors flex items-center justify-center gap-2 group"
                >
                  <Upload size={16} className="text-yellow-400 group-hover:scale-110 transition-transform" />
                  <span className="text-xs text-amber-200/70 group-hover:text-amber-100 font-sans">
                    Subir foto para el medallón (opcional)
                  </span>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handlePhotoUpload}
                className="hidden"
              />
              {errorMsg && <p className="text-xs text-red-400 mt-1">{errorMsg}</p>}
            </div>

            {/* Personalized Message */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-xs font-semibold uppercase tracking-wider text-amber-200/90 font-sans">
                  Mensaje personalizado
                </label>
                {/* Presets suggestions */}
                <div className="flex items-center gap-1">
                  <Wand2 size={12} className="text-yellow-400" />
                  <span className="text-[11px] text-amber-300/70">Ideas:</span>
                  {PRESET_MESSAGES.map((preset, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => applyPreset(preset.text)}
                      className="text-[11px] bg-yellow-400/10 hover:bg-yellow-400/25 text-yellow-300 px-2 py-0.5 rounded-md border border-yellow-400/20 transition-colors"
                    >
                      {preset.label}
                    </button>
                  ))}
                </div>
              </div>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe aquí tu mensaje de amor..."
                rows={4}
                maxLength={600}
                className="w-full px-4 py-3 bg-night-900/80 border border-yellow-500/25 rounded-2xl text-amber-50 placeholder-amber-200/30 focus:outline-none focus:border-yellow-400 focus:ring-2 focus:ring-yellow-400/20 font-sans text-sm leading-relaxed transition-all resize-none"
              />
              <div className="text-right text-[11px] text-amber-200/40">
                {message.length} / 600
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-2 space-y-2.5">
              <button
                type="submit"
                className="w-full py-3.5 px-6 rounded-2xl bg-gradient-to-r from-yellow-400 via-amber-400 to-yellow-500 hover:from-yellow-300 hover:to-amber-400 text-night-950 font-sans font-bold text-sm tracking-wide shadow-[0_4px_20px_rgba(245,158,11,0.35)] hover:shadow-[0_6px_25px_rgba(245,158,11,0.5)] transform hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2"
              >
                <Heart size={16} className="fill-night-950" />
                <span>Crear dedicatoria</span>
              </button>

              <button
                type="button"
                onClick={handleDefaultContinue}
                className="w-full py-2.5 px-4 text-xs font-sans text-amber-200/60 hover:text-amber-200 hover:underline transition-colors"
              >
                Continuar con dedicatoria por defecto
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
