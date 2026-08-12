import { Solicitud, Factura, Contrapago, UrgentTask } from './types';

export const INITIAL_SOLICITUDES: Solicitud[] = [
  {
    id: '1',
    code: 'S200000100081',
    status: 'EN AUTORIZACIÓN SEGUNDO NIVEL',
    organization: 'Banco Multiva',
    timeAgo: 'hace 1 d',
    date: '2026-08-11',
    provider: 'Tecnologías Globales S.A. de C.V.',
    rfc: 'TGL120304KK8',
    amountMXN: 34500.00,
    invoicesCount: 3,
    concept: 'Licencias de software corporativo Q3',
    requester: 'Juan Pérez',
    urgent: true,
    stage: 'Autorización',
    history: [
      { date: '2026-08-11 10:30', action: 'Solicitud creada por Solicitante', user: 'Juan Pérez' },
      { date: '2026-08-11 11:15', action: 'Paso 1 Aprobado por Tesorería', user: 'Ana Gómez' },
    ],
  },
  {
    id: '2',
    code: 'S200000100032',
    status: 'EN AUTORIZACIÓN SEGUNDO NIVEL',
    organization: 'Banco Multiva',
    timeAgo: 'hace 1 d',
    date: '2026-08-11',
    provider: 'Consultoría e Innovación Financiera',
    rfc: 'CIF980211AA9',
    amountMXN: 18200.50,
    invoicesCount: 1,
    concept: 'Honorarios auditoría técnica de seguridad',
    requester: 'María Rodríguez',
    urgent: false,
    stage: 'Autorización',
    history: [
      { date: '2026-08-11 09:00', action: 'Solicitud ingresada con F880', user: 'María Rodríguez' },
    ],
  },
  {
    id: '3',
    code: 'S200000100037',
    status: 'SELECCIONANDO PROVEEDOR',
    organization: 'Banco Multiva',
    timeAgo: 'hace 1 d',
    date: '2026-08-11',
    provider: 'Pendiente Asignación',
    rfc: 'AAA010101AAA',
    amountMXN: 12400.00,
    invoicesCount: 2,
    concept: 'Suministro de papelería e insumos para sucursales',
    requester: 'Carlos Ruiz',
    urgent: false,
    stage: 'Datos y proveedor',
    history: [
      { date: '2026-08-11 14:20', action: 'Borrador guardado', user: 'Carlos Ruiz' },
    ],
  },
  {
    id: '4',
    code: '0000210006',
    status: 'REGLAS RECHAZADAS',
    organization: 'Sin organización',
    timeAgo: 'hace 3 d',
    date: '2026-08-09',
    provider: 'Servicios Logísticos del Norte',
    rfc: 'SLN050812992',
    amountMXN: 8900.00,
    invoicesCount: 1,
    concept: 'Envío urgente de documentación ejecutiva',
    requester: 'Laura Mendoza',
    urgent: true,
    stage: 'Validación',
    history: [
      { date: '2026-08-09 16:00', action: 'Rechazado por regla de negocio: Faltan archivos XML válidos', user: 'Sistema CFDI' },
    ],
  },
  {
    id: '5',
    code: '5300000100085',
    status: 'EN AUTORIZACIÓN PRIMER NIVEL',
    organization: 'Banco Multiva',
    timeAgo: 'hace 2 d',
    date: '2026-08-10',
    provider: 'Mantenimiento e Infraestructura MX',
    rfc: 'MIM110203731',
    amountMXN: 33397.50,
    invoicesCount: 4,
    concept: 'Servicio preventivo aire acondicionado Torre Multiva',
    requester: 'Roberto Sánchez',
    urgent: false,
    stage: 'Autorización',
    history: [
      { date: '2026-08-10 08:30', action: 'Enviado a revisión de primer nivel', user: 'Roberto Sánchez' },
    ],
  },
  {
    id: '6',
    code: 'S200000100099',
    status: 'VALIDACIÓN DOCUMENTAL',
    organization: 'Banco Multiva',
    timeAgo: 'hace 4 d',
    date: '2026-08-08',
    provider: 'Telecomunicaciones y Redes del Sur',
    rfc: 'TRS091212882',
    amountMXN: 45000.00,
    invoicesCount: 2,
    concept: 'Enlace dedicado de fibra óptica sede central',
    requester: 'Andrea Torres',
    urgent: false,
    stage: 'Validación',
    history: [
      { date: '2026-08-08 11:00', action: 'Validando timbre SAT', user: 'Sistema Validation' },
    ],
  },
  {
    id: '7',
    code: 'S200000100104',
    status: 'APROBADA Y CONTABILIZADA',
    organization: 'Banco Multiva',
    timeAgo: 'hace 5 d',
    date: '2026-08-07',
    provider: 'Seguros y Fianzas Corporativas',
    rfc: 'SFC880315321',
    amountMXN: 128500.00,
    invoicesCount: 1,
    concept: 'Renovación de póliza patrimonial multirriesgo',
    requester: 'Fernando Castillo',
    urgent: false,
    stage: 'Contabilización',
    history: [
      { date: '2026-08-07 17:00', action: 'Contabilizado exitosamente en SAP/ERP', user: 'Finanzas' },
    ],
  }
];

