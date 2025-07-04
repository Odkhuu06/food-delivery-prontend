import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChangeEvent, useState } from "react";
import { ImageUploader } from "./ImageUploader";
import { toast } from "sonner";

type AddFoodModalProps = {
  categoryName: string;
  categoryId: string;
};

type FoodInfo = {
  foodName: string;
  price: string;
  image: string;
  ingredients: string;
  category: string;
};

const uploadToCloudinary = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", "food-delivery"); // өөрийн preset нэр
  const cloudName = "dq2go2ekr"; // өөрийн cloud name

  const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Upload failed");

  const data = await res.json();
  return data.secure_url;
  
};

export const AddFoodModal = ({ categoryName, categoryId }: AddFoodModalProps) => {
  const [uploadedImage, setUploadedImage] = useState<File | undefined>();

  const [foodInfo, setFoodInfo] = useState<FoodInfo>({
    foodName: "",
    price: "",
    image:
      "",
    ingredients: "",
    category: categoryId,
  });

  const handleInputChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFoodInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setUploadedImage(e.target.files[0]);
    }
  };

  const handleCreateFood = async () => {
    try {
      let imageUrl = foodInfo.image;
    console.log({...foodInfo, image: imageUrl})
      

      if (uploadedImage) {
        imageUrl = await uploadToCloudinary(uploadedImage);
      }

      const response = await fetch("http://localhost:3002/food", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...foodInfo, image: imageUrl }),
      });

      if (!response.ok) throw new Error("Failed to create food");

      toast.success(`Food ${foodInfo.foodName} created successfully`);

      setFoodInfo({
        foodName: "",
        price: "",
        image: "",
        ingredients: "",
        category: categoryId,
      });
      setUploadedImage(undefined);
    } catch (error) {
      console.error("error", error);
      toast.error("Failed to upload image or create food");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="custom-dashed-border rounded-3xl bg-background h-[227px] flex flex-col gap-6 justify-center items-center m-1">
          <Button className="bg-red-500 rounded-full w-9 h-9">
            <Plus width={16} height={16} strokeWidth={1} />
          </Button>
          <p className="text-sm text-center w-36">Add new Dish to {categoryName}</p>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px] flex flex-col gap-6">
        <div className="flex items-center justify-between mb-4">
          <DialogTitle>Add new Dish to {categoryName}</DialogTitle>
          <DialogClose asChild>
            <Button type="button" variant="secondary" className="rounded-full w-9 h-9">
              <X strokeWidth={1} />
            </Button>
          </DialogClose>
        </div>

        <div className="flex w-full gap-6">
          <div className="flex flex-col w-1/2 gap-2">
            <Label htmlFor="foodName" className="ml-1 font-semibold">
              Food name
            </Label>
            <Input
              name="foodName"
              placeholder="Type food name..."
              value={foodInfo.foodName}
              onChange={handleInputChange}
            />
          </div>

          <div className="flex flex-col w-1/2 gap-2">
            <Label htmlFor="price" className="font-semibold">
              Food price
            </Label>
            <Input
              name="price"
              type="number"
              placeholder="Enter price..."
              value={foodInfo.price}
              onChange={handleInputChange}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="ingredients" className="font-semibold">
            Ingredients
          </Label>
          <Input
            name="ingredients"
            placeholder="List ingredients..."
            value={foodInfo.ingredients}
            onChange={handleInputChange}
          />
        </div>

        <div className="flex flex-col gap-2">
          <Label htmlFor="image" className="font-semibold">
            Food image
          </Label>
          <ImageUploader onFileChange={onFileChange} imgFile={uploadedImage} />
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" className="mt-4" onClick={handleCreateFood}>
              Add Dish
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}