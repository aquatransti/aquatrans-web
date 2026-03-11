const { ROLES, PERMISSIONS } = require('../config/roles');

describe('Roles Configuration', () => {
  describe('Role Definitions', () => {
    test('all role constants are strings', () => {
      Object.values(ROLES).forEach(role => {
        expect(typeof role).toBe('string');
      });
    });

    test('role names are unique', () => {
      const roleValues = Object.values(ROLES);
      const uniqueRoles = new Set(roleValues);
      expect(uniqueRoles.size).toBe(roleValues.length);
    });
  });

  describe('Permissions Structure', () => {
    test('every role has permissions defined', () => {
      Object.values(ROLES).forEach(role => {
        expect(PERMISSIONS[role]).toBeDefined();
        expect(typeof PERMISSIONS[role]).toBe('object');
      });
    });

    test('permissions have correct types', () => {
      Object.values(PERMISSIONS).forEach(rolePerms => {
        // All permissions should have the required permission keys
        expect(rolePerms).toHaveProperty('canManageUsers');
        expect(typeof rolePerms.canManageUsers).toBe('boolean');
      });
    });
  });

  describe('Role Hierarchy', () => {
    test('GESTOR has maximum permissions', () => {
      const gestorPerms = PERMISSIONS[ROLES.GESTOR];
      const permissionCount = Object.values(gestorPerms).filter(p => p === true).length;
      
      // Gestor should have all or most permissions
      expect(permissionCount).toBeGreaterThan(5);
    });

    test('ALUNO has minimum permissions', () => {
      const alunoPerms = PERMISSIONS[ROLES.ALUNO];
      
      // Aluno shouldn't be able to manage anything
      expect(alunoPerms.canManageUsers).toBe(false);
      expect(alunoPerms.canManageFinances).toBe(false);
      expect(alunoPerms.canManageStudents).toBe(false);
    });

    test('Admin roles have role-specific permissions', () => {
      // TI can manage users
      expect(PERMISSIONS[ROLES.ADMIN_TI].canManageUsers).toBe(true);
      
      // Professor can manage classes
      expect(PERMISSIONS[ROLES.ADMIN_PROFESSOR].canManageClasses).toBe(true);
      
      // Contabil can manage finances
      expect(PERMISSIONS[ROLES.ADMIN_CONTABIL].canManageFinances).toBe(true);
      
      // Juridico can manage editals
      expect(PERMISSIONS[ROLES.ADMIN_JURIDICO].canManageEditals).toBe(true);
      
      // Psicossocial can manage students
      expect(PERMISSIONS[ROLES.ADMIN_PSICOSSOCIAL].canManageStudents).toBe(true);
    });
  });

  describe('Permission Keys', () => {
    const expectedPermissions = [
      'canManageUsers',
      'canManageFinances',
      'canManageStudents',
      'canManageClasses',
      'canManageEditals',
      'canViewReports'
    ];

    test('all expected permission keys exist for gestor', () => {
      expectedPermissions.forEach(perm => {
        expect(PERMISSIONS[ROLES.GESTOR]).toHaveProperty(perm);
      });
    });

    test('aluno has canViewOwnData permission', () => {
      expect(PERMISSIONS[ROLES.ALUNO]).toHaveProperty('canViewOwnData');
      expect(PERMISSIONS[ROLES.ALUNO].canViewOwnData).toBe(true);
    });
  });
});
