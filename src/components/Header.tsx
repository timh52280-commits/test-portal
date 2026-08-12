import React, { useState } from 'react';
import { Search, Bell, Sparkles, X, Plus, FileText, ChevronRight } from 'lucide-react';
import { FilterTag, UrgentTask, ViewMode } from '../types';

interface HeaderProps {
  urgentTasks: UrgentTask[];
  onOpenSearch: () => void;
  onOpenNewRequest: () => void;
  onChangeView: (view: ViewMode) => void;
  activeSearchQuery: string;
}

export const Header: React.FC<HeaderProps> = ({
  urgentTasks,
  onOpenSearch,
  onOpenNewRequest,
  onChangeView,
}) => {
  const [showUrgentTasks, setShowUrgentTasks] = useState(false);
  const [tags, setTags] = useState<FilterTag[]>([
    { id: '1', label: 'Provider', value: 'All' },
    { id: '2', label: 'Amount', value: 'Any' },
    { id: '3', label: 'Date', value: 'This month' },
  ]);

  const removeTag = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setTags(tags.filter(t => t.id !== id));
  };

  return (
    <header id="app-header" className="bg-white border-b border-slate-200 px-4 py-2.5 flex items-center justify-between sticky top-0 z-40 shadow-xs">
      {/* Brand Logo */}
      <div className="flex items-center gap-3 w-56">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onChangeView('dashboard')}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-500 to-orange-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
            M
          </div>
          <span className="text-xl font-bold tracking-tight text-slate-800">Multiva</span>
        </div>
      </div>

      {/* Center Search Bar with Filter Tags */}
      <div 
        onClick={onOpenSearch}
        className="flex-1 max-w-xl bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl px-3 py-1.5 flex items-center gap-2 cursor-pointer transition-all shadow-2xs group"
      >
        <Search className="w-4 h-4 text-slate-400 group-hover:text-slate-600 shrink-0" />
        
        <div className="flex items-center gap-1.5 flex-wrap overflow-hidden py-0.5">
          {tags.map(tag => (
            <span key={tag.id} className="inline-flex items-center gap-1 bg-white border border-slate-200 text-slate-700 text-xs px-2 py-0.5 rounded-md font-medium shadow-2xs">
              {tag.label}
              <button 
                type="button"
                onClick={(e) => removeTag(tag.id, e)}
                className="hover:text-orange-600 text-slate-400 p-0.5"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <span className="text-xs text-slate-400 hidden sm:inline ml-1">Buscar por folio, proveedor o RFC...</span>
        </div>

        <div className="ml-auto text-[11px] font-mono font-medium text-slate-400 bg-slate-200/60 px-2 py-0.5 rounded-md shrink-0">
          (Ctrl+K)
        </div>
      </div>

      {/* Right Action Icons & Profile */}
      <div className="flex items-center gap-2 sm:gap-3 w-56 justify-end relative">
        {/* Urgent Tasks Bell Trigger */}
        <div className="relative">
          <button
            id="urgent-tasks-bell"
            type="button"
            onClick={() => setShowUrgentTasks(!showUrgentTasks)}
            className={`p-2 rounded-lg transition-colors relative ${showUrgentTasks ? 'bg-orange-50 text-orange-600' : 'text-slate-600 hover:bg-slate-100'}`}
            title="Tareas Urgentes"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-red-500 ring-2 ring-white animate-pulse" />
          </button>

          {/* Urgent Tasks Overlay Popover (matches exact screenshot design) */}
          {showUrgentTasks && (
            <div id="urgent-tasks-popover" className="absolute right-0 top-12 w-80 bg-white rounded-2xl shadow-xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-150">
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-slate-50/50">
                <span className="font-semibold text-slate-800 text-sm">Urgent Tasks</span>
                <button 
                  onClick={() => setShowUrgentTasks(false)}
                  className="text-slate-400 hover:text-slate-600 p-1 rounded-md hover:bg-slate-100"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="p-2 space-y-1">
                {/* Task 1 */}
                <div 
                  onClick={() => {
                    setShowUrgentTasks(false);
                    onOpenNewRequest();
                  }}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/70 cursor-pointer group transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    <Plus className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                      Nueva solicitud
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      Banco Multiva · hace 1 d
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 self-center" />
                </div>

                {/* Task 2 */}
                <div 
                  onClick={() => {
                    setShowUrgentTasks(false);
                    onChangeView('solicitudes');
                  }}
                  className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-orange-50/70 cursor-pointer group transition-colors"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-bold text-slate-800 group-hover:text-orange-600 transition-colors">
                      Mis solicitudes de pago
                    </div>
                    <div className="text-[11px] text-slate-500 truncate">
                      Estado, archivos y siguiente paso
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-orange-500 self-center" />
                </div>
              </div>

              <div className="p-2 bg-slate-50 border-t border-slate-100 text-center">
                <button 
                  onClick={() => {
                    setShowUrgentTasks(false);
                    onChangeView('solicitudes');
                  }}
                  className="text-xs text-orange-600 hover:text-orange-700 font-semibold py-1 w-full"
                >
                  Ver todas las alertas (5)
                </button>
              </div>
            </div>
          )}
        </div>

        {/* AI Assistant Icon */}
        <button 
          type="button"
          className="p-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"
          title="Asistente Multiva AI"
        >
          <Sparkles className="w-5 h-5 text-amber-500" />
        </button>

        {/* User Profile Badge */}
        <div className="w-8 h-8 rounded-full bg-orange-500 text-white font-bold text-xs flex items-center justify-center ring-2 ring-orange-200 cursor-pointer shadow-xs">
          G
        </div>
      </div>
    </header>
  );
};
