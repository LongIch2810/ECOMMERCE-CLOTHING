import React from "react";
import InputQuantity from "../input/InputQuantity";
import IconBin from "../icons/IconBin";
import Button from "../button/Button";

const CartItem = () => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center">
        <img
          src="https://images.unsplash.com/photo-1618354691373-d851c5c3a990?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=830&q=80"
          alt=""
          className="object-cover rounded size-16"
        />
        <div>
          <h3 className="text-sm text-gray-900">Basic Tee 6-Pack</h3>
          <div className="mt-0.5 space-y-px text-[10px] text-gray-600">
            <div>
              <span className="inline">Size:</span>
              <span className="inline">XXS</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-10">
        <span className="text-sm text-secondary">30.000đ</span>
        <InputQuantity></InputQuantity>
      </div>

      <div className="flex items-center gap-10">
        <div>
          <span className="text-sm text-secondary">30.000đ</span>
        </div>
        <div>
          <Button>
            <IconBin></IconBin>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
