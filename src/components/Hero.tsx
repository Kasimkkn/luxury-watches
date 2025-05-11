import { Award, Clock, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="relative bg-gradient-to-br from-[#121212] via-[#1E1E1E] to-black overflow-hidden">
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500 rounded-full filter blur-3xl"></div>
      </div>
      {/* Main content */}
      <div className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

          {/* Left column - Text content */}
          <div className={`lg:w-1/2 space-y-6 md:space-y-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="inline-block bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text">
              <p className="text-transparent font-medium tracking-wider uppercase text-sm md:text-base">
                Timeless Elegance
              </p>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold leading-tight text-white">
              <span className="block">Exceptional Timepieces</span>
              <span className="block mt-2 bg-gradient-to-r from-amber-200 to-amber-400 bg-clip-text text-transparent">
                For Extraordinary Lives
              </span>
            </h1>

            <p className="text-base md:text-lg text-gray-300 max-w-lg leading-relaxed">
              Discover our meticulously curated collection of luxury watches from the world's most prestigious watchmakers — where heritage meets innovation.
            </p>

            <div className="grid grid-cols-12 gap-4 pt-4">
              <button
                onClick={() => navigate("/watches")}
                className="group col-span-6 md:col-span-5 flex items-center gap-2 bg-gradient-to-r from-amber-400 to-amber-300 hover:from-amber-300 hover:to-amber-200 px-6  py-2 md:py-3 rounded-lg font-medium text-gray-900 shadow-lg hover:shadow-amber-500/20 transition-all duration-300 max-md:text-sm"
              >
                <ShoppingBag className="max-md:hidden" />
                Explore Collection
              </button>

              <button
                onClick={() => navigate("/sell")}
                className="flex col-span-5 md:col-span-4 items-center gap-2 bg-transparent hover:bg-white/10 border border-amber-300/30 text-amber-200 px-6  py-2 md:py-3 rounded-lg font-medium transition-all duration-300 max-md:text-sm"
              >
                Sell Your Watch
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap gap-x-8 gap-y-4 pt-6 text-sm text-gray-400 items-center">
              <div className="flex items-center gap-2">
                <Award size={16} className="text-amber-300" />
                <span>Authenticity Guaranteed</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-amber-300" />
                <span>24-Month Warranty</span>
              </div>
            </div>
          </div>

          {/* Right column - Images */}
          <div className={`lg:w-1/2 transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <div className="relative">
              {/* Main watch image */}
              <div className="relative z-10 rounded-lg overflow-hidden shadow-2xl">
                <div className="aspect-square md:aspect-[4/5] lg:aspect-[3/3]">
                  <img
                    src="https://images.unsplash.com/photo-1523170335258-f5ed11844a49?q=80&w=1080"
                    alt="Luxury Watch"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>

                {/* Elegant overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              </div>

              {/* Floating card */}
              <div className="absolute left-0 -bottom-6 md:bottom-8 md:-left-8 z-20 bg-[#121212] backdrop-blur-sm border border-gray-800 p-4 md:p-6 rounded-lg shadow-xl transform transition-all duration-500 hover:-translate-y-1 hover:shadow-amber-500/10 max-w-xs">
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-amber-300 font-bold text-lg">Premium Collection</p>
                    <p className="text-gray-400 text-sm mt-1">Each timepiece meticulously verified by our master watchmakers</p>
                  </div>
                </div>
              </div>

              {/* Small decorative image */}
              <div className="hidden md:block absolute -top-6 -right-6 w-32 h-32 md:w-40 md:h-40 rounded-lg overflow-hidden border-4 border-gray-900 shadow-xl z-20 transform rotate-6">
                <img
                  src="https://cdn.shopify.com/s/files/1/0579/0741/3177/files/image4_e1848751-2089-4cb2-b5c2-589a2678101c.jpg?v=1634049183"
                  alt="Watch Detail"
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;