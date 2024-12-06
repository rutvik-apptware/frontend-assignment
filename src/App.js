import React, { useState, useEffect } from "react";
import Table from "./components/Table";
import { Loader } from "./components/Loader";
import "./App.css";
const App = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json"
        );
        const result = await response.json();
        setData(result || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="app">
      <h1 className="title">Highly Rated Kickstarter Projects</h1>
      {loading ? (
        <Loader />
      ) : (
        <>
          <Table
            data={data.map((item, index) => ({
              "S.No.": index + 1,
              "Percentage Funded": item["percentage.funded"],
              "Amount Pledged": item["amt.pledged"],
            }))}
          />
        </>
      )}
    </div>
  );
};

export default App;
