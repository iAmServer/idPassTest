import CartProduct from "../components/CartProduct";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  removeItemFromCart,
  updateQuantity,
  clearCart,
} from "../store/slices/shop";

function Cart() {
  const shop = useSelector((state) => state.shop);
  const { cart, totalAmount } = shop;

  const dispatch = useDispatch();

  const updateProductQuantity = (id, newQuantity) => {
    dispatch(updateQuantity({ id, quantity: newQuantity }));
  };

  const removeItem = (id) => {
    dispatch(removeItemFromCart(id));
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center my-12">
        <h1 className="text-6xl font-semibold">Cart</h1>
        <Link
          to="/"
          className="bg-red-500 p-4 rounded-full text-white hover:bg-opacity-95 transition duration-200"
        >
          Shop
        </Link>
      </div>

      <div className="grid grid-cols-3 mt-12 justify-between">
        <div className="flex flex-col gap-y-6 col-span-2 px-4">
          {cart.length > 0 ? (
            cart.map((item) => {
              return (
                <CartProduct
                  key={item.id}
                  product={item}
                  updateProduct={(val) => updateProductQuantity(item.id, val)}
                  remove={removeItem}
                />
              );
            })
          ) : (
            <>
              <h1 className="text-4xl font-semibold">Basket is empty</h1>
              <p>
                <Link to="/" className="text-red-500 font-semibold">
                  Go back
                </Link>{" "}
                to add product to cart
              </p>
            </>
          )}
        </div>

        <div className="flex flex-col border rounded-lg h-[500px] text-start p-4">
          <div className="flex flex-col gap-y-6">
            <div>
              <p>Total</p>
              <p className="text-2xl font-semibold">₦{totalAmount}</p>
            </div>

            <div>
              <p>Billing Details</p>
              <p className="text-2xl font-semibold">Jane Doe</p>
              <div>
                <p className="text-base font-semibold">Lekki</p>
                <p className="text-base font-semibold">Lagos, Nigeria</p>
              </div>
            </div>
          </div>

          <button
            className="w-full rounded-full text-red-500 border border-red-500 mt-auto py-2 px-4 hover:bg-red-500 hover:text-white transition duration-200 disabled:bg-gray-50 disabled:text-red-500"
            disabled={totalAmount === 0}
            onClick={() => dispatch(clearCart())}
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
