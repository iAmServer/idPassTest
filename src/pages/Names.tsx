import Header from "../components/Header";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getNames } from "../store/slices/names";
import dayjs from "dayjs";
import { iNameStateData } from "../interfaces/names.interface";
import { AppDispatch } from "../store";

const Names: React.FunctionComponent = () => {
  const names = useSelector((state: iNameStateData) => state.names);
  const { isLoading, data, error } = names;
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getNames());
  }, []);

  return (
    <>
      <Header />

      <h1 className="page-title">Random Names</h1>

      <button
        className="mb-30"
        onClick={() => {
          dispatch(getNames());
        }}
      >
        Regenerate
      </button>

      {error && <p className="mb-30">{error}</p>}

      {!isLoading && data ? (
        <div className="user">
          <img
            src={data?.picture.medium}
            alt={`${data.name.first}_${data.name.last}`}
          />

          <h3>{`${data.name.first} ${data.name.last}`}</h3>
          <p>{`${data.location.city}, ${data.location.state}, ${data.location.country}`}</p>

          <div className="sub-data">
            <p>
              <span>Email:</span> {data.email}
            </p>
            <p>
              <span>Phone:</span> {data.phone}
            </p>
            <p>
              <span>Gender:</span> {data.gender}
            </p>
            <p>
              <span>Birthday:</span> {dayjs(data.dob.date).format("d MMM YYYY")}
            </p>
          </div>
        </div>
      ) : (
        <h3 className="mt-30">Loading...</h3>
      )}
    </>
  );
};

export default Names;
