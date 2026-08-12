import React, { useState, useEffect, useRef } from 'react';
import { Search, X, FileText, ArrowRight, CornerDownLeft } from 'lucide-react';
import { Solicitud } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  solicitudes: Solicitud[];
  onSelectSolicitud: (solicitud: Solicitud) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  solicitudes,
  onSelectSolicitud,
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const results = solicitudes.filter(s => 
    s.code.toLowerCase().includes(query.toLowerCase()) ||
    s.provider.toLowerCase().includes(query.toLowerCase()) ||
    s.rfc.toLowerCase().includes(query.toLowerCase()) ||
    s.concept.toLowerCase().includes(query.toLowerCase()) ||
    s.status.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-start justify-center pt-20 z-50 p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Search Input Bar */}
        <div className="px-4 py-3 border-b border-slate-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-slate-400 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Buscar por código (ej. S200000100081), proveedor, RFC o concepto..."
            className="w-full text-sm font-medium text-slate-800 placeholder-slate-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="p-1 text-slate-400 hover:text-slate-600">
              <X className="w-4 h-4" />
            </button>
          )}
          <button onClick={onClose} className="text-xs text-slate-400 hover:text-slate-600 font-semibold px-2 py-1 bg-slate-100 rounded-md">
            ESC
          </button>
        </div>

        {/* Search Results List */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1">
          {results.length === 0 ? (
            <div className="p-8 text-center text-slate-400 text-xs">
              No se encontraron resultados para "{query}"
            </div>
          ) : (
            results.map((sol) => (
              <div
                key={sol.id}
                onClick={() => {
                  onSelectSolicitud(sol);
                  onClose();
                }}
                className="p-3 rounded-xl hover:bg-orange-50/80 cursor-pointer transition-colors flex items-center justify-between gap-3 group border border-transparent hover:border-orange-200"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-slate-900">{sol.code}</span>
                      <span className="text-[10px] font-bold px-2 py-0.2 rounded bg-slate-100 text-slate-700">
                        {sol.status}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 truncate">{sol.provider} · ${sol.amountMXN.toLocaleString('es-MX')} MXN</p>
                  </div>
                </div>

                <div className="flex items-center gap-1 text-[10px] font-semibold text-slate-400 group-hover:text-orange-600">
                  <span>Abrir</span>
                  <CornerDownLeft className="w-3.5 h-3.5" />
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer info */}
        <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400">
          <span>{results.length} solicitudes coincidentes</span>
          <span>Presiona ESC para salir</span>
        </div>
      </div>
    </div>
  );
};
