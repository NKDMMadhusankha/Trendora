import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

export default function ProductCategorySection() {
  const navigate = useNavigate();

  const categories = [
    {
      id: 1,
      title: 'MENS',
      video: 'https://cdn.pixabay.com/video/2025/02/10/257554_large.mp4',
      link: '/mens'
    },
    {
      id: 2,
      title: 'WOMENS',
      video: 'https://cdn.pixabay.com/video/2024/01/23/197848-905691449_large.mp4',
      link: '/womens'
    },
    {
      id: 3,
      title: 'ACCESSORIES',
      video: 'https://cdn.pixabay.com/video/2025/12/04/319811.mp4',
      link: '/accessories'
    }
  ];

  const handleClick = (e, link) => {
    e.preventDefault();
    navigate(link);
    window.scrollTo(0, 0);
    window.location.reload();
  };

  return (
    <div className="w-full flex flex-col md:flex-row gap-4">
      {categories.map((category) => (
        <Link
          key={category.id}
          to={category.link}
          onClick={(e) => handleClick(e, category.link)}
          className="relative group overflow-hidden flex-1 aspect-[3/4] md:aspect-auto md:h-[800px] cursor-pointer"
        >
          {/* Background Image or Video */}
          {category.video ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            >
              <source src={category.video} type="video/mp4" />
            </video>
          ) : (
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
              style={{ backgroundImage: `url(${category.image})` }}
            />
          )}
          
          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-30 transition-all duration-300"></div>

          {/* Content */}
          <div className="relative h-full flex items-end p-8">
            <div className="flex items-center justify-between w-full">
              <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-wide">
                {category.title}
              </h2>
              <div className="w-12 h-12 rounded-full border-2 border-white flex items-center justify-center group-hover:bg-white transition-all duration-300">
                <ArrowRight className="text-white group-hover:text-black transition-colors duration-300" size={24} />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}