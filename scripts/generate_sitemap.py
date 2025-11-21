#!/usr/bin/env python3
"""
Скрипт для генерации sitemap.xml для фронтенда
Читает данные из equipment.json и services.json и создает полный sitemap
"""

import json
from datetime import date
from pathlib import Path

BASE_DIR = Path(__file__).parent.parent
DATA_DIR = BASE_DIR / 'src' / 'data'
OUTPUT_DIR = BASE_DIR / 'public'
SITEMAP_FILE = OUTPUT_DIR / 'sitemap.xml'

BASE_URL = 'https://ringoostroy.ru'
TODAY = date.today().isoformat()

def load_json(file_path: Path):
    """Загружает JSON файл"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            return json.load(f)
    except FileNotFoundError:
        print(f"Файл не найден: {file_path}")
        return None
    except json.JSONDecodeError as e:
        print(f"Ошибка парсинга JSON {file_path}: {e}")
        return None

def generate_sitemap():
    """Генерирует sitemap.xml"""
    
    # Загружаем данные
    equipment_data = load_json(DATA_DIR / 'equipment.json')
    services_data = load_json(DATA_DIR / 'services.json')
    
    urls = []
    
    # Статические страницы
    static_pages = [
        {'loc': f'{BASE_URL}/', 'priority': '1.0', 'changefreq': 'daily'},
        {'loc': f'{BASE_URL}/services', 'priority': '0.9', 'changefreq': 'weekly'},
        {'loc': f'{BASE_URL}/equipment', 'priority': '0.9', 'changefreq': 'weekly'},
        {'loc': f'{BASE_URL}/promotions', 'priority': '0.7', 'changefreq': 'weekly'},
        {'loc': f'{BASE_URL}/about', 'priority': '0.8', 'changefreq': 'monthly'},
        {'loc': f'{BASE_URL}/contacts', 'priority': '0.8', 'changefreq': 'monthly'},
        {'loc': f'{BASE_URL}/privacy', 'priority': '0.3', 'changefreq': 'yearly'},
    ]
    urls.extend(static_pages)
    
    # Страницы услуг
    if services_data and 'results' in services_data:
        for service in services_data['results']:
            if 'slug' in service:
                urls.append({
                    'loc': f'{BASE_URL}/services/{service["slug"]}',
                    'priority': '0.8',
                    'changefreq': 'monthly'
                })
    
    # Страницы техники
    if equipment_data and 'results' in equipment_data:
        for equipment in equipment_data['results']:
            if 'slug' in equipment:
                urls.append({
                    'loc': f'{BASE_URL}/equipment/{equipment["slug"]}',
                    'priority': '0.8',
                    'changefreq': 'monthly'
                })
    
    # Генерируем XML
    xml_lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"',
        '        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"',
        '        xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9',
        '        http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">',
    ]
    
    # Добавляем комментарии для группировки
    current_section = None
    for url in urls:
        # Определяем секцию для комментария
        if url['loc'] == f'{BASE_URL}/':
            xml_lines.append('  <!-- Главная страница -->')
        elif url['loc'] == f'{BASE_URL}/services':
            xml_lines.append('  <!-- Услуги -->')
        elif url['loc'] == f'{BASE_URL}/equipment':
            xml_lines.append('  <!-- Техника -->')
        elif '/services/' in url['loc'] and current_section != 'services':
            xml_lines.append('  <!-- Услуги - детальные страницы -->')
            current_section = 'services'
        elif '/equipment/' in url['loc'] and current_section != 'equipment':
            xml_lines.append('  <!-- Техника - детальные страницы -->')
            current_section = 'equipment'
        
        xml_lines.extend([
            '  <url>',
            f'    <loc>{url["loc"]}</loc>',
            f'    <lastmod>{TODAY}</lastmod>',
            f'    <changefreq>{url["changefreq"]}</changefreq>',
            f'    <priority>{url["priority"]}</priority>',
            '  </url>',
        ])
    
    xml_lines.append('</urlset>')
    
    # Сохраняем файл
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    with open(SITEMAP_FILE, 'w', encoding='utf-8') as f:
        f.write('\n'.join(xml_lines))
    
    print(f"✅ Sitemap успешно сгенерирован: {SITEMAP_FILE}")
    print(f"   Всего URL: {len(urls)}")
    print(f"   - Статических страниц: {len(static_pages)}")
    if services_data:
        print(f"   - Страниц услуг: {len([s for s in services_data.get('results', []) if 'slug' in s])}")
    if equipment_data:
        print(f"   - Страниц техники: {len([e for e in equipment_data.get('results', []) if 'slug' in e])}")

if __name__ == '__main__':
    generate_sitemap()

