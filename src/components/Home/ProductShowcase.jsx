import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductShowcase = () => {
  // Mouse hover state track korar jonno
  const [isHovered, setIsHovered] = useState(false);

  // Mouse er X r Y position track korar jonno (Framer Motion)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Movement ta jeno jhakuni na kheye smooth hoy tar jonno spring physics
  const springConfig = { damping: 25, stiffness: 400, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e) => {
      // Mouse er coordinate anujayi custom cursor er position set kora
      // -60 r -20 holo custom cursor tar width/height er ordhek, jate thik majhkhan barabor mouse thake
      cursorX.set(e.clientX - 60);
      cursorY.set(e.clientY - 20);
    };

    window.addEventListener('mousemove', moveCursor);
    return () => {
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY]);

  // Animation variants
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  const showcaseItems = [
    {
      title: "Forvorda Traction Machines",
      image: "https://res.cloudinary.com/dsrs8hryx/image/upload/v1791974236/magnific_align-the-motor-machine-w_79W6ggxJAL_w3xbub.png", 
    },
    {
      title: "Premium Elevator Cabins", 
      image: "https://res.cloudinary.com/dsrs8hryx/image/upload/v1791974382/5_gckvqp.jpg",
    },
    {
      title: "Complete Elevator Solutions", 
      image: "https://res.cloudinary.com/dsrs8hryx/image/upload/v1791975734/Composite_image_of_elevator_scenes_20261014170105_ousqh9.jpg",
    },
    {
      title: "Genuine Spare Parts", 
      image: "https://res.cloudinary.com/dsrs8hryx/image/upload/v1791975841/magnific_replace-my-attached-machi_1l6SmzEr4r_gndsdd.png",
    }
  ];

  return (
    <section className="w-full py-10 lg:py-15 bg-white relative">
      
      <motion.div
        className="fixed top-0 left-0 z-50 pointer-events-none hidden md:flex items-center justify-center bg-[#1e447b] text-white inter-bold uppercase tracking-widest text-[10px] w-[120px] h-[40px] rounded-full shadow-2xl"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ 
          scale: isHovered ? 1 : 0, 
          opacity: isHovered ? 1 : 0 
        }}
        transition={{ duration: 0.2 }}
      >
        View Product
      </motion.div>

      <div className="max-w-[1700px] mx-auto px-6 lg:px-[5%]">
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{ visible: { transition: { staggerChildren: 0.15 } } }}
          className="flex flex-col"
        >
          {/* Header - Centered Layout */}
          <div className="flex flex-col items-center text-center mb-16">
            <motion.div variants={fadeUp} className="mb-4">
              <span className="text-[#1e447b] inter-semibold tracking-[0.2em] text-[11px] md:text-[14px] uppercase">
                Premium Catalog
              </span>
            </motion.div>
            <motion.h2 variants={fadeUp} className="text-4xl sm:text-5xl lg:text-[4rem] inter-bold text-slate-900 tracking-tight">
              Innovation That Moves <span className="text-[#1e447b]">You.</span>
            </motion.h2>
          </div>

          {/* Image Grid Area */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {showcaseItems.map((item, index) => (
              <motion.div key={index} variants={fadeUp}>
                
                {/* 
                  Link e cursor-none class add kora hoyeche, jate default cursor gayeb hoye jay.
                  onMouseEnter ebong onMouseLeave diye custom cursor ta show/hide kora hochhe.
                */}
                <Link 
                  to="/Product" 
                  className="group relative block w-full aspect-[4/5] overflow-hidden bg-slate-100 cursor-none"
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  
                  {/* Background Image (Hover e zoom hobe) */}
                  <img 
                    src={item.image} 
                    alt={item.title} 
                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                  
                  {/* Dark Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-70 transition-opacity duration-500"></div>
                  
                  {/* Clean Text on Image */}
                  <div className="absolute bottom-0 left-0 w-full p-8 flex flex-col justify-end">
                    <span className="text-[#eab308] text-xs font-bold tracking-widest uppercase mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                      Explore
                    </span>
                    <h3 className="text-white font-bold text-2xl tracking-wide">
                      {item.title}
                    </h3>
                  </div>
                  
                </Link>
              </motion.div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;