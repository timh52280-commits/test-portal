import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { STAGE_DISTRIBUTION_DATA } from '../mockData';

export const StageDistributionChart: React.FC = () => {
  const totalActivas = STAGE_DISTRIBUTION_DATA.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div id="stage-distribution-card" className="bg-white rounded-2xl p-4 border border-slate-200/90 shadow-2xs flex flex-col justify-between h-full">
      {/* Card Header */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
          DISTRIBUCIÓN POR ETAPA
        </h3>
        <span className="text-xs font-bold text-slate-500">
          {totalActivas} activas
        </span>
      </div>

      {/* Grid containing Legend and Donut Chart */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center flex-1 my-1">
        {/* Legend */}
        <div className="space-y-1.5 text-xs">
          {STAGE_DISTRIBUTION_DATA.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <span 
                  className="w-2.5 h-2.5 rounded-full shrink-0" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-slate-600 truncate font-medium text-[11px]">
                  {item.name}
                </span>
              </div>
              <span className="font-semibold text-slate-800 text-[11px]">
                {item.value}
              </span>
            </div>
          ))}
        </div>

        {/* Recharts Donut */}
        <div className="h-44 w-full flex items-center justify-center relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={STAGE_DISTRIBUTION_DATA}
                cx="50%"
                cy="50%"
                innerRadius={42}
                outerRadius={68}
                paddingAngle={3}
                dataKey="value"
                strokeWidth={0}
              >
                {STAGE_DISTRIBUTION_DATA.map((entry) => (
                  <Cell key={`cell-${entry.name}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(val: number) => [`${val} solicitudes`, 'Total']}
                contentStyle={{ 
                  borderRadius: '12px', 
                  border: '1px solid #E2E8F0', 
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  fontSize: '12px' 
                }}
              />
            </PieChart>
          </ResponsiveContainer>

          {/* Center text in donut */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            <span className="text-lg font-extrabold text-slate-800">{totalActivas}</span>
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-bold">Total</span>
          </div>
        </div>
      </div>
    </div>
  );
};
