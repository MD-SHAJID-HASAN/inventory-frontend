import { useForm, useFieldArray } from "react-hook-form";
import useFetchData from "@/hooks/useFetchData";
import usePostData from "@/hooks/usePostData";
import type { Shop, Brand } from "@/types";
import { useState } from "react";
import AddButton from "@/components/customButton/AddButton";

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
    // Remove empty units before submitting
    data.allowedUnits = data.allowedUnits.filter((u) => u.value.trim() !== "");
    post(data);
    console.log(data);
    alert("Category Added Successfully!");
  };

  return (
    <div className="">
      <AddButton btnText="New Transaction"
      href="/add-transaction-form"
      ></AddButton>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="min-w-2xl mx-auto p-6 border rounded space-y-4"
      >
        <h1 className="text-2xl font-bold">Add Category</h1>

        {/* Shop */}
        <div>
          <label className="block font-medium">Shop *</label>
          <select
            {...register("shopId", { required: true })}
            className="border p-2 rounded w-full"
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
          <label className="block font-medium">Category Name *</label>
          <input
            {...register("name", { required: true })}
            className="border p-2 rounded w-full"
            placeholder="Category Name"
          />
        </div>

        {/* Allowed Units */}
        <div>
          <label className="block font-medium mb-2">Allowed Units</label>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div key={field.id} className="flex gap-2 items-center">
                <input
                  {...register(`allowedUnits.${index}.value` as const, {
                    required: true,
                  })}
                  className="border p-2 rounded flex-1"
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
              className="bg-blue-500 text-white px-3 py-1 rounded"
            >
              + Add Unit
            </button>
          </div>
        </div>

        {/* Brands */}
        <div>
          <label className="block font-medium mb-2">Allowed Brands</label>
          <div className="space-y-1">
            {(brands as any)?.data?.map((b: Brand) => (
              <label key={b._id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={b._id}
                  {...register("brandIds")}
                  disabled={!shopId}
                />
                {b.name}
              </label>
            ))}
          </div>
        </div>

        {/* Is Active */}
        <div className="flex items-center gap-2">
          <input type="checkbox" {...register("isActive")} defaultChecked />
          <label className="font-medium">Is Active?</label>
        </div>

        {/* Created By */}
        <div>
          <label className="block font-medium">Created By *</label>
          <input
            {...register("createdBy", { required: true })}
            className="border p-2 rounded w-full"
            placeholder="Your Name"
          />
        </div>

        {/* Submit */}
        <div>
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-2 rounded"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
