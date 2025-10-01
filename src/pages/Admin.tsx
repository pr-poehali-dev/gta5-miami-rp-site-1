import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "@/components/ui/textarea";

const Admin = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");

  const [imageUrl, setImageUrl] = useState("");
  const [forumTitle, setForumTitle] = useState("");
  const [forumCategory, setForumCategory] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [jobStatus, setJobStatus] = useState("Открыта");
  const [onlinePlayers, setOnlinePlayers] = useState("247");

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
      toast({
        title: "Успешно",
        description: "Изображение добавлено в галерею",
      });
      setImageUrl("");
    }
  };

  const handleAddForumTopic = () => {
    if (forumTitle.trim() && forumCategory.trim()) {
      toast({
        title: "Успешно",
        description: "Тема форума создана",
      });
      setForumTitle("");
      setForumCategory("");
    }
  };

  const handleAddJob = () => {
    if (jobTitle.trim() && jobRequirements.trim()) {
      toast({
        title: "Успешно",
        description: "Вакансия добавлена",
      });
      setJobTitle("");
      setJobRequirements("");
    }
  };

  const handleUpdateOnline = () => {
    toast({
      title: "Успешно",
      description: "Статистика обновлена",
    });
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    toast({
      title: "Выход выполнен",
      description: "До встречи!",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#1A1A2E] flex items-center justify-center p-4">
        <Card className="bg-[#16213E] border-[var(--neon-pink)]/50 w-full max-w-md">
          <CardHeader>
            <CardTitle className="neon-text-pink text-3xl text-center">
              Админ-панель MIAMI RP
            </CardTitle>
            <CardDescription className="text-white/60 text-center">
              Введите пароль для доступа
            </CardDescription>
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
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="w-full border-[var(--neon-cyan)]/50 text-white hover:bg-[var(--neon-cyan)]/20"
            >
              <Icon name="Home" className="mr-2" size={20} />
              На главную
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <nav className="bg-[#16213E] border-b border-[var(--neon-pink)]/30 py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-2xl sm:text-3xl font-bold neon-text-pink">Админ-панель</h1>
          <div className="flex gap-3">
            <Button
              onClick={() => navigate("/")}
              variant="outline"
              className="border-[var(--neon-cyan)]/50 text-white hover:bg-[var(--neon-cyan)]/20"
            >
              <Icon name="Home" className="mr-2" size={20} />
              На сайт
            </Button>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="border-[var(--neon-pink)]/50 text-white hover:bg-[var(--neon-pink)]/20"
            >
              <Icon name="LogOut" className="mr-2" size={20} />
              Выйти
            </Button>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <Tabs defaultValue="gallery" className="w-full">
          <TabsList className="bg-[#16213E] border border-[var(--neon-pink)]/30 grid w-full grid-cols-2 sm:grid-cols-4">
            <TabsTrigger value="gallery" className="data-[state=active]:bg-[var(--neon-pink)]">
              <Icon name="Images" className="mr-2" size={16} />
              Галерея
            </TabsTrigger>
            <TabsTrigger value="forum" className="data-[state=active]:bg-[var(--neon-pink)]">
              <Icon name="MessageSquare" className="mr-2" size={16} />
              Форум
            </TabsTrigger>
            <TabsTrigger value="jobs" className="data-[state=active]:bg-[var(--neon-pink)]">
              <Icon name="Briefcase" className="mr-2" size={16} />
              Вакансии
            </TabsTrigger>
            <TabsTrigger value="stats" className="data-[state=active]:bg-[var(--neon-pink)]">
              <Icon name="BarChart" className="mr-2" size={16} />
              Статистика
            </TabsTrigger>
          </TabsList>

          <TabsContent value="gallery" className="mt-6">
            <Card className="bg-[#16213E] border-[var(--neon-cyan)]/50">
              <CardHeader>
                <CardTitle className="neon-text-cyan">Управление галереей</CardTitle>
                <CardDescription className="text-white/60">
                  Добавляйте новые изображения в галерею скриншотов
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="imageUrl" className="text-white">URL изображения</Label>
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
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="forum" className="mt-6">
            <Card className="bg-[#16213E] border-[var(--neon-purple)]/50">
              <CardHeader>
                <CardTitle className="text-[var(--neon-purple)]">Управление форумом</CardTitle>
                <CardDescription className="text-white/60">
                  Создавайте новые темы и модерируйте форум
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="forumTitle" className="text-white">Название темы</Label>
                  <Input
                    id="forumTitle"
                    value={forumTitle}
                    onChange={(e) => setForumTitle(e.target.value)}
                    className="bg-[#1A1A2E] border-[var(--neon-purple)]/30 text-white"
                    placeholder="Введите название темы"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="forumCategory" className="text-white">Категория</Label>
                  <Input
                    id="forumCategory"
                    value={forumCategory}
                    onChange={(e) => setForumCategory(e.target.value)}
                    className="bg-[#1A1A2E] border-[var(--neon-purple)]/30 text-white"
                    placeholder="Объявления, Общение, Предложения..."
                  />
                </div>
                <Button
                  onClick={handleAddForumTopic}
                  className="w-full bg-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/80 text-white"
                >
                  <Icon name="Plus" className="mr-2" size={20} />
                  Создать тему
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="jobs" className="mt-6">
            <Card className="bg-[#16213E] border-[var(--neon-cyan)]/50">
              <CardHeader>
                <CardTitle className="neon-text-cyan">Управление вакансиями</CardTitle>
                <CardDescription className="text-white/60">
                  Добавляйте и редактируйте вакансии в администрацию
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="jobTitle" className="text-white">Название должности</Label>
                  <Input
                    id="jobTitle"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                    className="bg-[#1A1A2E] border-[var(--neon-cyan)]/30 text-white"
                    placeholder="Модератор, Хелпер, Администратор..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobRequirements" className="text-white">Требования</Label>
                  <Textarea
                    id="jobRequirements"
                    value={jobRequirements}
                    onChange={(e) => setJobRequirements(e.target.value)}
                    className="bg-[#1A1A2E] border-[var(--neon-cyan)]/30 text-white min-h-20"
                    placeholder="Опишите требования к кандидату..."
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="jobStatus" className="text-white">Статус</Label>
                  <div className="flex gap-3">
                    <Button
                      onClick={() => setJobStatus("Открыта")}
                      variant={jobStatus === "Открыта" ? "default" : "outline"}
                      className={jobStatus === "Открыта" ? "bg-green-500 hover:bg-green-600" : "border-green-500/50 text-green-500"}
                    >
                      Открыта
                    </Button>
                    <Button
                      onClick={() => setJobStatus("Закрыта")}
                      variant={jobStatus === "Закрыта" ? "default" : "outline"}
                      className={jobStatus === "Закрыта" ? "bg-red-500 hover:bg-red-600" : "border-red-500/50 text-red-500"}
                    >
                      Закрыта
                    </Button>
                  </div>
                </div>
                <Button
                  onClick={handleAddJob}
                  className="w-full bg-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/80 text-black neon-glow-cyan"
                >
                  <Icon name="Plus" className="mr-2" size={20} />
                  Добавить вакансию
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="mt-6">
            <Card className="bg-[#16213E] border-[var(--neon-pink)]/50">
              <CardHeader>
                <CardTitle className="neon-text-pink">Управление статистикой</CardTitle>
                <CardDescription className="text-white/60">
                  Обновляйте информацию о сервере
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="onlinePlayers" className="text-white">Игроков онлайн</Label>
                  <Input
                    id="onlinePlayers"
                    type="number"
                    value={onlinePlayers}
                    onChange={(e) => setOnlinePlayers(e.target.value)}
                    className="bg-[#1A1A2E] border-[var(--neon-pink)]/30 text-white"
                    placeholder="247"
                  />
                </div>
                <Button
                  onClick={handleUpdateOnline}
                  className="w-full bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80 neon-glow-pink"
                >
                  <Icon name="RefreshCw" className="mr-2" size={20} />
                  Обновить статистику
                </Button>
                
                <div className="pt-6 border-t border-white/10">
                  <h3 className="text-white font-bold mb-3">Быстрая статистика</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-[#1A1A2E] p-4 rounded-lg border border-[var(--neon-cyan)]/30">
                      <p className="text-white/60 text-sm">Всего игроков</p>
                      <p className="text-2xl font-bold neon-text-cyan">2,847</p>
                    </div>
                    <div className="bg-[#1A1A2E] p-4 rounded-lg border border-[var(--neon-pink)]/30">
                      <p className="text-white/60 text-sm">Тем на форуме</p>
                      <p className="text-2xl font-bold neon-text-pink">156</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Admin;
