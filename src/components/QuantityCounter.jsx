import { useState } from "react";
import InputNumber from "react-input-number";

function QuantityCounter({ count, onUpdate }) {
  const [quantity, setQuantity] = useState(count || 1);

  return (
    <div className="!w-[100px] flex border rounded-lg overflow-hidden">
      <button
        className="!w-[25px] text-center bg-red-500 py-1 text-lg text-white font-bold hover:bg-opacity-95 transition duration-200"
        onClick={() => {
          if (quantity > 1) {
            setQuantity(quantity - 1);
            onUpdate(quantity - 1);
          }
        }}
      >
        -
      </button>
      <InputNumber
        min={1}
        max={10}
        step={1}
        value={quantity}
        onChange={(data) => {
          setQuantity(data);
          onUpdate(data);
        }}
        enableMobileNumericKeyboard
        className="!w-[50px] text-center focus:outline-none"
      />
      <button
        className="!w-[25px] text-center bg-red-500 py-1 text-lg text-white font-bold hover:bg-opacity-95 transition duration-200"
        onClick={() => {
          if (quantity < 10) {
            setQuantity(quantity + 1);
            onUpdate(quantity + 1);
          }
        }}
      >
        +
      </button>
    </div>
  );
}

export default QuantityCounter;
