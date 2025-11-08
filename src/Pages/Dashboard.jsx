import {Link} from "react-router-dom";

function Dashboard() {
  return (
    <div className="flex min-h-screen bg-[#141333] text-white">

      {/* Menu Lateral */}
      <aside className="w-64 bg-[#0c0c22] flex flex-col justify-between p-6">
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
          <button className="w-full bg-[#FF0066] text-white 
          py-2 rounded-lg hover:bg-[#be004c] transition">
            Sair
          </button>
        </Link>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1 p-10">

        {/* Cabeçalho */}
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-[#FF0066]">
            Bem-vindo, Thiago
          </h2>
          <p className="text-gray-400">Último acesso: 07/11/2025</p>
        </div>

        {/* Saldo */}
        <div className="bg-[#0c0c22] p-6 rounded-xl shadow-lg mb-10">
          <h3 className="text-lg text-gray-400 mb-2">Saldo disponível</h3>
          <p className="text-4xl font-bold text-[#00ff9d]">R$ 4.572,90</p>
        </div>

        {/* Últimas transações */}
        <div>
          <h3 className="text-2xl font-semibold mb-4 text-[#FF0066]">
            Últimas transações
          </h3>

          <div className="bg-[#0c0c22] rounded-xl p-6 shadow-lg">
            <table className="w-full text-left">
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
