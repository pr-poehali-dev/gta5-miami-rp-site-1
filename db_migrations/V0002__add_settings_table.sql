CREATE TABLE settings (
    id SERIAL PRIMARY KEY,
    key VARCHAR(255) UNIQUE NOT NULL,
    value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO settings (key, value) VALUES 
    ('vk_app_id', 'YOUR_APP_ID'),
    ('vk_group_id', 'YOUR_GROUP_ID'),
    ('vk_button_text', 'Есть вопрос?');