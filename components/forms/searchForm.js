"use client";
import React, { useState } from "react";
import styles from "../../styles/searchForm.module.css";

const SearchForm = ({ onSearch }) => {
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch({ from, to, date });
  };

  return (
      <form onSubmit={handleSubmit} className={styles.container}>
          <input
            id="from"
            type="text"
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            className=""
            placeholder="مبدا"
          />

          <input
            id="to"
            type="text"
            value={to}
            onChange={(e) => setTo(e.target.value)}
            className=""
            placeholder="مقصد"
          />

          <input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className=""
            placeholder="تاریخ"
          />

        <button type="submit">
          جستجو
        </button>
      </form>
  );
};

export default SearchForm;
