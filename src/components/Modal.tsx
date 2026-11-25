import { type ReactNode, useEffect } from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  title?: string;
  fullScreen?: boolean;
}

export function Modal({ open, onClose, children, title, fullScreen }: ModalProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-end sm:items-center justify-center animate-fade-in">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div
        className={`relative w-full sm:max-w-[420px] bg-navy-700 border border-white/10 rounded-t-3xl sm:rounded-3xl max-h-[92vh] overflow-y-auto no-scrollbar animate-slide-up sm:animate-scale-in ${fullScreen ? 'sm:max-w-[420px]' : ''}`}
      >
        {title && (
          <div className="sticky top-0 z-10 flex items-center justify-between px-5 py-4 bg-navy-700/95 backdrop-blur-md border-b border-white/5">
            <h2 className="font-display text-lg uppercase tracking-wide text-white">{title}</h2>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-white/10 transition-colors">
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>
        )}
        {!title && (
          <button onClick={onClose} className="absolute top-3 right-3 z-20 p-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
            <X className="w-5 h-5 text-gray-300" />
          </button>
        )}
        {children}
      </div>
    </div>
  );
}
