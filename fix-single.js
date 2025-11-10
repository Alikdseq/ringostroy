import fs from 'fs';

const filePath = process.argv[2];

if (!filePath) {
  console.error('Укажите путь к файлу');
  process.exit(1);
}

let content = fs.readFileSync(filePath, 'utf8');

// Исправляем оставшиеся проблемы с фигурными скобками
content = content.replace(
  /<p style=\(\s*\n\s*fontSize:[^)]+\)"\s*>/g,
  match => match.replace('style=(', 'style={{').replace(')"', '}}')
);

// Исправляем отсутствующие фигурные скобки в многострочных стилях
content = content.replace(
  /style={\s*\n\s*([^}]+)\n\s*}/g,
  'style={{\n$1\n}}'
);

// Исправляем конкретный проблемный параграф
content = content.replace(
  /<p style=\(\s*\n\s*fontSize: '16px',\s*\n\s*lineHeight: 1\.8,\s*\n\s*color: 'var\(--white\)',\s*\n\s*marginBottom: '20px'"\s*\)\s*>/g,
  `<p style={{\n  fontSize: '16px',\n  lineHeight: 1.8,\n  color: 'var(--white)',\n  marginBottom: '20px'\n}}>`
);

fs.writeFileSync(filePath, content, 'utf8');
console.log(`✅ Файл исправлен: ${filePath}`);