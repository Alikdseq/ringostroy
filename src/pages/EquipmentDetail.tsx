import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState, useRef, RefObject } from 'react';
import { equipmentApi, categoryApi } from '../services/api';
import type { Equipment } from '../types';
import SEO from '../components/SEO';

interface FullSpec {
  label: string;
  value: string;
}

// Компонент карточки техники для блока "Другая техника"
function EquipmentCard({ item, isMobile }: { item: Equipment; isMobile: boolean }) {
  const [hovered, setHovered] = useState(false);
  
  return (
    <Link
      to={`/equipment/${item.slug}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        textDecoration: 'none',
        color: 'var(--white)',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px'
      }}
    >
      <div style={{
        height: isMobile ? '100px' : '140px',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <img
          src={item.primary_image || '/images/images-technica/t1.png'}
          alt={item.name}
          style={{
            maxWidth: '100%',
            maxHeight: '100%',
            objectFit: 'contain',
            transition: 'transform 0.35s ease, filter 0.35s ease',
            transform: hovered ? 'translateY(-8px) scale(1.08)' : 'translateY(0) scale(1)',
            filter: hovered
              ? 'drop-shadow(0 25px 30px rgba(0,0,0,0.45))'
              : 'drop-shadow(0 15px 20px rgba(0,0,0,0.3))'
          }}
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).src = '/images/images-technica/t1.png';
          }}
        />
      </div>
      <span style={{
        textAlign: 'center',
        fontSize: isMobile ? '12px' : '15px',
        lineHeight: 1.4,
        color: 'rgba(255,255,255,0.9)'
      }}>
        {item.name}
      </span>
    </Link>
  );
}

const weekdayLabels = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const formatISODate = (year: number, monthIndex: number, day: number) =>
  `${year}-${String(monthIndex + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

const parseISODate = (value: string) => {
  const [year, month, day] = value.split('-').map(Number);
  return new Date(year, month - 1, day);
};

function CalendarDropdown({
  selectedDate,
  onSelect,
  onClose,
  anchorRef
}: {
  selectedDate: string;
  onSelect: (value: string) => void;
  onClose: () => void;
  anchorRef: RefObject<HTMLDivElement>;
}) {
  const initial = selectedDate ? new Date(selectedDate) : new Date();
  const [currentMonth, setCurrentMonth] = useState(
    new Date(initial.getFullYear(), initial.getMonth(), 1)
  );
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const clickedInsideAnchor = anchorRef.current?.contains(target);
      const clickedInsideCalendar = calendarRef.current?.contains(target);
      if (!clickedInsideAnchor && !clickedInsideCalendar) {
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose]);

  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const startPadding = ((currentMonth.getDay() || 7) - 1); // Monday-first
  const totalCells = Math.ceil((startPadding + daysInMonth) / 7) * 7;
  const cells = Array.from({ length: totalCells }, (_, idx) => {
    const dayNumber = idx - startPadding + 1;
    return dayNumber > 0 && dayNumber <= daysInMonth ? dayNumber : null;
  });

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    const selected = new Date(selectedDate);
    return (
      selected.getDate() === day &&
      selected.getMonth() === currentMonth.getMonth() &&
      selected.getFullYear() === currentMonth.getFullYear()
    );
  };

  const handleSelectDay = (day: number) => {
    const iso = formatISODate(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    onSelect(iso);
    onClose();
  };

  return (
    <div
      ref={calendarRef}
      style={{
        position: 'absolute',
        top: 'calc(100% + 8px)',
        right: 0,
        background: 'var(--cart-black)',
        border: '1px solid var(--stroke)',
        borderRadius: '16px',
        padding: '16px',
        boxShadow: '0 20px 50px rgba(0,0,0,0.45)',
        zIndex: 20,
        width: '320px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
        <button
          type="button"
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1)
            )
          }
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--txt)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          ‹
        </button>
        <span style={{ color: 'var(--white)', fontWeight: 600 }}>
          {currentMonth.toLocaleString('ru-RU', { month: 'long', year: 'numeric' })}
        </span>
        <button
          type="button"
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1)
            )
          }
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--txt)',
            cursor: 'pointer',
            padding: '4px'
          }}
        >
          ›
        </button>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '6px',
          marginBottom: '8px'
        }}
      >
        {weekdayLabels.map((label) => (
          <span
            key={label}
            style={{
              textAlign: 'center',
              fontSize: '13px',
              color: label === 'Сб' || label === 'Вс' ? 'var(--primary)' : 'var(--txt)',
              fontWeight: 600
            }}
          >
            {label}
          </span>
        ))}
        {cells.map((cell, idx) =>
          cell ? (
            <button
              type="button"
              key={`${currentMonth.getMonth()}-${cell}-${idx}`}
              onClick={() => handleSelectDay(cell)}
              style={{
                width: '100%',
                aspectRatio: '1',
                borderRadius: '10px',
                border: isSelected(cell) ? '1px solid var(--primary)' : '1px solid transparent',
                background: isSelected(cell) ? 'var(--primary)' : 'rgba(255,255,255,0.05)',
                color: isSelected(cell) ? 'var(--background-black)' : 'var(--white)',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              {cell}
            </button>
          ) : (
            <span key={`empty-${idx}`} />
          )
        )}
      </div>
    </div>
  );
}

