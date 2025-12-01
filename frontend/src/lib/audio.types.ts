import SongEntity from "@/domain/entities/song.entity";

export interface AudioPlayerState {
    currentPlaying: SongEntity | null;
    playing: boolean;
    volume: number;
    currentTime: number;
    duration: number;
    loop: boolean;
    shuffle: boolean;
    isSeeking: boolean;
    playbackRate: number;
    muted: boolean;
}

export type PlaybackStatus = 'playing' | 'paused' | 'loading' | 'error';

export interface AudioMetadata {
    bitrate?: number;
    sampleRate?: number;
    channels?: number;
    format?: string;
}

// utils/audio.utils.ts
export const formatTime = (seconds: number): string => {
    if (!isFinite(seconds) || isNaN(seconds)) return '0:00';

    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const formatTimeWithHours = (seconds: number): string => {
    if (!isFinite(seconds) || isNaN(seconds)) return '0:00:00';

    const hours = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = Math.floor(seconds % 60);

    if (hours > 0) {
        return `${hours}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const calculateProgressPercentage = (current: number, total: number): number => {
    if (!total || total <= 0) return 0;
    return Math.min(100, Math.max(0, (current / total) * 100));
};

export const debounce = <T extends (...args: any[]) => any>(
    func: T,
    wait: number
): ((...args: Parameters<T>) => void) => {
    let timeout: NodeJS.Timeout;
    return (...args: Parameters<T>) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};
