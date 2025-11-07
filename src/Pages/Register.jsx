import {motion} from "framer-motion";
import {Link} from "react-router-dom";

function Register() {
    {/* Transição entre telas */}
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-[#0B0B1D] text-white px-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}>

      {/* Card de Registro */}
      <div className="bg-[#111133] w-full max-w-md p-8 rounded-2xl shadow-xl border border-[#1e1e3f]">
        <h1 className="text-3xl font-bold text-[#FF007F] text-center mb-6">
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
              focus:outline-none focus:ring-2 focus:ring-[#FF007F] placeholder-gray-400"/>
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
              focus:outline-none focus:ring-2 focus:ring-[#FF007F] placeholder-gray-400"/>
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Senha
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 rounded-lg bg-[#1b1b3a] text-white 
              focus:outline-none focus:ring-2 focus:ring-[#FF007F] placeholder-gray-400"/>
          </div>

          {/* Confirmar senha */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Confirmar senha
            </label>
            <input
              type="password"
              placeholder="Repita sua senha"
              className="w-full px-4 py-2 rounded-lg bg-[#1b1b3a] text-white 
              focus:outline-none focus:ring-2 focus:ring-[#FF007F] placeholder-gray-400"/>
          </div>

          {/* Botão */}
          <button
            type="submit"
            className="mt-4 bg-[#FF007F] hover:bg-[#D6006A] 
            transition text-white font-semibold py-2 rounded-lg">
            Registrar
          </button>
        </form>

        {/* Voltar */}
        <div className="text-center mt-6">
          <p className="text-gray-400 text-sm">
            Já tem uma conta?{" "}
            <Link
              to="/login"
              className="text-[#FF007F] hover:underline hover:text-[#ff3399]">
              Fazer login
            </Link>
          </p>

          <Link to="/" className="inline-block mt-4">
            <button className="border border-[#FF007F] text-[#FF007F] px-6 py-2 
            rounded-lg hover:bg-[#FF007F] hover:text-white transition">
              Voltar para o início
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Register;
