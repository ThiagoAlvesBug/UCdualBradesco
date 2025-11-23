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

  // 🔥 1. CHECK LOGIN + BUSCAR USUÁRIO
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");

    if (!token || !userId) {
      navigate("/login");
      return;
    }

    const fetchUser = async () => {
      try {
        const response = await fetch(`http://localhost:8080/users/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (!response.ok) {
          navigate("/login");
          return;
        }

        const data = await response.json();
        setUser(data);
      } catch (error) {
        console.error("Erro ao buscar usuário:", error);
        navigate("/login");
      }
    };

    fetchUser();
  }, [navigate]);

  // 🔥 2. BUSCAR TRANSACOES QUANDO O USER CARREGAR
  useEffect(() => {
    if (!user?.id) return;

    const fetchTransacoes = async () => {
      try {
        const token = localStorage.getItem("token");

        const response = await fetch(
          `http://localhost:8082/transactions/user/${user.id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
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

      await fetch("http://localhost:8082/transactions/add", {
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

      // atualizar saldo no serviço de usuarios
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

      // recarregar transações
      const responseTrans = await fetch(
        `http://localhost:8082/transactions/user/${user.id}`,
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
      {/* coloque aqui o HTML que você já tinha para o dashboard */}
    </motion.div>
  );
}

export default Dashboard;
