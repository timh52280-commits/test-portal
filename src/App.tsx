/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { QuickActions } from './components/QuickActions';
import { RecentRequests } from './components/RecentRequests';
import { KpiCard } from './components/KpiCard';
import { StageDistributionChart } from './components/StageDistributionChart';
import { NewRequestModal } from './components/NewRequestModal';
import { RequestDetailModal } from './components/RequestDetailModal';
import { SearchModal } from './components/SearchModal';
import { CustomizeLayoutModal } from './components/CustomizeLayoutModal';
import { SolicitudesView } from './components/SolicitudesView';
import { FacturasView } from './components/FacturasView';
import { ContrapagosView } from './components/ContrapagosView';

import { 
  INITIAL_SOLICITUDES, 
  INITIAL_URGENT_TASKS, 
  INITIAL_FACTURAS, 
  INITIAL_CONTRAPAGOS 
} from './mockData';
import { ViewMode, Solicitud } from './types';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('dashboard');
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(INITIAL_SOLICITUDES);
  const [urgentTasks, setUrgentTasks] = useState(INITIAL_URGENT_TASKS);
  const [facturas] = useState(INITIAL_FACTURAS);
  const [contrapagos] = useState(INITIAL_CONTRAPAGOS);

  // Modals state
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCustomizeOpen, setIsCustomizeOpen] = useState(false);
  const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(null);

  // Layout states
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [visibleWidgets, setVisibleWidgets] = useState<Record<string, boolean>>({
    quickActions: true,
    recentRequests: true,
    kpiStatRow1: true,
    kpiStatRow2: true,
    stageDistribution: true,
  });

  // Global Ctrl+K hotkey
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleCreateSolicitud = (newSol: Solicitud) => {
    setSolicitudes([newSol, ...solicitudes]);
  };

  const handleApproveSolicitud = (id: string) => {
    setSolicitudes(solicitudes.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: 'APROBADA Y CONTABILIZADA',
          stage: 'Contabilización',
          history: [
            ...s.history,
            { date: new Date().toLocaleString(), action: 'Solicitud aprobada y enviada a contabilizar', user: 'Director Tesorería' }
          ]
        };
      }
      return s;
    }));
  };

  const handleRejectSolicitud = (id: string) => {
    setSolicitudes(solicitudes.map(s => {
      if (s.id === id) {
        return {
          ...s,
          status: 'REGLAS RECHAZADAS',
          stage: 'Validación',
          history: [
            ...s.history,
            { date: new Date().toLocaleString(), action: 'Rechazada por observaciones presupuestales', user: 'Revisor Tesorería' }
          ]
        };
      }
      return s;
    }));
  };

  // Calculate live KPI metrics
  const activasCount = solicitudes.filter(s => s.status !== 'APROBADA Y CONTABILIZADA').length;
  const requierenAccionCount = solicitudes.filter(s => s.status === 'REGLAS RECHAZADAS' || s.status === 'VALIDACIÓN DOCUMENTAL').length;
  const autorizadasCount = solicitudes.filter(s => s.status === 'APROBADA Y CONTABILIZADA').length;
  const montoEnAutorizacion = solicitudes
    .filter(s => s.status.includes('AUTORIZACIÓN'))
    .reduce((acc, curr) => acc + curr.amountMXN, 0);

  return (
    <div className="min-h-screen bg-slate-100/70 text-slate-800 flex flex-col font-sans antialiased selection:bg-orange-500 selection:text-white">
      {/* Top Bar Header */}
      <Header
        urgentTasks={urgentTasks}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenNewRequest={() => setIsNewRequestOpen(true)}
        onChangeView={setCurrentView}
        activeSearchQuery=""
      />

      {/* Main Container */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Navigation Sidebar */}
        <Sidebar
          currentView={currentView}
          onChangeView={setCurrentView}
          onOpenCustomize={() => setIsCustomizeOpen(true)}
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        />

        {/* Dynamic Content View */}
        <main className="flex-1 p-4 sm:p-6 overflow-y-auto max-w-7xl mx-auto w-full space-y-5">
          {currentView === 'solicitudes' && (
            <SolicitudesView
              solicitudes={solicitudes}
              onSelectSolicitud={setSelectedSolicitud}
              onOpenNewRequest={() => setIsNewRequestOpen(true)}
            />
          )}

          {currentView === 'facturas' && (
            <FacturasView facturas={facturas} />
          )}

          {currentView === 'contrapagos' && (
            <ContrapagosView contrapagos={contrapagos} />
          )}

          {currentView === 'dashboard' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              {/* User Greeting Banner */}
              <div>
                <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                  Hola, Solicitante <span className="inline-block animate-bounce">👋</span>
                </h1>
                <p className="text-xs sm:text-sm text-slate-500 font-medium">
                  Bienvenido al Portal Multiva
                </p>
              </div>

              {/* Row 1: Quick Actions & Recent Requests */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
                {visibleWidgets.quickActions && (
                  <div className="lg:col-span-6">
                    <QuickActions
                      onOpenNewRequest={() => setIsNewRequestOpen(true)}
                      onChangeView={setCurrentView}
                    />
                  </div>
                )}

                {visibleWidgets.recentRequests && (
                  <div className="lg:col-span-6">
                    <RecentRequests
                      solicitudes={solicitudes}
                      onSelectSolicitud={setSelectedSolicitud}
                    />
                  </div>
                )}
              </div>

              {/* Row 2: Four Top KPI Cards */}
              {visibleWidgets.kpiStatRow1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <KpiCard
                    title="SOLICITUDES ACTIVAS"
                    value={activasCount}
                    subtitle="5 en autorización"
                    type="solicitudes_activas"
                    onClick={() => setCurrentView('solicitudes')}
                  />
                  <KpiCard
                    title="REQUIEREN MI ACCIÓN"
                    value={requierenAccionCount}
                    subtitle="Corrige y reenvía"
                    type="requieren_accion"
                    onClick={() => setCurrentView('solicitudes')}
                  />
                  <KpiCard
                    title="AUTORIZADAS (7 DÍAS)"
                    value={autorizadasCount || 6}
                    subtitle="+3 vs semana previa"
                    type="autorizadas"
                    onClick={() => setCurrentView('solicitudes')}
                  />
                  <KpiCard
                    title="PÓLIZAS GENERADAS"
                    value={0}
                    subtitle="Histórico"
                    type="polizas"
                  />
                </div>
              )}

              {/* Row 3: Bottom Stat Cards & Stage Distribution Chart */}
              {visibleWidgets.kpiStatRow2 && (
                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                  <div className="md:col-span-4 flex flex-col justify-between gap-4">
                    <KpiCard
                      title="PRÓXIMAS A VENCER"
                      value={0}
                      subtitle="Plazo de 15 días - ninguna urgente"
                      type="proximas"
                    />

                    <KpiCard
                      title="MONTO EN AUTORIZACIÓN"
                      value={`MXN ${montoEnAutorizacion.toLocaleString('es-MX', { maximumFractionDigits: 0 })}`}
                      subtitle="5 solicitudes esperando autorización"
                      type="monto"
                      onClick={() => setCurrentView('solicitudes')}
                    />
                  </div>

                  {visibleWidgets.stageDistribution && (
                    <div className="md:col-span-8">
                      <StageDistributionChart />
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </main>
      </div>

      {/* Interactive Modals */}
      <NewRequestModal
        isOpen={isNewRequestOpen}
        onClose={() => setIsNewRequestOpen(false)}
        onSubmit={handleCreateSolicitud}
      />

      <RequestDetailModal
        solicitud={selectedSolicitud}
        onClose={() => setSelectedSolicitud(null)}
        onApprove={handleApproveSolicitud}
        onReject={handleRejectSolicitud}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        solicitudes={solicitudes}
        onSelectSolicitud={setSelectedSolicitud}
      />

      <CustomizeLayoutModal
        isOpen={isCustomizeOpen}
        onClose={() => setIsCustomizeOpen(false)}
        visibleWidgets={visibleWidgets}
        onToggleWidget={(key) => setVisibleWidgets(prev => ({ ...prev, [key]: !prev[key] }))}
        onResetLayout={() => setVisibleWidgets({
          quickActions: true,
          recentRequests: true,
          kpiStatRow1: true,
          kpiStatRow2: true,
          stageDistribution: true,
        })}
      />
    </div>
  );
}
