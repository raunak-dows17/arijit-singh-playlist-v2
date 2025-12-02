// lib/youtube.convertor.ts - SIMPLIFIED VERSION
import { existsSync, mkdirSync, readFileSync, statSync, unlinkSync } from "fs";
import { tmpdir } from "os";
import { join } from "path";
import { RawQlResponse } from "raw_lib";
import { exec } from "child_process";
import { promisify } from "util";

const execAsync = promisify(exec);

export interface YouTubeConversionRequest {
    youtubeUrl: string;
}

export interface YouTubeConversionResponse extends RawQlResponse<{
    audio: string,
    mimeType: string,
    size?: number;
}> {
    status: boolean;
    data: {
        type: "single",
        item: {
            audio: string,
            mimeType: string,
            size?: number;
        }
    }
    message: string;
}

export default class YoutubeConvertor {
    private static temptDir = join(tmpdir(), 'youtube-converter');

    static async ensureTempDir(): Promise<void> {
        if (!existsSync(this.temptDir)) {
            mkdirSync(this.temptDir, { recursive: true });
        }
    }

    static async convertToAudio(request: YouTubeConversionRequest): Promise<YouTubeConversionResponse> {
        try {
            await this.ensureTempDir();

            const { youtubeUrl } = request;

            if (!this.validateYouTubeUrl(youtubeUrl)) {
                throw Error("Invalid Youtube url");
            }

            const filename = `song_${Date.now()}`;
            const outputPath = join(this.temptDir, `${filename}.mp3`);

            console.log('Starting YouTube download...');

            const command = `/opt/venv/bin/python -m yt_dlp --extract-audio --audio-format mp3 --audio-quality 0 --output "${outputPath}" "${youtubeUrl}"`;

            console.log('Running command:', command);

            await execAsync(command);

            if (!existsSync(outputPath)) {
                throw new Error('Conversion failed, file not created');
            }

            const stats = statSync(outputPath);
            if (stats.size === 0) {
                throw new Error("Conversion Failed - empty output file");
            }

            const audioBuffer = readFileSync(outputPath);

            unlinkSync(outputPath);

            return {
                status: true,
                message: "Got the Audio Successfully",
                data: {
                    type: "single",
                    item: {
                        audio: audioBuffer.toString('base64'),
                        mimeType: 'audio/mp3',
                        size: audioBuffer.length,
                    }
                }
            }
        } catch (error: any) {
            console.error('YouTube conversion error:', error);
            return {
                status: false,
                data: {
                    type: "single",
                    item: {
                        audio: '',
                        mimeType: 'audio/mp3',
                    }
                },
                message: error.message || 'YouTube conversion failed',
            };
        }
    }

    private static validateYouTubeUrl(url: string): boolean {
        const patterns = [
            /^(https?:\/\/)?(www\.)?(youtube\.com\/watch\?v=)([a-zA-Z0-9_-]+)/,
            /^(https?:\/\/)?(www\.)?(youtu\.be\/)([a-zA-Z0-9_-]+)/,
            /^(https?:\/\/)?(www\.)?(youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/,
        ];

        return patterns.some(pattern => pattern.test(url));
    }
}
