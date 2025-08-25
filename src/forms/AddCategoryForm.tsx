import { useForm, useFieldArray } from "react-hook-form";
import useFetchData from "@/hooks/useFetchData";
import usePostData from "@/hooks/usePostData";
import type { Shop, Brand } from "@/types";
import { useState } from "react";
import PageWrapper from "@/components/PageWrapper/PageWrapper";

type CategoryFormData = {
  name: string;
  shopId: string;
  allowedUnits: { value: string }[];
  brandIds: string[];
  isActive: boolean;
  createdBy: string;
};

export default function AddCategoryForm() {
  const [shopId, setShopId] = useState("");

  // Fetch data
  const { data: shops } = useFetchData<any[]>("/shops");
  const { data: brands } = useFetchData<any[]>(shopId ? "/brands" : "");

  // Post hook
  const { post } = usePostData("/categories");

  // Form setup
  const { register, handleSubmit, setValue, control } =
    useForm<CategoryFormData>({
      defaultValues: {
        name: "",
        shopId: "",
        allowedUnits: [{ value: "" }],
        brandIds: [],
        isActive: true,
        createdBy: "",
      },
    });

  // Field array for allowedUnits
  const { fields, append, remove } = useFieldArray<
    CategoryFormData,
    "allowedUnits",
    string
  >({
    control,
    name: "allowedUnits",
  });

  const onSubmit = (data: CategoryFormData) => {
    data.allowedUnits = data.allowedUnits.filter((u) => u.value.trim() !== "");
    post(data);
    console.log(data);
    alert("Category Added Successfully!");
  };

  return (
    <PageWrapper btnText="x" pageTitle="New Category" href="">
      <div className="px-2 sm:px-4">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="max-w-4xl mx-auto p-6 border rounded space-y-6 bg-white dark:bg-slate-900"
        >
          {/* Grid wrapper */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Shop */}
            <div>
              <label
                htmlFor="shopId"
                className="block font-medium text-slate-700 dark:text-slate-300"
              >
                Shop *
              </label>
              <select
                id="shopId"
                {...register("shopId", { required: true })}
                className="border p-2 rounded w-full dark:bg-slate-800 dark:text-white"
                onChange={(e) => {
                  setShopId(e.target.value);
                  setValue("brandIds", []);
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

            {/* Category Name */}
            <div>
              <label
                htmlFor="name"
                className="block font-medium text-slate-700 dark:text-slate-300"
              >
                Category Name *
              </label>
              <input
                id="name"
                {...register("name", { required: true })}
                className="border p-2 rounded w-full dark:bg-slate-800 dark:text-white"
                placeholder="Category Name"
              />
            </div>
          </div>

          {/* Allowed Units */}
          <div>
            <label className="block font-medium mb-2 text-slate-700 dark:text-slate-300">
              Allowed Units
            </label>
            <div className="space-y-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-center">
                  <label htmlFor={`allowedUnits-${index}`} className="sr-only">
                    Unit {index + 1}
                  </label>
                  <input
                    id={`allowedUnits-${index}`}
                    {...register(`allowedUnits.${index}.value` as const, {
                      required: true,
                    })}
                    className="border p-2 rounded flex-1 dark:bg-slate-800 dark:text-white"
                    placeholder="e.g. kg, pcs"
                    defaultValue={field.value}
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
                onClick={() => append({ value: "" })}
                className="bg-blue-500 text-white px-3 py-1 rounded w-full md:w-auto"
              >
                + Add Unit
              </button>
            </div>
          </div>

          {/* Brands */}
          <div>
            <label className="block font-medium mb-2 text-slate-700 dark:text-slate-300">
              Allowed Brands
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {(brands as any)?.data?.map((b: Brand) => (
                <label
                  key={b._id}
                  htmlFor={`brand-${b._id}`}
                  className="flex items-center gap-2 text-slate-800 dark:text-slate-300 border rounded px-2 py-1"
                >
                  <input
                    id={`brand-${b._id}`}
                    type="checkbox"
                    value={b._id}
                    {...register("brandIds")}
                    disabled={!shopId}
                    className="accent-blue-500"
                  />
                  {b.name}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <div className="w-full flex justify-end">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded w-full md:w-auto"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </PageWrapper>
  );
}
