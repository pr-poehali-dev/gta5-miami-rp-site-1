import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface AdminPanelProps {
  onAddImage: (url: string) => void;
  onClose: () => void;
}

const AdminPanel = ({ onAddImage, onClose }: AdminPanelProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const { toast } = useToast();

  const ADMIN_PASSWORD = "miami2024";

  const handleLogin = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
      toast({
        title: "Вход выполнен",
        description: "Добро пожаловать в админ-панель!",
      });
    } else {
      toast({
        title: "Ошибка",
        description: "Неверный пароль",
        variant: "destructive",
      });
    }
  };

  const handleAddImage = () => {
    if (imageUrl.trim()) {
      onAddImage(imageUrl);
      setImageUrl("");
      toast({
        title: "Успешно",
        description: "Изображение добавлено в галерею",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
        <Card className="bg-[#16213E] border-[var(--neon-pink)]/50 w-full max-w-md">
          <CardHeader>
            <CardTitle className="neon-text-pink text-2xl flex items-center justify-between">
              <span>Админ-панель</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClose}
                className="text-white hover:text-[var(--neon-pink)]"
              >
                <Icon name="X" size={20} />
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password" className="text-white">Пароль</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                className="bg-[#1A1A2E] border-[var(--neon-pink)]/30 text-white"
                placeholder="Введите пароль"
              />
            </div>
            <Button
              onClick={handleLogin}
              className="w-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80 neon-glow-pink"
            >
              <Icon name="LogIn" className="mr-2" size={20} />
              Войти
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <Card className="bg-[#16213E] border-[var(--neon-cyan)]/50 w-full max-w-2xl my-8">
        <CardHeader>
          <CardTitle className="neon-text-cyan text-2xl flex items-center justify-between">
            <span>Управление галереей</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:text-[var(--neon-cyan)]"
            >
              <Icon name="X" size={20} />
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label htmlFor="imageUrl" className="text-white text-lg">
              Добавить изображение
            </Label>
            <div className="flex gap-3">
              <Input
                id="imageUrl"
                type="url"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
                className="bg-[#1A1A2E] border-[var(--neon-cyan)]/30 text-white flex-1"
                placeholder="https://example.com/image.jpg"
              />
              <Button
                onClick={handleAddImage}
                className="bg-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/80 text-black neon-glow-cyan"
              >
                <Icon name="Plus" className="mr-2" size={20} />
                Добавить
              </Button>
            </div>
            <p className="text-white/60 text-sm">
              Введите URL изображения для добавления в галерею
            </p>
          </div>

          <div className="pt-4 border-t border-[var(--neon-cyan)]/30">
            <Button
              onClick={() => setIsAuthenticated(false)}
              variant="outline"
              className="border-[var(--neon-pink)]/50 text-white hover:bg-[var(--neon-pink)]/20"
            >
              <Icon name="LogOut" className="mr-2" size={20} />
              Выйти
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminPanel;
