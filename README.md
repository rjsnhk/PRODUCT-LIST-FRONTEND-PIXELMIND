

# 🛍️ Product List Frontend (PixelMind Assignment)

Welcome to the **E-Commerce Product Listing App** built as part of the **Frontend Developer Assignment**.  
This app is fully responsive 📱💻 and lets users **search, filter, view product details, and add products to a cart**.

🔗 **Live Demo:** [Product List Frontend](https://product-list-frontend-pixelmind.vercel.app/)  
📂 **Repository:** [GitHub Repo](https://github.com/rjsnhk/PRODUCT-LIST-FRONTEND-PIXELMIND.git)

---

## ✨ Features

- 🖼️ **Product Display**  
  - Products displayed in a responsive grid with **image, name, price, and description**.
  - Data fetched via **React Query**.

- 🔍 **Search & Filter**  
  - Search products by name (client-side filtering).  
  - Filter by category.  
  - **Global state** handled with Zustand ⚡.

- 📖 **Product Details**  
  - Click on a product to open a **responsive modal** with full details.  
  - Easy close button to exit.

- 📝 **Add Product Form (Mock)**  
  - Add new product with Title, Price, Description, Category, Image URL.  
  - **React Hook Form** + **Zod** for validation.  
  - Submission is simulated (no backend call).

- 🛒 **Optional Shopping Cart**  
  - Add items to cart.  
  - Cart state managed by **Zustand**.  
  - Floating 🛒 icon shows item count.

---

## 🛠️ Tech Stack

- ⚛️ **React.js** – UI Framework  
- 🎨 **Tailwind CSS** – Styling  
- 🔄 **React Query** – Data fetching & caching  
- ⚡ **Zustand** – Lightweight state management  
- 📝 **React Hook Form** – Form handling  
- ✅ **Zod** – Form validation  
- 🌐 **Fake Store API** – Product data source

---

## 🌐 API Endpoints Used

- Get All Products 👉 `https://fakestoreapi.com/products`  
- Get Categories 👉 `https://fakestoreapi.com/products/categories`  
- Get Products by Category 👉 `https://fakestoreapi.com/products/category/{category_name}`  
- Get Single Product 👉 `https://fakestoreapi.com/products/{id}`  

---

## 🚀 Getting Started (Installation & Setup)

Clone the repository and run it locally 🖥️:

```bash
# 1️⃣ Clone the repo
git clone https://github.com/rjsnhk/PRODUCT-LIST-FRONTEND-PIXELMIND.git

# 2️⃣ Go inside the project
cd PRODUCT-LIST-FRONTEND-PIXELMIND

# 3️⃣ Install dependencies
npm install

# 4️⃣ Start the development server
npm run dev
````

Now visit 👉 `http://localhost:5173` (or as shown in terminal).


---

## 📦 Deployment

* Hosted on **Vercel** 🌍
* Live Demo: [https://product-list-frontend-pixelmind.vercel.app/](https://product-list-frontend-pixelmind.vercel.app/)

---

## 🤝 Contribution

Want to improve this project?

* Fork the repo 🍴
* Create your feature branch 🌿
* Submit a pull request ✅

---

## 👨‍💻 Author

Made with ❤️ by **Rajesh Nahak**
🔗 [GitHub Profile](https://github.com/rjsnhk)

