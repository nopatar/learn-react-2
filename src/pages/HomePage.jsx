import { useState, useRef } from "react";
import NewItem from "../components/NewItem";
import Item from "../components/Item";
import Spinner from "../components/Spinner";
import { toast } from "react-toastify";

const HomePage = () => {
  const [items, setItems] = useState([
    { id: 51, item_type: "รายรับ", title: "เงินเดือน", amount: 30000, date: "2024-01-05" },
    { id: 52, item_type: "รายจ่าย", title: "ค่าเช่าบ้าน", amount: 9000, date: "2024-01-10" },
    { id: 54, item_type: "รายรับ", title: "โบนัส", amount: 10000, date: "2024-02-01" },
    { id: 53, item_type: "รายจ่าย", title: "ค่าโทรศัพท์", amount: 400, date: "2024-02-05" },
  ]);
  const [loading, setLoading] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(""); // ตัวกรองเดือน
  const idCounter = useRef(0); // ตัวนับเริ่มต้นที่ 0

  const delay = () => {
    return new Promise((resolve) => setTimeout(resolve, 500));
  };

  const addItem = async (itemData) => {
    setLoading(true);
    const newItem = { ...itemData, id: idCounter.current }; // ใช้ id จาก counter
    idCounter.current += 1; // เพิ่มค่า counter
    setItems((prevItems) => [...prevItems, newItem]);
    await delay();
    setLoading(false);
    toast.success('Successfully Added');
  };

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
    toast.error('Successfully Deleted');
  };

  const updateItem = (updatedItem, id) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, ...updatedItem } : item
      )
    );
    toast.info('Successfully Updated');
  };

  const filterByMonth = (item) => {
    if (!selectedMonth) return true; // แสดงทั้งหมดหากไม่ได้เลือกเดือน
    const itemDate = new Date(item.date);
    const [year, month] = selectedMonth.split("-"); // แยกปีและเดือนจากค่า selectedMonth
    return (
      itemDate.getFullYear().toString() === year &&
      (itemDate.getMonth() + 1).toString().padStart(2, "0") === month
    );
  };

  const incomeItems = items.filter(
    (item) => item.item_type === "รายรับ" && filterByMonth(item)
  );
  const expenseItems = items.filter(
    (item) => item.item_type === "รายจ่าย" && filterByMonth(item)
  );

  return (
    <div className="container mx-auto p-4">
      <NewItem addItem={addItem} />

      {/* ตัวกรองเดือน */}
      <div className="mt-8 border-t-4 border-t-slate-200">
        <label
          htmlFor="monthFilter"
          className="block text-lg font-semibold mb-2 mt-6"
        >
          เลือกเดือน :
        </label>
        <select
          id="monthFilter"
          className="border border-gray-300 rounded p-2 w-full"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
        >
          <option value="">ทั้งหมด</option>
          {/* เพิ่มตัวเลือกเดือน */}
          {[...Array(12)].map((_, index) => {
            const month = (index + 1).toString().padStart(2, "0");
            const year = new Date().getFullYear();
            return (
              <option key={month} value={`${year}-${month}`}>
                {new Intl.DateTimeFormat("th-TH", {
                  year: "numeric",
                  month: "long",
                }).format(new Date(year, index))}
              </option>
            );
          })}
        </select>
      </div>

      {loading ? (
        <Spinner />
      ) : (
        <div id="itemsList" className="mt-8 flex gap-4">
          {/* รายรับ */}
          {incomeItems.length > 0 && (
            <div className="w-1/2">
              <h2 className="text-lg font-semibold text-black mb-4">รายรับ</h2>
              <ul className="rounded-md shadow-sm p-4 bg-gray-50">
                {incomeItems.map((item) => (
                  <Item
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    amount={item.amount}
                    date={item.date}
                    deleteItem={deleteItem}
                    updateItem={updateItem}
                  />
                ))}
              </ul>
            </div>
          )}

          {/* รายจ่าย */}
          {expenseItems.length > 0 && (
            <div className="w-1/2">
              <h2 className="text-lg font-semibold text-black mb-4">รายจ่าย</h2>
              <ul className="rounded-md shadow-sm p-4 bg-gray-50">
                {expenseItems.map((item) => (
                  <Item
                    key={item.id}
                    id={item.id}
                    title={item.title}
                    amount={item.amount}
                    date={item.date}
                    deleteItem={deleteItem}
                    updateItem={updateItem}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* ส่วนแสดงยอดเงิน */}
      {(incomeItems.length > 0 || expenseItems.length > 0) && (
        <div className="mt-8 p-4 bg-gray-100 rounded shadow-md">
          <h3 className="text-xl font-bold mb-4">
            {selectedMonth
              ? `สรุปยอดประจำเดือน ${new Intl.DateTimeFormat("th-TH", {
                  year: "numeric",
                  month: "long",
                }).format(new Date(`${selectedMonth}-01`))}`
              : "ทั้งหมดทุกเดือน"}
          </h3>
          {/* คำนวณรายรับรวม */}
          <p className="text-lg">
            <span className="font-semibold">รายรับรวม: </span>
            {parseFloat(
              incomeItems.reduce((sum, item) => sum + item.amount, 0)
            ).toLocaleString("th-TH", { style: "currency", currency: "THB" })}
          </p>
          {/* คำนวณรายจ่ายรวม */}
          <p className="text-lg">
            <span className="font-semibold">รายจ่ายรวม: </span>
            {parseFloat(
              expenseItems.reduce((sum, item) => sum + item.amount, 0)
            ).toLocaleString("th-TH", { style: "currency", currency: "THB" })}
          </p>
          {/* คำนวณยอดคงเหลือ */}
          <p
            className={`text-lg font-semibold ${
              parseFloat(
                incomeItems.reduce((sum, item) => sum + item.amount, 0) -
                  expenseItems.reduce((sum, item) => sum + item.amount, 0)
              ) < 0
                ? "text-red-600"
                : "text-green-600"
            }`}
          >
            <span className="font-semibold">ยอดคงเหลือ: </span>
            {parseFloat(
              incomeItems.reduce((sum, item) => sum + item.amount, 0) -
                expenseItems.reduce((sum, item) => sum + item.amount, 0)
            ).toLocaleString("th-TH", { style: "currency", currency: "THB" })}
          </p>
        </div>
      )}
    </div>
  );
};

export default HomePage;

// Update