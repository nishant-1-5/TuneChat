import { Song } from "@/types";
import {create} from "zustand";
import { useChatStore } from "./useChatStore";

interface PlayerStore {
    isPlaying: boolean;
    currentSong: null | Song ;
    queue: Song[];
    currentIdx: number;

    initializeQueue: (songs: Song[]) => void;
    playAlbum: (songs: Song[], startIndex? : number) => void;
    setCurrentSong: (song: Song) => void;
    togglePlay: () => void;
    playNext: () => void;
    playPrevious: () => void;
}

export const usePlayerStore = create<PlayerStore>((set, get) => ({
    currentSong: null,
    isPlaying: false,
    queue: [],
    currentIdx: -1,
    
    initializeQueue: (songs: Song[]) => {
        set({
            queue: songs,
            currentIdx: get().currentIdx === -1 ? 0 : get().currentIdx,
            currentSong: get().currentSong || songs[0],
        });
    },
    playAlbum: (songs, startIndex = 0) => {
        if(songs.length === 0) return;
        const song = songs[startIndex];

        const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity", {
                userId : socket.auth.userId,
                activity: `Listening to ${song.title} by ${song.artist}`
            })
        }
        set({
            queue: songs,
            currentIdx: startIndex,
            currentSong: song,
            isPlaying: true,
        });
    },
    setCurrentSong: (song: Song | null) => {
        if(!song) return;
        const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity", {
                userId : socket.auth.userId,
                activity: `Listening to ${song.title} by ${song.artist}`
            })
        }
        const songIdx = get().queue.findIndex((s) => s._id === song._id);
        set({currentSong: song, currentIdx: songIdx !==-1 ? songIdx: get().currentIdx, isPlaying: true});
    },
    togglePlay: () => {
        const currentSong = get().currentSong;
        const socket = useChatStore.getState().socket;
        if(socket.auth){
            socket.emit("update_activity", {
                userId : socket.auth.userId,
                activity: !get().isPlaying && currentSong ? `Listening to ${currentSong?.title} by ${currentSong?.artist}` : "Idle"
            })
        }
        set({isPlaying: !get().isPlaying});
    },
    playNext: () => {
		const { currentIdx, queue } = get();
		const nextIndex = currentIdx + 1;
		if (nextIndex < queue.length) {
			const nextSong = queue[nextIndex];

			const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Playing ${nextSong.title} by ${nextSong.artist}`,
				});
			}

			set({
				currentSong: nextSong,
				currentIdx: nextIndex,
				isPlaying: true,
			});
		} else {
			set({ isPlaying: false });
			const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Idle`,
				});
			}
		}
	},
    playPrevious: () => {
		const { currentIdx, queue } = get();
		const prevIndex = currentIdx - 1;

		// theres a prev song
		if (prevIndex >= 0) {
			const prevSong = queue[prevIndex];

			const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Playing ${prevSong.title} by ${prevSong.artist}`,
				});
			}

			set({
				currentSong: prevSong,
				currentIdx: prevIndex,
				isPlaying: true,
			});
		} else {
			set({ isPlaying: false });

			const socket = useChatStore.getState().socket;
			if (socket.auth) {
				socket.emit("update_activity", {
					userId: socket.auth.userId,
					activity: `Idle`,
				});
			}
		}
	},

}));