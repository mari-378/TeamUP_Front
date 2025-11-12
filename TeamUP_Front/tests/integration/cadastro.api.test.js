import axios from 'axios';

describe('Cadastro API', () => {
  it('retorna 201 ao cadastrar um novo usuário válido', async () => {
    const novoUsuario = {
      nome: 'Lety',
      email: `lety@teste.com`,
      senha: '123456',
      nascimento: {
        day: 29,
        month: 5,
        year: 2003,
      },
      genero: 'F',
    };

    const res = await axios.post('http://localhost:3000/cadastro', novoUsuario, {
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(201);
    expect(res.data).toBeDefined();
  });

  it('retorna erro 400 ao tentar cadastrar com dados inválidos', async () => {
    const usuarioInvalido = {
      nome: '',
      email: 'email-invalido',
      senha: '12',
      nascimento: {},
      genero: '',
    };

    try {
      await axios.post('http://localhost:3000/cadastro', usuarioInvalido, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBeDefined();
    }
  });

  it('retorna erro 409 se o email já estiver cadastrado', async () => {
    const usuarioDuplicado = {
      nome: 'Lelelele',
      email: 'teste@exemplo.com',
      senha: '123456',
      nascimento: {
        dia: 1,
        mes: 1,
        ano: 2000,
      },
      genero: 'feminino',
    };

    try {
      await axios.post('http://localhost:3000/cadastro', usuarioDuplicado, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      expect(error.response.status).toBe(409);
    }
  });
});
