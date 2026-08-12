export type ViewMode = 'dashboard' | 'solicitudes' | 'facturas' | 'contrapagos';

export type SolicitudStatus = 
  | 'EN AUTORIZACIÓN PRIMER NIVEL'
  | 'EN AUTORIZACIÓN SEGUNDO NIVEL'
  | 'SELECCIONANDO PROVEEDOR'
  | 'REGLAS RECHAZADAS'
  | 'VALIDACIÓN DOCUMENTAL'
  | 'APROBADA Y CONTABILIZADA';

export interface Solicitud {
  id: string;
  code: string; // e.g. S200000100081
  status: SolicitudStatus;
  organization: string; // e.g. Banco Multiva
  timeAgo: string;
  date: string;
  provider: string;
  rfc: string;
  amountMXN: number;
  invoicesCount: number;
  concept: string;
  requester: string;
  urgent: boolean;
  stage: 'Iniciación' | 'Validación' | 'Datos y proveedor' | 'Prorrateo y docs' | 'Autorización' | 'Contabilización';
  history: {
    date: string;
    action: string;
    user: string;
  }[];
}

export interface Factura {
  id: string;
  uuid: string;
  folio: string;
  provider: string;
  rfc: string;
  amount: number;
  tax: number;
  date: string;
  status: 'VÁLIDA' | 'PENDIENTE VINCULAR' | 'CANCELADA' | 'PROCESADA';
  pdfUrl?: string;
  xmlName?: string;
}

export interface Contrapago {
  id: string;
  folio: string;
  provider: string;
  amount: number;
  dueDate: string;
  status: 'PENDIENTE AUTORIZACIÓN' | 'EN PROCESO PAGO' | 'PAGADO';
  bankAccount: string;
}

export interface UrgentTask {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  timeAgo: string;
  iconType: 'plus' | 'file';
  targetView: ViewMode;
}

export interface FilterTag {
  id: string;
  label: string;
  value: string;
}
