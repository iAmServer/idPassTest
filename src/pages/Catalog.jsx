import { Link } from "react-router-dom";
import Product from "../components/Product";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, updateQuantity } from "../store/slices/shop";

function Catalog() {
  const shop = useSelector((state) => state.shop);
  const { cart, products } = shop;

  const dispatch = useDispatch();

  const handleAddToCart = (id) => {
    dispatch(addToCart(id));
  };

  const itemInCart = (id) => {
    const itemIndex = cart.findIndex((item) => item.id === id);

    return itemIndex !== -1 ? cart[itemIndex] : null;
  };

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center my-12">
        <h1 className="text-6xl font-semibold">Shop</h1>
        <Link
          to="/cart"
          className="bg-red-500 p-4 rounded-full text-white hover:bg-opacity-95 transition duration-200"
        >
          Cart{" "}
          {cart.length > 0 && <span className="ml-1"> {cart.length} </span>}
        </Link>
      </div>

      <div className="flex flex-col mt-12">
        <div className="grid grid-cols-3 gap-8">
          {products.map((item) => {
            return (
              <Product
                key={item.id}
                product={item}
                onAdd={handleAddToCart}
                inCart={itemInCart(item.id)}
                updateProduct={(val) =>
                  dispatch(updateQuantity({ id: item.id, quantity: val }))
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Catalog;
