

user: {
  _id: 'ObjectId',
  name: "Shajid Hasan",
  email: "shajid@example.com",
  passwordHash: "...",         // use bcrypt or similar
  role: "admin",               // admin | moderator | staff
  shopId: ObjectId,            // assign user to one shop (optional for admin)
  isActive: true,
  createdAt: Date
},


shop: {
  _id: ObjectId,
  name: "Uttara Electronics",
  location: "Dhaka",
  owner: "Mr. Karim"
isActive: true,         // Optional, depending on your need
  createdBy: ObjectId,    // Already included ✅
  createdAt: Date
},

category: {
  _id: ObjectId,
  shopId: ObjectId,               // Reference to Shop
  name: "Fridge",
  allowedUnits: ["ltr", "cft"],   // Set of units relevant to the category
  brandIds: [ObjectId, ...]
isActive: true,         // Optional, depending on your need
  createdBy: ObjectId,    // Already included ✅
  createdAt: Date       // References to Brand
}

brand:{
  _id: ObjectId,
  name: "Samsung"
isActive: true,         // Optional, depending on your need
  createdBy: ObjectId,    // Already included ✅
  createdAt: Date
}

productmodel: {
  _id: ObjectId,
  shopId: ObjectId,
  categoryId: ObjectId,
  brandId: ObjectId,
  modelName: "Samsung CoolMax 180L",
  size: "180",
  sizeUnit: "ltr",                  // One of category.allowedUnits
  currentStock: 12,
  defaultUnitPrice: 28000,
isActive: true,         // Optional, depending on your need
  createdBy: ObjectId,    // Already included ✅
  createdAt: Date
}



transaction: {
  _id: ObjectId,
  shopId: ObjectId,
  supplier: "Mr. Alam",
 isActive: true,         // Optional, depending on your need
  createdBy: ObjectId,    // Already included ✅
  createdAt: Date,
  transactionType: "incoming",       // or "outgoing"
  items: [
    {
      productModelId: ObjectId,
      quantity: 2,
      unitPrice: 28000,
      size: "180",
      sizeUnit: "ltr"
    }
  ]
}
