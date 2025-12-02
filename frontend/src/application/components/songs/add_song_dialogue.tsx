// components/songs/add-song-dialog.tsx
"use client";

import { useState } from "react";
import { Dialog } from "../dialogue.box";
import useSongsStore from "@/application/controllers/song.controller";
import Image from "next/image";
// import { Music, Upload } from "lucide-react";

interface AddSongDialogProps {
    open: boolean;
    onClose: () => void;
}

export function AddSongDialog({ open, onClose }: AddSongDialogProps) {
    const { addSong, loading } = useSongsStore();
    const [coverFile, setCoverFile] = useState<File | null>(null);
    const [name, setName] = useState("");
    const [artists, setArtists] = useState("");
    const [songUrl, setSongUrl] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData();
        if (coverFile) formData.append("coverImage", coverFile);
        formData.append("name", name);
        artists.split(", ").forEach((a) => {
            formData.append("artists", a)
        })
        formData.append("youtubeLink", songUrl);

        try {
            await addSong(formData);
            resetForm();
            onClose();
        } catch (error) {
            console.error("Failed to add song:", error);
        }
    };

    const resetForm = () => {
        setCoverFile(null);
        setName("");
        setArtists("");
        setSongUrl("");
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            title="Add New Song"
            type="music"
            size="lg"
        >
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* File Upload Areas */}
                <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                        Cover Image (Optional)
                    </label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-music-primary transition-colors cursor-pointer">
                        <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => setCoverFile(e.target.files?.[0] || null)}
                            className="hidden"
                            id="cover-upload"
                        />
                        <label htmlFor="cover-upload" className="cursor-pointer">
                            {/* <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" /> */}
                            <p className="text-sm text-muted-foreground">
                                {coverFile ? coverFile.name : "Click to upload cover image"}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                                JPG, PNG, WEBP
                            </p>
                        </label>
                    </div>
                </div>

                {/* Song Details */}
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Song Name *
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Enter song name"
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-music-primary/50 transition-colors"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Artists *
                        </label>
                        <input
                            type="text"
                            value={artists}
                            onChange={(e) => setArtists(e.target.value)}
                            placeholder="Artist1, Artist2, Artist3"
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-music-primary/50 transition-colors"
                            required
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            Separate multiple artists with commas
                        </p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-foreground mb-2">
                            Youtube Url *
                        </label>
                        <input
                            type="url"
                            value={songUrl}
                            onChange={(e) => setSongUrl(e.target.value)}
                            placeholder="http://youtube.com/watch?v=WEDN453"
                            className="w-full px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-music-primary/50 transition-colors"
                            required
                        />
                        <p className="text-xs text-muted-foreground mt-1">
                            Separate multiple artists with commas
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex justify-end gap-3 pt-4 border-t border-border/50">
                    <button
                        type="button"
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading || !songUrl || !name || !artists}
                        className="px-4 py-2 text-sm font-medium bg-music-primary text-white rounded-lg hover:bg-music-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                        {loading ? "Uploading..." : "Add Song"}
                    </button>
                </div>
            </form>
        </Dialog>
    );
}
