import React ,{ useEffect, useState } from 'react';
import { fetchDashboard } from '../utils/api';

function Products() {
  const [data, setData] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetchDashboard(token).then(setData);
  }, []);

  return (
    <>
      <h1>Products (Protected)</h1>
      <p>{data}</p>
    </>
  );
}

export default Products;



