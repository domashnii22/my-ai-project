INSERT INTO buyer (id, name) VALUES
  (gen_random_uuid(), 'Алексей'),
  (gen_random_uuid(), 'Анастасия')
ON CONFLICT (name) DO NOTHING;

INSERT INTO category (id, name) VALUES
  (gen_random_uuid(), 'Продукты'),
  (gen_random_uuid(), 'Транспорт'),
  (gen_random_uuid(), 'Коммунальные услуги'),
  (gen_random_uuid(), 'Развлечения'),
  (gen_random_uuid(), 'Здоровье'),
  (gen_random_uuid(), 'Одежда'),
  (gen_random_uuid(), 'Прочее')
ON CONFLICT (name) DO NOTHING;
