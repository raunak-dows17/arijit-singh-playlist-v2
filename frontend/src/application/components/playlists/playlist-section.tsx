'use client';

import usePlaylistsStore from '@/application/controllers/playlist.controller';
import PlaylistCard from './playlist-card';

export default function PlaylistsSection() {
    const { playlists, loading } = usePlaylistsStore();

    if (loading) {
        return <div>Loading playlists...</div>;
    }

    if (playlists.length === 0) {
        return (
            <div className="text-center py-12">
                <div className="max-w-md mx-auto">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-muted flex items-center justify-center">
                        <PlaylistIcon className="w-8 h-8 text-muted-foreground" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                        No playlists yet
                    </h3>
                    <p className="text-muted-foreground">
                        Create your first playlist to organize your favorite songs.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {playlists.map((playlist) => (
                <PlaylistCard key={playlist._id} playlist={playlist} />
            ))}
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
