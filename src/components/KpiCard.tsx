import React from 'react';
import { ExternalLink, AlertTriangle, CheckCircle, Grid, Shield, FileText } from 'lucide-react';

export interface KpiCardProps {
  title: string;
  value: string | number;
  subtitle: string;
  type: 'solicitudes_activas' | 'requieren_accion' | 'autorizadas' | 'polizas' | 'proximas' | 'monto';
  onClick?: () => void;
}

export const KpiCard: React.FC<KpiCardProps> = ({
  title,
  value,
  subtitle,
  type,
  onClick,
}) => {
  const renderTopIcon = () => {
    switch (type) {
      case 'solicitudes_activas':
        return (
          <div className="flex items-center gap-1.5 text-slate-400">
            <ExternalLink className="w-3.5 h-3.5" />
            <div className="w-6 h-6 rounded-md bg-slate-100 flex items-center justify-center text-slate-500">
              <FileText className="w-3.5 h-3.5" />
            </div>
          </div>
        );
      case 'requieren_accion':
        return (
          <div className="flex items-center gap-1.5">
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            <div className="w-6 h-6 rounded-md bg-amber-100 text-amber-700 flex items-center justify-center">
              <AlertTriangle className="w-3.5 h-3.5" />
            </div>
          </div>
        );
      case 'autorizadas':
        return (
          <div className="w-6 h-6 rounded-md bg-emerald-100 text-emerald-700 flex items-center justify-center">
            <CheckCircle className="w-3.5 h-3.5" />
          </div>
        );
      case 'polizas':
        return (
          <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center">
            <Grid className="w-3.5 h-3.5" />
          </div>
        );
      case 'proximas':
        return (
          <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center">
            <Shield className="w-3.5 h-3.5" />
          </div>
        );
      case 'monto':
        return (
          <div className="w-6 h-6 rounded-md bg-slate-100 text-slate-600 flex items-center justify-center">
            <FileText className="w-3.5 h-3.5" />
          </div>
        );
    }
  };

  const renderVisualArea = () => {
    if (type === 'solicitudes_activas' || type === 'requieren_accion') {
      // Orange gradient wave sparkline
      return (
        <div className="w-24 h-10 ml-auto">
          <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="orangeGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#F97316" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#F97316" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 35 Q 25 10, 50 25 T 100 5 L 100 40 L 0 40 Z"
              fill="url(#orangeGrad)"
            />
            <path
              d="M 0 35 Q 25 10, 50 25 T 100 5"
              fill="none"
              stroke="#EA580C"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );
    }

    if (type === 'autorizadas' || type === 'monto') {
      // Green gradient wave sparkline
      return (
        <div className="w-24 h-10 ml-auto">
          <svg viewBox="0 0 100 40" className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="greenGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path
              d="M 0 30 Q 30 38, 60 15 T 100 8 L 100 40 L 0 40 Z"
              fill="url(#greenGrad)"
            />
            <path
              d="M 0 30 Q 30 38, 60 15 T 100 8"
              fill="none"
              stroke="#059669"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </svg>
        </div>
      );
    }

    // Straight line for polizas & proximas
    return (
      <div className="w-24 ml-auto flex items-center justify-end">
        <div className="w-full h-1 bg-amber-800/40 rounded-full" />
      </div>
    );
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs hover:shadow-xs transition-all cursor-pointer flex flex-col justify-between"
    >
      {/* Card Header */}
      <div className="flex items-center justify-between mb-2">
        <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
          {title}
        </span>
        {renderTopIcon()}
      </div>

      {/* Main Content & Graphic */}
      <div className="flex items-end justify-between gap-2 mt-1">
        <div>
          <div className="text-2xl font-extrabold text-slate-900 tracking-tight">
            {value}
          </div>
          <div className="text-[11px] text-slate-500 font-medium mt-0.5">
            {subtitle}
          </div>
        </div>

        {renderVisualArea()}
      </div>
    </div>
  );
};
