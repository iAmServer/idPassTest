import Header from "../components/Header";
import { useEffect, useState } from "react";
import Quote from "../components/Quote";
import { useSelector, useDispatch } from "react-redux";
import { getQuotes } from "../store/slices/quotes";
import { AppDispatch } from "../store";
import { iQuoteStateData } from "../interfaces/quotes.interface";

const Quotes: React.FunctionComponent = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const quote = useSelector((state: iQuoteStateData) => state.quotes);

  const { isLoading, quotes, totalPages, error } = quote;

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getQuotes(currentPage));
  }, []);

  return (
    <>
      <Header />

      <h1 className="page-title">Quotes</h1>

      {error && <p>{error}</p>}

      {!isLoading ? (
        quotes.length > 0 ? (
          <div className="quote-content">
            {quotes.map((quote) => (
              <Quote key={quote._id} info={quote} />
            ))}
          </div>
        ) : (
          <h3>No record</h3>
        )
      ) : (
        <h3>Loading...</h3>
      )}

      <div className="pagination">
        <button
          disabled={isLoading || currentPage === 1}
          onClick={() => {
            setCurrentPage(currentPage - 1);
            dispatch(getQuotes(currentPage));
          }}
        >
          Previous
        </button>
        <button
          disabled={isLoading || currentPage === totalPages}
          onClick={() => {
            setCurrentPage(currentPage + 1);
            dispatch(getQuotes(currentPage));
          }}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Quotes;
