// Definição de perfis e permissões do sistema Aquatrans

const ROLES = {
  GESTOR: 'gestor',
  ADMIN_TI: 'admin_ti',
  ADMIN_PROFESSOR: 'admin_professor',
  ADMIN_JURIDICO: 'admin_juridico',
  ADMIN_CONTABIL: 'admin_contabil',
  ADMIN_PSICOSSOCIAL: 'admin_psicossocial',
  ALUNO: 'aluno'
};

const PERMISSIONS = {
  // Gestores - Acesso total
  [ROLES.GESTOR]: {
    label: 'Gestor',
    description: 'Acesso total ao sistema',
    canManageUsers: true,
    canManageFinances: true,
    canManageStudents: true,
    canManageClasses: true,
    canManageEditals: true,
    canViewReports: true,
    canManageSystem: true,
    dashboard: 'gestor'
  },
  
  // Administradores
  [ROLES.ADMIN_TI]: {
    label: 'Administrador TI',
    description: 'Gerenciamento técnico do sistema',
    canManageUsers: true,
    canManageFinances: false,
    canManageStudents: false,
    canManageClasses: false,
    canManageEditals: false,
    canViewReports: true,
    canManageSystem: true,
    dashboard: 'admin'
  },
  
  [ROLES.ADMIN_PROFESSOR]: {
    label: 'Professor(a)',
    description: 'Gerenciamento de alunos e aulas',
    canManageUsers: false,
    canManageFinances: false,
    canManageStudents: true,
    canManageClasses: true,
    canManageEditals: false,
    canViewReports: true,
    canManageSystem: false,
    dashboard: 'admin'
  },
  
  [ROLES.ADMIN_JURIDICO]: {
    label: 'Jurídico',
    description: 'Gerenciamento de alunos e editais',
    canManageUsers: false,
    canManageFinances: false,
    canManageStudents: true,
    canManageClasses: false,
    canManageEditals: true,
    canViewReports: true,
    canManageSystem: false,
    dashboard: 'admin'
  },
  
  [ROLES.ADMIN_CONTABIL]: {
    label: 'Contábil',
    description: 'Gerenciamento financeiro',
    canManageUsers: false,
    canManageFinances: true,
    canManageStudents: false,
    canManageClasses: false,
    canManageEditals: false,
    canViewReports: true,
    canManageSystem: false,
    dashboard: 'admin'
  },
  
  [ROLES.ADMIN_PSICOSSOCIAL]: {
    label: 'Psicossocial',
    description: 'Atendimento psicossocial de alunos',
    canManageUsers: false,
    canManageFinances: false,
    canManageStudents: true,
    canManageClasses: false,
    canManageEditals: false,
    canViewReports: true,
    canManageSystem: false,
    dashboard: 'admin'
  },
  
  // Alunos
  [ROLES.ALUNO]: {
    label: 'Aluno(a)',
    description: 'Acesso ao portal do aluno',
    canManageUsers: false,
    canManageFinances: false,
    canManageStudents: false,
    canManageClasses: false,
    canManageEditals: false,
    canViewReports: false,
    canManageSystem: false,
    canViewOwnData: true,
    canPayBills: true,
    canViewPerformance: true,
    canAccessPsicossocial: true,
    dashboard: 'aluno'
  }
};

module.exports = { ROLES, PERMISSIONS };
