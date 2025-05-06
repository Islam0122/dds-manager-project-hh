import React, { useEffect, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCashFlows } from "../features/cashFlowSlice";
import CashflowTable from "../components/CashflowTable";
import Filters from "../components/Filters";
import { FaPlus } from "react-icons/fa";

const HomePage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.cashFlow);

  const [filters, setFilters] = useState({
    date: "",
    status: "",
    type: "",
    category: "",
    subcategory: "",
  });

  useEffect(() => {
    dispatch(fetchCashFlows(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (key, value) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">📊 Денежный поток</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
          <FaPlus /> Новая запись
        </button>
      </div>

      <Filters filters={filters} onChange={handleFilterChange} />

      {loading ? (
        <p className="text-center mt-10 text-gray-500">Загрузка...</p>
      ) : error ? (
        <p className="text-center mt-10 text-red-500">Ошибка: {error}</p>
      ) : (
        <CashflowTable data={items} />
      )}
    </div>
  );
};

export default HomePage;
