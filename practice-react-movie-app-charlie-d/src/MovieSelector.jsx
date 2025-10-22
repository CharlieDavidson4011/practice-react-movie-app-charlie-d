import React, { useState } from "react";

const MovieSelector = () => {
    const [selectedGenre, setSelectedGenre] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [movies, setMovies] = useState([]);

    const genreOptions = ["Action", "Comedy", "Drama"];

    const fakeFetchMovies = (genre) => {
        // Simulate an async fetch (here just a Promise that resolves after a timeout)
        return new Promise((resolve) => {
            setTimeout(() => {
                // Example stub data
                const data = {
                    Action: ["Die Hard", "Mad Max", "John Wick"],
                    Comedy: ["Superbad", "The Hangover", "Step Brothers"],
                    Drama: ["The Shawshank Redemption", "Forrest Gump", "Gladiator"],
                };
                resolve(data[genre] || []);
            }, 1500);
        });
    };

    const handleFetch = async () => {
        if (!selectedGenre) {
            setError("Please select a genre first.");
            setMovies([]);
            return;
        }
        setError("");
        setIsLoading(true);
        setMovies([]);
        try {
            const fetched = await fakeFetchMovies(selectedGenre);
            setMovies(fetched);
        } catch (err) {
            setError("Failed to fetch movies.");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h2>Movie Selector</h2>

            <div>
                <label htmlFor="genre">Select genre: </label>
                <select
                    id="genre"
                    value={selectedGenre}
                    onChange={(e) => setSelectedGenre(e.target.value)}
                >
                    <option value="">-- choose a genre --</option>
                    {genreOptions.map((g) => (
                        <option key={g} value={g}>{g}</option>
                    ))}
                </select>
            </div>

            <button onClick={handleFetch}>Fetch Movies</button>

            {error && <p style={{ color: "red" }}>{error}</p>}

            {isLoading && <p>Loading movies…</p>}

            {!isLoading && movies.length > 0 && (
                <ul>
                    {movies.map((m, idx) => (
                        <li key={idx}>{m}</li>
                    ))}
                </ul>
            )}

            {!isLoading && movies.length === 0 && !error && selectedGenre && (
                <p>No movies found for {selectedGenre}.</p>
            )}
        </div>
    );
};

export default MovieSelector;