import Header from "../components/Header";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTodayStat } from "../store/slices/covid";
import dayjs from "dayjs";
import ReactPaginate from "react-paginate";

function Covid() {
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage] = useState(25);
  const covid = useSelector((state) => state.covid);
  const { isLoading, stats, error } = covid;
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getTodayStat());
  }, []);

  const splitDate = (date) => {
    date = String(date);

    if (!date) return date;

    const dateSplit = `${date.substring(0, 4)}-${date.substring(
      4,
      6
    )}-${date.substring(6, 8)}`;

    return dayjs(dateSplit).format("YYYY-MMM-DD");
  };

  const endOffset = itemOffset + itemsPerPage;
  const currentItems = stats.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(stats.length / itemsPerPage);

  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % stats.length;

    setItemOffset(newOffset);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      <Header />
      <h1 className="page-title">Covid Stat</h1>
      {error && <p className="mb-30">{error.message}</p>}
      {!isLoading && stats ? (
        <>
          <div className="covid-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>states</th>
                  <th>positive</th>
                  <th>negative</th>
                  <th>pending</th>
                  <th>death</th>
                  <th>hospitalized</th>
                  <th>total Test Results</th>
                  <th>recovered</th>
                  <th>total</th>
                </tr>
              </thead>
              <tbody>
                {currentItems.map((stat) => (
                  <tr key={stat.hash}>
                    <td>{splitDate(stat.date) || "N/A"}</td>
                    <td>{stat.states?.toLocaleString() || 0}</td>
                    <td>{stat.positive?.toLocaleString() || 0}</td>
                    <td>{stat.negative?.toLocaleString() || 0}</td>
                    <td>{stat.pending?.toLocaleString() || 0}</td>
                    <td>{stat.death?.toLocaleString() || 0}</td>
                    <td>{stat.hospitalized?.toLocaleString() || 0}</td>
                    <td>{stat.totalTestResults?.toLocaleString() || 0}</td>
                    <td>{stat.recovered?.toLocaleString() || 0}</td>
                    <td>{stat.total?.toLocaleString() || 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <ReactPaginate
            breakLabel="..."
            nextLabel="Next"
            onPageChange={handlePageClick}
            pageRangeDisplayed={3}
            marginPagesDisplayed={1}
            pageCount={pageCount}
            previousLabel="Previous"
            renderOnZeroPageCount={null}
            className={"covid-pagination"}
            activeLinkClassName={"active"}
            breakLinkClassName={"break"}
          />
        </>
      ) : (
        <h3 className="mt-30">Loading...</h3>
      )}
    </>
  );
}

export default Covid;
