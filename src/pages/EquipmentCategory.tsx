import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { categoryApi, equipmentApi } from '../services/api';
import type { Category, Equipment } from '../types';
import SEO from '../components/SEO';
import { extractFirstParagraph, truncateText } from '../utils/text';
import { generateBreadcrumbSchema } from '../utils/seo';

export default function EquipmentCategory() {
  const { category } = useParams<{ category: string }>();
  const [catData, setCatData] = useState<Category|null>(null);
  const [equipment, setEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    setError('');
    Promise.all([
      categoryApi.getSingle(category!),
      equipmentApi.byCategory(category!)
    ])
      .then(([catRes, eqRes]) => {
        setCatData(catRes.data);
        setEquipment(eqRes.data.results)
      })
      .catch(() => setError('Ошибка загрузки данных категории или техники'))
      .finally(() => setLoading(false));
  }, [category]);

  const breadcrumbItems = [
    { name: 'Главная', url: '/' },
    { name: 'Каталог спецтехники', url: '/equipment' }
  ];
  
  if (catData) {
    breadcrumbItems.push({
      name: catData.name,
      url: `/equipment/category/${catData.slug}`
    });
  }

  const breadcrumbSchema = generateBreadcrumbSchema(breadcrumbItems);

  return (
    <>
      <SEO 
        title={
          catData?.name
            ? `Аренда ${catData.name.toLowerCase()} во Владикавказе | RingooStroy`
            : 'Категория спецтехники | RingooStroy'
        }
        description={
          catData?.name
            ? `Аренда ${catData.name.toLowerCase()} во Владикавказе. Широкий выбор техники в категории. Актуальные цены, быстрая подача, работаем по всей Северной Осетии.`
            : 'Каталог спецтехники для аренды во Владикавказе'
        }
        keywords={
          catData?.name
            ? `аренда ${catData.name.toLowerCase()}, ${catData.name.toLowerCase()} Владикавказ, аренда спецтехники ${catData.name.toLowerCase()}`
            : 'аренда спецтехники, каталог техники Владикавказ'
        }
        structuredData={breadcrumbSchema}
      />
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {loading ? (
          <div className="text-center mt-16">Загрузка...</div>
        ) : error ? (
          <div className="text-center text-red-500 mt-16">{error}</div>
        ) : catData ? (
          <>
            <h1 className="text-4xl font-bold mb-7 text-center">{catData.name}</h1>
            {/* future: catData.description && <p>... */}
            {equipment.length === 0 ? (
              <div className="text-center text-gray-500 mt-8">Техника этой категории скоро появится</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {equipment.map((item) => (
                  <div key={item.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition flex flex-col gap-3">
                    {/* Фото item.image если будет */}
                    <div className="font-bold text-primary text-sm mb-1">{item.category?.name}</div>
                    <h3 className="text-xl font-semibold mb-1 text-black">{item.name}</h3>
                    <div className="text-gray-700 mb-1">{item.manufacturer} {item.model}</div>
                    <div className="text-gray-600 mb-2 text-sm line-clamp-4 min-h-[54px]">
                      {truncateText(extractFirstParagraph(item.description), 140)}
                    </div>
                    <div className="text-lime-600 font-semibold text-lg mb-3">От {item.price_per_hour} ₽/час</div>
                    <div className="flex gap-2">
                      <a href="/contacts" className="flex-1 bg-green-500 text-white px-4 py-2 rounded text-center font-semibold">WhatsApp</a>
                      <a href="/contacts" className="flex-1 bg-lime-400 text-gray-800 px-4 py-2 rounded text-center font-semibold">Позвонить</a>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        ) : null}
      </section>
    </>
  );
}
