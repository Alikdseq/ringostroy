import { useState, useEffect } from 'react'
import ContactQuickForm from '../components/ContactQuickForm'
import CityForm from '../components/CityForm'
import ServicesCarousel from '../components/ServicesCarousel'
import EquipmentGridShowcase from '../components/EquipmentGridShowcase'
import SEO from '../components/SEO'
import { generateLocalBusinessSchema, generateOrganizationSchema } from '../utils/seo'
import BrandsBlock from '../components/BrandsBlock'
const heroTruckImage = "/images/images-technica/mask-group-2024-10-03t171422.984.png";
const backgroundImage = "/images/images-fon/category-bg.png";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false)

  // Определение размера экрана
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])
  // ВРЕМЕННО ОТКЛЮЧЕНО: Загрузка данных с API
  // import { useEffect, useState } from 'react'
  // import { servicesApi } from '../services/api'
  // import type { Service, Category, Equipment } from '../types'
  // import { Link } from 'react-router-dom'
  // import { categoryApi } from '../services/api'
  // import CategoryGrid from '../components/CategoryGrid'
  // import { equipmentApi } from '../services/api'
  
  // const [services, setServices] = useState<Service[]>([])
  // const [loading, setLoading] = useState(true)
  // const [categories, setCategories] = useState<Category[]>([])
  // const [catLoading, setCatLoading] = useState(true)
  // const [catError, setCatError] = useState<string|undefined>()
  // const [featuredEquipment, setFeaturedEquipment] = useState<Equipment[]>([])
  // const [equipmentLoading, setEquipmentLoading] = useState(true)
  // const [equipmentError, setEquipmentError] = useState<string|undefined>()

  // useEffect(() => {
  //   servicesApi.getAll()
  //     .then(response => {
  //       setServices(response.data.results)
  //       setLoading(false)
  //     })
  //     .catch(error => {
  //       console.error('Error fetching services:', error)
  //       setLoading(false)
  //     })
  //   categoryApi.getAll()
  //     .then(response => {
  //       setCategories(response.data.results)
  //       setCatLoading(false)
  //     })
  //     .catch(error => {
  //       setCatError('Не удалось загрузить категории техники')
  //       setCatLoading(false)
  //     })
  //   equipmentApi.getFeatured()
  //     .then(response => {
  //       setFeaturedEquipment(response.data)
  //       setEquipmentLoading(false)
  //     })
  //     .catch(error => {
  //       setEquipmentError('Не удалось загрузить популярную технику')
  //       setEquipmentLoading(false)
  //     })
  // }, [])

  const localBusinessSchema = generateLocalBusinessSchema();
  const organizationSchema = generateOrganizationSchema();
  const combinedSchema = {
    '@context': 'https://schema.org',
    '@graph': [localBusinessSchema, organizationSchema]
  };

  return (
    <>
       <SEO 
         title="Аренда спецтехники во Владикавказе | RingooStroy - Северная Осетия" 
         description="Аренда спецтехники во Владикавказе и Северной Осетии. Экскаваторы, погрузчики, краны, грузовики, бульдозеры. Работаем 24/7. Гарантии качества. Более 13 лет опыта. Закажите спецтехнику прямо сейчас!" 
         keywords="аренда спецтехники Владикавказ, аренда экскаватора, аренда погрузчика, аренда крана, спецтехника Северная Осетия, аренда техники, строительная техника, дорожная техника, коммунальная техника, аренда бульдозера"
         structuredData={combinedSchema}
       />
      
      {/* Градиентный фон только для хедера */}
<div style={{
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  height: isMobile ? '75px' : '121px', // адаптивная высота хедера
  background: 'linear-gradient(90deg, var(--background-black) 0%, var(--primary) 50%, var(--background-black) 100%)',
  zIndex: 1,
  opacity: 0.3
}}></div>


      {/* Контейнер для хедера и героя с декором */}
      <div style={{ position: 'relative', background: 'var(--background-black)' }}>


        
        
        {/* Фоновые декоративные слои - ТОЛЬКО для Header и Hero */}
<div style={{ 
  position: 'absolute', 
  top: 0, 
  left: 0, 
  right: 0,
  bottom: 0,
  zIndex: 0, 
  pointerEvents: 'none',
  overflow: 'hidden'
}}>
  {/* Левая декорция - размытие нижнего края */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: isMobile ? '250px' : '800px',
    height: isMobile ? '250px' : '800px',
    opacity: isMobile ? 0.1 : 0.2,
    mask: 'linear-gradient(to bottom, black 60%, transparent 90%)',
    WebkitMask: 'linear-gradient(to bottom, black 60%, transparent 90%)'
  }}>
    <img 
      src={backgroundImage} 
      alt="Фон" 
      style={{ 
        width: '100%',
        height: '100%', 
        objectFit: 'contain', 
        transform: 'scaleX(-1)',
        filter: isMobile ? 'blur(10px)' : 'blur(15px)'
      }}
    />
  </div>
  
  {/* Основа левой декорации без размытия */}
  <div style={{
    position: 'absolute',
    top: 0,
    left: 0,
    width: isMobile ? '250px' : '800px',
    height: isMobile ? '250px' : '800px',
    opacity: isMobile ? 0.2 : 0.5,
    mask: 'linear-gradient(to bottom, black 80%, transparent 100%)',
    WebkitMask: 'linear-gradient(to bottom, black 80%, transparent 100%)'
  }}>
    <img 
      src={backgroundImage} 
      alt="Фон" 
      style={{ 
        width: '100%',
        height: '100%', 
        objectFit: 'contain', 
        transform: 'scaleX(-1)'
      }}
    />
  </div>

  {/* Правая декорция - размытие нижнего края */}
  <div style={{
    position: 'absolute',
    top: 0,
    right: 0,
    width: isMobile ? '250px' : '800px',
    height: isMobile ? '250px' : '800px',
    opacity: isMobile ? 0.1 : 0.2,
    mask: 'linear-gradient(to bottom, black 60%, transparent 90%)',
    WebkitMask: 'linear-gradient(to bottom, black 60%, transparent 90%)'
  }}>
    <img 
      src={backgroundImage} 
      alt="Фон" 
      style={{ 
        width: '100%',
        height: '100%', 
        objectFit: 'contain',
        filter: isMobile ? 'blur(10px)' : 'blur(15px)'
      }}
    />
  </div>
  
  {/* Основа правой декорации без размытия */}
  <div style={{
    position: 'absolute',
    top: 0,
    right: 0,
    width: isMobile ? '250px' : '800px',
    height: isMobile ? '250px' : '800px',
    opacity: isMobile ? 0.2 : 0.4,
    mask: 'linear-gradient(to bottom, black 80%, transparent 100%)',
    WebkitMask: 'linear-gradient(to bottom, black 80%, transparent 100%)'
  }}>
    <img 
      src={backgroundImage} 
      alt="Фон" 
      style={{ 
        width: '100%',
        height: '100%', 
        objectFit: 'contain'
      }}
    />
  </div>
