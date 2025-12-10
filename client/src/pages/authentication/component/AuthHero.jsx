import React, { useState } from 'react'
import { motion, AnimatePresence } from "framer-motion";

const AuthHero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // UPDATED FEATURES FOR PRODUCT MANAGEMENT SYSTEM
  const features = [
    { icon: "📦", title: "Smart Product Control", desc: "Manage and organize all your products in one clean dashboard." },
    { icon: "📊", title: "Sales Insights", desc: "Real-time stats to track trends, performance, and growth." },
    { icon: "🤖", title: "AI Recommendations", desc: "Get automated suggestions to improve product visibility and performance." },
    { icon: "⚡", title: "Fast & Efficient", desc: "Lightning-fast operations for large product catalogs." },
    { icon: "🔒", title: "Secure Data", desc: "Your product data stays protected with enterprise-grade security." },
  ];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (direction) => ({
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.8,
    }),
  };

  const swipeConfidenceThreshold = 5000;
  const swipePower = (offset, velocity) => {
    return Math.abs(offset) * velocity;
  };

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = features.length - 1;
      if (nextIndex >= features.length) nextIndex = 0;
      return nextIndex;
    });
  };

  return (
    <div className='relative overflow-hidden flex items-center justify-center flex-col w-full h-full bg-cover bg-center bg-no-repeat bg-[url("https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?q=80&w=2070&auto=format&fit=crop")] rounded-2xl'>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 rounded-2xl" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full w-full px-4 py-6 md:py-8 lg:py-12">
        
        {/* Header */}
        <header className='flex gap-3 md:gap-4 items-center justify-center flex-col max-w-lg mb-6 md:mb-8'>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className='text-white text-3xl md:text-4xl lg:text-5xl font-bold text-center leading-tight'
          >
            Manage Products.<br />Sell Smarter.
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className='text-white/80 text-center text-sm md:text-base lg:text-lg'
          >
            A fast, secure, and intelligent product management dashboard
          </motion.p>
        </header>

        {/* Main Content */}
        <main className="w-full flex-1 flex flex-col items-center justify-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white text-xl md:text-2xl lg:text-3xl font-semibold mb-6 md:mb-10"
          >
            Why Choose Our System?
          </motion.h2>

          <div className="relative flex items-center justify-center w-full">
            <div className="relative w-full max-w-sm md:max-w-md h-64 md:h-80 lg:h-96 flex items-center justify-center px-2 md:px-8">

              <AnimatePresence initial={false} custom={direction} mode="popLayout">
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.3 },
                    scale: { duration: 0.3 },
                  }}
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.5}
                  onDragEnd={(e, { offset, velocity }) => {
                    const swipe = swipePower(offset.x, velocity.x);
                    if (swipe < -swipeConfidenceThreshold) paginate(1);
                    else if (swipe > swipeConfidenceThreshold) paginate(-1);
                  }}
                  whileHover={{ scale: 1.03, y: -5 }}
                  className="absolute w-full bg-white/10 backdrop-blur-2xl border border-white/20 rounded-2xl p-6 md:p-8 lg:p-10 shadow-2xl text-white cursor-grab active:cursor-grabbing"
                >
                  
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-6xl lg:text-7xl mb-4 text-center"
                  >
                    {features[currentIndex].icon}
                  </motion.div>

                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-xl md:text-2xl lg:text-3xl font-bold mb-2 text-center"
                  >
                    {features[currentIndex].title}
                  </motion.h3>

                  <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="text-sm md:text-base lg:text-lg text-white/80 text-center leading-relaxed"
                  >
                    {features[currentIndex].desc}
                  </motion.p>

                </motion.div>
              </AnimatePresence>

            </div>
          </div>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 md:gap-3 mt-6 md:mt-8">
            {features.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
                className={`h-2 md:h-2.5 rounded-full transition-all duration-500 ${
                  index === currentIndex 
                    ? 'bg-white w-8 md:w-10'
                    : 'bg-white/30 w-2 md:w-2.5 hover:bg-white/50'
                }`}
              />
            ))}
          </div>

        </main>
      </div>
    </div>
  )
}

export default AuthHero;
