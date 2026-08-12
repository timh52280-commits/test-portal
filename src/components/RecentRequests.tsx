import React, { useState } from 'react';
import { Filter, ArrowRight, Layers, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { Solicitud, SolicitudStatus } from '../types';

interface RecentRequestsProps {
  solicitudes: Solicitud[];
  onSelectSolicitud: (solicitud: Solicitud) => void;
}

export const RecentRequests: React.FC<RecentRequestsProps> = ({
  solicitudes,
  onSelectSolicitud,
}) => {
  const [filterMode, setFilterMode] = useState<'all' | 'autorizacion' | 'rechazadas'>('all');

  const filtered = solicitudes.filter(s => {
    if (filterMode === 'autorizacion') return s.status.includes('AUTORIZACIÓN');
    if (filterMode === 'rechazadas') return s.status.includes('RECHAZADAS');
    return true;
  }).slice(0, 5);

  const getStatusBadgeClass = (status: SolicitudStatus) => {
    switch (status) {
      case 'EN AUTORIZACIÓN SEGUNDO NIVEL':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'EN AUTORIZACIÓN PRIMER NIVEL':
        return 'bg-teal-100 text-teal-800 border-teal-200';
      case 'SELECCIONANDO PROVEEDOR':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'REGLAS RECHAZADAS':
        return 'bg-amber-100 text-amber-900 border-amber-300';
      case 'VALIDACIÓN DOCUMENTAL':
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'APROBADA Y CONTABILIZADA':
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  return (
    <div id="recent-requests-card" className="bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs flex flex-col h-full">
      {/* Header and Controls */}
      <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
        <h3 className="text-xs font-bold text-slate-800 tracking-tight">Mis últimas solicitudes</h3>
        
        <div className="flex items-center gap-1.5 text-[11px]">
          <button 
            type="button"
            onClick={() => setFilterMode(filterMode === 'all' ? 'autorizacion' : 'all')}
            className={`px-2 py-1 rounded-lg border flex items-center gap-1 font-medium transition-colors ${
              filterMode === 'autorizacion' ? 'bg-orange-50 border-orange-300 text-orange-700' : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
            }`}
          >
            <Filter className="w-3 h-3" />
            <span>Filter</span>
          </button>

          <button 
            type="button"
            onClick={() => setFilterMode('all')}
            className="px-2 py-1 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-600 font-medium transition-colors"
          >
            Quick-select
          </button>

          <button 
            type="button"
            className="px-2 py-1 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-600 font-medium transition-colors hidden sm:inline"
          >
            Flap
          </button>

          <button 
            type="button"
            className="px-2 py-1 bg-slate-50 border border-slate-200 hover:bg-slate-100 rounded-lg text-slate-600 font-medium transition-colors"
          >
            Glco ({solicitudes.length})
          </button>
        </div>
      </div>

      {/* List of solicitudes */}
      <div className="space-y-2 flex-1">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onSelectSolicitud(item)}
            className="p-2.5 rounded-xl border border-slate-100 hover:border-slate-300 hover:bg-slate-50/70 transition-all cursor-pointer flex items-center justify-between gap-2 group"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <input 
                type="checkbox" 
                className="w-3.5 h-3.5 rounded border-slate-300 text-orange-600 focus:ring-orange-500 cursor-pointer" 
                onClick={(e) => e.stopPropagation()}
              />
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-xs font-bold text-slate-900">{item.code}</span>
                  <span className={`text-[9px] font-bold px-2 py-0.5 rounded-full border uppercase tracking-wider ${getStatusBadgeClass(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5">
                  {item.organization} · {item.timeAgo}
                </div>
              </div>
            </div>

            <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-slate-600 transition-colors shrink-0" />
          </div>
        ))}
      </div>
    </div>
  );
};
