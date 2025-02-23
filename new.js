import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaStepForward, FaStepBackward, FaSearch } from "react-icons/fa";

export default function MusicPlayerApp() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [songs, setSongs] = useState([]);

    useEffect(() => {
        fetch("https://api.example.com/trending-songs") // Replace with actual API URL
            .then(response => response.json())
            .then(data => setSongs(data.songs))
            .catch(error => console.error("Error fetching songs:", error));
    }, []);

    const togglePlay = () => {
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-800 to-gray-900 text-white p-6">
            {/* Header */}
            <header className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold">Music Player</h1>
                <div className="relative">
                    <input
                        type="text"
                        placeholder="Search..."
                        className="p-2 rounded-lg bg-gray-800 text-white pl-10"
                    />
                    <FaSearch className="absolute left-3 top-3 text-gray-400" />
                </div>
            </header>

            {/* Main Content */}
            <motion.div className="grid grid-cols-1 md:grid-cols-3 gap-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                <div className="col-span-2">
                    <h2 className="text-xl font-semibold mb-3">Trending Songs</h2>
                    <div className="bg-gray-800 p-4 rounded-lg">
                        {songs.length > 0 ? (
                            <ul>
                                {songs.map((song, index) => (
                                    <li key={index} className="p-2 border-b border-gray-700">{song.title} - {song.artist}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>Loading songs...</p>
                        )}
                    </div>
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-3">Your Playlists</h2>
                    <div className="bg-gray-800 p-4 rounded-lg">Playlist Section</div>
                </div>
            </motion.div>

            {/* Now Playing Bar */}
            <motion.div
                className="fixed bottom-0 left-0 right-0 bg-gray-900 p-4 flex justify-between items-center"
                initial={{ y: 50 }}
                animate={{ y: 0 }}
            >
                <button onClick={togglePlay} className="p-2 bg-purple-600 rounded-full">
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button className="p-2"><FaStepBackward /></button>
                <button className="p-2"><FaStepForward /></button>
            </motion.div>
        </div>
    );
}
