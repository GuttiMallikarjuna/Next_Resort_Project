"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Circles } from "react-loader-spinner";

const ProductCollection = () => {
  const [collections, setCollections] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [hasFetched, setHasFetched] = useState(false);

  const collectionHandler = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/admin/add-product`
      );
       if (!response.ok) {
      // API reachable but error status
      setCollections([]);
      return;
    }
      const newData = await response.json();

      console.log("productData:", newData);

      setCollections(newData?.data || []);
    } catch (error) {
     console.error("Fetch failed:", error); // 👈 dev only
    setCollections([]);
    } finally {
      setLoading(false);
      setHasFetched(true);
    }
  };

  useEffect(() => {
    collectionHandler();
  }, []);

  return (
    <div className="productSection">
      <h1 align="center">Select your Stay</h1>

      {/* 🔄 LOADING */}
      {loading && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "50vh",
          }}
        >
          <Circles height="80" width="80" color="#4fa94d" />
        </div>
      )}

      {/* 🚫 NO PRODUCTS */}
      {!loading && hasFetched && !error && collections.length === 0 && (
        <p style={{ textAlign: "center" }}>No products found</p>
      )}

      {/* ✅ PRODUCTS */}
      {!loading &&
        collections.length > 0 &&
        collections.map((item) => {
          return (
            <div key={item._id} className="proDetail">
              <div className="left">
                <div className="title">{item.title}</div>
                <br />
                <Image
                  src={item.image}
                  alt={item.title}
                  className="roomImage"
                  width={280}
                  height={200}
                ></Image>
              </div>
              <div className="center">
                <div className="pamen">
                  <h2 className="price">Rs. {item.price}</h2>
                  <div>
                    <h3>Amenities</h3>
                    {item.amen.map((serve, i) => {
                      return (
                        <div className="amenities" key={i}>
                          <div>*{serve}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div className="right">
                  <Link href={`/detail/${item._id}`}>
                    <button className="detail">Details </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProductCollection;
