import { useState } from "react";
import QueryInput from "../components/QueryInput";
import Results from "../components/Results";
import { askBackend } from "../api/askApi";

function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAsk = async () => {
    if (!query.trim()) {
      setError("Please enter a question");
      return;
    }

    setLoading(true);
    setError("");
    setResults([]);

    try {
      const data = await askBackend(query);
      setResults(data.context);
    } catch (err) {
      setError("Failed to fetch data from backend");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Cultural Heritage Assistant</h2>

      <QueryInput
        query={query}
        setQuery={setQuery}
        onAsk={handleAsk}
      />

      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <Results results={results} />}
    </div>
  );
}

export default Home;
