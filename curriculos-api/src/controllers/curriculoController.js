const pool = require('../db');

// GET todos
async function getTodosCurriculos(req, res) {
  try {
    const pessoas = await pool.query('SELECT * FROM "pessoa"');
    res.json(pessoas.rows);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

// GET por ID
async function getCurriculoPorId(req, res) {
  const { id } = req.params;
  try {
    const pessoa = await pool.query('SELECT * FROM "pessoa" WHERE id = $1', [id]);
    if (pessoa.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Currículo não encontrado' });
    }

    const formacoes = await pool.query('SELECT * FROM "formacao" WHERE pessoa_id = $1', [id]);
    const experiencias = await pool.query('SELECT * FROM "experiencia" WHERE pessoa_id = $1', [id]);
    const projetos = await pool.query('SELECT * FROM "projeto" WHERE pessoa_id = $1', [id]);

    res.json({
      ...pessoa.rows[0],
      formacoes: formacoes.rows,
      experiencias: experiencias.rows,
      projetos: projetos.rows
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

// POST (Criar)
async function criarCurriculo(req, res) {
  const { nome, email, telefone, cidade, estado, resumo } = req.body;
  try {
    const resultado = await pool.query(
      'INSERT INTO "pessoa" (nome, email, telefone, cidade, estado, resumo) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nome, email, telefone, cidade, estado, resumo ]
    );
    res.status(201).json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

// PUT (Atualizar)
async function atualizarCurriculo(req, res) {
  const { id } = req.params;
  const { nome, email, telefone, cidade, estado, resumo } = req.body;

  try {
    const resultado = await pool.query(
      `UPDATE "pessoa"
       SET nome = $1, email = $2, telefone = $3, cidade = $4, estado =$5, resumo = $6
       WHERE id = $7
       RETURNING *`,
      [nome, email, telefone, cidade, estado, resumo, id]
    );

    if (resultado.rowCount === 0) {
      return res.status(404).json({ erro: 'Currículo não encontrado' });
    }

    res.json(resultado.rows[0]);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

// DELETE
async function deletarCurriculo(req, res) {
  const { id } = req.params;

  try {
    await pool.query('DELETE FROM "formacao" WHERE pessoa_id = $1', [id]);
    await pool.query('DELETE FROM "experiencia" WHERE pessoa_id = $1', [id]);
    await pool.query('DELETE FROM "projeto" WHERE pessoa_id = $1', [id]);
    const resultado = await pool.query('DELETE FROM "pessoa" WHERE id = $1 RETURNING *', [id]);

    if (resultado.rows.length === 0) {
      return res.status(404).json({ mensagem: 'Currículo não encontrado' });
    }

    res.json({ mensagem: 'Currículo deletado com sucesso' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
}

module.exports = {
  getTodosCurriculos,
  getCurriculoPorId,
  criarCurriculo,
  atualizarCurriculo,
  deletarCurriculo
};
