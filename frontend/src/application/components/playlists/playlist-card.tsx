// application/components/playlists/playlist-card.tsx
'use client';

import PlaylistEntity from '@/domain/entities/playlist.entity';
import usePlaylistsStore from '@/application/controllers/playlist.controller';
import useSongsStore from '@/application/controllers/song.controller';
import { useState } from 'react';

interface PlaylistCardProps {
    playlist: PlaylistEntity;
}

export default function PlaylistCard({ playlist }: PlaylistCardProps) {
    const { setCurrentPlaylist, deletePlaylist } = usePlaylistsStore();
    const { setCurrentPlaying } = useSongsStore();
    const [showOptions, setShowOptions] = useState(false);

    const handlePlay = () => {
        if (playlist.songs.length > 0) {
            setCurrentPlaying(playlist.songs[0], true);
            setCurrentPlaylist(playlist);
        }
    };

    const handleDelete = () => {
        deletePlaylist(playlist._id!);
        setShowOptions(false);
    };

    return (
        <div className="group relative bg-card rounded-xl border border-border/40 p-4 transition-all duration-300 hover:shadow-lg hover:border-music-primary/20">
            {/* Playlist Cover */}
            <div className="relative mb-4">
                <div className="aspect-square bg-linear-to-br from-music-primary/20 to-music-accent/20 rounded-lg flex items-center justify-center relative overflow-hidden">
                    {/* Show first 4 songs as mini covers */}
                    <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 gap-1 p-2">
                        {playlist.songs.slice(0, 4).map((song, index) => (
                            <div
                                key={index}
                                className="bg-music-primary/30 rounded flex items-center justify-center"
                            >
                                <MusicIcon className="w-3 h-3 text-music-primary" />
                            </div>
                        ))}
                        {playlist.songs.length === 0 && (
                            <div className="col-span-2 row-span-2 flex items-center justify-center">
                                <PlaylistIcon className="w-8 h-8 text-music-primary/60" />
                            </div>
                        )}
                    </div>

                    {/* Play Button Overlay */}
                    {playlist.songs.length > 0 && (
                        <button
                            onClick={handlePlay}
                            className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg"
                        >
                            <PlayIcon className="w-8 h-8 text-white" />
                        </button>
                    )}

                    {/* Options Button */}
                    <button
                        onClick={() => setShowOptions(!showOptions)}
                        className="absolute top-2 right-2 p-1.5 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                    >
                        <MoreIcon className="w-4 h-4 text-white" />
                    </button>
                </div>
            </div>

            {/* Playlist Info */}
            <div>
                <h3 className="font-semibold text-foreground truncate mb-1">
                    {playlist.name}
                </h3>
                <p className="text-sm text-muted-foreground">
                    {playlist.songs.length} {playlist.songs.length === 1 ? 'song' : 'songs'}
                </p>
                <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-1 bg-muted rounded-full capitalize">
                        {playlist.mode}
                    </span>
                    <span className="text-xs text-muted-foreground">
                        {new Date(playlist.createdAt).toLocaleDateString()}
                    </span>
                </div>
            </div>

            {/* Options Dropdown */}
            {showOptions && (
                <div className="absolute top-12 right-2 bg-popover border border-border rounded-lg shadow-lg z-10 min-w-32">
                    <button
                        onClick={() => setCurrentPlaylist(playlist)}
                        className="w-full px-3 py-2 text-left text-sm hover:bg-accent transition-colors"
                    >
                        View Details
                    </button>
                    <button
                        onClick={handleDelete}
                        className="w-full px-3 py-2 text-left text-sm text-destructive hover:bg-accent transition-colors"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
}

function PlaylistIcon(props: React.SVGProps<SVGSVGElement>) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m16 6 4 14" />
            <path d="M12 6v14" />
            <path d="M8 8v12" />
            <path d="M4 4v16" />
        </svg>
    );
}

function MusicIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" /></svg>;
}

function PlayIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="6 3 20 12 6 21 6 3" /></svg>;
}

function MoreIcon(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1" /><circle cx="12" cy="5" r="1" /><circle cx="12" cy="19" r="1" /></svg>;
}
