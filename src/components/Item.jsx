/* eslint-disable react/prop-types */
import { MdDelete, MdEdit } from "react-icons/md";
import { useRef, useState } from "react";

// แปลงวันที่สำหรับการแสดงผลในรูปแบบภาษาไทย
const formatDateThai = (dateString) => {
  const date = new Date(dateString);
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Intl.DateTimeFormat("th-TH", options).format(date);
};

// แปลงวันที่สำหรับ input[type="date"]
const formatDateForInput = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Item = ({ title, amount, date, id, deleteItem, updateItem }) => {
  const dialog = useRef();
  const [itemTitle, setItemTitle] = useState(title);
  const [itemAmount, setItemAmount] = useState(amount);
  const [itemDate, setItemDate] = useState(date); // ใช้ `date` ที่รับมาโดยตรง
  const [editing, setEditing] = useState(false);

  const openModal = (isEditing) => {
    setEditing(isEditing);
    dialog.current.showModal();
  };

  const closeModal = () => {
    dialog.current.close();
  };

  const clickOutsideModal = (e) => {
    if (e.target === dialog.current) {
      closeModal();
    }
  };

  const submitForm = (event) => {
    event.preventDefault();
    if (editing) {
      const updatedItem = {
        title: itemTitle,
        amount: parseFloat(itemAmount),
        date: new Date(itemDate).toISOString(), // แปลงค่าวันที่กลับเป็น ISO string
      };
      updateItem(updatedItem, id);
    } else {
      deleteItem(id);
    }
    closeModal();
  };

  return (
    <>
      <li className="">
        <div className="flex justify-between gap-x-2 mr-auto items-center">
          <div>
            <p className="font-semibold">{amount} ฿</p>
            <p className="text-gray-500 text-sm">{formatDateThai(date)}</p>
          </div>

          <div className="flex items-center gap-x-2">
            <button className="item-btn">
              <MdEdit
                type="button"
                onClick={() => openModal(true)}
                className="w-6 h-6"
              />
            </button>
            <button
              type="button"
              onClick={() => openModal(false)}
              className="item-btn"
            >
              <MdDelete className="w-6 h-6" />
            </button>
          </div>
        </div>
      </li>
      <dialog
        onClick={clickOutsideModal}
        ref={dialog}
        className="rounded-md w-[480px]"
      >
        <form onSubmit={submitForm} className="p-6">
          <h2>{editing ? "Edit Item" : "Do you want to delete?"}</h2>
          {editing ? (
            <div>
              <div className="flex gap-x-2 bg-white rounded-md shadow-sm p-2 pl-3 mt-2">
                <input
                  onChange={(e) => setItemTitle(e.target.value)}
                  className="focus:outline-none w-full"
                  type="text"
                  value={itemTitle}
                />
              </div>
              <div className="flex gap-x-2 bg-white rounded-md shadow-sm p-2 pl-3 mt-2">
                <input
                  onChange={(e) => setItemAmount(e.target.value)}
                  className="outline-none w-full"
                  type="number"
                  value={itemAmount}
                />
              </div>
              <div className="flex gap-x-2 bg-white rounded-md shadow-sm p-2 pl-3 mt-2">
                {/* แสดงค่าในรูปแบบ YYYY-MM-DD เมื่อแก้ไข */}
                <input
                  onChange={(e) => setItemDate(e.target.value)}
                  type="date"
                  value={formatDateForInput(itemDate)}
                />
              </div>
            </div>
          ) : (
            <div>
              <p className="font-semibold"> {title} </p>
              <p className="font-semibold"> {amount} ฿ </p>
            </div>
          )}

          <div className="mt-12 text-end space-x-2">
            <button
              onClick={closeModal}
              type="button"
              className="rounded border border-gray-200 px-3 py-2 hover:bg-gray-50"
            >
              CLOSE
            </button>
            <button
              type="submit"
              className={
                editing
                  ? "rounded bg-teal-500 px-3 py-2 text-white hover:bg-teal-600"
                  : "rounded bg-red-500 px-3 py-2 text-white hover:bg-red-600"
              }
            >
              {editing ? "UPDATE" : "DELETE"}
            </button>
          </div>
        </form>
      </dialog>
    </>
  );
};

export default Item;
// //
