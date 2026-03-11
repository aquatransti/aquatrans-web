const { generateToken, authenticate } = require('../middleware/auth');
const { findUserByEmail, users } = require('../data/users');
const { ROLES, PERMISSIONS } = require('../config/roles');

describe('Authentication Module', () => {
  describe('User Data', () => {
    test('demo users exist', () => {
      expect(users.length).toBeGreaterThan(0);
    });

    test('findUserByEmail returns user for valid email', () => {
      const user = findUserByEmail('maya@aquatrans.org.br');
      expect(user).toBeDefined();
      expect(user.email).toBe('maya@aquatrans.org.br');
    });

    test('findUserByEmail returns undefined for invalid email', () => {
      const user = findUserByEmail('nonexistent@test.com');
      expect(user).toBeUndefined();
    });

    test('all users have required fields', () => {
      users.forEach(user => {
        expect(user).toHaveProperty('id');
        expect(user).toHaveProperty('email');
        expect(user).toHaveProperty('nome');
        expect(user).toHaveProperty('role');
        expect(user).toHaveProperty('password');
      });
    });
  });

  describe('Roles and Permissions', () => {
    test('all roles are defined', () => {
      expect(ROLES.GESTOR).toBeDefined();
      expect(ROLES.ADMIN_TI).toBeDefined();
      expect(ROLES.ADMIN_PROFESSOR).toBeDefined();
      expect(ROLES.ADMIN_JURIDICO).toBeDefined();
      expect(ROLES.ADMIN_CONTABIL).toBeDefined();
      expect(ROLES.ADMIN_PSICOSSOCIAL).toBeDefined();
      expect(ROLES.ALUNO).toBeDefined();
    });

    test('gestor has all permissions', () => {
      const gestorPermissions = PERMISSIONS[ROLES.GESTOR];
      expect(gestorPermissions.canManageUsers).toBe(true);
      expect(gestorPermissions.canManageFinances).toBe(true);
      expect(gestorPermissions.canManageStudents).toBe(true);
      expect(gestorPermissions.canManageClasses).toBe(true);
    });

    test('aluno has limited permissions', () => {
      const alunoPermissions = PERMISSIONS[ROLES.ALUNO];
      expect(alunoPermissions.canManageUsers).toBe(false);
      expect(alunoPermissions.canViewOwnData).toBe(true);
    });

    test('professor can manage classes', () => {
      const profPermissions = PERMISSIONS[ROLES.ADMIN_PROFESSOR];
      expect(profPermissions.canManageClasses).toBe(true);
      expect(profPermissions.canManageStudents).toBe(true);
    });
  });

  describe('Token Generation', () => {
    test('generateToken creates a valid token string', () => {
      const user = { id: '123', email: 'test@test.com', role: 'aluno' };
      const token = generateToken(user);
      
      expect(typeof token).toBe('string');
      expect(token.length).toBeGreaterThan(0);
      expect(token.split('.')).toHaveLength(3); // JWT has 3 parts
    });
  });
});

describe('Middleware - authenticate', () => {
  test('returns 401 if no token provided', () => {
    const req = { headers: {} };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ error: 'Token não fornecido' });
    expect(next).not.toHaveBeenCalled();
  });

  test('returns 401 for invalid token', () => {
    const req = { headers: { authorization: 'Bearer invalid_token' } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    authenticate(req, res, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(next).not.toHaveBeenCalled();
  });

  test('calls next() for valid token', () => {
    const user = users[0];
    const token = generateToken(user);
    
    const req = { headers: { authorization: `Bearer ${token}` } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    const next = jest.fn();

    authenticate(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toBeDefined();
  });
});
