import { Link } from 'react-router-dom';
import SEO from '../components/SEO';

export default function NotFound() {
  return (
    <>
      <SEO 
        title="404 — Страница не найдена | RingooStroy" 
        description="Страница, которую вы ищете, отсутствует. Перейдите на главную страницу или в каталог услуг аренды спецтехники во Владикавказе. Работаем по всей Северной Осетии." 
        noindex={true}
      />
      <section className="min-h-[60vh] flex flex-col items-center justify-center py-20 text-center">
        <div className="text-8xl mb-3">🚧</div>
        <div className="text-5xl font-bold mb-3">404</div>
        <div className="text-xl text-gray-500 mb-8">Увы, такой страницы не существует.<br />Но наши услуги всегда доступны для вас!</div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/" className="bg-lime-400 text-gray-900 px-8 py-3 rounded-xl font-semibold text-lg">На главную</Link>
          {/* ВРЕМЕННО ОТКЛЮЧЕНО: В каталог техники
          <Link to="/equipment" className="bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold text-lg">В каталог техники</Link>
          */}
          <Link to="/services" className="bg-gray-900 text-white px-8 py-3 rounded-xl font-semibold text-lg">К услугам</Link>
        </div>
        <div className="mt-12 text-sm text-gray-500">Если что-то срочно — <a href="tel:+79888307777" className="underline text-lime-700">позвоните нам</a> или напишите в <a href="/contacts" className="underline text-lime-700">WhatsApp</a>.</div>
      </section>
    </>
  );
}
