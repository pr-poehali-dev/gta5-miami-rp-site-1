import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";

const InteractiveMap = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => {
    setScale((prev) => Math.min(prev + 0.2, 3));
  };

  const handleZoomOut = () => {
    setScale((prev) => Math.max(prev - 0.2, 0.5));
  };

  const handleReset = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setIsDragging(true);
    setDragStart({ x: touch.clientX - position.x, y: touch.clientY - position.y });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (isDragging && e.touches.length === 1) {
      const touch = e.touches[0];
      setPosition({
        x: touch.clientX - dragStart.x,
        y: touch.clientY - dragStart.y,
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    const handleGlobalMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mouseup", handleGlobalMouseUp);
    return () => {
      document.removeEventListener("mouseup", handleGlobalMouseUp);
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div
        ref={containerRef}
        className="w-full h-full overflow-hidden bg-gradient-to-br from-[var(--neon-pink)]/10 via-[var(--neon-purple)]/10 to-[var(--neon-cyan)]/10 rounded-lg cursor-move active:cursor-grabbing"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{ touchAction: 'none' }}
      >
        <div
          className="w-full h-full flex items-center justify-center"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          <img
            src="https://i.imgur.com/9kOIYWO.jpg"
            alt="GTA 5 Map"
            className="w-full h-full object-contain pointer-events-none select-none"
            draggable={false}
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.src = "https://via.placeholder.com/800x800/1A1A2E/FF006E?text=GTA+5+Map+Loading";
            }}
          />
        </div>

        <div className="absolute top-4 left-4 bg-[#16213E]/90 backdrop-blur-sm rounded-lg p-3 border border-[var(--neon-pink)]/30 pointer-events-none z-10">
          <h3 className="neon-text-pink font-bold text-base sm:text-lg mb-1">Miami RP Map</h3>
          <p className="text-white/60 text-xs sm:text-sm">Перемещайте и масштабируйте</p>
        </div>
      </div>

      <div className="absolute bottom-4 right-4 flex flex-col gap-2 z-20">
        <Button
          onClick={handleZoomIn}
          className="bg-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/80 neon-glow-cyan text-black w-10 h-10 sm:w-12 sm:h-12 p-0"
          title="Увеличить"
        >
          <Icon name="ZoomIn" size={20} />
        </Button>
        <Button
          onClick={handleZoomOut}
          className="bg-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/80 neon-glow-cyan text-black w-10 h-10 sm:w-12 sm:h-12 p-0"
          title="Уменьшить"
        >
          <Icon name="ZoomOut" size={20} />
        </Button>
        <Button
          onClick={handleReset}
          className="bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80 neon-glow-pink text-white w-10 h-10 sm:w-12 sm:h-12 p-0"
          title="Сбросить"
        >
          <Icon name="Home" size={20} />
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 bg-[#16213E]/90 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 border border-[var(--neon-cyan)]/30 pointer-events-none z-10">
        <p className="text-white/80 text-xs sm:text-sm">
          Масштаб: <span className="neon-text-cyan font-bold">{Math.round(scale * 100)}%</span>
        </p>
      </div>
    </div>
  );
};

export default InteractiveMap;