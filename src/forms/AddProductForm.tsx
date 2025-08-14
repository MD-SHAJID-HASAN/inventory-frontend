import { useForm, useFieldArray } from "react-hook-form";
import useFetchData from "@/hooks/useFetchData";
import usePostData from "@/hooks/usePostData";
import type { Brand, Category, Shop } from "@/types";
import { useState } from "react";

type SizeData = {
  size: string;
  sizeUnit: string;
  currentStock: number;
  purchasePrice: number;
  averageCost: number;
};

type ProductModelFormData = {
  shopId: string;
  categoryId?: string;
  brandId: string;
  name: string;
  hasVariation: boolean;
  sizes: SizeData[];
  unit: string;
  currentStock: number;
  totalStock?: number;
  averageCost?: number;
  isActive?: boolean;
  createdBy: string;
  purchasePrice: number;
};

export default function AddProductForm() {
  const [shopId, setShopId] = useState("");

  // Fetch data
  const { data: shops } = useFetchData<any[]>("/shops");
  const { data: categories } = useFetchData<any[]>(shopId ? `/categories/shop/${shopId}` : "");
  const { data: brands } = useFetchData<any[]>(shopId ? `/brands` : "");

  const { register, control, handleSubmit, setValue, watch } =
    useForm<ProductModelFormData>({
      defaultValues: {
        shopId: "",
        categoryId: "",
        brandId: "",
        name: "",
        hasVariation: true,
        sizes: [
          {
            size: "",
            sizeUnit: "",
            currentStock: 0,
            purchasePrice: 0,
            averageCost: 0,
          },
        ],
        purchasePrice: 0,
        unit: "",
        currentStock: 0,
        averageCost: 0,
        isActive: true,
        createdBy: "",
      },
    });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "sizes",
  });

  const { post } = usePostData("/productModels");

  const hasVariation = watch("hasVariation");

  const onSubmit = (data: ProductModelFormData) => {
    if (data.hasVariation) {
      const totalStock = data.sizes.reduce(
        (sum, s) => sum + (s.currentStock || 0),
        0
      );

      const purchasePrice =
        totalStock > 0
          ? data.sizes.reduce(
              (sum, s) =>
                sum + ((s.purchasePrice || 0) * (s.currentStock || 0)),
              0
            ) / totalStock
          : 0;

      data.totalStock = totalStock;
      data.purchasePrice = purchasePrice;
      data.sizes = data.sizes.map((s) => ({
        ...s,
        averageCost: s.purchasePrice,
      }));
    }

    if(!data.hasVariation){
      data.sizes = [];
      data.averageCost = data.purchasePrice
    }

    // post(data);
    console.log(data);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="min-w-4xl mx-auto p-6 border rounded space-y-4"
    >
      <h1 className="text-2xl font-bold">Create Product Model</h1>

      {/* Shop */}
      <div>
        <label className="block font-medium">Shop *</label>
        <select
          {...register("shopId", { required: true })}
          className="border p-2 rounded w-full"
          onChange={(e) => {
            setShopId(e.target.value);
            setValue("categoryId", "");
            setValue("brandId", "");
          }}
        >
          <option value="">Select Shop</option>
          {(shops as any)?.data?.map((s: Shop) => (
            <option key={s._id} value={s._id}>
              {s.name}
            </option>
          ))}
        </select>
      </div>

      {/* Category */}
      <div>
        <label className="block font-medium">Category</label>
        <select
          {...register("categoryId")}
          className="border p-2 rounded w-full"
          disabled={!shopId}
        >
          <option value="">Select Category</option>
          {(categories as any)?.data?.map((c: Category) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
      </div>

      {/* Brand */}
      <div>
        <label className="block font-medium">Brand *</label>
        <select
          {...register("brandId", { required: true })}
          className="border p-2 rounded w-full"
          disabled={!shopId}
        >
          <option value="">Select Brand</option>
          {(brands as any)?.data?.map((b: Brand) => (
            <option key={b._id} value={b._id}>
              {b.name}
            </option>
          ))}
        </select>
      </div>

      {/* Unit */}
      <div>
        <label className="block font-medium">Unit *</label>
        <input
          {...register("unit", { required: true })}
          className="border p-2 rounded w-full"
          placeholder="e.g. kg, pcs"
        />
      </div>

      {/* Name */}
      <div>
        <label className="block font-medium">Name *</label>
        <input
          {...register("name", { required: true })}
          className="border p-2 rounded w-full"
        />
      </div>

      {/* Has Variation */}
      <div>
        <label className="block font-medium">Has Variation?</label>
        <input type="checkbox" {...register("hasVariation")} /> Yes
      </div>

      {/* Sizes (only if hasVariation) */}
      {hasVariation && (
        <div>
          <label className=" font-medium">Sizes & Stock *</label>
          {fields.map((field, index) => (
            <div key={field.id} className="flex gap-2 mb-2">
              <input
                {...register(`sizes.${index}.size`, { required: true })}
                className="border p-2 rounded w-1/4"
                placeholder="Size"
              />
              <label className="font-medium">Size Unit</label>
              <input
                {...register(`sizes.${index}.sizeUnit`, { required: true })}
                className="border p-2 rounded w-1/4"
                placeholder="Unit (cm, inch)"
              />
              <label className="block font-medium">Stock</label>
              <input
                type="number"
                {...register(`sizes.${index}.currentStock`, {
                  valueAsNumber: true,
                  required: true,
                  min: 0,
                })}
                className="border p-2 rounded w-1/4"
                placeholder="Stock"
              />
              <label className="block font-medium">Purchase Price</label>
              <input
                type="number"
                {...register(`sizes.${index}.purchasePrice`, {
                  valueAsNumber: true,
                  required: true,
                  min: 0,
                })}
                className="border p-2 rounded w-1/4"
                placeholder="Purchase Price"
              />
              <button
                type="button"
                onClick={() => remove(index)}
                className="bg-red-500 text-white px-2 rounded"
                disabled={fields.length === 1}
              >
                X
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={() =>
              append({
                size: "",
                sizeUnit: "",
                currentStock: 0,
                purchasePrice: 0,
                averageCost: 0,
              })
            }
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            + Add Size
          </button>
        </div>
      )}

      {!hasVariation && (
        <div>
          <label className="block font-medium">Purchase Price</label>
          <input
            type="number"
            {...register("purchasePrice", {
              valueAsNumber: true,
              required: true,
              min: 0,
            })}
            className="border p-2 rounded w-1/4"
            placeholder="Purchase Price"
          />

                      <label className="block font-medium">Stock</label>
              <input
                type="number"
                {...register(`totalStock`, {
                  valueAsNumber: true,
                  required: true,
                  min: 0,
                })}
                className="border p-2 rounded w-1/4"
                placeholder="Stock"
              />
          
        </div>
      )}

      {/* Submit */}
      <div className="pt-4">
        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
