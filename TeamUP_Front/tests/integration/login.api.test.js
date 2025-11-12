import axios from 'axios';

describe('Login API', () => {
  it('retorna 200 com credenciais válidas', async () => {
    const res = await axios.post('http://localhost:3000/login', {
      email: 'teste@exemplo.com',
      senha: '123456',
    });
    expect(res.status).toBe(200);
  });

  it('retorna 401 com credenciais inválidas', async () => {
    try {
      await axios.post('http://localhost:3000/login', {
        email: 'errado@exemplo.com',
        senha: 'senhaErrada',
      });
    } catch (error) {
      expect(error.response.status).toBe(401);
    }
  });
});