export default function EquipmentDetail() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<Equipment | null>(null);
  const [allEquipment, setAllEquipment] = useState<Equipment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const dateFieldRef = useRef<HTMLDivElement>(null);
  
  // Форма заказа
  const [days, setDays] = useState(1);
  const [startDate, setStartDate] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!slug) {
      setError('Техника не найдена');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError('');
    equipmentApi.getAll()
      .then((res) => {
        const all = res.data.results;
        setAllEquipment(all);
        const found = all.find((x: Equipment) => x.slug === slug);
        if (!found) {
          // Проверяем, может это категория
          categoryApi.getAll()
            .then((catRes) => {
              const isCategory = catRes.data.results.some(cat => cat.slug === slug);
              if (isCategory) {
                // Редирект на страницу категории (используем тот же роут, но другой компонент обработает)
                // Но лучше просто показать 404, так как роут /equipment/:category должен обрабатываться отдельно
                setError('Техника не найдена');
                setLoading(false);
              } else {
                setError('Техника не найдена');
                setLoading(false);
              }
            })
            .catch(() => {
              setError('Техника не найдена');
              setLoading(false);
            });
        } else {
          setData(found);
          setLoading(false);
        }
      })
      .catch(() => {
        setError('Ошибка загрузки данных по технике');
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--white)' }}>
        Загрузка...
      </div>
    );
  }

  if (error || !data) {
    return (
      <div style={{ textAlign: 'center', padding: '100px 20px', color: 'var(--white)' }}>
        <h2 style={{ marginBottom: '20px' }}>{error || 'Техника не найдена'}</h2>
        <Link to="/" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
          ← Вернуться на главную
        </Link>
      </div>
    );
  }

  const pricePerHour = data.price_per_hour || 0;
  const pricePerShift = data.price_per_shift || (pricePerHour * 8);
  const discountDays = 3;
  const discountPercent = 10;

  // Расчет итоговой цены (только сменная аренда)
  const totalPrice = pricePerShift * days;
  const discount = days >= discountDays ? totalPrice * (discountPercent / 100) : 0;
  const finalPrice = totalPrice - discount;

  const handleQuickOrder = () => {
    window.location.href = 'tel:+79888307777';
  };

  const handleWhatsAppOrder = () => {
    const rentalPeriod = `${days} ${days === 1 ? 'день' : days < 5 ? 'дня' : 'дней'}`;
    
    const message = `Здравствуйте! Хочу арендовать технику:

${data.name}

Тип аренды: По сменам
Срок аренды: ${rentalPeriod}
${startDate ? `Начало аренды: ${startDate}` : ''}
${name ? `Имя: ${name}` : ''}
${phone ? `Телефон: ${phone}` : ''}
${address ? `Адрес: ${address}` : ''}

Итоговая стоимость: ${finalPrice.toLocaleString('ru-RU')} ₽${discount > 0 ? ` (скидка ${discountPercent}%: -${discount.toLocaleString('ru-RU')} ₽)` : ''}`;

    const whatsappUrl = `https://wa.me/79888307777?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const fullSpecs: FullSpec[] = (data.full_specs || data.specs || []).map((spec: any) => ({
    label: spec.label || spec.name || '',
    value: spec.value || ''
  }));

  const allImages = data.images && data.images.length > 0 
    ? data.images.map(img => img.image)
    : [data.primary_image || '/images/images-technica/t1.png'];

  const otherEquipment = allEquipment.filter(eq => eq.id !== data.id);
  const displayDate = startDate
    ? parseISODate(startDate).toLocaleDateString('ru-RU', { day: '2-digit', month: 'long', year: 'numeric' })
    : '';

  return (
    <>
      <SEO 
        title={`${data.name} | Аренда спецтехники`} 
        description={data.description || `Аренда ${data.name}. Цена от ${pricePerHour.toLocaleString('ru-RU')} ₽/час. ${data.manufacturer} ${data.model}.`} 
      />
      
      <section style={{ padding: isMobile ? '30px 0' : '60px 0', background: 'var(--background-black)' }}>
        <div
          className="container"
          style={{
            paddingLeft: isMobile ? '15px' : '20px',
            paddingRight: isMobile ? '15px' : '20px',
            maxWidth: isMobile ? '100%' : '1240px',
            margin: '0 auto'
          }}
        >
          {/* Хлебные крошки */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: isMobile ? '20px' : '30px',
            fontSize: '14px',
            color: 'var(--txt)',
            flexWrap: 'wrap'
          }}>
            <Link to="/" style={{ color: 'var(--txt)', textDecoration: 'none' }}>
              Главная
            </Link>
            <span>/</span>
            <Link to="/#equipment" style={{ color: 'var(--txt)', textDecoration: 'none' }}>
              Наша техника
            </Link>
            <span>/</span>
            <span style={{ color: 'var(--white)' }}>{data.name}</span>
          </div>

          <h1
            style={{
              color: 'var(--white)',
              fontSize: isMobile ? 'clamp(28px, 7vw, 38px)' : 'clamp(40px, 5vw, 54px)',
              fontWeight: 800,
              marginBottom: isMobile ? '25px' : '35px',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}
          >
            {data.name}
          </h1>

          {/* Основной контент: фото и форма */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: isMobile ? '1fr' : '1.2fr 1fr',
            gap: isMobile ? '30px' : '50px',
            marginBottom: isMobile ? '40px' : '60px'
          }}>
            {/* Левая колонка: Фото */}
            <div>
              {/* Главное фото */}
              <div style={{
                borderRadius: '20px',
                overflow: 'hidden',
                marginBottom: '20px',
                background: 'var(--cart-black)',
                border: '1px solid var(--stroke)',
                position: 'relative'
              }}>
                <img
                  src={allImages[selectedImageIndex]}
                  alt={data.name}
                  style={{
                    width: '100%',
                    height: isMobile ? '260px' : '440px',
                    objectFit: 'contain',
                    display: 'block',
                    padding: isMobile ? '6px' : '24px',
                    background: 'var(--background-black)',
                    transition: 'transform 0.4s ease'
                  }}
                  onError={(e) => {
                    (e.currentTarget as HTMLImageElement).src = '/images/images-technica/t1.png';
                  }}
                />
                
                {/* Навигация по фото */}
                {allImages.length > 1 && (
                  <>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev > 0 ? prev - 1 : allImages.length - 1)}
                      style={{
                        position: 'absolute',
                        left: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(0, 0, 0, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'var(--white)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                        e.currentTarget.style.borderColor = 'var(--primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 18l-6-6 6-6"/>
                      </svg>
                    </button>
                    <button
                      onClick={() => setSelectedImageIndex(prev => prev < allImages.length - 1 ? prev + 1 : 0)}
                      style={{
                        position: 'absolute',
                        right: '16px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'rgba(0, 0, 0, 0.6)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        color: 'var(--white)',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)';
                        e.currentTarget.style.borderColor = 'var(--primary)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(0, 0, 0, 0.6)';
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                      }}
                    >
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M9 18l6-6-6-6"/>
                      </svg>
                    </button>
                  </>
                )}
              </div>

              {/* Миниатюры фото */}
              {allImages.length > 1 && (
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${Math.min(allImages.length, 3)}, 1fr)`,
                  gap: '12px'
                }}>
                  {allImages.slice(0, 3).map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setSelectedImageIndex(idx)}
                      style={{
                        borderRadius: '12px',
                        overflow: 'hidden',
                        background: 'var(--cart-black)',
                        border: `2px solid ${selectedImageIndex === idx ? 'var(--primary)' : 'var(--stroke)'}`,
                        aspectRatio: '1',
                        cursor: 'pointer',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        if (selectedImageIndex !== idx) {
                          e.currentTarget.style.borderColor = 'rgba(192, 239, 85, 0.5)';
                        }
                      }}
                      onMouseLeave={(e) => {
                        if (selectedImageIndex !== idx) {
                          e.currentTarget.style.borderColor = 'var(--stroke)';
                        }
                      }}
                    >
                      <img
                        src={img}
                        alt={`${data.name} - фото ${idx + 1}`}
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover'
                        }}
                        onError={(e) => {
                          (e.currentTarget as HTMLImageElement).src = '/images/images-technica/t1.png';
                        }}
                  />
                </div>
                  ))}
                </div>
              )}

              {/* Описание */}
              <div style={{ marginTop: isMobile ? '30px' : '40px' }}>
                <h2 style={{
                  color: 'var(--white)',
                  fontSize: isMobile ? '22px' : '28px',
                  fontWeight: 700,
                  marginBottom: '16px'
                }}>
                  Описание
                </h2>
                <p style={{
                  color: 'var(--txt)',
                  fontSize: '16px',
                  lineHeight: '1.6'
                }}>
                  {data.full_description || data.description || 'Описание техники отсутствует.'}
                </p>
              </div>

              {/* Характеристики */}
              <div style={{ marginTop: isMobile ? '30px' : '40px' }}>
                <h2 style={{
                  color: 'var(--white)',
                  fontSize: isMobile ? '22px' : '28px',
                  fontWeight: 700,
                  marginBottom: '20px'
                }}>
                  Характеристики
                </h2>
                {fullSpecs.length > 0 ? (
                  <div style={{
                    background: 'var(--cart-black)',
                    border: '1px solid var(--stroke)',
                    borderRadius: '20px',
                    overflow: 'hidden'
                  }}>
                    <table style={{
                      width: '100%',
                      borderCollapse: 'collapse'
                    }}>
                      <thead>
                        <tr style={{
                          background: 'rgba(192, 239, 85, 0.1)',
                          borderBottom: '1px solid var(--stroke)'
                        }}>
                          <th style={{
                            padding: '16px 20px',
                            color: 'var(--white)',
                            fontSize: '15px',
                            fontWeight: 600,
                            textAlign: 'left',
                            width: '50%'
                          }}>
                            Наименование показателя
                          </th>
                          <th style={{
                            padding: '16px 20px',
                            color: 'var(--white)',
                            fontSize: '15px',
                            fontWeight: 600,
                            textAlign: 'right',
                            width: '50%'
                          }}>
                            Значение
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {fullSpecs.map((spec, idx) => (
                          <tr
                            key={idx}
                            style={{
                              borderBottom: idx < fullSpecs.length - 1 ? '1px solid var(--stroke)' : 'none'
                            }}
                          >
                            <td style={{
                              padding: '16px 20px',
                              color: 'var(--txt)',
                              fontSize: '15px'
                            }}>
                              {spec.label}
                            </td>
                            <td style={{
                              padding: '16px 20px',
                              color: 'var(--white)',
                              fontSize: '15px',
                              fontWeight: 600,
                              textAlign: 'right'
                            }}>
                              {spec.value}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <div style={{
                    background: 'var(--cart-black)',
                    border: '1px solid var(--stroke)',
                    borderRadius: '20px',
                    padding: '40px',
                    textAlign: 'center',
                    color: 'var(--txt)'
                  }}>
                    Характеристики не указаны
                  </div>
                )}
              </div>
            </div>
            
            {/* Правая колонка: Форма заказа */}
            <div>
              {/* Блок "В стоимость включено" */}
              <div style={{
                background: 'var(--cart-black)',
                border: '1px solid var(--stroke)',
                borderRadius: '20px',
                padding: isMobile ? '20px' : '28px',
                marginBottom: '24px'
              }}>
                <h3 style={{
                  color: 'var(--white)',
                  fontSize: '20px',
                  fontWeight: 700,
                  marginBottom: '20px'
                }}>
                  В стоимость включено:
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '12px'
                }}>
                  {/* Работа оператора */}
                  <div style={{
                    background: 'rgba(192, 239, 85, 0.05)',
                    border: '1px solid var(--stroke)',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '4px'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--background-black)">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z"/>
                      </svg>
                    </div>
                    <span style={{
                      color: 'var(--white)',
                      fontSize: '13px',
                      fontWeight: 500,
                      lineHeight: '1.3'
                    }}>
                      Работа оператора
                    </span>
                  </div>

                  {/* Обслуживание техники */}
                  <div style={{
                    background: 'rgba(192, 239, 85, 0.05)',
                    border: '1px solid var(--stroke)',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '4px'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--background-black)">
                        <path d="M22.7 19l-9.1-9.1c.9-2.3.4-5-1.5-6.9-2-2-5-2.4-7.4-1.3L9 6 6 9 1.6 4.7C.4 7.1.9 10.1 2.9 12.1c1.9 1.9 4.6 2.4 6.9 1.5l9.1 9.1c.4.4 1 .4 1.4 0l2.3-2.3c.5-.4.5-1.1.1-1.4z"/>
                      </svg>
                    </div>
                    <span style={{
                      color: 'var(--white)',
                      fontSize: '13px',
                      fontWeight: 500,
                      lineHeight: '1.3'
                    }}>
                      Обслуживание техники
                    </span>
                  </div>

                  {/* Заправка топливом */}
                  <div style={{
                    background: 'rgba(192, 239, 85, 0.05)',
                    border: '1px solid var(--stroke)',
                    borderRadius: '12px',
                    padding: '16px',
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <div style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: '12px',
                      background: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      marginBottom: '4px'
                    }}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="var(--background-black)">
                        <path d="M19.77 7.23l.01-.01-3.72-3.72L15 4.56l2.11 2.11c-.94.36-1.61 1.26-1.61 2.33 0 1.38 1.12 2.5 2.5 2.5.36 0 .69-.08 1-.21v7.21c0 .55-.45 1-1 1s-1-.45-1-1V14c0-1.1-.9-2-2-2h-1V5c0-1.1-.9-2-2-2H6c-1.1 0-2 .9-2 2v16h10v-7.5h1.5v5c0 1.38 1.12 2.5 2.5 2.5s2.5-1.12 2.5-2.5V9c0-.69-.28-1.32-.73-1.77zM12 10H6V5h6v5zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
                      </svg>
                    </div>
                    <span style={{
                      color: 'var(--white)',
                      fontSize: '13px',
                      fontWeight: 500,
                      lineHeight: '1.3'
                    }}>
                      Заправка топливом
                    </span>
                  </div>
                </div>
              </div>

              {/* Цены и форма заказа */}
              <div style={{
                background: 'var(--cart-black)',
                border: '1px solid var(--stroke)',
                borderRadius: '20px',
                padding: isMobile ? '20px' : '28px'
              }}>
                {/* Цены */}
                <div style={{ marginBottom: '24px' }}>
                  <div style={{ color: 'var(--txt)', fontSize: '14px', marginBottom: '8px' }}>
                    Цена за смену
                  </div>
                  <div style={{ color: 'var(--primary)', fontSize: 'clamp(24px, 3vw, 32px)', fontWeight: 700 }}>
                    от {pricePerShift.toLocaleString('ru-RU')} ₽
                  </div>
                </div>

                <div
                  style={{
                    borderRadius: '16px',
                    border: '1px dashed rgba(192, 239, 85, 0.6)',
                    background: 'rgba(192, 239, 85, 0.12)',
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '14px',
                    marginBottom: '18px'
                  }}
                >
                  <div
                    style={{
                      width: '42px',
                      height: '42px',
                      borderRadius: '12px',
                      background: 'var(--primary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--background-black)',
                      fontWeight: 700
                    }}
                  >
                    %
                  </div>
                  <div>
                    <div style={{ color: 'var(--white)', fontWeight: 700, fontSize: '16px', marginBottom: '4px' }}>
                      Аренда от 3 дней — скидка 10%
                    </div>
                    <div style={{ color: 'var(--txt)', fontSize: '14px' }}>
                      Скидка применяется автоматически при расчёте и отображается ниже.
                    </div>
                  </div>
                </div>

                

                <div style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  padding: '10px 18px',
                  borderRadius: '999px',
                  background: 'rgba(192, 239, 85, 0.12)',
                  color: 'var(--primary)',
                  fontWeight: 600,
                  fontSize: '14px',
                  marginBottom: '20px'
                }}>
                  Аренда по сменам
                </div>

                {/* Поля ввода */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
                  <div>
                    <label style={{
                      display: 'block',
                      color: 'var(--white)',
                      fontSize: '14px',
                      marginBottom: '8px'
                    }}>
                      Количество дней<span style={{ color: 'var(--primary)' }}>*</span>
                    </label>
                    <input
                      type="number"
                      min="1"
                      value={days}
                      onChange={(e) => {
                        const newDays = Math.max(1, parseInt(e.target.value) || 1);
                        setDays(newDays);
                      }}
                      style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '12px',
                        border: '1px solid var(--stroke)',
                        background: 'var(--background-black)',
                        color: 'var(--white)',
                        fontSize: '16px'
                      }}
                    />
                    {days >= discountDays && (
                      <div style={{
                        marginTop: '12px',
                        padding: '12px',
                        borderRadius: '12px',
                        background: 'rgba(192, 239, 85, 0.1)',
                        border: '1px solid var(--primary)',
                        color: 'var(--primary)',
                        fontSize: '14px',
                        fontWeight: 600
                      }}>
                        🎉 Скидка {discountPercent}% применена!
                      </div>
                    )}
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      color: 'var(--white)',
                      fontSize: '14px',
                      marginBottom: '8px'
                    }}>
                      Начало аренды<span style={{ color: 'var(--primary)' }}>*</span>
                    </label>
                    <div style={{ position: 'relative' }} ref={dateFieldRef}>
                      <input
                        type="text"
                        readOnly
                        value={displayDate}
                        placeholder="Выберите дату"
                        onClick={() => setIsCalendarOpen(true)}
                        style={{
                          width: '100%',
                          padding: '14px 48px 14px 16px',
                          borderRadius: '12px',
                          border: '1px solid var(--stroke)',
                          background: 'var(--background-black)',
                          color: displayDate ? 'var(--white)' : 'var(--txt)',
                          fontSize: '16px',
                          cursor: 'pointer'
                        }}
                      />
                      <button
                        type="button"
                        onClick={() => setIsCalendarOpen((prev) => !prev)}
                        style={{
                          position: 'absolute',
                          right: '12px',
                          top: '50%',
                          transform: 'translateY(-50%)',
                          background: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          color: 'var(--txt)'
                        }}
                      >
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                          <line x1="16" y1="2" x2="16" y2="6" />
                          <line x1="8" y1="2" x2="8" y2="6" />
                          <line x1="3" y1="10" x2="21" y2="10" />
                        </svg>
                      </button>
                      {isCalendarOpen && (
                        <CalendarDropdown
                          selectedDate={startDate}
                          onSelect={(value) => setStartDate(value)}
                          onClose={() => setIsCalendarOpen(false)}
                          anchorRef={dateFieldRef}
                        />
                      )}
                    </div>
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      color: 'var(--white)',
                      fontSize: '14px',
                      marginBottom: '8px'
                    }}>
                      Адрес<span style={{ color: 'var(--primary)' }}>*</span>
                    </label>
                    <input
                      type="text"
                      placeholder="Введите адрес доставки"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '12px',
                        border: '1px solid var(--stroke)',
                        background: 'var(--background-black)',
                        color: 'var(--white)',
                        fontSize: '16px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      color: 'var(--white)',
                      fontSize: '14px',
                      marginBottom: '8px'
                    }}>
                      Ваше имя
                    </label>
                    <input
                      type="text"
                      placeholder="Введите ваше имя"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '12px',
                        border: '1px solid var(--stroke)',
                        background: 'var(--background-black)',
                        color: 'var(--white)',
                        fontSize: '16px'
                      }}
                    />
                  </div>

                  <div>
                    <label style={{
                      display: 'block',
                      color: 'var(--white)',
                      fontSize: '14px',
                      marginBottom: '8px'
                    }}>
                      Ваш телефон<span style={{ color: 'var(--primary)' }}>*</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="+7 (___) ___-__-__"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '14px',
                        borderRadius: '12px',
                        border: '1px solid var(--stroke)',
                        background: 'var(--background-black)',
                        color: 'var(--white)',
                        fontSize: '16px'
                      }}
                    />
                  </div>
                </div>

                {/* Кнопки */}
                <div style={{ display: 'flex', gap: '12px', marginBottom: '16px' }}>
                  <button
                    onClick={handleQuickOrder}
                    style={{
                      flex: 1,
                      padding: '16px',
                      borderRadius: '12px',
                      border: '2px solid var(--white)',
                      background: 'transparent',
                      color: 'var(--white)',
                      fontSize: '16px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'var(--white)';
                      e.currentTarget.style.color = 'var(--background-black)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'transparent';
                      e.currentTarget.style.color = 'var(--white)';
                    }}
                  >
                    Быстрый заказ
                  </button>
                  <button
                    onClick={handleWhatsAppOrder}
                    style={{
                      flex: 1,
                      padding: '16px',
                      borderRadius: '12px',
                      border: 'none',
                      background: 'var(--primary)',
                      color: 'var(--background-black)',
                      fontSize: '16px',
                      fontWeight: 700,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.9';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1';
                    }}
                  >
                    Отправить
                  </button>
                </div>

                {/* Disclaimer */}
                <p style={{
                  color: 'var(--txt)',
                  fontSize: '12px',
                  lineHeight: '1.5',
                  textAlign: 'center'
                }}>
                  <span style={{ color: 'var(--primary)' }}>*</span>Нажимая на кнопку «Отправить» или «Быстрый заказ», Вы соглашаетесь{' '}
                  <a href="#" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>
                    на обработку персональных данных
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Другая техника */}
          {otherEquipment.length > 0 && (
            <div style={{ marginTop: isMobile ? '40px' : '60px' }}>
              <h2 style={{
                color: 'var(--white)',
                fontSize: isMobile ? 'clamp(26px, 8vw, 34px)' : '46px',
                fontWeight: 700,
                marginBottom: isMobile ? '30px' : '40px',
                textAlign: 'center'
              }}>
                Другая техника
              </h2>
              <div style={{
                display: 'grid',
                gridTemplateColumns: isMobile ? 'repeat(2, minmax(0, 1fr))' : 'repeat(6, minmax(0, 1fr))',
                gap: isMobile ? '18px' : '30px',
                justifyItems: 'center'
              }}>
                {otherEquipment.map((item) => (
                  <EquipmentCard key={item.id} item={item} isMobile={isMobile} />
                ))}
              </div>
            </div>
          )}
            </div>
      </section>
    </>
  );
}
