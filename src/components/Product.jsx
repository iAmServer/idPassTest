import QuantityCounter from "./QuantityCounter";

function Product({ product, onAdd, inCart, updateProduct }) {
  const { name, price, discount, id, image } = product;

  const calculateDiscount = (price, discount) => {
    const discountedPrice = price - (price * discount) / 100;
    return discountedPrice;
  };

  return (
    <div className="border border-gray-200 rounded-lg flex flex-col h-[400px] overflow-hidden">
      <img className="w-full h-2/3" src={image} alt={name} />

      <div className="flex flex-col p-4 flex-1 text-start">
        <div className="text-xs text-gray-600 font-medium">
          Product Code:{id}
        </div>
        <div className="text-lg font-semibold">{name}</div>

        <div className="flex justify-between mt-auto items-center">
          <div>
            <p className="text-xs text-gray-600 font-medium">Price:</p>
            <div className="flex text-2xl items-center gap-x-1">
              <p className="font-bold">
                ₦ {calculateDiscount(price, discount)}
              </p>

              {discount > 0 && (
                <p className="font-normal flex gap-x-1 text-base items-end">
                  <span>/</span>
                  <span className="line-through">{price}</span>
                </p>
              )}
            </div>
          </div>

          {!inCart ? (
            <button
              className="border border-red-500 px-4 py-2 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition duration-200"
              onClick={() => {
                onAdd(id);
              }}
            >
              Add to Cart
            </button>
          ) : (
            <QuantityCounter
              count={inCart.quantity}
              onUpdate={(val) => {
                updateProduct(val);
              }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
