import React, { useState } from 'react';
import { Plus, Search, Filter, Download, ArrowUpDown, Eye, CheckCircle, AlertTriangle } from 'lucide-react';
import { Solicitud } from '../types';

interface SolicitudesViewProps {
  solicitudes: Solicitud[];
  onSelectSolicitud: (solicitud: Solicitud) => void;
  onOpenNewRequest: () => void;
}

export const SolicitudesView: React.FC<SolicitudesViewProps> = ({
  solicitudes,
  onSelectSolicitud,
  onOpenNewRequest,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');

  const filtered = solicitudes.filter(s => {
    const matchesSearch = 
      s.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      s.rfc.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || s.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-4">
      {/* Top Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Mis Solicitudes de Pago</h1>
          <p className="text-xs text-slate-500">Gestión de comprobantes F880, validación CFDI y autorización de pago.</p>
        </div>
        <button
          type="button"
          onClick={onOpenNewRequest}
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-2xs transition-all"
        >
          <Plus className="w-4 h-4" />
          Nueva Solicitud F880
        </button>
      </div>

      {/* Filters & Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 flex-1 max-w-md bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por folio, proveedor o RFC..."
            className="w-full text-xs bg-transparent focus:outline-none text-slate-800"
          />
        </div>

        <div className="flex items-center gap-2 text-xs">
          <Filter className="w-4 h-4 text-slate-400" />
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5 text-xs text-slate-700 font-medium focus:outline-none"
          >
            <option value="all">Todos los estados ({solicitudes.length})</option>
            <option value="EN AUTORIZACIÓN PRIMER NIVEL">En Autorización Primer Nivel</option>
            <option value="EN AUTORIZACIÓN SEGUNDO NIVEL">En Autorización Segundo Nivel</option>
            <option value="SELECCIONANDO PROVEEDOR">Seleccionando Proveedor</option>
            <option value="REGLAS RECHAZADAS">Reglas Rechazadas</option>
            <option value="VALIDACIÓN DOCUMENTAL">Validación Documental</option>
            <option value="APROBADA Y CONTABILIZADA">Aprobada y Contabilizada</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 uppercase font-bold text-[10px] text-slate-400 tracking-wider">
              <tr>
                <th className="p-3">Código / Folio</th>
                <th className="p-3">Estado</th>
                <th className="p-3">Proveedor / RFC</th>
                <th className="p-3">Organización</th>
                <th className="p-3">Monto Total</th>
                <th className="p-3">Etapa</th>
                <th className="p-3 text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((sol) => (
                <tr 
                  key={sol.id} 
                  onClick={() => onSelectSolicitud(sol)}
                  className="hover:bg-slate-50/80 cursor-pointer transition-colors"
                >
                  <td className="p-3 font-mono font-bold text-slate-900">
                    {sol.code}
                    {sol.urgent && (
                      <span className="ml-2 text-[9px] bg-rose-100 text-rose-700 font-bold px-1.5 py-0.5 rounded uppercase">
                        Urgente
                      </span>
                    )}
                  </td>
                  <td className="p-3">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full border bg-orange-50 text-orange-800 border-orange-200 uppercase">
                      {sol.status}
                    </span>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-slate-800">{sol.provider}</div>
                    <div className="font-mono text-[11px] text-slate-400">{sol.rfc}</div>
                  </td>
                  <td className="p-3 text-slate-600">{sol.organization}</td>
                  <td className="p-3 font-mono font-bold text-slate-900">
                    ${sol.amountMXN.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                  </td>
                  <td className="p-3">
                    <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold text-[11px]">
                      {sol.stage}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSolicitud(sol);
                      }}
                      className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-lg transition-colors font-bold flex items-center gap-1 ml-auto"
                    >
                      <Eye className="w-4 h-4" />
                      Detalles
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
