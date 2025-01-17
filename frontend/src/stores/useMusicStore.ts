/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosInstance } from '@/lib/axios';
import { Album, Song, Stats } from '@/types';
import toast from 'react-hot-toast';
import {create} from 'zustand';

interface MusicStore {
    albums: Album[];
    songs: Song[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;
    featuredSongs: Song[];
    madeforYouSongs: Song[];
    trendingSongs: Song[];
    stats: Stats;

    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (albumId: string) => Promise<void>;
    fetchfeaturedSongs: () => Promise<void>;
    fetchmadeforYouSongs: () => Promise<void>;
    fetchtrendingSongs: () => Promise<void>;
    fetchStats: () => Promise<void>;
    fetchSongs: () => Promise<void>;
    deleteSong: (songId: string) => Promise<void>;
    deleteAlbum: (albumId: string) => Promise<void>;
    
}

export const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    featuredSongs: [],
    madeforYouSongs: [],
    trendingSongs: [],
    stats:{
        totalAlbums: 0,
        totalSongs: 0,
        totalArtists: 0,
        totalUsers: 0,
    },
    
    fetchfeaturedSongs: async () => {
        set({
            isLoading: true,
            error: null,
        })
        try {
            const response = await axiosInstance.get('/songs/featured');
            set({featuredSongs: response.data});            
        } catch (error: any) {
            set({error: error.response.data.message});            
        } finally {
            set({isLoading: false});
        }
    },
    fetchmadeforYouSongs: async () => {
        set({
            isLoading: true,
            error: null,
        })
        try {
            const response = await axiosInstance.get('/songs/made-for-you');
            set({madeforYouSongs: response.data});            
        } catch (error: any) {
            set({error: error.response.data.message});            
        } finally {
            set({isLoading: false});
        }
    },
    fetchtrendingSongs: async () => {
        set({
            isLoading: true,
            error: null,
        })
        try {
            const response = await axiosInstance.get('/songs/trending');
            set({trendingSongs: response.data});            
        } catch (error: any) {
            set({error: error.response.data.message});            
        } finally {
            set({isLoading: false});
        }
    },
    fetchAlbums: async () =>{
        set({
            isLoading: true,
            error: null,
        })
        try {
            const response = await axiosInstance.get('/album');
            set({albums: response.data});            
        } catch (error: any) {
            set({error: error.response.data.message});            
        } finally {
            set({isLoading: false});
        }
    },
    fetchAlbumById: async (albumId: string) => {
        set({
            isLoading: true,
            error: null,
        })
        try {
            const response = await axiosInstance.get(`/album/${albumId}`);
            // console.log("From setMusicStore ",response.data);
            set({currentAlbum : response.data}); 
        } catch (error: any) {
            set({error: error.response.data.message});            
        } finally {
            set({isLoading: false});
        }
    },
    fetchStats: async () => {
        set({
            isLoading: true,
            error: null,
        })
        try {
            const response = await axiosInstance.get('/stats');
            set({stats: response.data});            
        } catch (error: any) {
            set({error: error.response.data.message});            
        } finally {
            set({isLoading: false});
        }
    },
    fetchSongs: async () => {
        set({
            isLoading: true,
            error: null,
        })
        try {
            const response = await axiosInstance.get('/songs');
            set({songs: response.data});            
        } catch (error: any) {
            set({error: error.response.data.message});            
        } finally {
            set({isLoading: false});
        }
    },
    deleteSong: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/songs/${id}`);

			set((state) => ({
				songs: state.songs.filter((song) => song._id !== id),
			}));
			toast.success("Song deleted successfully");
		} catch (error: any) {
			console.log("Error in deleteSong", error);
			toast.error("Error deleting song");
		} finally {
			set({ isLoading: false });
		}
	},
    deleteAlbum: async (id) => {
		set({ isLoading: true, error: null });
		try {
			await axiosInstance.delete(`/admin/albums/${id}`);
			set((state) => ({
				albums: state.albums.filter((album) => album._id !== id),
				songs: state.songs.map((song) =>
					song.albumId === state.albums.find((a) => a._id === id)?.title ? { ...song, album: null } : song
				),
			}));
			toast.success("Album deleted successfully");
		} catch (error: any) {
			toast.error("Failed to delete album: " + error.message);
		} finally {
			set({ isLoading: false });
		}
	},
}));