export const INITIAL_URGENT_TASKS: UrgentTask[] = [
  {
    id: 'ut1',
    title: 'Nueva solicitud',
    subtitle: 'Inicia un F880 - CFDI único a múltiples facturas',
    category: 'Banco Multiva',
    timeAgo: 'hace 1 d',
    iconType: 'plus',
    targetView: 'dashboard'
  },
  {
    id: 'ut2',
    title: 'Mis solicitudes de pago',
    subtitle: 'Estado, archivos y siguiente paso',
    category: 'Estado, archivos y siguiente paso',
    timeAgo: 'hace 1 d',
    iconType: 'file',
    targetView: 'solicitudes'
  }
];

export const INITIAL_FACTURAS: Factura[] = [
  {
    id: 'f1',
    uuid: '4A2B891E-9C00-410A-B391-72910AA812BC',
    folio: 'FAC-8921',
    provider: 'Tecnologías Globales S.A. de C.V.',
    rfc: 'TGL120304KK8',
    amount: 15000.00,
    tax: 2400.00,
    date: '2026-08-10',
    status: 'VÁLIDA',
    xmlName: 'CFDI_TGL_8921.xml',
    pdfUrl: '#'
  },
  {
    id: 'f2',
    uuid: '8B32190F-231A-4CDE-9A01-817291129901',
    folio: 'F-2026-0041',
    provider: 'Consultoría e Innovación Financiera',
    rfc: 'CIF980211AA9',
    amount: 18200.50,
    tax: 2912.08,
    date: '2026-08-09',
    status: 'VÁLIDA',
    xmlName: 'CFDI_CIF_0041.xml',
    pdfUrl: '#'
  },
  {
    id: 'f3',
    uuid: 'C9018273-1002-4A9B-8912-9912001A8765',
    folio: 'A-1082',
    provider: 'Servicios Logísticos del Norte',
    rfc: 'SLN050812992',
    amount: 8900.00,
    tax: 1424.00,
    date: '2026-08-08',
    status: 'CANCELADA',
    xmlName: 'CFDI_SLN_1082.xml',
    pdfUrl: '#'
  },
  {
    id: 'f4',
    uuid: 'D1029384-9912-4C10-8271-7718290A8129',
    folio: 'B-5521',
    provider: 'Mantenimiento e Infraestructura MX',
    rfc: 'MIM110203731',
    amount: 33397.50,
    tax: 5343.60,
    date: '2026-08-10',
    status: 'PROCESADA',
    xmlName: 'CFDI_MIM_5521.xml',
    pdfUrl: '#'
  }
];

export const INITIAL_CONTRAPAGOS: Contrapago[] = [
  {
    id: 'cp1',
    folio: 'CP-2026-0012',
    provider: 'Tecnologías Globales S.A. de C.V.',
    amount: 34500.00,
    dueDate: '2026-08-15',
    status: 'PENDIENTE AUTORIZACIÓN',
    bankAccount: '012180001238910023'
  },
  {
    id: 'cp2',
    folio: 'CP-2026-0015',
    provider: 'Mantenimiento e Infraestructura MX',
    amount: 33397.50,
    dueDate: '2026-08-18',
    status: 'EN PROCESO PAGO',
    bankAccount: '012180009812739182'
  },
  {
    id: 'cp3',
    folio: 'CP-2026-0008',
    provider: 'Seguros y Fianzas Corporativas',
    amount: 128500.00,
    dueDate: '2026-08-10',
    status: 'PAGADO',
    bankAccount: '012180005512398711'
  }
];

export const STAGE_DISTRIBUTION_DATA = [
  { name: 'Iniciación', value: 8, color: '#3B82F6' },
  { name: 'Validación', value: 6, color: '#10B981' },
  { name: 'Datos y proveedor', value: 7, color: '#F59E0B' },
  { name: 'Prorrateo y docs', value: 5, color: '#EF4444' },
  { name: 'Autorización', value: 11, color: '#8B5CF6' },
  { name: 'Contabilización', value: 3, color: '#92400E' },
];
