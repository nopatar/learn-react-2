/* eslint-disable react/prop-types */
import { useRef, useState } from "react";

const NewItem = ({ addItem }) => {
  const formRef = useRef();
  const inputsRef = useRef({
    title: null,
    amount: null,
    description: null,
    date: null, // เพิ่ม date input
  });

  const [isIncome, setIsIncome] = useState(true);

  // ฟังก์ชันสำหรับสร้างวันที่ปัจจุบันในรูปแบบ YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`; // รูปแบบ YYYY-MM-DD
  };

  const submitForm = (event) => {
    event.preventDefault();
  
    // ตรวจสอบค่าที่ผู้ใช้เลือกหรือไม่
    const rawDate = inputsRef.current.date?.value; // ค่าที่กรอกใน input date
    const finalDate = rawDate
      ? rawDate // หากกรอก ใช้ค่าวันที่จาก input
      : getCurrentDate(); // หากไม่กรอก ใช้วันที่ปัจจุบัน
  
    const itemData = {
      item_type: isIncome ? "รายรับ" : "รายจ่าย",
      title: inputsRef.current.title?.value || "",
      amount: isNaN(parseFloat(inputsRef.current.amount?.value)) ? 0 : parseFloat(inputsRef.current.amount?.value),
      description: inputsRef.current.description?.value || "",
      date: finalDate, // ใช้วันที่ที่ได้จากการตรวจสอบ
    };
  
    // เพิ่มข้อมูลในรายการ
    addItem(itemData);
    formRef.current.reset();
    setIsIncome(true);
  };

  return (
    <form ref={formRef} onSubmit={submitForm}>
      {/* Toggle Button */}
      <div className="flex items-center justify-center mb-4">
        <div className="flex items-center gap-4">
          {/* Label รายรับ */}
          <span
            className={`text-green-600 font-semibold ${
              isIncome ? "text-3xl" : "text-md"
            }`}
          >
            รายรับ
          </span>

          {/* Toggle Background */}
          <div className="relative w-40 h-10 bg-gray-200 rounded-full p-1 flex items-center">
            <div
              className={`absolute w-1/2 h-full rounded-full bg-white shadow-md transform transition-transform ${
                isIncome ? "translate-x-0" : "translate-x-full"
              }`}
            ></div>
            <button
              type="button"
              className="w-1/2 h-full"
              onClick={() => setIsIncome(true)}
            ></button>
            <button
              type="button"
              className="w-1/2 h-full"
              onClick={() => setIsIncome(false)}
            ></button>
          </div>

          {/* Label รายจ่าย */}
          <span
            className={`text-red-600 font-semibold ${
              !isIncome ? "text-3xl" : "text-md"
            }`}
          >
            รายจ่าย
          </span>
        </div>
      </div>

      {/* Title */}
      <label htmlFor="title" className="text-lg text-gray-400">
        รายการ
      </label>
      <div className="flex gap-x-2 bg-white rounded-md shadow-sm p-2 pl-3 mt-2">
        <input
          type="text"
          id="title"
          className="focus:outline-none w-full"
          maxLength="30"
          autoFocus
          required
          ref={(el) => (inputsRef.current.title = el)}
        />
      </div>

      {/* Amount */}
      <div className="flex gap-x-2 bg-white rounded-md shadow-sm p-2 pl-3 mt-2">
        <input
          type="number"
          placeholder="ระบุจำนวนเงิน"
          className="focus:outline-none w-full"
          required
          ref={(el) => (inputsRef.current.amount = el)}
        />
      </div>

      {/* Description */}
      <div className="flex gap-x-2 bg-white rounded-md shadow-sm p-2 pl-3 mt-2">
        <textarea
          placeholder="รายละเอียดเพิ่มเติม"
          className="focus:outline-none w-full"
          ref={(el) => (inputsRef.current.description = el)}
        />
      </div>

      {/* Date Input */}
      <label htmlFor="date" className="text-lg text-gray-400 mt-4 block">
        วันที่ ดด-วว-ปปปป
      </label>
      <div className="flex gap-x-2 bg-white rounded-md shadow-sm p-2 pl-3 mt-2">
        <input
          type="date"
          id="date"
          defaultValue={getCurrentDate()} // ค่าเริ่มต้นเป็นวันที่ปัจจุบัน
          className="focus:outline-none w-full"
          ref={(el) => (inputsRef.current.date = el)}
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="mt-2 px-3 py-2 w-full rounded font-semibold bg-blue-500 text-white hover:bg-blue-600"
      >
        บันทึกรายการ
      </button>
    </form>
  );
};

export default NewItem;
