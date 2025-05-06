import React from "react";
import { FaMoneyBillAlt } from "react-icons/fa";

const CashflowTable = ({ data, categories, subcategories, statuses }) => {
  const getTitleById = (list, id) => {
    if (!list || !id) return "—";
    const found = list.find((item) => item.id === id);
    return found ? found.name : "—";
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
        <FaMoneyBillAlt className="text-green-500" />
        Записи о движении денежных средств
      </h2>

      <table className="min-w-full border border-gray-300 shadow-md rounded-md">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2 border">Дата</th>
            <th className="text-left p-2 border">Тип операции</th>
            <th className="text-left p-2 border">Категория</th>
            <th className="text-left p-2 border">Подкатегория</th>
            <th className="text-left p-2 border">Сумма</th>
            <th className="text-left p-2 border">Комментарий</th>
            <th className="text-left p-2 border">Статус</th>
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="7" className="text-center p-4 text-gray-500">
                Нет записей
              </td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="p-2 border">{item.date}</td>
                <td className="p-2 border">{getTitleById(item.operation_type)}</td>
                <td className="p-2 border">{getTitleById(categories, item.category)}</td>
                <td className="p-2 border">{getTitleById(subcategories, item.subcategory)}</td>
                <td className="p-2 border">{item.amount} ₽</td>
                <td className="p-2 border">{item.comment || "—"}</td>
                <td className="p-2 border">{getTitleById(statuses, item.status)}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CashflowTable;
