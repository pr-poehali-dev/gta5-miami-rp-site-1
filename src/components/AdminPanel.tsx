import { useState } from "react";
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

interface AdminPanelProps {
  onAddImage: (url: string) => void;
  applications: JobApplication[];
  jobs: Job[];
  onUpdateJobs: (jobs: Job[]) => void;
  onClose: () => void;
}

const AdminPanel = ({ onAddImage, applications, jobs, onUpdateJobs, onClose }: AdminPanelProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editableJobs, setEditableJobs] = useState<Job[]>(jobs);
  const [newJobTitle, setNewJobTitle] = useState("");
  const [newJobRequirements, setNewJobRequirements] = useState("");
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

  const handleSaveJobs = () => {
    onUpdateJobs(editableJobs);
    toast({
      title: "Сохранено",
      description: "Вакансии успешно обновлены",
    });
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
                      <Button
                        onClick={() => handleToggleJobStatus(job.id)}
                        className={job.status === "Открыта" 
                          ? "bg-green-500 hover:bg-green-600" 
                          : "bg-red-500 hover:bg-red-600"
                        }
                      >
                        {job.status}
                      </Button>
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