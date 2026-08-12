import React from 'react';
import { RefreshCw, CheckCircle, Clock, CreditCard, Building } from 'lucide-react';
import { Contrapago } from '../types';

interface ContrapagosViewProps {
  contrapagos: Contrapago[];
}

export const ContrapagosView: React.FC<ContrapagosViewProps> = ({ contrapagos }) => {
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Contrapagos Pendientes</h1>
          <p className="text-xs text-slate-500">Programación de dispersión bancaria y recepción de notas de contra-pago.</p>
        </div>
        <button 
          type="button"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-2xs"
        >
          <RefreshCw className="w-4 h-4" />
          Sincronizar Lote Bancario
        </button>
      </div>

      {/* Cards list */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {contrapagos.map((cp) => (
          <div key={cp.id} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-2xs space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs font-bold text-slate-900">{cp.folio}</span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                cp.status === 'PAGADO' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                cp.status === 'EN PROCESO PAGO' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-amber-100 text-amber-800 border-amber-200'
              }`}>
                {cp.status}
              </span>
            </div>

            <div>
              <div className="text-xs font-bold text-slate-800">{cp.provider}</div>
              <div className="text-[11px] text-slate-500 flex items-center gap-1 mt-1">
                <Building className="w-3.5 h-3.5 text-slate-400" />
                CLABE: <span className="font-mono">{cp.bankAccount}</span>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Vencimiento</span>
                <span className="text-xs font-semibold text-slate-700 font-mono">{cp.dueDate}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase font-bold block">Monto a Dispersar</span>
                <span className="text-sm font-extrabold text-slate-900 font-mono">
                  ${cp.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
