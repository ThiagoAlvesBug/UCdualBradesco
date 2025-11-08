import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function Register() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Regras de validação
  const hasNumber = /\d/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasLower = /[a-z]/.test(password);
  const hasSpecial = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-[#0B0B1D] text-white px-6 overflow-x-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      {/* Card de Registro */}
      <div className="bg-[#111133] w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-[#1e1e3f]">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#FF007F] text-center mb-6">
          Crie sua Conta
        </h1>

        <form className="flex flex-col space-y-4">
          {/* Nome */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Nome completo
            </label>
            <input
              type="text"
              placeholder="Digite seu nome"
              className="w-full px-4 py-2 rounded-lg bg-[#1b1b3a] text-white 
              focus:outline-none focus:ring-2 focus:ring-[#FF007F] 
              placeholder-gray-400 text-sm sm:text-base"
            />
          </div>

          {/* Celular */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Celular
            </label>
            <input
              type="text"
              placeholder="Seu número de celular"
              className="w-full px-4 py-2 rounded-lg bg-[#1b1b3a] text-white 
              focus:outline-none focus:ring-2 focus:ring-[#FF007F] 
              placeholder-gray-400 text-sm sm:text-base"
              inputMode="numeric"
              pattern="[0-9]*"
              onInput={(e) =>
                (e.target.value = e.target.value.replace(/\D/g, ""))
              }
            />
          </div>

          {/* E-mail */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              E-mail
            </label>
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-2 rounded-lg bg-[#1b1b3a] text-white 
              focus:outline-none focus:ring-2 focus:ring-[#FF007F] 
              placeholder-gray-400 text-sm sm:text-base"
            />
          </div>

          {/* Senha com botão para mostrar/ocultar */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Senha
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Digite sua senha"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 pr-10 rounded-lg bg-[#1b1b3a] text-white 
                focus:outline-none focus:ring-2 focus:ring-[#FF007F] 
                placeholder-gray-400 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF007F] transition"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Lista de requisitos */}
            <ul className="text-xs mt-2 space-y-1">
              <li className={hasNumber ? "text-green-400" : "text-gray-400"}>
                • Contém números
              </li>
              <li
                className={
                  hasUpper && hasLower ? "text-green-400" : "text-gray-400"
                }
              >
                • Letras maiúsculas e minúsculas
              </li>
              <li className={hasSpecial ? "text-green-400" : "text-gray-400"}>
                • Caracteres especiais (como / _ -)
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
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Repita sua senha"
                className="w-full px-4 py-2 pr-10 rounded-lg bg-[#1b1b3a] text-white 
                focus:outline-none focus:ring-2 focus:ring-[#FF007F] 
                placeholder-gray-400 text-sm sm:text-base"
              />
              <button
                type="button"
                onClick={() =>
                  setShowConfirmPassword(!showConfirmPassword)
                }
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#FF007F] transition"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Botão Registrar */}
          <button
            type="submit"
            className="mt-4 bg-[#FF007F] hover:bg-[#D6006A] transition 
            text-white font-semibold py-2 sm:py-3 rounded-lg w-full text-sm sm:text-base"
          >
            Registrar
          </button>
        </form>

        {/* Links de navegação */}
        <div className="text-center mt-6 space-y-3">
          <p className="text-gray-400 text-xs sm:text-sm">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-[#FF007F] hover:underline hover:text-[#ff3399]"
            >
              Fazer login
            </Link>
          </p>

          <Link to="/" className="inline-block">
            <button
              className="border border-[#FF007F] text-[#FF007F] 
            px-6 py-2 rounded-lg hover:bg-[#FF007F] hover:text-white 
            transition text-sm sm:text-base"
            >
              Voltar para o início
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Register;
