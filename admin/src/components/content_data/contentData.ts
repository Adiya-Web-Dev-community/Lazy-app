//Companies

export const listHeadingCompanies = [
  "Name",
  "Email",
  "Logo",
  "Phone",
  "Address",
  "Website",
  "Status",
  "Products",
  // "Since",
  "Setting",
];

export const companiesData = [
  {
    companyName: "ABC Corp",
    contactPerson: "John Doe",
    email: "john.doe@abccorp.com",
    phoneNumber: "123-456-7890",
    address: "123 Main St, City, ST",
    website: "http://www.abccorp.com",
    status: "Active",
    productsCount: 50,
    dateAdded: "2024-01-15",
  },
  {
    companyName: "XYZ Inc",
    contactPerson: "Jane Smith",
    email: "jane.smith@xyz.com",
    phoneNumber: "987-654-3210",
    address: "456 Market St, City, ST",
    website: "http://www.xyz.com",
    status: "Pending",
    productsCount: 30,
    dateAdded: "2024-02-10",
  },
  {
    companyName: "Tech Solutions",
    contactPerson: "Alice Johnson",
    email: "alice.johnson@techsolutions.com",
    phoneNumber: "555-123-4567",
    address: "789 Tech Park, City, ST",
    website: "http://www.techsolutions.com",
    status: "Inactive",
    productsCount: 15,
    dateAdded: "2023-12-20",
  },
  {
    companyName: "Innovatech",
    contactPerson: "Bob Martin",
    email: "bob.martin@innovatech.com",
    phoneNumber: "321-654-9870",
    address: "101 Innovation Blvd, City, ST",
    website: "http://www.innovatech.com",
    status: "Active",
    productsCount: 80,
    dateAdded: "2024-03-01",
  },
  {
    companyName: "Retail Giants",
    contactPerson: "Carol White",
    email: "carol.white@retailgiants.com",
    phoneNumber: "222-333-4444",
    address: "202 Shopping Ln, City, ST",
    website: "http://www.retailgiants.com",
    status: "Active",
    productsCount: 100,
    dateAdded: "2024-01-25",
  },
];

//product

export const productHeadings = [
  "Pr.Name",
  "Co.Name",
  "Category",
  // "Price",
  // "Feature",
  // "Stock Qty",
  // "SKU",
  "Status",
  "Date Added",
  "View",
  "Setting",
];

export const productsData = [
  {
    productName: "Wireless Mouse",
    companyName: "ABC Corp",
    category: "Electronics",
    price: 25.99,
    stockQuantity: 150,
    sku: "WM12345",
    status: "Active",
    dateAdded: "2024-01-15",
    // feature: "Ergonomic design, USB receiver", // Added feature
  },
  {
    productName: "Smartphone Case",
    companyName: "XYZ Inc",
    category: "Accessories",
    price: 15.99,
    stockQuantity: 200,
    sku: "SC67890",
    status: "Active",
    dateAdded: "2024-02-10",
    // feature: "Shockproof, Slim fit", // Added feature
  },
  {
    productName: "Bluetooth Speaker",
    companyName: "Tech Solutions",
    category: "Audio",
    price: 45.99,
    stockQuantity: 80,
    sku: "BS23456",
    status: "Inactive",
    dateAdded: "2023-12-20",
    // feature: "Portable, Waterproof", // Added feature
  },
  {
    productName: "Running Shoes",
    companyName: "Innovatech",
    category: "Footwear",
    price: 75.0,
    stockQuantity: 120,
    sku: "RS78901",
    status: "Active",
    dateAdded: "2024-03-01",
    // feature: "Breathable material, Non-slip sole", // Added feature
  },
  {
    productName: "Organic T-Shirt",
    companyName: "Retail Giants",
    category: "Apparel",
    price: 19.99,
    stockQuantity: 300,
    sku: "OT56789",
    status: "Active",
    dateAdded: "2024-01-25",
    // feature: "100% Organic cotton, Eco-friendly", // Added feature
  },
];

//category
export const categories = [
  "Electronics",
  "Accessories",
  "Audio",
  "Footwear",
  "Apparel",
  "Home & Kitchen",
  "Sports & Outdoors",
  "Books",
  "Toys & Games",
  "Beauty & Personal Care",
];
