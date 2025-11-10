# Руководство по SEO оптимизации

## Что было реализовано:

### 1. ✅ Улучшенный компонент SEO (`frontend/src/components/SEO.tsx`)
- Все необходимые мета-теги (title, description, keywords)
- Open Graph теги для Facebook
- Twitter Card теги
- Canonical URLs
- Structured Data (JSON-LD) поддержка
- Мобильная оптимизация

### 2. ✅ Утилиты для Structured Data (`frontend/src/utils/seo.ts`)
- `generateLocalBusinessSchema()` - для LocalBusiness
- `generateServiceSchema()` - для услуг
- `generateOrganizationSchema()` - для организации
- `generateBreadcrumbSchema()` - для хлебных крошек

### 3. ✅ SEO данные для всех услуг (`frontend/src/data/services-seo.json`)
- Уникальные title, description, keywords для каждой из 19 услуг
- Оптимизированные под поисковые запросы

### 4. ✅ Обновлен index.html
- Базовые мета-теги
- Open Graph
- Twitter Cards
- Preconnect для производительности

### 5. ✅ Созданы robots.txt и sitemap.xml
- Правильная настройка для поисковых роботов
- Все страницы в sitemap

### 6. ✅ SEO добавлено на основные страницы:
- ✅ Home.tsx - с LocalBusiness и Organization schema
- ✅ Services.tsx - с Breadcrumb schema
- ✅ About.tsx - с Breadcrumb schema
- ✅ Contacts.tsx - с LocalBusiness schema
- ✅ Promotions.tsx - с Breadcrumb schema
- ✅ Page-1.tsx (Благоустройство дворов) - с Service и Breadcrumb schema
- ✅ Page-2.tsx (Копка траншей) - с Service и Breadcrumb schema

### 7. ⏳ Осталось добавить SEO на:
- Page-3 до Page-19 (17 страниц услуг)

## Как добавить SEO на оставшиеся страницы услуг:

Для каждой страницы (Page-3 до Page-19) нужно:

1. Добавить импорты в начало файла:
```typescript
import SEO from '../../components/SEO';
import { generateServiceSchema, generateBreadcrumbSchema } from '../../utils/seo';
import servicesSeoData from '../../data/services-seo.json';
```

2. Перед `return` добавить генерацию SEO данных:
```typescript
const seoData = servicesSeoData['slug-услуги' as keyof typeof servicesSeoData];
const serviceSchema = generateServiceSchema(serviceData.title, serviceData.shortDescription);
const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Главная', url: '/' },
  { name: 'Услуги', url: '/services' },
  { name: serviceData.title, url: `/services/slug-услуги` }
]);
const combinedSchema = {
  '@context': 'https://schema.org',
  '@graph': [serviceSchema, breadcrumbSchema]
};
```

3. Обернуть return в фрагмент и добавить SEO компонент:
```typescript
return (
  <>
    <SEO 
      title={seoData.title}
      description={seoData.description}
      keywords={seoData.keywords}
      image={`https://ringoostroy.ru${serviceData.mainImage}`}
      type="article"
      structuredData={combinedSchema}
    />
    <div style={{ ... }}>
      {/* существующий контент */}
    </div>
  </>
);
```

4. Закрыть фрагмент в конце файла:
```typescript
    </div>
    </>
  );
}
```

## Соответствие slug'ов услуг:

- Page-3: 'kanalizaciya-pod-klyuch'
- Page-4: 'dostavka-i-ustanovka-kolec'
- Page-5: 'dostavka-i-ustanovka-fbs-blokov'
- Page-6: 'obratnaya-zasypka-fundamentov'
- Page-7: 'planirovka-i-ochistka-uchastka'
- Page-8: 'srub-i-vyvoz-derevev'
- Page-9: 'burenie-svaj-do-2-5-metrov'
- Page-10: 'vyvoz-stroitelnogo-i-lyubogo-musora'
- Page-11: 'dostavka-chernozema-ballasta-shchebenki-peska'
- Page-12: 'uslugi-gidromolota'
- Page-13: 'kopka-kotlovana'
- Page-14: 'kopka-pod-fundament'
- Page-15: 'rezka-betona-i-asfalta'
- Page-16: 'pokos-travy-mulcherom'
- Page-17: 'stroitelstvo-fundamentov'
- Page-18: 'stroitelstvo-zaborov'
- Page-19: 'raschistka-ili-uborka-snega'

## Дополнительные рекомендации:

1. **Alt теги для изображений**: Добавить alt теги ко всем изображениям на сайте
2. **Обновить SITE_URL**: В `frontend/src/components/SEO.tsx` и `frontend/src/utils/seo.ts` заменить `https://ringoostroy.ru` на реальный домен
3. **Проверить sitemap.xml**: После деплоя обновить даты в sitemap.xml
4. **Google Search Console**: После деплоя добавить сайт в Google Search Console и отправить sitemap
5. **Яндекс.Вебмастер**: Добавить сайт в Яндекс.Вебмастер и отправить sitemap

## Проверка SEO:

1. Проверить через Google Rich Results Test: https://search.google.com/test/rich-results
2. Проверить через Schema.org Validator: https://validator.schema.org/
3. Проверить мета-теги через: https://www.opengraph.xyz/
4. Проверить мобильную версию через Google Mobile-Friendly Test

