// ---Universal Styles ---
const inputClass =
  "w-full p-2 bg-slate-100 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl text-slate-800 dark:text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all";
const selectClass = `${inputClass}`;
const buttonClass = "px-4 py-2 rounded text-white transition-all";
const addButtonClass = "bg-blue-600 hover:bg-blue-700 " + buttonClass;
const submitButtonClass = "bg-green-600 hover:bg-green-700 " + buttonClass;
const removeButtonClass = "bg-red-600 hover:bg-red-700 text-white px-2 rounded";

import { useForm, useFieldArray } from "react-hook-form";
import useFetchData from "@/hooks/useFetchData";
import usePostData from "@/hooks/usePostData";
import type { Brand, Category, Shop } from "@/types";
import { useState } from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

type SizeData = {
  size: string;
  sizeUnit: string;
  currentStock: number;
  purchasePrice: number;
  averageCost: number;
};

//data type
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

  const { data: shops } = useFetchData<any[]>("/shops");
  const { data: categories } = useFetchData<any[]>(
    shopId ? `/categories/shop/${shopId}` : ""
  );
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
              (sum, s) => sum + (s.purchasePrice || 0) * (s.currentStock || 0),
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

    if (!data.hasVariation) {
      data.sizes = [];
      data.averageCost = data.purchasePrice;
    }

    post(data);
    console.log(data);
    alert("Product Added Successfully!");
  };

  return (
    <PageWrapper btnText="" pageTitle="New Product Model" href="">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-4xl w-full mx-auto p-6 border rounded space-y-4 bg-white dark:bg-slate-900 transition-colors"
      >
        {/* Shop */}
        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300">
            Shop *
          </label>
          <select
            {...register("shopId", { required: true })}
            className={selectClass}
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
          <label className="block font-medium text-slate-700 dark:text-slate-300">
            Category
          </label>
          <select
            {...register("categoryId")}
            className={selectClass}
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
          <label className="block font-medium text-slate-700 dark:text-slate-300">
            Brand *
          </label>
          <select
            {...register("brandId", { required: true })}
            className={selectClass}
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
          <label className="block font-medium text-slate-700 dark:text-slate-300">
            Unit *
          </label>
          <input
            {...register("unit", { required: true })}
            className={inputClass}
            placeholder="e.g. kg, pcs"
          />
        </div>

        {/* Name */}
        <div>
          <label className="block font-medium text-slate-700 dark:text-slate-300">
            Name *
          </label>
          <input
            {...register("name", { required: true })}
            className={inputClass}
          />
        </div>

        {/* Has Variation */}
        <div className="text-slate-800 dark:text-slate-300 flex items-center space-x-2">
          <input
            id="hasVariation"
            type="checkbox"
            {...register("hasVariation")}
            className="w-5 h-5 accent-blue-500"
            defaultChecked={true}
          />
          <label htmlFor="hasVariation" className="font-medium cursor-pointer">
            Has Variation?
          </label>
        </div>

        {/* Sizes (only if hasVariation) */}
        {hasVariation && (
          <div className="">
            <label className="font-medium text-slate-700 dark:text-slate-300">
              Sizes & Stock *
            </label>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2 mb-2"
              >
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400">
                    Size
                  </label>
                  <input
                    {...register(`sizes.${index}.size`, { required: true })}
                    className={inputClass}
                    placeholder="Size"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400">
                    Size Unit
                  </label>
                  <input
                    {...register(`sizes.${index}.sizeUnit`, { required: true })}
                    className={inputClass}
                    placeholder="Unit (cm, inch)"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400">
                    Stock
                  </label>
                  <input
                    type="number"
                    {...register(`sizes.${index}.currentStock`, {
                      valueAsNumber: true,
                      required: true,
                      min: 0,
                    })}
                    className={inputClass}
                    placeholder="Stock"
                  />
                </div>
                <div>
                  <label className="block text-sm text-slate-600 dark:text-slate-400">
                    Purchase Price
                  </label>
                  <input
                    type="number"
                    {...register(`sizes.${index}.purchasePrice`, {
                      valueAsNumber: true,
                      required: true,
                      min: 0,
                    })}
                    className={inputClass}
                    placeholder="Purchase Price"
                  />
                </div>
                <div className={`flex items-end w-full rounded-xl p-2`}>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className={`${removeButtonClass} w-full`}
                    disabled={fields.length === 1}
                  >
                    X
                  </button>
                </div>
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
              className={`${addButtonClass} md:w-fit w-full`}
            >
              + Add Size
            </button>
          </div>
        )}
        {!hasVariation && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300">
                Purchase Price
              </label>
              <input
                type="number"
                {...register("purchasePrice", {
                  valueAsNumber: true,
                  required: true,
                  min: 0,
                })}
                className={inputClass}
                placeholder="Purchase Price"
              />
            </div>

            <div>
              <label className="block font-medium text-slate-700 dark:text-slate-300">
                Stock
              </label>
              <input
                type="number"
                {...register(`totalStock`, {
                  valueAsNumber: true,
                  required: true,
                  min: 0,
                })}
                className={inputClass}
                placeholder="Stock"
              />
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="pt-4">
          <button type="submit" className={submitButtonClass}>
            Submit
          </button>
        </div>
      </form>
    </PageWrapper>
  );
}
