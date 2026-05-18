import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://jzgyaasebgdrhsxwdeqd.supabase.co';
// ⚠️ ATENÇÃO: Substitua o texto abaixo pela sua chave anon pública real do Supabase
const SUPABASE_ANON_KEY = 'COLE_AQUI_A_SUA_CHAVE_ANON_GIGANTE_QUE_COMECA_COM_eyJ';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);