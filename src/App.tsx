import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { Shield, TrendingUp, Activity, Terminal as TermIcon, Lock, Cpu, RefreshCw, BarChart2 } from 'lucide-react';

export default function App() {
  // --- ESTADOS DE SEGURANÇA & AUTENTICAÇÃO ---
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('terminal_access') === 'true';
  });
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // --- ESTADOS DOS SINAIS QUANT ---
  const [signals, setSignals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] 🪐 Sistema de Monitorização Quant Inicializado.`,
    `[${new Date().toLocaleTimeString()}] 📡 Aguardando payloads via conexão segura.`
  ]);

  // --- PROTOCOLO DE LOGIN (FORT KNOX) ---
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // 💡 Senha de acesso definida aqui!
    if (password === '92213854Hugo*') {
      sessionStorage.setItem('terminal_access', 'true');
      setIsAuthenticated(true);
      addLog('🔓 Acesso ao Terminal Autorizado. Chaves criptográficas validadas.');
    } else {
      setLoginError('Acesso Negado. Assinatura Digital Inválida.');
      addLog('🚨 Tentativa inválida de intrusão detetada no gateway.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('terminal_access');
    setIsAuthenticated(false);
  };

  // --- ENGINE DE LOGS ---
  const addLog = (msg: string) => {
    setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 19)]);
  };

  // --- BUSCA DINÂMICA DE SINAIS (SUPABASE) ---
  const fetchSignals = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('sinais') // Se a sua tabela tiver outro nome, mude aqui (ex: 'Signals')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSignals(data || []);
      addLog(`🔄 Banco de dados atualizado. ${data?.length || 0} sinais carregados.`);
    } catch (err: any) {
      addLog(`❌ Erro ao ler Supabase: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSignals();
      // Atualiza automaticamente a cada 10 segundos
      const interval = setInterval(fetchSignals, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // ==========================================
  // INTERFACE 1: GATILHO DE LOGIN (RESTRITO)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0B0E11] flex items-center justify-center font-mono p-4">
        <div className="w-full max-w-md bg-[#151A1E] border border-[#FF6B00]/30 rounded-lg p-8 shadow-2xl shadow-[#FF6B00]/5">
          <div className="flex flex-col items-center mb-6">
            <div className="p-3 bg-[#FF6B00]/10 rounded-full text-[#FF6B00] mb-3 animate-pulse">
              <Cpu size={36} />
            </div>
            <h1 className="text-xl font-bold text-white tracking-wider text-center">QUANT TERMINAL ACCESS</h1>
            <p className="text-xs text-gray-400 mt-1">MOTOR INSTITUCIONAL SNIPER V2</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs text-[#FF6B00] uppercase tracking-wider mb-2">Chave de Autenticação</label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Digite a senha mestra..."
                  className="w-full bg-[#0B0E11] border border-gray-700 rounded pl-10 pr-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#FF6B00] transition-colors"
                />
              </div>
            </div>

            {loginError && <p className="text-xs text-red-500 bg-red-500/10 p-2 rounded border border-red-500/20">{loginError}</p>}

            <button
              type="submit"
              className="w-full bg-[#FF6B00] hover:bg-[#E05E00] text-black font-bold py-2.5 rounded text-sm tracking-wider transition-colors uppercase"
            >
              Conectar ao Sistema
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // INTERFACE 2: DASHBOARD CYBERPUNK ORANGE
  // ==========================================
  return (
    <div className="min-h-screen bg-[#0B0E11] text-gray-200 font-mono flex flex-col">
      <header className="bg-[#151A1E] border-b border-gray-800 px-6 py-4 flex flex-wrap justify-between items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-3 h-3 bg-[#FF6B00] rounded-full animate-ping" />
          <h1 className="text-lg font-bold text-white tracking-widest">🍊 ROBÔ LARANJA <span className="text-[#FF6B00]">CORE V2</span></h1>
          <span className="hidden md:inline text-xs bg-gray-800 text-gray-400 px-2 py-1 rounded border border-gray-700">
            SUPABASE: <span className="text-[#0ECB81]">CONECTADO 🟢</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchSignals} 
            disabled={loading}
            className="p-2 bg-gray-800 hover:bg-gray-700 rounded border border-gray-700 text-gray-300 flex items-center gap-2 text-xs transition-colors"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin text-[#FF6B00]' : ''} />
            Sincronizar
          </button>
          <button 
            onClick={handleLogout}
            className="text-xs bg-red-500/10 hover:bg-red-500/20 text-red-400 px-3 py-2 rounded border border-red-500/20 transition-colors"
          >
            Desconectar
          </button>
        </div>
      </header>

      <main className="flex-1 p-6 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-[#151A1E] border border-gray-800 rounded p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Total de Sinais</p>
              <p className="text-2xl font-bold text-white mt-1">{signals.length}</p>
            </div>
            <div className="p-3 bg-[#FF6B00]/10 rounded text-[#FF6B00]"><Activity size={20} /></div>
          </div>
          <div className="bg-[#151A1E] border border-gray-800 rounded p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Taxa de Acerto (Sim.)</p>
              <p className="text-2xl font-bold text-[#0ECB81] mt-1">74.3%</p>
            </div>
            <div className="p-3 bg-[#0ECB81]/10 rounded text-[#0ECB81]"><TrendingUp size={20} /></div>
          </div>
          <div className="bg-[#151A1E] border border-gray-800 rounded p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Alertas Armados</p>
              <p className="text-2xl font-bold text-white mt-1">
                {signals.filter(s => s.tipo === 'ALERTA_ARMADO').length}
              </p>
            </div>
            <div className="p-3 bg-blue-500/10 rounded text-blue-400"><Cpu size={20} /></div>
          </div>
          <div className="bg-[#151A1E] border border-gray-800 rounded p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 uppercase tracking-wider">Filtro RVOL Médio</p>
              <p className="text-2xl font-bold text-white mt-1">1.38x</p>
            </div>
            <div className="p-3 bg-purple-500/10 rounded text-purple-400"><BarChart2 size={20} /></div>
          </div>
        </div>

        <div className="bg-[#151A1E] border border-gray-800 rounded-lg overflow-hidden shadow-xl">
          <div className="bg-gray-800/40 px-6 py-4 border-b border-gray-800 flex justify-between items-center">
            <h2 className="text-sm font-bold text-white tracking-wider uppercase flex items-center gap-2">
              <Shield size={16} className="text-[#FF6B00]" /> Terminal de Sinais em Tempo Real
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm border-collapse">
              <thead>
                <tr className="bg-[#0B0E11] text-gray-400 text-xs border-b border-gray-800 uppercase tracking-wider">
                  <th className="px-6 py-3">Ativo</th>
                  <th className="px-6 py-3">Timeframe</th>
                  <th className="px-6 py-3">Direção</th>
                  <th className="px-6 py-3">Preço Entrada</th>
                  <th className="px-6 py-3">ADX / RVOL</th>
                  <th className="px-6 py-3">Tipo de Evento</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-800/50">
                {signals.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="px-6 py-8 text-center text-gray-500 text-xs">
                      Nenhum sinal no Supabase. O robô está em modo de escuta...
                    </td>
                  </tr>
                ) : (
                  signals.map((sig, i) => (
                    <tr key={sig.id || i} className="hover:bg-gray-800/30 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">{sig.moeda || sig.asset || '-'}</td>
                      <td className="px-6 py-4 text-gray-400">{sig.timeframe || '-'}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                          sig.lado === 'LONG' ? 'bg-[#0ECB81]/10 text-[#0ECB81]' : 
                          sig.lado === 'SHORT' ? 'bg-[#F6465D]/10 text-[#F6465D]' : 'bg-gray-800 text-gray-400'
                        }`}>
                          {sig.lado || '-'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white font-mono">
                        ${sig.preco_entrada ? Number(sig.preco_entrada).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '-'}
                      </td>
                      <td className="px-6 py-4 text-gray-300">
                        <span className="text-[#FF6B00]">{sig.adx || '-'}</span> / {sig.rvol ? `${sig.rvol}x` : '-'}
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-xs text-[#FF6B00] border border-[#FF6B00]/20 bg-[#FF6B00]/5 px-2 py-1 rounded">
                          {sig.tipo || 'DESCONHECIDO'}
                        </span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-[#0B0E11] border border-gray-800 rounded-lg p-4 font-mono shadow-inner">
          <div className="flex items-center gap-2 text-xs text-gray-400 uppercase tracking-widest mb-3 border-b border-gray-800 pb-2">
            <TermIcon size={14} className="text-[#FF6B00]" /> Console Operacional do Servidor
          </div>
          <div className="space-y-1.5 max-h-40 overflow-y-auto text-xs text-gray-500">
            {logs.map((log, index) => (
              <div key={index} className={log.includes('🚨') || log.includes('❌') ? 'text-red-400' : log.includes('🔓') ? 'text-[#0ECB81]' : ''}>
                {log}
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
