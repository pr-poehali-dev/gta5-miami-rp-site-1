import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/icon";
import { Badge } from "@/components/ui/badge";

interface MapMarker {
  id: number;
  name: string;
  x: number;
  y: number;
  type: "bank" | "hospital" | "police" | "airport" | "shop" | "garage";
  color: string;
}

const InteractiveMap = () => {
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showMarkers, setShowMarkers] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const markers: MapMarker[] = [
    { id: 1, name: "Pacific Bank", x: 45, y: 55, type: "bank", color: "#00F0FF" },
    { id: 2, name: "Central Hospital", x: 52, y: 48, type: "hospital", color: "#FF006E" },
    { id: 3, name: "LSPD Главный", x: 48, y: 52, type: "police", color: "#0EA5E9" },
    { id: 4, name: "Los Santos Airport", x: 35, y: 75, type: "airport", color: "#8B00FF" },
    { id: 5, name: "24/7 Shop", x: 42, y: 45, type: "shop", color: "#10b981" },
    { id: 6, name: "Garage", x: 55, y: 42, type: "garage", color: "#f59e0b" },
    { id: 7, name: "Fleeca Bank", x: 58, y: 38, type: "bank", color: "#00F0FF" },
    { id: 8, name: "Sandy Shores Hospital", x: 72, y: 25, type: "hospital", color: "#FF006E" },
  ];

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
          className="w-full h-full flex items-center justify-center relative"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.1s ease-out',
          }}
        >
          <img
            src="/img/c4777b79-00a0-4a8e-8500-e2acf02a3cdc.jpg"
            alt="GTA 5 Map"
            className="w-full h-full object-contain pointer-events-none select-none"
            draggable={false}
          />
          
          {showMarkers && markers.map((marker) => (
            <div
              key={marker.id}
              className="absolute pointer-events-auto cursor-pointer group"
              style={{
                left: `${marker.x}%`,
                top: `${marker.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            >
              <div
                className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center animate-pulse shadow-lg"
                style={{
                  backgroundColor: marker.color,
                  boxShadow: `0 0 20px ${marker.color}, 0 0 40px ${marker.color}`,
                }}
              >
                {marker.type === "bank" && <Icon name="Landmark" size={14} className="text-black" />}
                {marker.type === "hospital" && <Icon name="Cross" size={14} className="text-white" />}
                {marker.type === "police" && <Icon name="Shield" size={14} className="text-white" />}
                {marker.type === "airport" && <Icon name="Plane" size={14} className="text-white" />}
                {marker.type === "shop" && <Icon name="ShoppingCart" size={14} className="text-white" />}
                {marker.type === "garage" && <Icon name="Wrench" size={14} className="text-white" />}
              </div>
              <Badge
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-xs"
                style={{ backgroundColor: marker.color }}
              >
                {marker.name}
              </Badge>
            </div>
          ))}
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
        <Button
          onClick={() => setShowMarkers(!showMarkers)}
          className={`${showMarkers ? 'bg-[var(--neon-purple)]' : 'bg-gray-600'} hover:bg-[var(--neon-purple)]/80 text-white w-10 h-10 sm:w-12 sm:h-12 p-0`}
          title="Метки"
        >
          <Icon name="MapPin" size={20} />
        </Button>
      </div>

      <div className="absolute bottom-4 left-4 bg-[#16213E]/90 backdrop-blur-sm rounded-lg px-3 sm:px-4 py-2 border border-[var(--neon-cyan)]/30 pointer-events-none z-10">
        <p className="text-white/80 text-xs sm:text-sm">
          Масштаб: <span className="neon-text-cyan font-bold">{Math.round(scale * 100)}%</span>
        </p>
      </div>

      {showMarkers && (
        <div className="absolute top-4 right-4 bg-[#16213E]/90 backdrop-blur-sm rounded-lg p-3 border border-[var(--neon-purple)]/30 z-10 max-w-xs">
          <h4 className="text-[var(--neon-purple)] font-bold text-sm mb-2">Легенда карты</h4>
          <div className="space-y-1 text-xs text-white/80">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#00F0FF' }}></div>
              <span>Банки</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#FF006E' }}></div>
              <span>Больницы</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#0EA5E9' }}></div>
              <span>Полиция</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#8B00FF' }}></div>
              <span>Аэропорт</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#10b981' }}></div>
              <span>Магазины</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#f59e0b' }}></div>
              <span>Гаражи</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;