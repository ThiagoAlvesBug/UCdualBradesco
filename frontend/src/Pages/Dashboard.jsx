import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [valor, setValor] = useState("");
  const [loading, setLoading] = useState(false);
  const [transacoes, setTransacoes] = useState([]);
  const navigate = useNavigate();

  // 🔥 1. CARREGA O USUÁRIO LOGADO SEM GERAR O ERRO DO LISTENER
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    // Primeiro: checar login fora do ciclo atual do React
    if (!token || !userId) {
      setTimeout(() => navigate("/login"), 0);
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8082/users/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          setTimeout(() => navigate("/login"), 0);
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        setTimeout(() => navigate("/login"), 0);
      }
    };

    fetchUser();
  }, [navigate]);

  // 🔥 2. BUSCA TRANSACOES QUANDO USER CARREGAR
  useEffect(() => {
    if (!user?.id) return;

    const fetchTransacoes = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:8083/transactions/user/${user.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = await response.json();
        setTransacoes(data);
      } catch (error) {
        console.error("Erro ao carregar transações:", error);
      }
    };

    fetchTransacoes();
  }, [user?.id]);

  // 🔥 3. ADICIONAR SALDO
  const handleAddSaldo = async () => {
    if (!valor || isNaN(valor) || parseFloat(valor) <= 0) {
      alert("Digite um valor válido.");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      await fetch("http://localhost:8083/transactions/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: user.id,
          valor: parseFloat(valor),
          descricao: "Depósito",
          tipo: "ENTRADA",
        }),
      });

      const responseUser = await fetch(
        `http://localhost:8082/users/${user.id}/add-saldo`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ valor: parseFloat(valor) }),
        }
      );

      const updatedUser = await responseUser.json();

      setUser(updatedUser);
      setValor("");

      const responseTrans = await fetch(
        `http://localhost:8083/transactions/user/${user.id}`,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const transData = await responseTrans.json();
      setTransacoes(transData);

      alert("Saldo adicionado!");
    } catch (error) {
      console.error(error);
      alert("Erro ao adicionar saldo.");
    } finally {
      setLoading(false);
    }
  };

  // 🔥 4. LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <motion.div
      className="flex flex-col min-h-screen bg-[#141333] text-white overflow-x-hidden"
    >
      {/* TODO O SEU LAYOUT VAI AQUI */}
      {/* Não modifiquei nada na estrutura visual */}
    </motion.div>
  );
}

export default Dashboard;
