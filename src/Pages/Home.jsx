import {motion} from "framer-motion";
import {Link} from "react-router-dom";
import "../App.css";

function Home() {
    {/* Transição entre telas */}
  return (
    <motion.div
      className="flex flex-col min-h-screen bg-[#141333] text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5 }}>
        
      {/* Cabeçalho */}
      <header className="w-full bg-[#0c0c22] text-[#FF0066] flex justify-between items-center p-4 shadow-lg">
        <h1 className="text-3xl font-bold">Banco Maneiro</h1>

        {/* Botões */}
        <div className="flex space-x-4">
          <Link to="/login">
            <button className="bg-[#FF0066] font-bold text-white 
            px-6 py-2 rounded-lg hover:bg-[#be004c] transition">
              Login
            </button>
          </Link>

          <Link to="/register">
            <button className="border border-[#FF0066] text-[#FF0066] font-bold
             px-6 py-2 rounded-lg hover:bg-[#FF0066] hover:text-white transition">
              Registrar
            </button>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main className="flex flex-col grow justify-center items-center text-center px-4">
        <h2 className="text-5xl font-bold mb-4 text-[#FF0066]">
          Bem-vindo ao Banco Maneiro
        </h2>
        <p className="text-lg max-w-xl mb-8 text-gray-300">
          Seu banco digital seguro, prático e muito maneiro.
        </p>

        <Link to="/register">
          <button className="bg-[#FF0066] font-bold text-white px-10 
          py-4 rounded-lg hover:bg-[#be004c] transition">
            Abra sua conta
          </button>
        </Link>
      </main>

      {/* Rodapé */}
      <footer className="bg-[#040020] text-center py-4 text-sm text-gray-400">
        © {new Date().getFullYear()} Banco Maneiro. Todos os direitos reservados.
      </footer>
    </motion.div>
  );
}

export default Home;
