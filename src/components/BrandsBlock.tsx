const brandLogos = [
  '/images/icons/b1.svg',
  '/images/icons/b2.svg',
  '/images/icons/b3.svg',
  '/images/icons/b4.svg',
  '/images/icons/b5.svg',
  '/images/icons/b6.svg',
  '/images/icons/b7.svg',
  '/images/icons/b8.svg'
];

export default function BrandsBlock() {
  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold font-second-family text-white mb-10">Бренды спецтехники</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-5">
          {brandLogos.map((logo, index) => (
            <div key={index} className="group relative overflow-hidden border border-stroke rounded-2xl h-[150px] flex items-center justify-center p-5 transition-all duration-300 hover:bg-cart-black hover:border-primary">
              <img 
                src={logo} 
                alt={`Brand ${index + 1}`} 
                className="max-w-full max-h-full object-contain opacity-60 group-hover:opacity-100 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
