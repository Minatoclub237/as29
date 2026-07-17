import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import BeforeAfterSlider from './BeforeAfterSlider';

export interface ServiceProject {
  title: string;
  before: string;
  after: string;
}

interface ServiceModalProps {
  open: boolean;
  onClose: () => void;
  label: string;
  projects: ServiceProject[];
}

export default function ServiceModal({
  open,
  onClose,
  label,
  projects,
}: ServiceModalProps) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // Portaled to <body>: parent sections use transforms (exit parallax),
  // which would otherwise break position:fixed.
  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-sm sm:p-8"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="relative max-h-full w-full max-w-5xl overflow-y-auto rounded-3xl border border-white/10 bg-[#0a0a0a] p-6 sm:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="absolute right-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
            >
              <X size={20} />
            </button>

            <span className="font-body mb-2 block text-[10px] uppercase tracking-[0.3em] text-white/30">
              {label}
            </span>
            <h3 className="font-heading mb-8 text-3xl italic text-white sm:text-4xl">
              Avant / Après — nos réalisations
            </h3>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              {projects.map((p) => (
                <div key={p.title}>
                  <h4 className="font-body mb-3 text-sm font-semibold text-white">
                    {p.title}
                  </h4>
                  <BeforeAfterSlider
                    before={p.before}
                    after={p.after}
                    alt={p.title}
                  />
                </div>
              ))}
            </div>

            <p className="font-body mt-6 text-center text-xs text-white/40">
              Faites glisser le curseur pour comparer
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
}