</div>
        {/* Hero Section */}
        <section className="mainbanner-block relative text-white pt-20 pb-10 md:h-[750px] flex flex-col justify-end overflow-hidden" style={{ 
          position: 'relative', 
          zIndex: 10,
          minHeight: isMobile ? '600px' : 'auto',
          paddingTop: isMobile ? '100px' : undefined,
          paddingBottom: isMobile ? '20px' : undefined
        }}>
          <div className="container h-full flex items-start pt-20" style={{ 
            paddingTop: isMobile ? '20px' : undefined,
            paddingLeft: isMobile ? '15px' : undefined,
            paddingRight: isMobile ? '15px' : undefined
          }}>
            {/* Текстовая часть */}
            <div className="mainbanner__wrapper relative z-10 w-full lg:w-1/2 max-w-[600px] lg:ml-20 mt-10" style={{
              marginTop: isMobile ? '0' : undefined,
              marginLeft: isMobile ? '0' : undefined,
              maxWidth: isMobile ? '100%' : undefined
            }}>
              <div className="mb-8" style={{ marginBottom: isMobile ? '20px' : undefined }}>
                <span className="text-white text-base font-semibold" style={{ 
                  fontSize: isMobile ? '14px' : undefined,
                  display: isMobile ? 'block' : undefined,
                  marginBottom: isMobile ? '5px' : undefined
                }}>Регион для аренды – Северная Осетия</span>
                <span className="text-lime-400 text-base font-semibold ml-3" style={{ 
                  fontSize: isMobile ? '14px' : undefined,
                  marginLeft: isMobile ? '0' : undefined,
                  display: isMobile ? 'block' : undefined
                }}>Все города</span>
              </div>
              
              <h1 className="mainbanner__title font-bold text-5xl md:text-7xl lg:text-7xl mb-6 leading-tight" style={{
                fontSize: isMobile ? 'clamp(28px, 8vw, 36px)' : undefined,
                marginBottom: isMobile ? '20px' : undefined
              }}>
                АРЕНДА<br />СПЕЦТЕХНИКИ<br /><span className="text-lime-400">ВЛАДИКАВКАЗ</span>
              </h1>
              
              <p className="mainbanner__subtitle text-lg md:text-xl mb-10 opacity-90 leading-relaxed" style={{
                fontSize: isMobile ? 'clamp(14px, 3.5vw, 16px)' : undefined,
                marginBottom: isMobile ? '25px' : undefined
              }}>
                RingooStroy – удобный и простой сервис аренды строительной техники
              </p>
              
              <ul className="advants__holder list-none flex flex-col gap-4 mb-8" style={{
                gap: isMobile ? '12px' : undefined,
                marginBottom: isMobile ? '20px' : undefined
              }}>
                {["Работаем 24/7", "Принимаем все виды оплат", "Собственный парк на 13 единиц техники"].map(adv => (
                  <li key={adv} className="relative pl-7 text-lg" style={{
                    paddingLeft: isMobile ? '24px' : undefined,
                    fontSize: isMobile ? 'clamp(14px, 3vw, 16px)' : undefined
                  }}>
                    <span className="absolute top-2.5 left-0 h-2 w-2 rounded-full bg-lime-500" style={{
                      top: isMobile ? '6px' : undefined,
                      height: isMobile ? '6px' : undefined,
                      width: isMobile ? '6px' : undefined
                    }}></span>
                    {adv}
                  </li>
                ))}
              </ul>
              {/* ВРЕМЕННО ОТКЛЮЧЕНО: Кнопка аренды техники
              <div className="button__wrapper flex flex-col sm:flex-row items-start sm:items-center gap-5">
                <Link to="/equipment" className="btn mainbanner__btn max-w-full sm:max-w-[320px] w-full">Арендовать технику</Link>
                <div className="separator hidden sm:block h-10 w-px bg-white"></div>
                <div className="mainbanner__promo max-w-full sm:max-w-[364px] w-full text-sm">
                  При заявке с сайта скидка 10% на аренду спецтехники
                </div>
              </div>
              */}
            </div>
          </div>
          
          {/* Изображение грузовика */}
          <div className="mainbanner__img absolute bottom-0 right-0 z-0 w-full lg:w-1/2 max-h-[840px] flex items-end justify-end opacity-30 lg:opacity-100" style={{
            opacity: isMobile ? 0.15 : undefined
          }}>
            <img src={heroTruckImage} alt="Аренда спецтехники SHACMAN" className="w-full h-auto object-contain"/>
          </div>
        </section>
      </div>

      <EquipmentGridShowcase />

      {/* Блок наших услуг */}
      <ServicesCarousel />

      {/* Advantages Section - БЕЗ декора */}
      <section style={{
        padding: isMobile ? '40px 0' : '60px 0'
      }}>
        <div className="container" style={{
          paddingLeft: isMobile ? '15px' : '0',
          paddingRight: isMobile ? '15px' : '0'
        }}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5" style={{
          gap: isMobile ? '15px' : '20px'
        }}>
            {/* Guarantee */}
            <div style={{
              border: '1px solid var(--stroke)',
              borderRadius: isMobile ? '16px' : '20px',
              padding: isMobile ? '20px' : '25px',
              background: 'var(--cart-black)'
            }}>
              <div style={{
                background: 'var(--primary)',
                borderRadius: '50%',
                width: isMobile ? '60px' : '70px',
                height: isMobile ? '60px' : '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: isMobile ? '15px' : '20px'
              }}>
                <svg width={isMobile ? "32" : "40"} height={isMobile ? "32" : "40"} fill="var(--background-black)" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 style={{ 
                marginBottom: isMobile ? '8px' : '10px', 
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(16px, 3vw, 18px)' : '18px',
                fontWeight: 600
              }}>Гарантии</h4>
              <p style={{ 
                color: 'var(--txt)', 
                fontSize: isMobile ? 'clamp(13px, 2.5vw, 14px)' : '14px',
                lineHeight: '1.5'
              }}>
                Не берём деньги, если вам не понравилась наша работа.
              </p>
            </div>

            {/* Terms */}
            <div style={{
              border: '1px solid var(--stroke)',
              borderRadius: isMobile ? '16px' : '20px',
              padding: isMobile ? '20px' : '25px',
              background: 'var(--cart-black)'
            }}>
              <div style={{
                background: 'var(--primary)',
                borderRadius: '50%',
                width: isMobile ? '60px' : '70px',
                height: isMobile ? '60px' : '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: isMobile ? '15px' : '20px'
              }}>
                <svg width={isMobile ? "32" : "40"} height={isMobile ? "32" : "40"} fill="var(--background-black)" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 style={{ 
                marginBottom: isMobile ? '8px' : '10px', 
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(16px, 3vw, 18px)' : '18px',
                fontWeight: 600
              }}>Сроки</h4>
              <p style={{ 
                color: 'var(--txt)', 
                fontSize: isMobile ? 'clamp(13px, 2.5vw, 14px)' : '14px',
                lineHeight: '1.5'
              }}>
                Не опаздываем на заказ, если опоздали, то сделаем скидку 10%.
              </p>
            </div>

            {/* Experience */}
            <div style={{
              border: '1px solid var(--stroke)',
              borderRadius: isMobile ? '16px' : '20px',
              padding: isMobile ? '20px' : '25px',
              background: 'var(--cart-black)'
            }}>
              <div style={{
                background: 'var(--primary)',
                borderRadius: '50%',
                width: isMobile ? '60px' : '70px',
                height: isMobile ? '60px' : '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: isMobile ? '15px' : '20px'
              }}>
                <svg width={isMobile ? "32" : "40"} height={isMobile ? "32" : "40"} fill="var(--background-black)" viewBox="0 0 20 20">
                  <path d="M9 4a1 1 0 000 2h2a1 1 0 100-2H9z" />
                  <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 style={{ 
                marginBottom: isMobile ? '8px' : '10px', 
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(16px, 3vw, 18px)' : '18px',
                fontWeight: 600
              }}>Опыт</h4>
              <p style={{ 
                color: 'var(--txt)', 
                fontSize: isMobile ? 'clamp(13px, 2.5vw, 14px)' : '14px',
                lineHeight: '1.5'
              }}>
                У нас опытные машинисты, более тысячи заказчиков остались довольны.
              </p>
            </div>

            {/* Prices */}
            <div style={{
              border: '1px solid var(--stroke)',
              borderRadius: isMobile ? '16px' : '20px',
              padding: isMobile ? '20px' : '25px',
              background: 'var(--cart-black)'
            }}>
              <div style={{
                background: 'var(--primary)',
                borderRadius: '50%',
                width: isMobile ? '60px' : '70px',
                height: isMobile ? '60px' : '70px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: isMobile ? '15px' : '20px'
              }}>
                <svg width={isMobile ? "32" : "40"} height={isMobile ? "32" : "40"} fill="var(--background-black)" viewBox="0 0 20 20">
                  <path d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 style={{ 
                marginBottom: isMobile ? '8px' : '10px', 
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(16px, 3vw, 18px)' : '18px',
                fontWeight: 600
              }}>Цены</h4>
              <p style={{ 
                color: 'var(--txt)', 
                fontSize: isMobile ? 'clamp(13px, 2.5vw, 14px)' : '14px',
                lineHeight: '1.5'
              }}>
                Наши условия работы, наш подход, наша гарантия дешёвыми быть не могут.
              </p>
            </div>
        </div>
        </div>
      </section>

      {/* Форма быстрой обратной связи - БЕЗ декора */}
      <ContactQuickForm />

      {/* Brands Block - БЕЗ декора */}
      <BrandsBlock />

      {/* Форма с городами перед Footer */}
      <CityForm />
    </>
  )
}