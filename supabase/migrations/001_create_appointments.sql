-- Tabela de agendamentos do Lara Nails Pro
-- Execute no SQL Editor do Supabase:
-- https://supabase.com/dashboard/project/qelfhfjbmnakaeinllkg/sql/new

CREATE TABLE IF NOT EXISTS appointments (
  id          BIGSERIAL PRIMARY KEY,
  client_name TEXT NOT NULL,
  client_email TEXT,
  client_phone TEXT,
  service_name TEXT NOT NULL DEFAULT 'Manucure Russe',
  appointment_date DATE NOT NULL DEFAULT CURRENT_DATE,
  appointment_time TIME NOT NULL DEFAULT '14:00',
  price       DECIMAL(10,2) DEFAULT 0,
  status      TEXT NOT NULL DEFAULT 'confirmed'
    CHECK (status IN ('confirmed', 'pending', 'cancelled')),
  notes       TEXT,
  created_at  TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Índice para buscas por data
CREATE INDEX IF NOT EXISTS idx_appointments_date
  ON appointments (appointment_date);

-- Índice para buscas por cliente
CREATE INDEX IF NOT EXISTS idx_appointments_client
  ON appointments (client_email, client_phone);

-- Habilita RLS mas permite acesso público com a anon key
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access via anon key"
  ON appointments
  FOR ALL
  USING (true)
  WITH CHECK (true);
