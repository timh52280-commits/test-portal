import React from 'react';
import { 
  LayoutDashboard, 
  FileText, 
  Receipt, 
  RefreshCw, 
  SlidersHorizontal, 
  ChevronsLeftRight 
} from 'lucide-react';
import { ViewMode } from '../types';

interface SidebarProps {
  currentView: ViewMode;
  onChangeView: (view: ViewMode) => void;
  onOpenCustomize: () => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onChangeView,
  onOpenCustomize,
  collapsed,
  onToggleCollapse,
}) => {
  const menuItems = [
    { id: 'dashboard' as ViewMode, label: 'Dashboard', icon: LayoutDashboard },
    { id: 'solicitudes' as ViewMode, label: 'Mis solicitudes de pago', icon: FileText },
    { id: 'facturas' as ViewMode, label: 'Mis facturas', icon: Receipt },
    { id: 'contrapagos' as ViewMode, label: 'Contrapagos pendientes', icon: RefreshCw },
  ];

  return (
    <aside 
      id="app-sidebar"
      className={`${
        collapsed ? 'w-16' : 'w-64'
      } bg-slate-50/80 border-r border-slate-200/90 flex flex-col justify-between transition-all duration-200 shrink-0 select-none min-h-[calc(100vh-53px)]`}
    >
      <div className="p-3">
        {/* Navigation Section Title */}
        <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 tracking-wider uppercase px-3 mb-3">
          {!collapsed && <span>NAVEGACIÓN</span>}
          <button 
            type="button"
            onClick={onToggleCollapse}
            className="p-1 rounded hover:bg-slate-200/70 text-slate-500 transition-colors ml-auto"
            title={collapsed ? "Expandir navegación" : "Colapsar navegación"}
          >
            <ChevronsLeftRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onChangeView(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-semibold transition-all ${
                  isActive
                    ? 'bg-slate-200/80 text-slate-900 shadow-2xs font-bold'
                    : 'text-slate-600 hover:bg-slate-200/40 hover:text-slate-900'
                }`}
                title={collapsed ? item.label : undefined}
              >
                <Icon className={`w-4 h-4 shrink-0 ${isActive ? 'text-orange-600' : 'text-slate-500'}`} />
                {!collapsed && <span className="truncate">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Sidebar Action & Footer */}
      <div className="p-3 border-t border-slate-200/80 space-y-3">
        <button
          type="button"
          onClick={onOpenCustomize}
          className={`w-full flex items-center justify-center gap-2 py-2 px-3 bg-white hover:bg-slate-100 border border-slate-200/90 rounded-xl text-xs font-semibold text-slate-700 shadow-2xs transition-colors ${
            collapsed ? 'px-0' : ''
          }`}
          title="Customize Layout"
        >
          <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
          {!collapsed && <span>Customize Layout</span>}
        </button>

        <div className="flex items-center justify-between text-[11px] text-slate-400 font-medium px-2">
          {!collapsed && (
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              <span>Multiva</span>
            </div>
          )}
          <span className="bg-slate-200/70 text-slate-600 px-1.5 py-0.5 rounded text-[10px] font-mono">
            v5.0
          </span>
        </div>
      </div>
    </aside>
  );
};
