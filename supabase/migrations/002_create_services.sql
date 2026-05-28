CREATE TABLE IF NOT EXISTS services (
  id BIGSERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  price DECIMAL(10,2) NOT NULL DEFAULT 0,
  category TEXT NOT NULL DEFAULT 'Outros',
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE services ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow all access via anon key"
  ON services
  FOR ALL
  USING (true)
  WITH CHECK (true);

-- Seed inicial com os serviços da Lara
INSERT INTO services (name, price, category) VALUES
  ('Tradicional (Mãos)', 25, 'Tradicional'),
  ('Mãos com Semi Permanente', 40, 'Tradicional'),
  ('Pés (spa) com Semi Permanente', 45, 'Tradicional'),
  ('Pés e Mãos com Semi Permanente', 75, 'Tradicional'),
  ('Blindagem', 50, 'Aplicação'),
  ('Banho de gel', 65, 'Aplicação'),
  ('Adicional Esmaltação Semi Permanente', 10, 'Aplicação'),
  ('Manutenção Alongamento de fibra', 65, 'Manutenção'),
  ('Manutenção com esmaltação semi', 75, 'Manutenção'),
  ('Alongamento de fibra', 85, 'Alongamento'),
  ('Alongamento fibra com semi permanente', 95, 'Alongamento'),
  ('Arte Encapsulada (2 unhas)', 10, 'Alongamento'),
  ('Arte Encap. Top Coat (2 unhas)', 5, 'Alongamento'),
  ('Nails arte', 5, 'Alongamento'),
  ('Plástica dos pés', 70, 'Outros'),
  ('Plástica dos pés + semi', 75, 'Outros'),
  ('Reposição de Unha (2 unhas)', 5, 'Outros'),
  ('Remoção de Alongamento', 20, 'Outros'),
  ('Francesinha Reversa (2 unhas)', 10, 'Outros'),
  ('Baby Boomer', 10, 'Outros'),
  ('Película o Par', 3, 'Outros'),
  ('Pedraria (2 unhas)', 3, 'Outros')
ON CONFLICT DO NOTHING;
