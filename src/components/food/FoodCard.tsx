"use client";

import { Card } from "@/components/ui/card";
import { Plus } from "lucide-react";
import Image from "next/legacy/image";
import { MouseEventHandler, useState } from "react";
import { Button } from "../ui/button";
import { AddToCartAlert } from "./AddToCartAlert";
import { FoodDetailModal } from "./FoodDetailModal";
import { Food } from "@/type";

type FoodCardProps =Food

export const FoodCard = ( props:FoodCardProps) => {
  const {image, price, foodName,ingredients}=props
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);

  const onToggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    console.log(event);
    setShowAlert(true);
  };

  const handleAlertRemove = () => {
    setShowAlert(false);
  };

  return (
    <div className="w-full">
      <div onClick={onToggleModal}>
        <Card className="flex flex-col gap-5 p-4 bg-white border-none shadow-none cursor-pointer w-99 h-86 rounded-3xl">
          <div className="relative flex items-end justify-end overflow-hidden h-52 rounded-3xl">
            <Image src={image} alt={foodName} objectFit="cover" layout="fill" />
            <Button
              className="absolute bg-white rounded-full w-11 h-11 bottom-5 right-5"
              onClick={handleAddToCart}
            >
              <Plus color="red" />
            </Button>
          </div>

          <div className="w-full">
            <div className="flex justify-between">
              <p className="text-2xl font-semibold text-red-500">{foodName}</p>
              <p className="text-lg font-semibold text-[#09090B]">{price}</p>
            </div>

            <div className="mt-2 text-sm text-[#09090B] font-normal">
              {ingredients}
            </div>
          </div>
        </Card>
      </div>
      <FoodDetailModal
        food={props}
        isModalOpen={isModalOpen}
        onToggleModal={onToggleModal}
      />
      <AddToCartAlert isVisible={showAlert} onHide={handleAlertRemove} />
    </div>
  );
};
