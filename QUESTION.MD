
---

## 🧾 Basic Retrieval

1. ✅ Get all products  
   **GET** `/api/v1/products`

2. ✅ Get product details by ID  
   **GET** `/api/v1/products/:id`  
   Example: `/api/v1/products/5`

---

## 🎯 Filtering by Category, Brand, and Stock

3. 🎯 Get all products in the `Electronics` category  
   **GET** `/api/v1/products?category=Electronics`

4. 🎯 Get products with brand `Nike`  
   **GET** `/api/v1/products?brand=Nike`

5. 🎯 Get all products that are **in stock**  
   **GET** `/api/v1/products?inStock=true`

6. 🎯 Get all products that are **out of stock**  
   **GET** `/api/v1/products?inStock=false`

---

## 💰 Price-Based Filtering

7. 💰 Get products priced **between ₹1000 and ₹3000**  
   **GET** `/api/v1/products?minPrice=1000&maxPrice=3000`

8. 💰 Get products with price **greater than ₹2000**  
   **GET** `/api/v1/products?price_gt=2000`

---

## 🔍 Search by Name

9. 🔍 Search products containing the word `"Bluetooth"`  
   **GET** `/api/v1/products?name=bluetooth`

---

## 🔃 Sorting

10. 🔃 Sort all products by price (ascending)  
    **GET** `/api/v1/products?sortBy=price&order=asc`

11. 🔃 Sort all products by price (descending)  
    **GET** `/api/v1/products?sortBy=price&order=desc`

12. 🔃 Sort all products alphabetically by name  
    **GET** `/api/v1/products?sortBy=name&order=asc`

---

## 🧠 Combined Filters

13. 🧠 Get all `Electronics` products that are in stock  
    **GET** `/api/v1/products?category=Electronics&inStock=true`

14. 🧠 Get all `Samsung` products under ₹2000 and in stock  
    **GET** `/api/v1/products?brand=Samsung&maxPrice=2000&inStock=true`

15. 🧠 Get products priced between ₹1000-₹3000 sorted by price (descending)  
    **GET** `/api/v1/products?minPrice=1000&maxPrice=3000&sortBy=price&order=desc`

---

## 🧪 Bonus (For Future Expansion)

16. 🎨 Get all products with color `Black` and in stock  
    🔧 _Not supported yet – add `color` query support_

17. 📑 Implement pagination  
    🔧 Add query parameters `page` and `limit`  
    Example: `/api/v1/products?page=2&limit=5`

18. ➕ Add new product  
    **POST** `/api/v1/products`  
    _(requires body parser and route setup)_

19. 📝 Update product by ID  
    **PUT** `/api/v1/products/:id`

20. ❌ Delete product by ID  
    **DELETE** `/api/v1/products/:id`

---

