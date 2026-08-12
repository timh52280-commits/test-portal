import React, { useState } from 'react';
import { X, Upload, CheckCircle2, ArrowRight, ArrowLeft, FileCode, Plus } from 'lucide-react';
import { Solicitud } from '../types';

interface NewRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (newSolicitud: Solicitud) => void;
}

export const NewRequestModal: React.FC<NewRequestModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [step, setStep] = useState(1);
  const [provider, setProvider] = useState('');
  const [rfc, setRfc] = useState('');
  const [concept, setConcept] = useState('');
  const [amount, setAmount] = useState('');
  const [invoicesCount, setInvoicesCount] = useState(1);
  const [urgent, setUrgent] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(['CFDI_001_F880.xml']);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedFiles([...uploadedFiles, e.target.files[0].name]);
    }
  };

  const handleFinish = (e: React.FormEvent) => {
    e.preventDefault();
    const newCode = `S200000100${Math.floor(100 + Math.random() * 900)}`;
    const newRecord: Solicitud = {
      id: Date.now().toString(),
      code: newCode,
      status: 'EN AUTORIZACIÓN PRIMER NIVEL',
      organization: 'Banco Multiva',
      timeAgo: 'hace un momento',
      date: new Date().toISOString().split('T')[0],
      provider: provider || 'Proveedor Registrado S.A.',
      rfc: rfc || 'PRV120304990',
      amountMXN: parseFloat(amount) || 15400.00,
      invoicesCount: invoicesCount,
      concept: concept || 'Solicitud F880 - CFDI consolidado',
      requester: 'Solicitante Activo',
      urgent: urgent,
      stage: 'Iniciación',
      history: [
        { date: new Date().toLocaleString(), action: 'Solicitud creada con F880', user: 'Solicitante' }
      ]
    };

    onSubmit(newRecord);
    onClose();
    setStep(1);
  };

  return (
    <div className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-xl w-full border border-slate-200 shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Header */}
        <div className="bg-slate-50 px-6 py-4 border-b border-slate-200 flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold text-orange-600 bg-orange-100 border border-orange-200 px-2 py-0.5 rounded-md uppercase tracking-wider">
              Formulario F880
            </span>
            <h2 className="text-base font-bold text-slate-800 mt-1">Nueva Solicitud de Pago</h2>
          </div>
          <button 
            type="button"
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 rounded-lg hover:bg-slate-200/60"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Indicator */}
        <div className="bg-slate-100/50 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-semibold text-slate-600">
          <div className={`flex items-center gap-1.5 ${step >= 1 ? 'text-orange-600 font-bold' : ''}`}>
            <span className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]">1</span>
            <span>Proveedor y Datos</span>
          </div>
          <span className="text-slate-300">/</span>
          <div className={`flex items-center gap-1.5 ${step >= 2 ? 'text-orange-600 font-bold' : ''}`}>
            <span className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]">2</span>
            <span>Comprobantes CFDI</span>
          </div>
          <span className="text-slate-300">/</span>
          <div className={`flex items-center gap-1.5 ${step >= 3 ? 'text-orange-600 font-bold' : ''}`}>
            <span className="w-5 h-5 rounded-full bg-orange-600 text-white flex items-center justify-center text-[10px]">3</span>
            <span>Confirmación</span>
          </div>
        </div>

        {/* Body Form */}
        <form onSubmit={handleFinish} className="p-6 space-y-4">
          {step === 1 && (
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Nombre o Razón Social del Proveedor</label>
                <input 
                  type="text" 
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  placeholder="Ej. Tecnologías Globales S.A. de C.V."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">RFC Proveedor</label>
                  <input 
                    type="text" 
                    value={rfc}
                    onChange={(e) => setRfc(e.target.value.toUpperCase())}
                    placeholder="TGL120304KK8"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs uppercase font-mono focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Monto Total (MXN)</label>
                  <input 
                    type="number" 
                    step="0.01"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="34500.00"
                    className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs font-mono focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Concepto General de la Solicitud</label>
                <textarea 
                  value={concept}
                  onChange={(e) => setConcept(e.target.value)}
                  rows={2}
                  placeholder="Descripción detallada de la adquisición o servicio prestado..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-xl text-xs focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  required
                />
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-4">
              <label className="block text-xs font-semibold text-slate-700">Archivos CFDI XML / PDF Relacionados</label>
              
              <div className="border-2 border-dashed border-slate-300 rounded-2xl p-6 text-center bg-slate-50 hover:bg-slate-100/80 transition-colors relative cursor-pointer">
                <input 
                  type="file" 
                  accept=".xml,.pdf"
                  onChange={handleFileUpload}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                <p className="text-xs font-bold text-slate-700">Arrastra comprobantes XML / PDF o haz clic para examinar</p>
                <p className="text-[11px] text-slate-400 mt-1">Soporta CFDI 4.0 único a múltiples facturas</p>
              </div>

              <div className="space-y-1.5">
                <span className="text-[11px] font-bold text-slate-500 uppercase">Archivos Adjuntos ({uploadedFiles.length})</span>
                {uploadedFiles.map((file, idx) => (
                  <div key={idx} className="flex items-center justify-between p-2.5 bg-slate-100 rounded-xl border border-slate-200 text-xs">
                    <div className="flex items-center gap-2">
                      <FileCode className="w-4 h-4 text-orange-600" />
                      <span className="font-mono text-slate-800 font-medium">{file}</span>
                    </div>
                    <span className="text-[10px] font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                      SAT VÁLIDO
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-3 bg-slate-50 p-4 rounded-xl border border-slate-200">
              <div className="flex items-center gap-2 text-emerald-700 font-bold text-xs">
                <CheckCircle2 className="w-4 h-4" />
                <span>Resumen de Registro F880 Solicitud</span>
              </div>

              <div className="text-xs space-y-1.5 text-slate-700">
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500">Proveedor:</span>
                  <span className="font-semibold">{provider || 'Tecnologías Globales S.A. de C.V.'}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500">RFC:</span>
                  <span className="font-mono font-semibold">{rfc || 'TGL120304KK8'}</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500">Monto:</span>
                  <span className="font-mono font-bold text-orange-600">${parseFloat(amount || '34500').toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN</span>
                </div>
                <div className="flex justify-between border-b pb-1">
                  <span className="text-slate-500">Organización:</span>
                  <span className="font-semibold">Banco Multiva</span>
                </div>
              </div>

              <label className="flex items-center gap-2 cursor-pointer pt-2">
                <input 
                  type="checkbox" 
                  checked={urgent} 
                  onChange={(e) => setUrgent(e.target.checked)} 
                  className="w-4 h-4 rounded text-orange-600 focus:ring-orange-500"
                />
                <span className="text-xs font-semibold text-slate-800">Marcar como urgencia prioritaria para Tesorería</span>
              </label>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex items-center justify-between pt-2 border-t border-slate-200">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(step - 1)}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                Anterior
              </button>
            ) : <div />}

            {step < 3 ? (
              <button
                type="button"
                onClick={() => setStep(step + 1)}
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-2xs"
              >
                Siguiente
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                type="submit"
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center gap-1 shadow-md"
              >
                Enviar a Autorización
                <Plus className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};
