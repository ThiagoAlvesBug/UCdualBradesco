import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [valor, setValor] = useState("");
  const [loading, setLoading] = useState(false);
  const [transacoes, setTransacoes] = useState([]); // 🔥 NOVO
  const navigate = useNavigate();

  // Carrega usuário logado
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  // 🔥 NOVO — Carregar transações reais
  useEffect(() => {
    if (!user) return;

    const fetchTransacoes = async () => {
      try {
        const response = await fetch(`http://localhost:5000/transacoes/${user.id_usuario}`);
        const data = await response.json();

        if (data.success) {
          setTransacoes(data.transacoes);
        }
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
      }
    };

    fetchTransacoes();
  }, [user]);

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Adicionar saldo
  const handleAddSaldo = async () => {
    if (!valor || isNaN(valor) || parseFloat(valor) <= 0) {
      alert("Digite um valor válido para adicionar saldo.");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/addSaldo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id_usuario: user.id_usuario,
          valor: parseFloat(valor),
        }),
      });

      const data = await response.json();

      if (data.success) {
        const novoSaldo = user.saldo + parseFloat(valor);
        const userAtualizado = { ...user, saldo: novoSaldo };

        setUser(userAtualizado);
        localStorage.setItem("user", JSON.stringify(userAtualizado));
        setValor("");
        alert("Saldo adicionado com sucesso!");

        // 🔥 NOVO — atualizar transações após depósito
        const responseTrans = await fetch(`http://localhost:5000/transacoes/${user.id_usuario}`);
        const dataTrans = await responseTrans.json();
        if (dataTrans.success) setTransacoes(dataTrans.transacoes);

      } else {
        alert("Erro ao adicionar saldo.");
      }
    } catch (error) {
      console.error(error);
      alert("Erro ao conectar com o servidor.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-[#141333] text-white overflow-x-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex flex-col md:flex-row min-h-screen bg-[#141333] text-white overflow-x-hidden">
        
        {/* BOTÃO MOBILE */}
        <button
          className="md:hidden fixed top-4 left-4 z-40 bg-[#FF0066] p-2 rounded-md hover:bg-[#be004c] transition"
          onClick={() => setIsOpen(true)}
        >
          <Menu size={24} />
        </button>

        {/* SIDEBAR DESKTOP */}
        <aside className="hidden md:flex md:flex-col bg-[#0c0c22] p-6 w-64 h-screen sticky top-0">
          <div className="flex flex-col justify-between h-full">
            <div>
              <h1 className="text-2xl font-bold text-[#FF0066] mb-10">
                Banco Maneiro
              </h1>

              <nav className="space-y-3">
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#FF0066]/20 transition">
                  Visão Geral
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#FF0066]/20 transition">
                  Pix / Transferências
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#FF0066]/20 transition">
                  Extrato
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#FF0066]/20 transition">
                  Cartões
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#FF0066]/20 transition">
                  Configurações
                </button>
              </nav>
            </div>

            <button
              onClick={handleLogout}
              className="w-full bg-[#FF0066] py-2 rounded-lg hover:bg-[#be004c] transition cursor-pointer"
            >
              Sair
            </button>
          </div>
        </aside>

        {/* SIDEBAR MOBILE */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onClick={() => setIsOpen(false)}
              />
              
              <motion.aside
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                transition={{ type: "spring", stiffness: 60 }}
                className="fixed top-0 left-0 h-full w-60 bg-[#0c0c22] p-6 z-50 flex flex-col justify-between md:hidden"
              >
                <button
                  className="absolute top-4 right-4 text-zinc-50 hover:text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <X size={24} />
                </button>

                <div className="flex flex-col justify-between h-full">
                  <div>
                    <h1 className="text-2xl font-bold text-[#FF0066] mb-10">
                      Banco Maneiro
                    </h1>

                    <nav className="space-y-4">
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#FF0066]/20 transition">
                        Visão Geral
                      </button>
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#FF0066]/20 transition">
                        Pix / Transferências
                      </button>
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#FF0066]/20 transition">
                        Extrato
                      </button>
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#FF0066]/20 transition">
                        Cartões
                      </button>
                      <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-[#FF0066]/20 transition">
                        Configurações
                      </button>
                    </nav>
                  </div>

                  <button
                    onClick={handleLogout}
                    className="w-full bg-[#FF0066] py-2 rounded-lg hover:bg-[#be004c] transition"
                  >
                    Sair
                  </button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* CONTEÚDO PRINCIPAL */}
        <main className="flex-1 p-6 md:p-10 mt-16 md:mt-0 transition-all">

          {/* Header */}
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-2">
            <h2 className="text-2xl md:text-3xl font-bold text-[#FF0066]">
              Bem-vindo, {user ? user.nome : "Carregando..."}
            </h2>

            <p className="text-gray-400 text-sm md:text-base">
              Último acesso: {new Date().toLocaleDateString()}
            </p>
          </div>

          {/* Saldo */}
          <div className="bg-[#0c0c22] p-5 md:p-6 rounded-xl shadow-lg mb-10 text-center md:text-left">
            <h3 className="text-lg text-gray-400 mb-2">Saldo disponível</h3>
            <p className="text-3xl md:text-4xl font-bold text-[#00ff9d] mb-4">
              {user
                ? `R$ ${user.saldo.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                  })}`
                : "Carregando..."}
            </p>

            {/* Campo de adicionar saldo */}
            <div className="flex flex-col sm:flex-row gap-3 items-center">
              <input
                type="number"
                placeholder="Valor para adicionar"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="w-full sm:w-48 px-4 py-2 rounded-lg bg-[#1b1b3a] text-white 
                focus:outline-none focus:ring-2 focus:ring-[#FF007F] placeholder-gray-400 text-sm"
              />
              <button
                onClick={handleAddSaldo}
                disabled={loading}
                className="bg-[#FF007F] hover:bg-[#D6006A] text-white font-semibold py-2 px-5 
                rounded-lg transition cursor-pointer disabled:opacity-50"
              >
                {loading ? "Adicionando..." : "Adicionar"}
              </button>
            </div>
          </div>

          {/* TRANSAÇÕES */}
          <div>
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-[#FF0066]">
              Últimas transações
            </h3>

            <div className="bg-[#0c0c22] rounded-xl p-4 md:p-6 shadow-lg overflow-x-auto">
              <table className="w-full text-left min-w-[400px] text-sm md:text-base">
                <thead className="text-gray-400">
                  <tr>
                    <th className="pb-3">Data</th>
                    <th className="pb-3">Descrição</th>
                    <th className="pb-3">Valor</th>
                  </tr>
                </thead>

                {/* 🔥 Tabela dinâmica com transações reais */}
                <tbody className="divide-y divide-gray-700">
                  {transacoes.length === 0 ? (
                    <tr>
                      <td colSpan="3" className="text-center py-4 text-gray-400">
                        Nenhuma transação encontrada.
                      </td>
                    </tr>
                  ) : (
                    transacoes.map((t) => {
                      const isEntrada = t.id_usuario_destino === user.id_usuario;

                      return (
                        <tr key={t.id_transacao}>
                          <td className="py-3">
                            {new Date(t.data_transacao).toLocaleString("pt-BR")}
                          </td>

                          <td>{t.descricao}</td>

                          <td className={isEntrada ? "text-green-400" : "text-red-400"}>
                            {isEntrada ? "+ " : "- "}
                            R$
                            {Math.abs(t.valor).toLocaleString("pt-BR", {
                              minimumFractionDigits: 2,
                            })}
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </motion.div>
  );
}

export default Dashboard;
