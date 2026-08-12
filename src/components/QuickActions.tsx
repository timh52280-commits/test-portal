import React from 'react';
import { Plus, FileText } from 'lucide-react';
import { ViewMode } from '../types';

interface QuickActionsProps {
  onOpenNewRequest: () => void;
  onChangeView: (view: ViewMode) => void;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onOpenNewRequest,
  onChangeView,
}) => {
  return (
    <div id="quick-actions-card" className="bg-slate-100/60 rounded-2xl p-4 border border-slate-200/80 shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">Acciones rápidas</h3>
          <p className="text-[11px] text-slate-500">Las disponibles segun los permisos</p>
        </div>
        <span className="bg-slate-200 text-slate-600 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
          1 ROL
        </span>
      </div>

      {/* Action Items List */}
      <div className="space-y-2.5">
        {/* Action 1 */}
        <div className="bg-white/80 hover:bg-white border border-slate-200/90 rounded-xl p-3 flex items-center justify-between gap-3 shadow-2xs transition-all">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-orange-500 text-white flex items-center justify-center font-bold shrink-0 shadow-2xs">
              <Plus className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">Nueva solicitud</h4>
              <p className="text-[11px] text-slate-500 truncate">Inicia un F880 - CFDI único a múltiples facturas</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onOpenNewRequest}
            className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-2xs transition-colors shrink-0"
          >
            Nueva solicitud
          </button>
        </div>

        {/* Action 2 */}
        <div className="bg-white/80 hover:bg-white border border-slate-200/90 rounded-xl p-3 flex items-center justify-between gap-3 shadow-2xs transition-all">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center font-bold shrink-0 border border-amber-200">
              <FileText className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <h4 className="text-xs font-bold text-slate-900 truncate">Mis solicitudes de pago</h4>
              <p className="text-[11px] text-slate-500 truncate">Estado, archivos y siguiente paso</p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => onChangeView('solicitudes')}
            className="bg-orange-600 hover:bg-orange-700 active:bg-orange-800 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-2xs transition-colors shrink-0"
          >
            Mis solicitudes de pago
          </button>
        </div>
      </div>
    </div>
  );
};
