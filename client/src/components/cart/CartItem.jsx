import React from "react";
import InputQuantity from "../input/InputQuantity";
import IconBin from "../icons/IconBin";
import Button from "../button/Button";
import { formatCurrency } from "@/utils/format";
import { useDispatch } from "react-redux";
import { deleteProductToCart } from "@/store/features/cart/cartThunk";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const handleDeleteItem = (id) => {
    dispatch(deleteProductToCart({ id }));
  };
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-x-2">
        <img
          src={item.product.images[0]}
          alt=""
          className="object-cover rounded size-16"
        />
        <div>
          <h3 className="text-sm text-gray-900">{item.product.name}</h3>
          <div className="mt-0.5 space-y-px text-[10px] text-gray-600">
            <div>
              <span className="inline">Size:</span>
              <span className="inline">{item.size}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <span className="text-sm font-medium text-gray-500">
          {formatCurrency(item.product.price)}
        </span>
        <InputQuantity value={item.quantity}></InputQuantity>
      </div>

      <div className="flex items-center gap-10">
        <div>
          <span className="text-sm text-secondary">
            {formatCurrency(item.product.price * item.quantity)}
          </span>
        </div>
        <div>
          <Button onClick={() => handleDeleteItem(item._id)}>
            <IconBin></IconBin>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
