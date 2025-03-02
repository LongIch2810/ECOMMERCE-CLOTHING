import React, { useEffect, useState } from "react";
import InputQuantity from "../input/InputQuantity";
import IconBin from "../icons/IconBin";
import Button from "../button/Button";
import { formatCurrency } from "@/utils/format";
import { useDispatch } from "react-redux";
import { deleteProductToCart } from "@/store/features/cart/cartThunk";

const CartItem = ({ item }) => {
  const [quantity, setQuantity] = useState(item?.quantity);
  const dispatch = useDispatch();
  const handleDeleteItem = (id) => {
    dispatch(deleteProductToCart({ id }));
  };
  return (
    <div className="grid items-center grid-cols-12 gap-3 p-2 border-b border-gray-300 md:border-b-0 md:gap-5">
      <div className="flex items-center col-span-12 md:col-span-8 gap-x-2">
        <img
          src={item.product.images[0]}
          alt=""
          className="object-cover rounded size-20"
        />
        <div>
          <h3 className="text-sm text-gray-900">{item.product.name}</h3>
          <div className="mt-0.5 space-y-px text-xs text-gray-600">
            <p>Màu: {item.color.name}</p>
            <div>
              <span className="inline">Size:</span>
              <span className="inline">{item.size}</span>
            </div>
            <p className="text-secondary">
              Số lượng sản phẩm hiện có: {item.stockQuantity}
            </p>
          </div>
        </div>
      </div>
      <p className="col-span-12 md:col-span-1 md:place-self-center">
        {formatCurrency(item.product.price)}
      </p>
      <div className="col-span-12 mb-10 md:mb-0 md:col-span-1 md:place-self-center">
        <InputQuantity
          idItem={item._id}
          isHandleUpdate={true}
          value={quantity}
          setValue={setQuantity}
          maxValue={item.stockQuantity}
        ></InputQuantity>
      </div>
      <p className="col-span-6 md:col-span-1 text-secondary md:place-self-center place-self-start">
        {formatCurrency(item.product.price * item.quantity)}
      </p>
      <div className="col-span-6 md:col-span-1 md:place-self-center place-self-end">
        <Button onClick={() => handleDeleteItem(item._id)}>
          <IconBin></IconBin>
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
