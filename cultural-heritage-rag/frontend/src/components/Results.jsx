function Results({ results }) {
  if (!results || results.length === 0) {
    return <p>No relevant information found.</p>;
  }

  return (
    <div>
      <h3>Retrieved Context</h3>
      <ul>
        {results.map((text, index) => (
          <li key={index}>{text}</li>
        ))}
      </ul>
    </div>
  );
}

export default Results;
