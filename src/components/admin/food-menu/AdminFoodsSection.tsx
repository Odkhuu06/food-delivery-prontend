"use client";

import { FoodsWithCategory } from "@/type";
import { AddFoodModal } from "./AddFoodModal";
import { AdminFoodCard } from "./AdminFoodCard";
import { AdminFoodSkeleton } from "./AdminFoodSkeleton";
import { useEffect, useState } from "react";

export const AdminFoodsSection = () => {
  const [foodsWithCategory, setFoodsWithCategory] = useState<
    FoodsWithCategory[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getFoods = async () => {
      const response = await fetch(
        "http://localhost:3002/food"
      );
      const data = await response.json();

      setFoodsWithCategory(data.foodWithCategories);
    };

    getFoods();
    setLoading(false);
  }, []);

  if (loading) return <AdminFoodSkeleton />;

  if (!loading && (!foodsWithCategory || foodsWithCategory.length === 0)) {
    return <p>no foods</p>;
  }

  return (
    <div className="flex flex-col gap-6">
      {foodsWithCategory.map((category, index) => (
        <div
          key={index}
          className="flex flex-col gap-4 p-6 bg-background rounded-xl"
        >
          <div className="flex items-center gap-2 text-xl font-semibold">
            <p>{category.categoryName}</p>

            <p className="flex items-center">{category.count}</p>
          </div>

          <div className="grid grid-cols-4 gap-3">
            <AddFoodModal
              categoryName={category.categoryName}
              categoryId={category._id}
            />
            {category.foods.map((food) => (
              <div key={`${food._id}`} className="flex gap-2">
                <AdminFoodCard
                  image={food.image}
                  price={food.price}
                  ingredients={food.ingredients}
                  foodName={food.foodName}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
