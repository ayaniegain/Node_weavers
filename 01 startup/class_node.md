# 🗺️ Product API Map

This document consolidates all available API endpoints for the product system, detailing request/response types, middleware configurations, and backend logic for a cohesive reference.

---

## 📮 Postman Request Types

### 1. **Binary**
- Used to send files (e.g., images, PDFs) in raw format.
- **Content-Type**: `multipart/form-data`

### 2. **Form-Data**
- Sends key-value pairs, including files and text.
- Supports mixed data (string + file).
- Automatically sets headers.

### 3. **x-www-form-urlencoded**
- Sends URL-encoded key-value pairs (like HTML forms).
- Ideal for simple login/register forms.

---

## 📥 Request Types in Express.js

| Type         | Usage Example           | Description                                      |
|--------------|-------------------------|--------------------------------------------------|
| `req.body`   | `req.body.name`         | Access data in the body (POST/PUT)              |
| `req.query`  | `req.query.name`        | Access data in URL query string (GET filters)   |
| `req.params` | `req.params.id`         | Access route parameters (e.g., `/products/:id`) |

---

## 📤 Response / Middleware Configurations

| Middleware                                   | Description                                |
|---------------------------------------------|--------------------------------------------|
| `express.json()`                            | Parses JSON bodies sent by the client      |
| `express.urlencoded({ extended: true })`     | Parses URL-encoded data (like forms)       |
| `express.text({ type: 'text/html' })`       | Parses incoming HTML/text content          |

---

## 🌐 API Endpoints

### ✅ Get All Products
```http
GET /api/v1/products
```
- Returns a list of all products.

### ✅ Get Single Product by ID
```http
GET /api/v1/products/:id
```
Example: `/api/v1/products/1`
- Returns a specific product by its `id`.

### ✅ Search Product by Name
```http
GET /api/v1/products?name=phone
```
- Searches products by full or partial name.

### ✅ Search Product by Price Range
```http
GET /api/v1/products?minPrice=10&maxPrice=100
```
- Filters products within a specified price range.

### ✅ Sort Products (Ascending by Name)
```http
GET /api/v1/products?sortBy=name&order=asc
```
- Sorts results by name in ascending order.

### ✅ Sort Products (Descending by Price)
```http
GET /api/v1/products?sortBy=price&order=desc
```
- Sorts results by price in descending order.

### ✅ Filter Products by Multiple Categories
```http
GET /api/v1/products?categories=Electronics,Clothing
```
- Filters based on multiple categories.

### ✅ Filter Products by Price Greater Than
```http
GET /api/v1/products?price_gt=500
```
- Returns products with a price greater than 500.

### ✅ Combined Search
```http
GET /api/v1/products?name=lap&minPrice=500&category=Electronics&sortBy=price&order=desc
```
- Combines multiple filters and sorting for complex queries.

---

## 🛠️ Backend Notes (Express.js)

### Sample Filtering Logic
```js
app.get('/api/v1/products', (req, res) => {
  const { name, minPrice, maxPrice, brand, category, categories, sortBy, order, inStock, price_gt } = req.query;
  let results = [...products];

  // Filter by name
  if (name) {
    results = results.filter(p => p.name.toLowerCase().includes(name.toLowerCase()));
  }

  // Filter by price range
  if (minPrice && maxPrice) {
    results = results.filter(p => p.price >= Number(minPrice) && p.price <= Number(maxPrice));
  }

  // Filter by price greater than
  if (price_gt) {
    results = results.filter(p => p.price > Number(price_gt));
  }

  // Filter by brand
  if (brand) {
    results = results.filter(p => p.brand === brand);
  }

  // Filter by single category
  if (category) {
    results = results.filter(p => p.category === category);
  }

  // Filter by multiple categories
  if (categories) {
    const categoryArray = categories.split(',');
    results = results.filter(p => categoryArray.includes(p.category));
  }

  // Filter by stock status
  if (inStock !== undefined) {
    results = results.filter(p => p.inStock === (inStock === 'true'));
  }

  // Sorting logic
  if (sortBy && order) {
    results.sort((a, b) => {
      if (order === 'asc') return a[sortBy] > b[sortBy] ? 1 : -1;
      return a[sortBy] < b[sortBy] ? 1 : -1;
    });
  }

  res.json(results);
});
```

---

## 💡 Tip: Flexible Query Chaining
Combine multiple query parameters for powerful filtering:
```http
GET /api/v1/products?category=Clothing&brand=Levis&inStock=false&price_gt=1000&sortBy=price&order=desc
```
- Chain query parameters to create complex, tailored queries parsed seamlessly in the backend.