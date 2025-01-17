import TopBar from "@/components/TopBar"
import { useMusicStore } from "@/stores/useMusicStore"
import { useEffect } from "react";
import FeaturedSection from "./components/FeaturedSection";
import { ScrollArea } from "@/components/ui/scroll-area";
import SectionGrid from "./components/SectionGrid";
import { usePlayerStore } from "@/stores/usePlayerStore";

const HomePage = () => {
  const {fetchfeaturedSongs, fetchmadeforYouSongs, fetchtrendingSongs
    , isLoading, madeforYouSongs, trendingSongs, featuredSongs} = useMusicStore();
  const {initializeQueue} = usePlayerStore();

  useEffect(() => {
    fetchfeaturedSongs();
    fetchmadeforYouSongs();
    fetchtrendingSongs();
  }, [fetchfeaturedSongs, fetchmadeforYouSongs, fetchtrendingSongs]);
  
  useEffect(() => {
		if (madeforYouSongs.length > 0 && featuredSongs.length > 0 && trendingSongs.length > 0) {
			const allSongs = [...featuredSongs, ...madeforYouSongs, ...trendingSongs];
			initializeQueue(allSongs);
		}
	}, [initializeQueue, madeforYouSongs, trendingSongs, featuredSongs]);

  return (
    <main className="rounded-md overflow-hidden bg-gradient-to-b from-zinc-800 to-zinc-900">
      <TopBar />
      <ScrollArea className="h-[calc(100vh-180px)]">
        <div className="p-4 sm:p-6">
        {/* Make Dynamic Later */}
          <h1 className="text-2xl sm:text-3xl font-bold mb-6">Good Morning!</h1> 
          <FeaturedSection />
        <div className="space-y-8">
          <SectionGrid title="Made for you" songs={madeforYouSongs} isLoading={isLoading} />
          <SectionGrid title="Trending" songs={trendingSongs} isLoading={isLoading} />
        </div>
        </div>
      </ScrollArea>
    </main>
  )
}

export default HomePage