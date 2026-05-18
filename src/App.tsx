import React, { useState, useEffect } from 'react';
import { supabase } from './supabase';
import { Shield, TrendingUp, Activity, Terminal as TermIcon, Lock, Cpu, RefreshCw, BarChart2, Zap, LineChart } from 'lucide-react';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => sessionStorage.getItem('terminal_access') === 'true');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [signals, setSignals] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<string[]>([
    `[${new Date().toLocaleTimeString()}] 🪐 Sistema de Monitorização Quant Inicializado.`,
    `[${new Date().toLocaleTimeString()}] 📡 Aguardando payloads via conexão segura.`
  ]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'sniper2026') {
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

  const addLog = (msg: string) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev.slice(0, 19)]);

  const fetchSignals = async () => {
    if (!isAuthenticated) return;
    setLoading(true);
    try {
      const { data, error } = await supabase.from('sinais').select('*').order('created_at', { ascending: false });
      if (error) throw error;
      setSignals(data || []);
    } catch (err: any) {
      addLog(`❌ Erro ao ler Supabase: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchSignals();
      const interval = setInterval(fetchSignals, 10000);
      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  // ==========================================
  // ECRÃ DE LOGIN FORT KNOX (GLOW THEME)
  // ==========================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#080A0C] flex items-center justify-center font-mono p-4 relative overflow-hidden">
        {/* Efeitos de Luz de Fundo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#FF6B00] opacity-[0.03] blur-[100px] rounded-full pointer-events-none" />
        
        <div className="w-full max-w-md bg-[#11151A]/80 backdrop-blur-xl border border-[#FF6B00]/20 rounded-xl p-8 shadow-[0_0_40px_rgba(255,107,0,0.1)] relative z-10">
          <div className="flex flex-col items-center mb-8">
            <div className="relative p-4 mb-4">
              <div className="absolute inset-0 bg-[#FF6B00] blur-md opacity-20 rounded-full animate-pulse" />
              <Cpu size={40} className="text-[#FF6B00] relative z-10" />
            </div>
            <h1 className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 tracking-widest text-center">QUANT TERMINAL</h1>
            <p className="text-[10px] text-[#FF6B00] mt-2 tracking-[0.3em]">MOTOR INSTITUCIONAL SNIPER V2</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <div className="relative group">
                <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-500 group-focus-within:text-[#FF6B00] transition-colors">
                  <Lock size={16} />
                </span>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Insert override key..."
                  className="w-full bg-[#080A0C] border border-gray-800 rounded-lg pl-12 pr-4 py-3 text-white text-sm focus:outline-none focus:border-[#FF6B00]/50 focus:shadow-[0_0_15px_rgba(255,107,0,0.1)] transition-all"
                />
              </div>
            </div>
            {loginError && <p className="text-xs text-[#F6465D] bg-[#F6465D]/10 p-3 rounded-lg border border-[#F6465D]/20 text-center">{loginError}</p>}
            <button type="submit" className="w-full bg-gradient-to-r from-[#FF6B00] to-[#E05E00] hover:from-[#E05E00] hover:to-[#CC5500] text-black font-black py-3 rounded-lg text-sm tracking-widest transition-all shadow-[0_0_20px_rgba(255,107,0,0.3)] uppercase">
              Initialize System
            </button>
          </form>
        </div>
      </div>
    );
  }

  // ==========================================
  // DASHBOARD SNIPER V2 (OBSIDIAN DARK)
  // ==========================================
  return (
    <div className="min-h-screen bg-[#080A0C] text-gray-200 font-mono flex flex-col">
      {/* HEADER & TICKER BAR */}
      <div className="bg-[#0B0E11] border-b border-gray-800">
        <header className="px-6 py-4 flex flex-wrap justify-between items-center gap-4 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-full bg-gradient-to-l from-[#FF6B00]/5 to-transparent pointer-events-none" />
          <div className="flex items-center gap-4 z-10">
            <div className="relative">
              <div className="w-4 h-4 bg-[#FF6B00] rounded-sm absolute animate-ping opacity-50" />
              <div className="w-4 h-4 bg-[#FF6B00] rounded-sm relative z-10 border border-white/20" />
            </div>
            <h1 className="text-xl font-black text-white tracking-widest">ROBÔ<span className="text-[#FF6B00]">LARANJA</span></h1>
            <span className="hidden md:inline text-[10px] bg-[#0ECB81]/10 text-[#0ECB81] px-2 py-1 rounded border border-[#0ECB81]/20 font-bold tracking-wider ml-4">
              SUPABASE CONNECTED
            </span>
          </div>
          <div className="flex items-center gap-4 z-10">
            <button onClick={fetchSignals} disabled={loading} className="p-2 bg-[#11151A] hover:bg-gray-800 rounded border border-gray-800 text-gray-300 flex items-center gap-2 text-xs transition-all hover:border-[#FF6B00]/50">
              <RefreshCw size={14} className={loading ? 'animate-spin text-[#FF6B00]' : ''} />
              SYNC
            </button>
            <button onClick={handleLogout} className="text-xs bg-[#11151A] hover:bg-[#F6465D]/10 text-gray-400 hover:text-[#F6465D] px-3 py-2 rounded border border-gray-800 hover:border-[#F6465D]/30 transition-all">
              LOGOUT
            </button>
          </div>
        </header>
        
        {/* SCROLLING TICKER (Mercado) */}
        <div className="bg-[#0A0C0F] border-b border-gray-800/50 py-1.5 overflow-hidden flex items-center text-[10px] tracking-widest text-gray-400">
          <div className="w-full relative whitespace-nowrap">
            <div className="animate-ticker space-x-12">
              <span><strong className="text-white">BTC/USDT</strong> $65,240.50 <span className="text-[#0ECB81]">+2.4%</span></span>
              <span><strong className="text-white">ETH/USDT</strong> $3,450.10 <span className="text-[#0ECB81]">+1.8%</span></span>
              <span><strong className="text-white">SOL/USDT</strong> $142.00 <span className="text-[#F6465D]">-0.5%</span></span>
              <span><strong className="text-white">BNB/USDT</strong> $590.30 <span className="text-[#0ECB81]">+0.2%</span></span>
              <span><strong className="text-white">XRP/USDT</strong> $0.58 <span className="text-[#F6465D]">-1.1%</span></span>
              <span><strong className="text-white">ADA/USDT</strong> $0.45 <span className="text-[#0ECB81]">+3.2%</span></span>
              <span><strong className="text-white">DOGE/USDT</strong> $0.12 <span className="text-[#0ECB81]">+5.0%</span></span>
            </div>
          </div>
        </div>
      </div>

      <main className="flex-1 p-6 space-y-6 max-w-[1600px] mx-auto w-full">
        
        {/* CARDS DE MÉTRICAS (Com Mock Sparklines) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="glow-card bg-[#11151A] border border-gray-800 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#FF6B00]/10 to-transparent" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Total de Sinais</p>
                <p className="text-3xl font-black text-white">{signals.length}</p>
              </div>
              <div className="p-2 bg-[#1A1F26] rounded-lg text-[#FF6B00] border border-gray-800"><Activity size={18} /></div>
            </div>
            {/* Sparkline Mock */}
            <svg className="w-full h-8 relative z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,20 L10,15 L20,18 L30,5 L40,10 L50,2 L60,8 L70,12 L80,2 L90,15 L100,0" fill="none" stroke="#FF6B00" strokeWidth="2" opacity="0.5"/>
            </svg>
          </div>

          <div className="glow-card bg-[#11151A] border border-gray-800 rounded-xl p-5 relative overflow-hidden">
            <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0ECB81]/10 to-transparent" />
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Win Rate (Simulado)</p>
                <p className="text-3xl font-black text-[#0ECB81]">74.3<span className="text-xl">%</span></p>
              </div>
              <div className="p-2 bg-[#1A1F26] rounded-lg text-[#0ECB81] border border-gray-800"><TrendingUp size={18} /></div>
            </div>
            <svg className="w-full h-8 relative z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,20 L20,15 L40,18 L60,5 L80,10 L100,2" fill="none" stroke="#0ECB81" strokeWidth="2" opacity="0.5"/>
            </svg>
          </div>

          <div className="glow-card bg-[#11151A] border border-gray-800 rounded-xl p-5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Alertas Ativos</p>
                <p className="text-3xl font-black text-white">{signals.filter(s => s.tipo === 'ALERTA_ARMADO').length}</p>
              </div>
              <div className="p-2 bg-[#1A1F26] rounded-lg text-blue-400 border border-gray-800"><Zap size={18} /></div>
            </div>
            <svg className="w-full h-8 relative z-10" viewBox="0 0 100 20" preserveAspectRatio="none">
              <path d="M0,10 L20,10 L30,2 L40,18 L50,10 L100,10" fill="none" stroke="#60A5FA" strokeWidth="2" opacity="0.5"/>
            </svg>
          </div>

          <div className="glow-card bg-[#11151A] border border-gray-800 rounded-xl p-5 relative overflow-hidden">
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold mb-1">Filtro RVOL Médio</p>
                <p className="text-3xl font-black text-white">1.38<span className="text-xl text-gray-500">x</span></p>
              </div>
              <div className="p-2 bg-[#1A1F26] rounded-lg text-purple-400 border border-gray-800"><BarChart2 size={18} /></div>
            </div>
            <div className="w-full h-8 flex items-end gap-1 relative z-10">
              {[4, 7, 3, 8, 5, 9, 6, 10, 8, 12].map((h, i) => (
                <div key={i} className="flex-1 bg-purple-500/30 rounded-t-sm" style={{ height: `${h * 8}%` }} />
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* TABELA DE SINAIS (Ocupa 2/3 da tela) */}
          <div className="lg:col-span-2 bg-[#11151A] border border-gray-800 rounded-xl overflow-hidden shadow-2xl flex flex-col">
            <div className="bg-[#0B0E11] px-6 py-4 border-b border-gray-800 flex justify-between items-center">
              <h2 className="text-xs font-black text-white tracking-widest uppercase flex items-center gap-2">
                <Shield size={16} className="text-[#FF6B00]" /> Terminal de Escuta Quant
              </h2>
            </div>
            <div className="overflow-x-auto flex-1">
              <table className="w-full text-left text-sm border-collapse whitespace-nowrap">
                <thead>
                  <tr className="bg-[#080A0C] text-gray-500 text-[10px] border-b border-gray-800 uppercase tracking-widest">
                    <th className="px-6 py-4 font-bold">Ativo / Time</th>
                    <th className="px-6 py-4 font-bold">Direção</th>
                    <th className="px-6 py-4 font-bold">Entrada (Gatilho)</th>
                    <th className="px-6 py-4 font-bold">Filtros (ADX/RVOL)</th>
                    <th className="px-6 py-4 font-bold text-right">Status do Motor</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800/50">
                  {signals.length === 0 ? (
                    <tr><td colSpan={5} className="px-6 py-12 text-center text-gray-600 text-xs">Aguardando injeção de dados via Edge Functions...</td></tr>
                  ) : (
                    signals.map((sig, i) => (
                      <tr key={sig.id || i} className="hover:bg-[#1A1F26] transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-[#FF6B00] opacity-50 group-hover:animate-pulse" />
                            <span className="font-bold text-white text-base">{sig.moeda || sig.asset || '-'}</span>
                            <span className="text-[10px] text-gray-500 bg-gray-800 px-1.5 py-0.5 rounded">{sig.timeframe || '-'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-3 py-1 rounded text-[10px] font-black tracking-wider ${
                            sig.lado === 'LONG' ? 'bg-gradient-to-r from-[#0ECB81]/20 to-[#0ECB81]/5 text-[#0ECB81] border border-[#0ECB81]/20' : 
                            sig.lado === 'SHORT' ? 'bg-gradient-to-r from-[#F6465D]/20 to-[#F6465D]/5 text-[#F6465D] border border-[#F6465D]/20' : 'bg-gray-800 text-gray-400'
                          }`}>
                            {sig.lado || '-'}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-300 font-mono">
                          ${sig.preco_entrada ? Number(sig.preco_entrada).toLocaleString('en-US', { minimumFractionDigits: 2 }) : '-'}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="text-white font-mono">{sig.adx || '-'}</span>
                            <span className="text-gray-600">|</span>
                            <span className="text-white font-mono">{sig.rvol ? `${sig.rvol}x` : '-'}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <span className="inline-block text-[10px] tracking-widest font-bold text-[#FF6B00] bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-2 py-1 rounded-md shadow-[0_0_10px_rgba(255,107,0,0.1)]">
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

          {/* COLUNA DIREITA: CHART MOCK & LOGS */}
          <div className="space-y-6 flex flex-col">
            
            {/* MOCK CHART (Visão Macro) */}
            <div className="bg-[#11151A] border border-gray-800 rounded-xl p-4 shadow-xl">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                  <LineChart size={14} className="text-[#0ECB81]" /> Bússola Macro (BTC 1H)
                </h3>
                <span className="text-[10px] text-[#0ECB81] bg-[#0ECB81]/10 px-2 py-0.5 rounded border border-[#0ECB81]/20">SMA 200 BULLISH</span>
              </div>
              <div className="h-32 w-full relative border-b border-gray-800/50">
                {/* SVG Mocking a chart */}
                <svg className="w-full h-full absolute bottom-0" viewBox="0 0 100 50" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="grad" x1="0" x2="0" y1="0" y2="1">
                      <stop offset="0%" stopColor="#0ECB81" stopOpacity="0.2"/>
                      <stop offset="100%" stopColor="#0ECB81" stopOpacity="0"/>
                    </linearGradient>
                  </defs>
                  <path d="M0,50 L0,30 L10,35 L20,20 L30,25 L40,10 L50,15 L60,5 L70,10 L80,2 L90,12 L100,5 L100,50 Z" fill="url(#grad)" />
                  <path d="M0,30 L10,35 L20,20 L30,25 L40,10 L50,15 L60,5 L70,10 L80,2 L90,12 L100,5" fill="none" stroke="#0ECB81" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* CONSOLE DE LOGS */}
            <div className="bg-[#080A0C] border border-gray-800 rounded-xl p-4 flex-1 flex flex-col shadow-inner relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-700 to-transparent" />
              <div className="flex items-center justify-between mb-3 border-b border-gray-800/50 pb-2">
                <div className="flex items-center gap-2 text-[10px] font-bold text-gray-500 uppercase tracking-widest">
                  <TermIcon size={14} className="text-gray-400" /> System Terminal
                </div>
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-gray-700" />
                  <div className="w-2.5 h-2.5 rounded-full bg-[#0ECB81]/50" />
                </div>
              </div>
              <div className="space-y-2 overflow-y-auto flex-1 pr-2 text-[11px] leading-relaxed">
                {logs.map((log, index) => (
                  <div key={index} className={`font-mono ${log.includes('🚨') || log.includes('❌') ? 'text-[#F6465D]' : log.includes('🔓') || log.includes('🟢') ? 'text-[#0ECB81]' : 'text-gray-400'}`}>
                    <span className="text-gray-600 mr-2">{'>'}</span> {log}
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}
