import {motion} from "framer-motion";
import {Link} from "react-router-dom";

function Login() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center min-h-screen bg-[#0B0B1D] text-white px-6 overflow-x-hidden"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Card de Login */}
      <div className="bg-[#111133] w-full max-w-md sm:max-w-lg p-6 sm:p-8 rounded-2xl shadow-xl border border-[#1e1e3f]">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#FF007F] text-center mb-6">
          Entrar na Conta
        </h1>

        <form className="flex flex-col space-y-4">
          {/* E-mail */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              E-mail
            </label>
            <input
              type="email"
              placeholder="seuemail@exemplo.com"
              className="w-full px-4 py-2 rounded-lg bg-[#1b1b3a]
               text-white focus:outline-none focus:ring-2 
               focus:ring-[#FF007F] placeholder-gray-400 text-sm sm:text-base"
            />
          </div>

          {/* Senha */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Senha
            </label>
            <input
              type="password"
              placeholder="Digite sua senha"
              className="w-full px-4 py-2 rounded-lg bg-[#1b1b3a] 
              text-white focus:outline-none focus:ring-2 
              focus:ring-[#FF007F] placeholder-gray-400 text-sm sm:text-base"
            />
          </div>

          {/* Esqueci minha senha */}
          <div className="text-right text-xs sm:text-sm">
            <Link
              to="#"
              className="text-[#FF007F] hover:underline hover:text-[#ff3399]"
            >
              Esqueci minha senha
            </Link>
          </div>

          {/* Botão Entrar */}
          <div className="text-center mt-6">
            <Link to="/dashboard">
              <button className="bg-[#FF0066] text-white 
              px-8 sm:px-10 py-2 sm:py-3 rounded-lg font-semibold 
              hover:bg-[#be004c] transition text-sm sm:text-base w-full">
                Entrar
              </button>
            </Link>
          </div>
        </form>

        {/* Criar conta */}
        <div className="text-center mt-6 space-y-3">
          <p className="text-gray-400 text-xs sm:text-sm">
            Ainda não tem uma conta?{" "}
            <Link
              to="/register"
              className="text-[#FF007F] hover:underline hover:text-[#ff3399]"
            >
              Registrar
            </Link>
          </p>

          <Link to="/" className="inline-block">
            <button className="border border-[#FF007F] text-[#FF007F] px-6 
            py-2 rounded-lg hover:bg-[#FF007F] hover:text-white transition text-sm sm:text-base">
              Voltar para o início
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default Login;
