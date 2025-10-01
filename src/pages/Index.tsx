import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import Icon from "@/components/ui/icon";
import AdminPanel from "@/components/AdminPanel";
import InteractiveMap from "@/components/InteractiveMap";

const Index = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [onlinePlayers] = useState(247);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [screenshots, setScreenshots] = useState([
    "https://via.placeholder.com/400x300/FF006E/FFFFFF?text=Miami+RP+1",
    "https://via.placeholder.com/400x300/00F0FF/000000?text=Miami+RP+2",
    "https://via.placeholder.com/400x300/8B00FF/FFFFFF?text=Miami+RP+3",
  ]);

  const forumTopics = [
    { id: 1, title: "Правила сервера обновлены", author: "Admin", replies: 15, category: "Объявления" },
    { id: 2, title: "Ищу фракцию", author: "NewPlayer", replies: 8, category: "Общение" },
    { id: 3, title: "Предложение по улучшению", author: "ProGamer", replies: 23, category: "Предложения" },
  ];

  const jobs = [
    { title: "Модератор", requirements: "Опыт на серверах GTA RP, возраст 18+", status: "Открыта" },
    { title: "Хелпер", requirements: "Активность 4+ часа в день", status: "Открыта" },
    { title: "Администратор", requirements: "Опыт администрирования", status: "Закрыта" },
  ];

  const handleAddImage = (url: string) => {
    setScreenshots([...screenshots, url]);
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      <nav className="sticky top-0 z-50 bg-[#16213E]/95 backdrop-blur-sm border-b border-[var(--neon-pink)]/30">
        <div className="container mx-auto px-2 sm:px-4 py-3">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
            <h1 className="text-2xl sm:text-4xl font-bold neon-text-pink">MIAMI RP</h1>
            <div className="flex gap-1 sm:gap-4 flex-wrap justify-center">
              {["home", "rules", "jobs", "stats", "map", "gallery", "forum"].map((section) => (
                <Button
                  key={section}
                  onClick={() => setActiveSection(section)}
                  className={`relative group transition-all duration-300 text-xs sm:text-sm px-2 sm:px-4 py-2 ${
                    activeSection === section
                      ? "bg-[var(--neon-pink)] text-white neon-glow-pink"
                      : "bg-transparent text-white border-2 border-[var(--neon-pink)]/50"
                  } hover:neon-glow-pink`}
                >
                  <span className="relative z-10">
                    {section === "home" && "Главная"}
                    {section === "rules" && "Правила"}
                    {section === "jobs" && "Вакансии"}
                    {section === "stats" && "Статистика"}
                    {section === "map" && "Карта"}
                    {section === "gallery" && "Галерея"}
                    {section === "forum" && "Форум"}
                  </span>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-2 sm:px-4 py-6 sm:py-12">
        {activeSection === "home" && (
          <div className="space-y-8 sm:space-y-12">
            <section className="relative h-[400px] sm:h-[600px] flex items-center justify-center overflow-hidden rounded-lg">
              <div className="absolute inset-0 miami-gradient opacity-30"></div>
              <div className="relative z-10 text-center space-y-4 sm:space-y-6 px-4">
                <h2 className="text-4xl sm:text-7xl font-bold neon-text-cyan">GTA 5 MIAMI RP</h2>
                <p className="text-lg sm:text-2xl text-white/80">Лучший RolePlay сервер в стиле Vice City</p>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                  <Button className="bg-[var(--neon-pink)] hover:bg-[var(--neon-pink)]/80 neon-glow-pink px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg">
                    <Icon name="Play" className="mr-2" size={20} />
                    Начать играть
                  </Button>
                  <Button className="bg-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/80 neon-glow-cyan px-6 sm:px-8 py-4 sm:py-6 text-base sm:text-lg text-black">
                    <Icon name="Users" className="mr-2" size={20} />
                    Discord сервер
                  </Button>
                </div>
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              <Card className="bg-[#16213E] border-[var(--neon-pink)]/30 hover:neon-border-pink transition-all">
                <CardHeader>
                  <Icon name="Trophy" className="w-10 h-10 sm:w-12 sm:h-12 neon-text-pink mb-2" />
                  <CardTitle className="neon-text-pink text-lg sm:text-xl">Уникальный геймплей</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm sm:text-base">Проработанная экономика, фракции и работы</p>
                </CardContent>
              </Card>

              <Card className="bg-[#16213E] border-[var(--neon-cyan)]/30 hover:neon-border-cyan transition-all">
                <CardHeader>
                  <Icon name="Shield" className="w-10 h-10 sm:w-12 sm:h-12 neon-text-cyan mb-2" />
                  <CardTitle className="neon-text-cyan text-lg sm:text-xl">Честная администрация</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm sm:text-base">Справедливое решение конфликтов 24/7</p>
                </CardContent>
              </Card>

              <Card className="bg-[#16213E] border-[var(--neon-purple)]/30 hover:border-[var(--neon-purple)] transition-all">
                <CardHeader>
                  <Icon name="Zap" className="w-10 h-10 sm:w-12 sm:h-12 text-[var(--neon-purple)] mb-2" />
                  <CardTitle className="text-[var(--neon-purple)] text-lg sm:text-xl">Регулярные ивенты</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 text-sm sm:text-base">Захватывающие события каждую неделю</p>
                </CardContent>
              </Card>
            </section>
          </div>
        )}

        {activeSection === "rules" && (
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-5xl font-bold neon-text-pink mb-6 sm:mb-8">Правила сервера</h2>
            <Tabs defaultValue="game" className="w-full">
              <TabsList className="bg-[#16213E] border border-[var(--neon-pink)]/30">
                <TabsTrigger value="game" className="data-[state=active]:bg-[var(--neon-pink)]">Игровые правила</TabsTrigger>
                <TabsTrigger value="offer" className="data-[state=active]:bg-[var(--neon-pink)]">Оферта</TabsTrigger>
                <TabsTrigger value="payment" className="data-[state=active]:bg-[var(--neon-pink)]">Оплата</TabsTrigger>
              </TabsList>
              <TabsContent value="game" className="mt-6">
                <Card className="bg-[#16213E] border-[var(--neon-pink)]/30">
                  <CardHeader>
                    <CardTitle className="neon-text-pink">Основные правила игры</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4 text-white/80">
                    <p>1. Запрещен NonRP - играйте реалистично</p>
                    <p>2. Уважайте других игроков</p>
                    <p>3. Не используйте читы и баги</p>
                    <p>4. Следуйте правилам отыгровки</p>
                    <p>5. Соблюдайте правила фракций</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="offer" className="mt-6">
                <Card className="bg-[#16213E] border-[var(--neon-pink)]/30">
                  <CardHeader>
                    <CardTitle className="neon-text-cyan">Пользовательское соглашение</CardTitle>
                  </CardHeader>
                  <CardContent className="text-white/80">
                    <p>Играя на сервере, вы соглашаетесь с нашими правилами и политикой конфиденциальности.</p>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="payment" className="mt-6">
                <Card className="bg-[#16213E] border-[var(--neon-pink)]/30">
                  <CardHeader>
                    <CardTitle className="text-[var(--neon-purple)]">Правила оплаты донатов</CardTitle>
                  </CardHeader>
                  <CardContent className="text-white/80">
                    <p>Все платежи необратимы. Возврат средств осуществляется только в исключительных случаях.</p>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        )}

        {activeSection === "jobs" && (
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-5xl font-bold neon-text-cyan mb-6 sm:mb-8">Вакансии в администрацию</h2>
            <div className="grid gap-6">
              {jobs.map((job, idx) => (
                <Card key={idx} className="bg-[#16213E] border-[var(--neon-cyan)]/30 hover:neon-border-cyan transition-all">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                      <div>
                        <CardTitle className="neon-text-cyan text-xl sm:text-2xl">{job.title}</CardTitle>
                        <CardDescription className="text-white/60 mt-2 text-sm sm:text-base">{job.requirements}</CardDescription>
                      </div>
                      <Badge className={job.status === "Открыта" ? "bg-green-500" : "bg-red-500"}>
                        {job.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {job.status === "Открыта" && (
                      <Button className="bg-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/80 text-black">
                        Подать заявку
                      </Button>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === "stats" && (
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-5xl font-bold text-[var(--neon-purple)] mb-6 sm:mb-8">Статистика сервера</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              <Card className="bg-[#16213E] border-[var(--neon-purple)]/30">
                <CardHeader>
                  <CardTitle className="text-[var(--neon-purple)] text-2xl sm:text-3xl">Онлайн игроков</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl sm:text-6xl font-bold neon-text-pink">{onlinePlayers}</p>
                  <p className="text-white/60 mt-2 text-sm sm:text-base">из 300 слотов</p>
                </CardContent>
              </Card>
              <Card className="bg-[#16213E] border-[var(--neon-cyan)]/30">
                <CardHeader>
                  <CardTitle className="neon-text-cyan text-2xl sm:text-3xl">Рекорд онлайна</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-4xl sm:text-6xl font-bold neon-text-cyan">298</p>
                  <p className="text-white/60 mt-2 text-sm sm:text-base">15 сентября 2024</p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === "map" && (
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-5xl font-bold neon-text-pink mb-6 sm:mb-8">Интерактивная карта сервера</h2>
            <Card className="bg-[#16213E] border-[var(--neon-pink)]/30">
              <CardContent className="p-0">
                <div className="h-[400px] sm:h-[600px]">
                  <InteractiveMap />
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "gallery" && (
          <div className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <h2 className="text-3xl sm:text-5xl font-bold neon-text-cyan">Галерея скриншотов</h2>
              <Button
                onClick={() => setShowAdminPanel(true)}
                className="bg-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/80 text-white"
              >
                <Icon name="Settings" className="mr-2" size={20} />
                Управление
              </Button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {screenshots.map((src, idx) => (
                <Card key={idx} className="bg-[#16213E] border-[var(--neon-pink)]/30 hover:neon-border-pink transition-all overflow-hidden">
                  <img src={src} alt={`Screenshot ${idx + 1}`} className="w-full h-64 object-cover" />
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === "forum" && (
          <div className="space-y-6 sm:space-y-8">
            <h2 className="text-3xl sm:text-5xl font-bold text-[var(--neon-purple)] mb-6 sm:mb-8">Форум сообщества</h2>
            <div className="space-y-4">
              {forumTopics.map((topic) => (
                <Card key={topic.id} className="bg-[#16213E] border-[var(--neon-purple)]/30 hover:border-[var(--neon-purple)] transition-all">
                  <CardHeader>
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                      <div className="flex-1">
                        <CardTitle className="text-[var(--neon-purple)] text-lg sm:text-xl mb-2">{topic.title}</CardTitle>
                        <div className="flex gap-2 sm:gap-4 text-xs sm:text-sm text-white/60">
                          <span className="flex items-center gap-1">
                            <Icon name="User" size={16} />
                            {topic.author}
                          </span>
                          <span className="flex items-center gap-1">
                            <Icon name="MessageSquare" size={16} />
                            {topic.replies} ответов
                          </span>
                        </div>
                      </div>
                      <Badge className="bg-[var(--neon-cyan)] text-black">{topic.category}</Badge>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
            <Button className="w-full bg-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/80 neon-glow-pink">
              <Icon name="Plus" className="mr-2" />
              Создать новую тему
            </Button>
          </div>
        )}
      </main>

      <footer className="mt-12 sm:mt-20 bg-[#16213E] border-t border-[var(--neon-pink)]/30 py-8 sm:py-12">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl sm:text-3xl font-bold neon-text-pink mb-3 sm:mb-4">MIAMI RP</h3>
          <p className="text-white/60 text-sm sm:text-base">© 2024 GTA 5 Miami RP. Все права защищены.</p>
          <div className="flex justify-center gap-4 sm:gap-6 mt-4 sm:mt-6">
            <a href="#" className="text-[var(--neon-cyan)] hover:neon-text-cyan transition-all">Discord</a>
            <a href="#" className="text-[var(--neon-cyan)] hover:neon-text-cyan transition-all">VK</a>
            <a href="#" className="text-[var(--neon-cyan)] hover:neon-text-cyan transition-all">Telegram</a>
          </div>
        </div>
      </footer>

      {showAdminPanel && (
        <AdminPanel
          onAddImage={handleAddImage}
          onClose={() => setShowAdminPanel(false)}
        />
      )}
    </div>
  );
};

export default Index;