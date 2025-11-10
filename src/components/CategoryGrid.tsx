import { Link } from 'react-router-dom';
import type { Category } from '../types';

const categoryIcons: Record<string, React.ReactNode> = {
  'excavators': <svg width="40" height="40" fill="#c0ef55"><rect width="40" height="40" rx="8"/></svg>,
  'loaders': <svg width="40" height="40" fill="#c0ef55"><circle cx="20" cy="20" r="16"/></svg>,
  'trucks': <svg width="40" height="40" fill="#c0ef55"><rect x="5" y="15" width="30" height="15" rx="6"/></svg>,
  'cranes': <svg width="40" height="40" fill="#c0ef55"><polygon points="0,40 40,40 20,0"/></svg>,
};

export default function CategoryGrid({ categories }: { categories: Category[] }) {
  return (
    <section style={{ background: 'var(--background-black)', padding: '60px 0' }}>
      <div className="container">
        <h2 style={{ color: 'var(--white)', marginBottom: '40px', textAlign: 'center', fontFamily: 'var(--second-family)', fontWeight: 600 }}>Каталог спецтехники</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', justifyContent: 'center', gap: '20px', flexWrap: 'wrap' }}>
          {categories.map(cat => (
            <Link to={`/equipment/${cat.slug}`} key={cat.id} className="text-center bg-[#25282a] rounded-2xl p-8 shadow-lg text-white no-underline transition-all hover:shadow-primary/20 hover:-translate-y-1">
              <div style={{ marginBottom: '18px', height: 48, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                {categoryIcons[cat.slug] || <svg width="40" height="40" fill="#c0ef55"><rect width="40" height="40" rx="8"/></svg>}
              </div>
              <div className="text-xl font-semibold font-second-family">{cat.name}</div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-12">
            <Link to="/equipment" className="btn max-w-[297px] w-full mx-auto">
                Все виды техники
            </Link>
        </div>
      </div>
    </section>
  );
}
