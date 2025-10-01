import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import Icon from "@/components/ui/icon";
import { useToast } from "@/hooks/use-toast";

interface JobApplication {
  id: number;
  jobTitle: string;
  vk: string;
  age: string;
  date: string;
}

interface Job {
  id: number;
  title: string;
  requirements: string;
  status: "Открыта" | "Закрыта";
}

interface VKSettings {
  vk_app_id: string;
  vk_group_id: string;
  vk_button_text: string;
}

interface AdminPanelProps {
  onAddImage: (url: string) => void;
  applications: JobApplication[];
  jobs: Job[];
  onUpdateJobs: (jobs: Job[]) => void;
  onClose: () => void;
}

const API_URL = "https://functions.poehali.dev/8041e2d0-0a4d-4f86-a776-4ba0c1ad8ee0";

const AdminPanel = ({ onAddImage, applications, jobs, onUpdateJobs, onClose }: AdminPanelProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [activeTab, setActiveTab] = useState<"jobs" | "applications" | "vk" | "gallery">("jobs");
  const [imageUrl, setImageUrl] = useState("");
  const [editableJobs, setEditableJobs] = useState<Job[]>(jobs);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobRequirements, setNewJobRequirements] = useState("");
  const [vkSettings, setVkSettings] = useState<VKSettings>({
    vk_app_id: "YOUR_APP_ID",
    vk_group_id: "YOUR_GROUP_ID",
    vk_button_text: "Есть вопрос?"
  });
  const { toast } = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      loadSettings();
    }
  }, [isAuthenticated]);

  const loadSettings = async () => {
    try {
      const response = await fetch(`${API_URL}?resource=settings`);
      const data = await response.json();
      const settings: any = {};
      data.forEach((s: any) => {
        settings[s.key] = s.value;
      });
      setVkSettings(settings as VKSettings);
    } catch (error) {
      console.error('Error loading settings:', error);
    }
  };

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

  const handleToggleJobStatus = (jobId: number) => {
    const updated = editableJobs.map(job => 
      job.id === jobId 
        ? { ...job, status: job.status === "Открыта" ? "Закрыта" as const : "Открыта" as const }
        : job
    );
    setEditableJobs(updated);
  };

  const handleAddJob = () => {
    if (newJobTitle.trim() && newJobRequirements.trim()) {
      const newJob: Job = {
        id: Date.now(),
        title: newJobTitle,
        requirements: newJobRequirements,
        status: "Открыта"
      };
      setEditableJobs([...editableJobs, newJob]);
      setNewJobTitle("");
      setNewJobRequirements("");
      toast({
        title: "Вакансия добавлена",
        description: `Вакансия "${newJobTitle}" добавлена в список`,
      });
    }
  };

  const handleDeleteJob = (jobId: number) => {
    const updated = editableJobs.filter(job => job.id !== jobId);
    setEditableJobs(updated);
    toast({
      title: "Вакансия удалена",
      description: "Вакансия успешно удалена из списка",
    });
  };

  const handleSaveJobs = () => {
    onUpdateJobs(editableJobs);
    toast({
      title: "Сохранено",
      description: "Вакансии успешно обновлены",
    });
  };

  const handleSaveVKSettings = async () => {
    try {
      await fetch(API_URL, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ resource: 'settings', settings: vkSettings })
      });
      toast({
        title: "Сохранено",
        description: "Настройки ВК успешно обновлены. Перезагрузите страницу.",
      });
    } catch (error) {
      console.error('Error saving VK settings:', error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить настройки",
        variant: "destructive"
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
      <Card className="bg-[#16213E] border-[var(--neon-cyan)]/50 w-full max-w-4xl my-8">
        <CardHeader>
          <CardTitle className="neon-text-cyan text-2xl flex items-center justify-between">
            <span>Админ-панель</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="text-white hover:text-[var(--neon-cyan)]"
            >
              <Icon name="X" size={20} />
            </Button>
          </CardTitle>
          
          <div className="flex gap-2 mt-4 flex-wrap">
            <Button
              onClick={() => setActiveTab("jobs")}
              className={activeTab === "jobs" 
                ? "bg-[var(--neon-purple)] text-white" 
                : "bg-[#1A1A2E] text-white/60 hover:text-white"
              }
            >
              <Icon name="Briefcase" className="mr-2" size={18} />
              Вакансии
            </Button>
            <Button
              onClick={() => setActiveTab("applications")}
              className={activeTab === "applications" 
                ? "bg-[var(--neon-pink)] text-white" 
                : "bg-[#1A1A2E] text-white/60 hover:text-white"
              }
            >
              <Icon name="Users" className="mr-2" size={18} />
              Заявки ({applications.length})
            </Button>
            <Button
              onClick={() => setActiveTab("vk")}
              className={activeTab === "vk" 
                ? "bg-[var(--neon-cyan)] text-black" 
                : "bg-[#1A1A2E] text-white/60 hover:text-white"
              }
            >
              <Icon name="MessageCircle" className="mr-2" size={18} />
              ВК Виджет
            </Button>
            <Button
              onClick={() => setActiveTab("gallery")}
              className={activeTab === "gallery" 
                ? "bg-[var(--neon-cyan)] text-black" 
                : "bg-[#1A1A2E] text-white/60 hover:text-white"
              }
            >
              <Icon name="Image" className="mr-2" size={18} />
              Галерея
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <Label className="text-white text-xl text-[var(--neon-purple)]">
              Управление вакансиями
            </Label>
            <div className="space-y-3">
              {editableJobs.map((job) => (
                <Card key={job.id} className="bg-[#1A1A2E] border-[var(--neon-purple)]/30">
                  <CardContent className="p-4">
                    <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                      <div className="flex-1">
                        <p className="text-white font-bold text-lg">{job.title}</p>
                        <p className="text-white/60 text-sm mt-1">{job.requirements}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => handleToggleJobStatus(job.id)}
                          className={job.status === "Открыта" 
                            ? "bg-green-500 hover:bg-green-600" 
                            : "bg-red-500 hover:bg-red-600"
                          }
                        >
                          {job.status}
                        </Button>
                        <Button
                          onClick={() => handleDeleteJob(job.id)}
                          variant="outline"
                          className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                        >
                          <Icon name="Trash2" size={18} />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="space-y-3 mt-4 p-4 bg-[#1A1A2E] rounded-lg border border-[var(--neon-purple)]/30">
              <Label className="text-white">Добавить новую вакансию</Label>
              <Input
                placeholder="Название должности"
                value={newJobTitle}
                onChange={(e) => setNewJobTitle(e.target.value)}
                className="bg-[#16213E] border-[var(--neon-purple)]/30 text-white"
              />
              <Input
                placeholder="Требования"
                value={newJobRequirements}
                onChange={(e) => setNewJobRequirements(e.target.value)}
                className="bg-[#16213E] border-[var(--neon-purple)]/30 text-white"
              />
              <Button
                onClick={handleAddJob}
                className="w-full bg-[var(--neon-purple)] hover:bg-[var(--neon-purple)]/80 text-white"
              >
                <Icon name="Plus" className="mr-2" size={18} />
                Добавить вакансию
              </Button>
            </div>

            <Button
              onClick={handleSaveJobs}
              className="w-full bg-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/80 text-black neon-glow-cyan"
            >
              <Icon name="Save" className="mr-2" size={20} />
              Сохранить изменения
            </Button>
          </div>

          <div className="space-y-4 pt-4 border-t border-[var(--neon-cyan)]/30">
            <Label className="text-white text-xl neon-text-pink">
              Заявки на вакансии ({applications.length})
            </Label>
            {applications.length === 0 ? (
              <p className="text-white/60 text-center py-8">Пока нет заявок</p>
            ) : (
              <div className="space-y-3 max-h-[300px] overflow-y-auto">
                {applications.map((app) => (
                  <Card key={app.id} className="bg-[#1A1A2E] border-[var(--neon-pink)]/30">
                    <CardContent className="p-4">
                      <div className="flex flex-col sm:flex-row justify-between gap-3">
                        <div className="space-y-1">
                          <p className="text-white font-bold">{app.jobTitle}</p>
                          <div className="flex gap-4 text-sm text-white/70">
                            <span className="flex items-center gap-1">
                              <Icon name="User" size={14} />
                              ВК: {app.vk}
                            </span>
                            <span className="flex items-center gap-1">
                              <Icon name="Calendar" size={14} />
                              {app.age} лет
                            </span>
                          </div>
                        </div>
                        <span className="text-xs text-white/50">{app.date}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>

          <div className="space-y-4 pt-4 border-t border-[var(--neon-cyan)]/30">
            <Label className="text-white text-xl neon-text-cyan">
              Настройки виджета ВКонтакте
            </Label>
            <div className="space-y-3">
              <div>
                <Label htmlFor="vkAppId" className="text-white/80 text-sm">ID приложения ВК</Label>
                <Input
                  id="vkAppId"
                  value={vkSettings.vk_app_id}
                  onChange={(e) => setVkSettings({...vkSettings, vk_app_id: e.target.value})}
                  className="bg-[#1A1A2E] border-[var(--neon-cyan)]/30 text-white"
                  placeholder="51234567"
                />
              </div>
              <div>
                <Label htmlFor="vkGroupId" className="text-white/80 text-sm">ID группы ВК</Label>
                <Input
                  id="vkGroupId"
                  value={vkSettings.vk_group_id}
                  onChange={(e) => setVkSettings({...vkSettings, vk_group_id: e.target.value})}
                  className="bg-[#1A1A2E] border-[var(--neon-cyan)]/30 text-white"
                  placeholder="198765432"
                />
              </div>
              <div>
                <Label htmlFor="vkButtonText" className="text-white/80 text-sm">Текст на кнопке</Label>
                <Input
                  id="vkButtonText"
                  value={vkSettings.vk_button_text}
                  onChange={(e) => setVkSettings({...vkSettings, vk_button_text: e.target.value})}
                  className="bg-[#1A1A2E] border-[var(--neon-cyan)]/30 text-white"
                  placeholder="Есть вопрос?"
                />
              </div>
              <Button
                onClick={handleSaveVKSettings}
                className="w-full bg-[var(--neon-cyan)] hover:bg-[var(--neon-cyan)]/80 text-black"
              >
                <Icon name="Save" className="mr-2" size={18} />
                Сохранить настройки ВК
              </Button>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t border-[var(--neon-cyan)]/30">
            <Label htmlFor="imageUrl" className="text-white text-xl neon-text-cyan">
              Управление галереей
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