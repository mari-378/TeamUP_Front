import axios from 'axios';

describe('Sorteio API', () => {

  it('retorna 200 e times sorteados com dados válidos', async () => {
    const payload = {
      maxPorTime: 2,
      jogadores: [
        { nome: 'Lety', habilidade: 5 },
        { nome: 'Ana', habilidade: 3 },
        { nome: 'Bia', habilidade: 4 },
        { nome: 'Luca', habilidade: 2 },
      ],
    };

    const res = await axios.post('http://localhost:3000/sorteio', payload, {
      headers: { 'Content-Type': 'application/json' },
    });

    expect(res.status).toBe(200);
    expect(res.data).toBeDefined();
    expect(res.data.times).toBeInstanceOf(Array);
    expect(res.data.times.length).toBeGreaterThan(0);

    res.data.times.forEach((time) => {
      expect(Array.isArray(time)).toBe(true);
    });
  });

  it('retorna 400 se faltar dados obrigatórios', async () => {
    const payloadInvalido = {
      maxPorTime: 2,
    };

    try {
      await axios.post('http://localhost:3000/sorteio', payloadInvalido, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toBeDefined();
    }
  });

  it('retorna 400 se o array de jogadores estiver vazio', async () => {
    const payloadVazio = {
      maxPorTime: 2,
      jogadores: [],
    };

    try {
      await axios.post('http://localhost:3000/sorteio', payloadVazio, {
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error) {
      expect(error.response.status).toBe(400);
    }
  });

});
