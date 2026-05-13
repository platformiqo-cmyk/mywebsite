
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';

const ImageLightbox = ({ isOpen, images = [], initialIndex = 0, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [initialDistance, setInitialDistance] = useState(null);
  const imageRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setScale(1);
      setPosition({ x: 0, y: 0 });
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, initialIndex]);

  const handleNext = (e) => {
    e.stopPropagation();
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prev => prev + 1);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
      setScale(1);
      setPosition({ x: 0, y: 0 });
    }
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const zoomSensitivity = 0.005;
    const delta = -e.deltaY * zoomSensitivity;
    const newScale = Math.min(Math.max(1, scale + delta), 5);
    setScale(newScale);
    if (newScale === 1) setPosition({ x: 0, y: 0 });
  };

  const handleDoubleClick = () => {
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  };

  const handleTouchStart = (e) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setInitialDistance(dist);
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2 && initialDistance) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const delta = (dist - initialDistance) * 0.01;
      const newScale = Math.min(Math.max(1, scale + delta), 5);
      setScale(newScale);
      setInitialDistance(dist);
      if (newScale === 1) setPosition({ x: 0, y: 0 });
    }
  };

  const handleTouchEnd = () => {
    setInitialDistance(null);
  };

  if (!images || images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={onClose}
          onWheel={handleWheel}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 md:top-6 md:right-6 z-[101] p-2 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all"
            aria-label="Close lightbox"
          >
            <X className="w-6 h-6 md:w-8 md:h-8" />
          </button>

          {/* Navigation Buttons */}
          {images.length > 1 && (
            <>
              {currentIndex > 0 && (
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-[101] p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all"
                >
                  <ChevronLeft className="w-8 h-8" />
                </button>
              )}
              {currentIndex < images.length - 1 && (
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-[101] p-3 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-all"
                >
                  <ChevronRight className="w-8 h-8" />
                </button>
              )}
              
              {/* Image Counter */}
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-[101] text-white/80 bg-black/50 px-4 py-1.5 rounded-full text-sm font-medium">
                {currentIndex + 1} / {images.length}
              </div>
            </>
          )}

          {/* Image Container */}
          <div 
            className="relative w-full h-full flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                ref={imageRef}
                src={currentImage?.src}
                alt={currentImage?.alt || 'Gallery image'}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale, x: position.x, y: position.y }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                drag={scale > 1}
                dragConstraints={{ left: -500, right: 500, top: -500, bottom: 500 }}
                dragElastic={0.1}
                onDoubleClick={handleDoubleClick}
                className={`max-w-full max-h-full object-contain select-none ${scale > 1 ? 'cursor-grab active:cursor-grabbing' : 'cursor-zoom-in'}`}
                style={{ touchAction: "none" }}
              />
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ImageLightbox;
