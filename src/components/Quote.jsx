function Quote({ info }) {
  return (
    <div className="quote">
      <div className="quote-date">
        <p>Date Added: {info.dateAdded} </p>
      </div>
      <div className="content">
        <p>{info.content}</p>
      </div>
      <div className="quote-datails">
        <p>{info.author}</p>
      </div>
    </div>
  );
}

export default Quote;
