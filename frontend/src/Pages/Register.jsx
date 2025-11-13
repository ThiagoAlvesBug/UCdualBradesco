import {motion} from "framer-motion";
import {Link, useNavigate} from "react-router-dom";
import {useState} from "react";
import {Eye, EyeOff} from "lucide-react";

function Register() {
  const navigate = useNavigate();

  // Campos vazios por padrão
  const [formData, setFormData] = useState({
    nome: "",
    celular: "",
    email: "",
    senha: "",
    confirmarSenha: "",
  });

  // States para visibilidade e mensagens
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Atualizar campos de maneira dinamica
  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  // Validações da senha
  const hasNumber = /\d/.test(formData.senha);
  const hasUpper = /[A-Z]/.test(formData.senha);
  const hasLower = /[a-z]/.test(formData.senha);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(formData.senha);

  // Enviando para o back
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (formData.senha !== formData.confirmarSenha) {
      setError("As senhas não coincidem!");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nome: formData.nome,
          celular: formData.celular,
          email: formData.email,
          senha: formData.senha,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setSuccess("Conta criada com sucesso! Redirecionando...");
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(data.message || "Erro ao registrar. Tente novamente.");
      }
    } catch (err) {
      setError("Falha na conexão com o servidor.");
    }
  };

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen 
      bg-[#0B0B1D] text-white px-6 overflow-x-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      {/* Card de Registro */}
      <div className="bg-[#111133] w-full max-w-md sm:max-w-lg 
      p-6 sm:p-8 rounded-2xl shadow-xl border border-[#1e1e3f]">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#FF007F] text-center mb-6">
          Crie sua Conta
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nome completo
            </label>
            <input
              name="nome"
              type="text"
              placeholder="Digite seu nome"
              value={formData.nome}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#1b1b3a] text-white 
              focus:outline-none focus:ring-2 focus:ring-[#FF007F] 
              placeholder-gray-400 text-sm sm:text-base"/>
          </div>

          {/* Celular */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Celular
            </label>
            <input
              name="celular"
              type="text"
              placeholder="Seu número de celular"
              value={formData.celular}
              onChange={handleChange}
              inputMode="numeric"
              pattern="[0-9]*"
              required
              className="w-full px-4 py-2 rounded-lg bg-[#1b1b3a] text-white 
              focus:outline-none focus:ring-2 focus:ring-[#FF007F] 
              placeholder-gray-400 text-sm sm:text-base"
              onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}/>
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              E-mail
            </label>
            <input
              name="email"
              type="email"
              placeholder="seuemail@exemplo.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-[#1b1b3a] text-white 
              focus:outline-none focus:ring-2 focus:ring-[#FF007F] 
              placeholder-gray-400 text-sm sm:text-base"/>
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Senha
            </label>
            <div className="relative">
              <input
                name="senha"
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={formData.senha}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 pr-10 rounded-lg bg-[#1b1b3a] text-white 
                focus:outline-none focus:ring-2 focus:ring-[#FF007F] 
                placeholder-gray-400 text-sm sm:text-base"/>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 
                text-gray-400 cursor-pointer hover:text-[#FF007F] transition">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Requisitos de senha (validação) */}
            <ul className="text-xs mt-2 space-y-1">
              <li className={hasNumber ? "text-green-400" : "text-gray-400"}>
                • Contém números
              </li>
              <li
                className={
                  hasUpper && hasLower ? "text-green-400" : "text-gray-400"
                }>
                • Letras maiúsculas e minúsculas
              </li>
              <li className={hasSpecial ? "text-green-400" : "text-gray-400"}>
                • Caracteres especiais
              </li>
            </ul>
          </div>

          {/* Confirmar senha */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Confirmar senha
            </label>
            <div className="relative">
              <input
                name="confirmarSenha"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repita sua senha"
                value={formData.confirmarSenha}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 pr-10 rounded-lg bg-[#1b1b3a] text-white 
                focus:outline-none focus:ring-2 focus:ring-[#FF007F] 
                placeholder-gray-400 text-sm sm:text-base"/>
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 
                cursor-pointer text-gray-400 hover:text-[#FF007F] transition">
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Mensagens */}
          {error && <p className="text-red-400 text-sm">{error}</p>}
          {success && <p className="text-green-400 text-sm">{success}</p>}

          {/* Botão */}
          <button
            type="submit"
            className="mt-4 bg-[#FF007F] hover:bg-[#D6006A] transition cursor-pointer
            text-white font-semibold py-2 sm:py-3 rounded-lg w-full text-sm sm:text-base">
            Registrar
          </button>
        </form>

        {/* Links */}
        <div className="text-center mt-6 space-y-3">
          <p className="text-gray-400 text-xs sm:text-sm">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-[#FF007F] hover:underline cursor-pointer hover:text-[#ff3399]">
              Fazer login
            </Link>
          </p>

          <Link to="/" className="inline-block">
            <button
              className="border border-[#FF007F] text-[#FF007F] 
            px-6 py-2 rounded-lg hover:bg-[#FF007F] hover:text-white 
            cursor-pointer transition text-sm sm:text-base">
              Voltar para o início
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Register;
