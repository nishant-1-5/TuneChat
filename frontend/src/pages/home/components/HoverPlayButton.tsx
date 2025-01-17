import { Button } from '@/components/ui/button';
import { usePlayerStore } from '@/stores/usePlayerStore'
import { Song } from '@/types'
import { Pause, Play } from 'lucide-react';


const HoverPlayButton = ({song}:{song:Song}) => {
    const {currentSong, isPlaying, setCurrentSong, togglePlay} = usePlayerStore();
    const isCurrent = currentSong?._id === song._id;
    const handlePlayer = () => {
        if(isCurrent){
            togglePlay();
        } else {
            setCurrentSong(song);
        }
    };

  return (
    <Button size={'icon'} onClick={handlePlayer} className={`absolute bottom-3 right-2 bg-green-500 hover:bg-green-400 hover:scale-105 transition-all 
        opacity-0 translate-y-2 group-hover:translate-y-0 ${
            isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        }`}>
        {isCurrent && isPlaying ? (
				<Pause className='size-5 text-black' />
			) : (
				<Play className='size-5 text-black' />
			)}
    </Button>
)
}

export default HoverPlayButton