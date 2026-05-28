// Script para criar o usuário administrador no Supabase Auth
// Execute uma vez: npx tsx scripts/setup-admin-user.ts
//
// Credenciais:
//   Email:    lara@nails.pro
//   Senha:    LaraNails2026!

import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mzdqptlzjketgunnpuwq.supabase.co'
const supabaseAnonKey = 'sb_publishable_8s4eJBb1zq3taK_sdG9s9w_yZBqAsTM'

// Nota: Para criar usuários via API pública, a opção "Enable email confirmations"
// precisa estar DESATIVADA no painel do Supabase (Authentication > Settings).
// Se estiver ativada, crie o usuário manualmente pelo painel:
//   Authentication > Users > Add User > Create User

async function main() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)

  console.log('Criando usuário admin...\n')

  const { data, error } = await supabase.auth.signUp({
    email: 'lara@nails.pro',
    password: 'LaraNails2026!',
    options: {
      data: {
        name: 'Lara Nails',
        role: 'admin',
      },
    },
  })

  if (error) {
    if (error.message?.includes('already registered') || error.status === 429) {
      console.log('⚠️  Usuário já existe. Tentando fazer login para verificar...\n')

      const { error: loginError } = await supabase.auth.signInWithPassword({
        email: 'lara@nails.pro',
        password: 'LaraNails2026!',
      })

      if (loginError) {
        console.error('❌ Usuário existe mas a senha está incorreta.')
        console.error('   Redefina a senha no painel do Supabase:')
        console.error('   Authentication > Users > selecione o usuário > Reset Password\n')
      } else {
        console.log('✅ Usuário admin já existe e as credenciais estão corretas!')
        console.log('   Email:    lara@nails.pro')
        console.log('   Senha:    LaraNails2026!\n')
      }
      return
    }
    console.error('❌ Erro ao criar usuário:', error.message)
    console.error('\nProvavelmente "Email confirmations" está ativado no Supabase.')
    console.error('Crie o usuário manualmente no painel:')
    console.error('  1. Acesse https://supabase.com/dashboard/project/qelfhfjbmnakaeinllkg')
    console.error('  2. Authentication > Users > Add User > Create User')
    console.error('  3. Email: lara@nails.pro')
    console.error('  4. Password: LaraNails2026!')
    console.error('  5. Marque "Auto Confirm User"\n')
    return
  }

  if (data.user) {
    console.log('✅ Usuário admin criado com sucesso!')
    console.log('   Email:    lara@nails.pro')
    console.log('   Senha:    LaraNails2026!')
    console.log('   ID:       ', data.user.id)
    console.log('\n⚠️  Importante: guarde estas credenciais em local seguro.\n')
  }
}

main()
