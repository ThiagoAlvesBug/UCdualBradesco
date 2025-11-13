import {motion} from "framer-motion";
import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        // Salva o usuário em um localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        // Redirecionando para a dashboard
        navigate("/dashboard");
      } else {
        setError("E-mail ou senha incorretos!");
      }
    } catch (err) {
      console.error(err);
      setError("Erro ao conectar ao servidor.");
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-[#0B0B1D] text-white px-6 overflow-x-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}>
      <div className="bg-[#111133] w-full max-w-md p-6 rounded-2xl shadow-xl border border-[#1e1e3f]">
        <h1 className="text-3xl font-bold text-[#FF007F] text-center mb-6">
          Entrar na Conta
        </h1>

        <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              E-mail
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-2 rounded-lg bg-[#1b1b3a] text-white 
              focus:outline-none focus:ring-2 focus:ring-[#FF007F] placeholder-gray-400"/>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Senha
            </label>
            <input
              type="password"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 rounded-lg bg-[#1b1b3a] text-white 
               focus:outline-none focus:ring-2 focus:ring-[#FF007F] placeholder-gray-400"/>
          </div>

          {error && (
            <p className="text-red-500 text-center text-sm mt-2">{error}</p>
          )}

          <div className="mt-6">
            <button
              type="submit"
              className="bg-[#FF0066] w-full text-white py-3 rounded-lg font-semibold hover:bg-[#be004c] transition">
              Entrar
            </button>
          </div>
        </form>

        <div className="text-center mt-6 space-y-3">
          <p className="text-gray-400 text-sm">
            Ainda não tem uma conta?{" "}
            <Link
              to="/register"
              className="text-[#FF007F] hover:underline hover:text-[#ff3399]">
              Registrar
            </Link>
          </p>

          <Link to="/">
            <button className="border border-[#FF007F] text-[#FF007F] px-6 py-2 rounded-lg hover:bg-[#FF007F] hover:text-white transition text-sm">
              Voltar para o início
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
