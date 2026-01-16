function QueryInput({ query, setQuery, onAsk }) {
  return (
    <div>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Ask about cultural heritage"
      />
      <button onClick={onAsk}>Ask</button>
    </div>
  );
}

export default QueryInput;
