import {useState} from "react";
import {Link} from "react-router-dom";
import {Menu, X} from "lucide-react";
import {motion, AnimatePresence} from "framer-motion";

function Dashboard() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#141333] text-white overflow-x-hidden">

      {/* BOTÃO DE MENU (visível apenas no mobile) */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-[#FF0066] p-2 rounded-md hover:bg-[#be004c] transition"
        onClick={() => setIsOpen(true)}
      >
        <Menu size={24} />
      </button>

      {/* MENU LATERAL FIXO NO DESKTOP */}
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

          <Link to="/login">
            <button className="w-full bg-[#FF0066] text-white py-2 rounded-lg hover:bg-[#be004c] transition">
              Sair
            </button>
          </Link>
        </div>  
      </aside>

      {/* MENU RETRÁTIL NO MOBILE */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Fundo escurecido com blur */}
            <motion.div
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsOpen(false)}
            />

            {/* Menu deslizante */}
            <motion.aside
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "spring", stiffness: 80 }}
              className="fixed top-0 left-0 h-full w-64 bg-[#0c0c22] p-6 z-50 flex flex-col justify-between md:hidden"
            >
              {/* Botão fechar */}
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
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

                <Link to="/login">
                  <button className="w-full bg-[#FF0066] text-white py-2 rounded-lg hover:bg-[#be004c] transition">
                    Sair
                  </button>
                </Link>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* CONTEÚDO PRINCIPAL */}
      <main
        className="
          flex-1 
          p-6 md:p-10
          mt-16 md:mt-0  /* Cria espaço no topo apenas em mobile */
          transition-all
        "
      >
        {/* Cabeçalho */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8 gap-2">
          <h2 className="text-2xl md:text-3xl font-bold text-[#FF0066]">
            Bem-vindo, Thiago
          </h2>
          <p className="text-gray-400 text-sm md:text-base">
            Último acesso: 07/11/2025
          </p>
        </div>

        {/* Saldo */}
        <div className="bg-[#0c0c22] p-5 md:p-6 rounded-xl shadow-lg mb-10 text-center md:text-left">
          <h3 className="text-lg text-gray-400 mb-2">Saldo disponível</h3>
          <p className="text-3xl md:text-4xl font-bold text-[#00ff9d]">
            R$ 4.572,90
          </p>
        </div>

        {/* Últimas transações */}
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

              <tbody className="divide-y divide-gray-700">
                <tr>
                  <td className="py-3">06/11/2025</td>
                  <td>Pagamento Mercado</td>
                  <td className="text-red-400">- R$ 159,90</td>
                </tr>
                <tr>
                  <td className="py-3">05/11/2025</td>
                  <td>Pix recebido - Juninho</td>
                  <td className="text-green-400">+ R$ 200,00</td>
                </tr>
                <tr>
                  <td className="py-3">03/11/2025</td>
                  <td>Conta de Luz</td>
                  <td className="text-red-400">- R$ 123,54</td>
                </tr>
                <tr>
                  <td className="py-3">01/11/2025</td>
                  <td>Depósito Salário</td>
                  <td className="text-green-400">+ R$ 5.000,00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;