import React from 'react';
import { X, Check, RotateCcw } from 'lucide-react';

interface CustomizeLayoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  visibleWidgets: Record<string, boolean>;
  onToggleWidget: (key: string) => void;
  onResetLayout: () => void;
}

export const CustomizeLayoutModal: React.FC<CustomizeLayoutModalProps> = ({
  isOpen,
  onClose,
  visibleWidgets,
  onToggleWidget,
  onResetLayout,
}) => {
  if (!isOpen) return null;

  const widgetLabels: Record<string, string> = {
    quickActions: 'Acciones Rápidas (F880 & Mis Solicitudes)',
    recentRequests: 'Mis últimas solicitudes (Lista de seguimiento)',
    kpiStatRow1: 'Tarjetas KPI de Solicitudes y Autorización (Fila 1)',
    kpiStatRow2: 'Monto en Autorización y Alertas (Fila 2)',
    stageDistribution: 'Gráfica de Distribución por Etapa (Donut Chart)',
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-800">Customize Dashboard Layout</h3>
          <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6 space-y-3">
          <p className="text-xs text-slate-500 mb-4">
            Activa o desactiva la visibilidad de los módulos del portal para personalizar tu vista principal:
          </p>

          {Object.keys(widgetLabels).map((key) => {
            const isVisible = visibleWidgets[key] !== false;
            return (
              <div 
                key={key}
                onClick={() => onToggleWidget(key)}
                className="flex items-center justify-between p-3 rounded-xl border border-slate-200 hover:bg-slate-50 cursor-pointer transition-colors"
              >
                <span className="text-xs font-semibold text-slate-800">{widgetLabels[key]}</span>
                <div className={`w-5 h-5 rounded-md flex items-center justify-center text-white transition-colors ${
                  isVisible ? 'bg-orange-600' : 'bg-slate-200'
                }`}>
                  {isVisible && <Check className="w-3.5 h-3.5" />}
                </div>
              </div>
            );
          })}
        </div>

        <div className="px-6 py-3 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onResetLayout}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Restablecer por defecto
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-bold text-xs rounded-xl shadow-2xs"
          >
            Guardar Cambios
          </button>
        </div>
      </div>
    </div>
  );
};
