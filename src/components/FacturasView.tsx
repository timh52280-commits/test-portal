import React, { useState } from 'react';
import { Upload, Search, FileCode, Download, CheckCircle, XCircle } from 'lucide-react';
import { Factura } from '../types';

interface FacturasViewProps {
  facturas: Factura[];
}

export const FacturasView: React.FC<FacturasViewProps> = ({ facturas }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filtered = facturas.filter(f => 
    f.folio.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
    f.uuid.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs">
        <div>
          <h1 className="text-lg font-bold text-slate-900">Mis Facturas CFDI</h1>
          <p className="text-xs text-slate-500">Buzón de comprobantes fiscales digitales vinculados al portal Multiva.</p>
        </div>
        <button 
          type="button"
          className="bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-2xs"
        >
          <Upload className="w-4 h-4" />
          Cargar CFDI XML/PDF
        </button>
      </div>

      {/* Search */}
      <div className="bg-white p-4 rounded-2xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
        <div className="flex items-center gap-2 flex-1 max-w-md bg-slate-50 border border-slate-200 rounded-xl px-3 py-1.5">
          <Search className="w-4 h-4 text-slate-400 shrink-0" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Buscar por UUID SAT, folio o proveedor..."
            className="w-full text-xs bg-transparent focus:outline-none text-slate-800"
          />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-slate-200/90 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 border-b border-slate-200 uppercase font-bold text-[10px] text-slate-400 tracking-wider">
              <tr>
                <th className="p-3">Folio / UUID SAT</th>
                <th className="p-3">Proveedor / RFC</th>
                <th className="p-3">Fecha</th>
                <th className="p-3">Monto Net / IVA</th>
                <th className="p-3">Estado SAT</th>
                <th className="p-3 text-right">Archivos</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {filtered.map((f) => (
                <tr key={f.id} className="hover:bg-slate-50/80">
                  <td className="p-3">
                    <div className="font-mono font-bold text-slate-900">{f.folio}</div>
                    <div className="font-mono text-[10px] text-slate-400 truncate max-w-xs">{f.uuid}</div>
                  </td>
                  <td className="p-3">
                    <div className="font-bold text-slate-800">{f.provider}</div>
                    <div className="font-mono text-[11px] text-slate-400">{f.rfc}</div>
                  </td>
                  <td className="p-3 font-mono text-slate-600">{f.date}</td>
                  <td className="p-3 font-mono font-bold text-slate-900">
                    ${f.amount.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                    <div className="text-[10px] font-normal text-slate-400">IVA: ${f.tax.toLocaleString('es-MX')}</div>
                  </td>
                  <td className="p-3">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      f.status === 'VÁLIDA' ? 'bg-emerald-100 text-emerald-800 border-emerald-200' :
                      f.status === 'PROCESADA' ? 'bg-blue-100 text-blue-800 border-blue-200' : 'bg-rose-100 text-rose-800 border-rose-200'
                    }`}>
                      {f.status}
                    </span>
                  </td>
                  <td className="p-3 text-right">
                    <button className="p-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 text-xs font-bold inline-flex items-center gap-1">
                      <Download className="w-3.5 h-3.5" />
                      XML/PDF
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
