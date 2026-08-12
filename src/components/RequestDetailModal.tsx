import React from 'react';
import { X, CheckCircle, Clock, AlertTriangle, FileText, Download, UserCheck, ShieldCheck } from 'lucide-react';
import { Solicitud } from '../types';

interface RequestDetailModalProps {
  solicitud: Solicitud | null;
  onClose: () => void;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
}

export const RequestDetailModal: React.FC<RequestDetailModalProps> = ({
  solicitud,
  onClose,
  onApprove,
  onReject,
}) => {
  if (!solicitud) return null;

  const stages = [
    'Iniciación',
    'Validación',
    'Datos y proveedor',
    'Prorrateo y docs',
    'Autorización',
    'Contabilización'
  ];

  const currentStageIndex = stages.indexOf(solicitud.stage);

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-base font-extrabold text-slate-900">{solicitud.code}</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-orange-100 text-orange-800 border border-orange-200 uppercase">
                {solicitud.status}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">{solicitud.organization} · Creado {solicitud.timeAgo}</p>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Workflow Stage Progress */}
        <div className="px-6 py-3 bg-slate-100/60 border-b border-slate-200">
          <div className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2">Etapa del Proceso:</div>
          <div className="grid grid-cols-6 gap-1">
            {stages.map((st, idx) => {
              const isPast = idx < currentStageIndex;
              const isCurrent = idx === currentStageIndex;
              return (
                <div key={st} className="text-center">
                  <div 
                    className={`h-2 rounded-full mb-1 transition-colors ${
                      isPast ? 'bg-emerald-500' : isCurrent ? 'bg-orange-500 ring-2 ring-orange-200' : 'bg-slate-200'
                    }`}
                  />
                  <span className={`text-[10px] block truncate font-medium ${isCurrent ? 'text-orange-600 font-bold' : isPast ? 'text-slate-700' : 'text-slate-400'}`}>
                    {st}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Body Content */}
        <div className="p-6 space-y-4 max-h-[60vh] overflow-y-auto">
          {/* Key Metric Summary Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Monto Total</span>
              <p className="text-sm font-extrabold text-slate-900 font-mono mt-0.5">
                ${solicitud.amountMXN.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Facturas CFDI</span>
              <p className="text-sm font-bold text-slate-900 mt-0.5">
                {solicitud.invoicesCount} {solicitud.invoicesCount === 1 ? 'Factura' : 'Facturas'}
              </p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">RFC Proveedor</span>
              <p className="text-xs font-bold text-slate-800 font-mono mt-1">{solicitud.rfc}</p>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-[10px] font-bold text-slate-400 uppercase">Solicitante</span>
              <p className="text-xs font-bold text-slate-800 mt-1">{solicitud.requester}</p>
            </div>
          </div>

          {/* Provider & Concept details */}
          <div className="space-y-2">
            <div>
              <span className="text-xs font-bold text-slate-700">Proveedor Asignado:</span>
              <p className="text-xs text-slate-800 font-medium">{solicitud.provider}</p>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-700">Concepto de Pago:</span>
              <p className="text-xs text-slate-600 bg-slate-50 p-2.5 rounded-xl border border-slate-200">{solicitud.concept}</p>
            </div>
          </div>

          {/* Audit History */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-800">Historial de Auditoría & Flujo:</span>
            <div className="space-y-1.5">
              {solicitud.history.map((h, i) => (
                <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-slate-50 border border-slate-100 text-xs">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-3.5 h-3.5 text-orange-600" />
                    <span className="font-semibold text-slate-800">{h.action}</span>
                    <span className="text-slate-400">({h.user})</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-400">{h.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            className="px-3 py-1.5 bg-white border border-slate-300 hover:bg-slate-100 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1.5"
          >
            <Download className="w-3.5 h-3.5" />
            Descargar Expediente F880
          </button>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                onReject(solicitud.id);
                onClose();
              }}
              className="px-4 py-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl text-xs font-bold transition-colors"
            >
              Rechazar
            </button>
            <button
              type="button"
              onClick={() => {
                onApprove(solicitud.id);
                onClose();
              }}
              className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow-2xs transition-colors flex items-center gap-1"
            >
              <ShieldCheck className="w-4 h-4" />
              Aprobar Solicitud
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
