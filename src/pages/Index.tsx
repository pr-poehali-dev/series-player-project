import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [currentSeason, setCurrentSeason] = useState(1);
  const [currentEpisode, setCurrentEpisode] = useState(1);

  const seasons = [
    {
      id: 1,
      name: "Сезон 1",
      episodes: Array.from({ length: 20 }, (_, i) => ({
        id: i + 1,
        title: `Серия ${i + 1}`,
        duration: "45 мин",
        videoUrl: `https://vk.com/video_ext.php?oid=-123456789&id=45678901${i + 1}&hash=abcdef123456&hd=1`,
      })),
    },
    {
      id: 2,
      name: "Сезон 2",
      episodes: Array.from({ length: 15 }, (_, i) => ({
        id: i + 1,
        title: `Серия ${i + 1}`,
        duration: "47 мин",
        videoUrl: `https://vk.com/video_ext.php?oid=-123456789&id=45678902${i + 1}&hash=abcdef123456&hd=1`,
      })),
    },
    {
      id: 3,
      name: "Сезон 3",
      episodes: Array.from({ length: 12 }, (_, i) => ({
        id: i + 1,
        title: `Серия ${i + 1}`,
        duration: "44 мин",
        videoUrl: `https://vk.com/video_ext.php?oid=-123456789&id=45678903${i + 1}&hash=abcdef123456&hd=1`,
      })),
    },
  ];

  const currentSeasonData = seasons.find((s) => s.id === currentSeason);
  const currentEpisodeData = currentSeasonData?.episodes.find(
    (e) => e.id === currentEpisode,
  );

  const handleEpisodeSelect = (episodeId: number) => {
    setCurrentEpisode(episodeId);
  };

  return (
    <div className="min-h-screen bg-[#1F1F1F] text-white font-inter">
      <div className="container mx-auto px-4 py-6">
        <div className="flex gap-6 h-[calc(100vh-3rem)]">
          {/* Video Player - Left Side */}
          <div className="flex-1 flex flex-col">
            <Card className="bg-[#2D2D2D] border-none mb-4 overflow-hidden">
              <div className="aspect-video bg-black relative group">
                {currentEpisodeData?.videoUrl ? (
                  <iframe
                    src={currentEpisodeData.videoUrl}
                    width="100%"
                    height="100%"
                    allow="autoplay; encrypted-media; fullscreen; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="w-20 h-20 bg-[#3B82F6] rounded-full flex items-center justify-center mb-4 mx-auto opacity-80">
                        <Icon
                          name="Play"
                          size={32}
                          className="text-white ml-1"
                        />
                      </div>
                      <p className="text-gray-300 text-sm">Видео плеер</p>
                    </div>
                  </div>
                )}

                {/* Video Controls */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                    >
                      <Icon name="Play" size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                    >
                      <Icon name="Pause" size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                    >
                      <Icon name="SkipForward" size={20} />
                    </Button>
                    <div className="flex-1 bg-white/20 h-1 rounded-full overflow-hidden">
                      <div className="bg-[#3B82F6] h-full w-1/3 rounded-full" />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                    >
                      <Icon name="Volume2" size={20} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-white hover:bg-white/20"
                    >
                      <Icon name="Maximize" size={20} />
                    </Button>
                  </div>
                </div>
              </div>
            </Card>

            {/* Episode Info */}
            <div className="bg-[#2D2D2D] p-6 rounded-lg">
              <h1 className="text-2xl font-bold mb-2">
                {currentSeasonData?.name} - {currentEpisodeData?.title}
              </h1>
              <p className="text-gray-400 mb-4">
                Длительность: {currentEpisodeData?.duration}
              </p>
              <p className="text-gray-300 leading-relaxed">
                Описание серии появится здесь. Это место для краткого описания
                происходящего в эпизоде, основных событий и персонажей.
              </p>
            </div>
          </div>

          {/* Episodes Panel - Right Side */}
          <div className="w-[200px] flex flex-col">
            <div className="flex-1 space-y-6">
              {seasons.map((season) => (
                <div key={season.id} className="space-y-2">
                  <h3 className="text-lg font-semibold">{season.name}</h3>
                  <div className="grid grid-cols-5 gap-[5px]">
                    {season.episodes.map((episode) => (
                      <button
                        key={`${season.id}-${episode.id}`}
                        onClick={() => {
                          setCurrentSeason(season.id);
                          handleEpisodeSelect(episode.id);
                        }}
                        className={`
                          aspect-square rounded-[5px] text-sm font-medium transition-all duration-200 relative
                          ${
                            currentSeason === season.id &&
                            currentEpisode === episode.id
                              ? "bg-[#3B82F6] text-white"
                              : "bg-[#2D2D2D] text-gray-300 hover:bg-[#2D2D2D]"
                          }
                        `}
                        style={{
                          boxShadow:
                            currentSeason === season.id &&
                            currentEpisode === episode.id
                              ? "0 0 0 2px #3B82F6"
                              : "none",
                        }}
                        onMouseEnter={(e) => {
                          if (
                            !(
                              currentSeason === season.id &&
                              currentEpisode === episode.id
                            )
                          ) {
                            e.currentTarget.style.boxShadow =
                              "0 0 0 2px #6B7280";
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (
                            !(
                              currentSeason === season.id &&
                              currentEpisode === episode.id
                            )
                          ) {
                            e.currentTarget.style.boxShadow = "none";
                          }
                        }}
                      >
                        {episode.id}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
