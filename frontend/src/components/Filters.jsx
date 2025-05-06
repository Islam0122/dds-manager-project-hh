// components/Filters.jsx
import React from "react";
import { FaFilter } from "react-icons/fa";

const Filters = ({ filters, onChange }) => {
  const handleChange = (e) => {
    onChange(e.target.name, e.target.value);
  };

  return (
    <div className="flex flex-wrap gap-4 bg-white border p-4 rounded shadow items-center">
      <div className="flex items-center gap-2 text-gray-600">
        <FaFilter />
        <span className="font-medium">Фильтры:</span>
      </div>

      <input
        type="date"
        name="date"
        value={filters.date}
        onChange={handleChange}
        className="border p-2 rounded"
      />

      <select
        name="status"
        value={filters.status}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Все статусы</option>
        {/* здесь будут реальные статусы из store */}
        <option value="1">Бизнес</option>
        <option value="2">Личное</option>
      </select>

      <select
        name="type"
        value={filters.type}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Все типы</option>
        <option value="1">Пополнение</option>
        <option value="2">Списание</option>
      </select>

      <select
        name="category"
        value={filters.category}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Все категории</option>
        {/* реальные категории загрузятся из store */}
      </select>

      <select
        name="subcategory"
        value={filters.subcategory}
        onChange={handleChange}
        className="border p-2 rounded"
      >
        <option value="">Все подкатегории</option>
      </select>
    </div>
  );
};

export default Filters;
