import QuantityCounter from "./QuantityCounter";

function CartProduct({ product, updateProduct, remove }) {
  const { name, price, discount, id, image, quantity: count } = product;
  const calculateDiscount = (price, discount) => {
    const discountedPrice = price - (price * discount) / 100;
    return discountedPrice;
  };

  return (
    <div className="border border-gray-200 rounded-lg flex flex-row overflow-hidden p-2 justify-between items-center">
      <div className="flex gap-x-3">
        <img className="w-16 h-16 rounded-md" src={image} alt={name} />

        <div className="flex flex-col text-start">
          <p className="text-2xl font-semibold">{name}</p>
          <p className="font-bold text-base">
            ₦ {calculateDiscount(price, discount)}
          </p>
        </div>
      </div>
      <div className="flex gap-x-2">
        <QuantityCounter
          count={count}
          onUpdate={(val) => {
            updateProduct(val);
          }}
        />

        <button
          className="text-center border border-red-500 py-1 px-3 text-lg text-red-500 font-semibold hover:bg-red-500 hover:text-white rounded-lg transition duration-200"
          onClick={() => {
            remove(id);
          }}
        >
          x
        </button>
      </div>
    </div>
  );
}

export default CartProduct;
