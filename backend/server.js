import express from "express";
import cors from "cors";
import sqlite3 from "sqlite3";
import { open } from "sqlite";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

let db;

// Conexão com o banco
const startServer = async () => {
  db = await open({
    filename: "./database/Scripts-GoldenFinger.db", // <-- aqui está seu banco
    driver: sqlite3.Database,
  });

  console.log("Conectado ao banco de dados SQLite!");

  // Enviando login para o banco de dados
  app.post("/login", async (req, res) => {
    const { email, senha } = req.body;

    try {
      const user = await db.get(
        "SELECT * FROM Usuario WHERE email = ? AND senha = ?",
        [email, senha]
      );

      if (user) {
        res.json({ success: true, user });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Credenciais inválidas" });
      }
    } catch (error) {
      console.error("Erro no login:", error);
      res
        .status(500)
        .json({ success: false, message: "Erro interno do servidor" });
    }
  });

  // Enviando registro para o banco de dados
  app.post("/register", async (req, res) => {
    const { nome, celular, email, senha } = req.body;

    if (!nome || !celular || !email || !senha) {
      return res
        .status(400)
        .json({ success: false, message: "Preencha todos os campos!" });
    }

    try {
      // Verifica se o e-mail já foi utilizado
      const existingUser = await db.get(
        "SELECT * FROM Usuario WHERE email = ?",
        [email]
      );

      if (existingUser) {
        return res
          .status(409)
          .json({ success: false, message: "E-mail já cadastrado!" });
      }

      // Insere o novo usuário
      await db.run(
        "INSERT INTO Usuario (nome, celular, email, senha, saldo) VALUES (?, ?, ?, ?, ?)",
        [nome, celular, email, senha, 0.0]
      );

      res.json({ success: true, message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      console.error("Erro no registro: ", error);
      res
        .status(500)
        .json({ success: false, message: "Erro ao registrar usuário" });
    }
  });

  // Adicionando saldo ao usuário (ah se fosse tão facil assim né)
  app.post("/addSaldo", async (req, res) => {
  const { id_usuario, valor } = req.body;

  if (!id_usuario || !valor || valor <= 0) {
    return res.json({ success: false, message: "Dados inválidos." });
  }

  try {
    // Atualizando o saldo
    await db.run(
      "UPDATE Usuario SET saldo = saldo + ? WHERE id_usuario = ?",
      [valor, id_usuario]
    );

    // Registrando a transação (origem e destino são o mesmo usuário, neste caso)
    await db.run(
      "INSERT INTO transacao (id_usuario_origem, id_usuario_destino, valor, data_transacao, descricao) VALUES (?, ?, ?, datetime('now', 'localtime'), ?)",
      [id_usuario, id_usuario, valor, "Depósito de saldo"]
    );

    res.json({ success: true });
  } catch (error) {
    console.error("Erro ao adicionar saldo:", error);
    res.json({ success: false, message: "Erro ao adicionar saldo." });
  }
});

// Listando as transações do usuário
app.get("/transacoes/:id_usuario", async (req, res) => {
  const { id_usuario } = req.params;

  try {
    const transacoes = await db.all(
      `SELECT *
       FROM transacao
       WHERE id_usuario_origem = ? OR id_usuario_destino = ?
       ORDER BY id_transacao DESC
       LIMIT 20`,
      [id_usuario, id_usuario]
    );

    res.json({ success: true, transacoes });
  } catch (error) {
    console.error("Erro ao buscar transações:", error);
    res.json({ success: false, message: "Erro ao buscar transações." });
  }
});

   ///////////////////////////////////////
  // Ouvindo requisições na porta 5000 //
 ///////////////////////////////////////
  const PORT = 5000;
  app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
};

// Inicia o servidor
startServer();
