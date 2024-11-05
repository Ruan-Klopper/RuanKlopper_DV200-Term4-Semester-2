// src/app/admin/products.js
"use client";
import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Form,
  Modal,
} from "react-bootstrap";
import "../global.css";
import "./adminscreens.css";
import Image from "next/image";

export default function AdminProductCatalog() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  // State for selected product in edit modal
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [editImageFile, setEditImageFile] = useState(null);
  const [editImagePreview, setEditImagePreview] = useState(null);

  // State for creating a new product
  const [newProduct, setNewProduct] = useState({
    sku: "",
    name: "",
    description: "",
    SEOtags: "",
    directions: "",
    ingredients: "",
    precautions: "",
    price: "",
    tax_rate: "",
    stock_quantity: "",
    is_active: true,
    image_url: "",
    category_ids: [], // Changed from category_id to category_ids
  });
  const [showCreateModal, setShowCreateModal] = useState(false);

  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [newCategory, setNewCategory] = useState({ name: "", description: "" });

  // Backend JS
  // Fetch products and categories from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (!response.ok) {
          throw new Error(`Error fetching products: ${response.statusText}`);
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error(`Error fetching categories: ${response.statusText}`);
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  // Handle creating a new product
  const handleCreateProduct = async () => {
    try {
      const formData = new FormData();
      formData.append("imageFile", imageFile); // Append the image file
      formData.append("sku", newProduct.sku);
      formData.append("name", newProduct.name);
      formData.append("description", newProduct.description);
      formData.append("SEOtags", newProduct.SEOtags);
      formData.append("directions", newProduct.directions);
      formData.append("ingredients", newProduct.ingredients);
      formData.append("precautions", newProduct.precautions);
      formData.append("price", newProduct.price);
      formData.append("tax_rate", newProduct.tax_rate);
      formData.append("stock_quantity", newProduct.stock_quantity);
      formData.append("is_active", newProduct.is_active.toString());
      newProduct.category_ids.forEach((id) =>
        formData.append("category_ids[]", id)
      );

      const response = await fetch("/api/products", {
        method: "POST",
        body: formData, // Send FormData instead of JSON
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Error creating product: ${errorData.error}`);
      }

      const createdProduct = await response.json();
      setProducts([...products, createdProduct]);
      setShowCreateModal(false);
      setNewProduct({
        sku: "",
        name: "",
        description: "",
        SEOtags: "",
        directions: "",
        ingredients: "",
        precautions: "",
        price: "",
        tax_rate: "",
        stock_quantity: "",
        is_active: true,
        image_url: "",
        category_ids: [],
      });
      setImageFile(null); // Reset file input
    } catch (error) {
      console.error(error);
    }
  };

  // Handle updating a product
  const handleUpdateProduct = async () => {
    try {
      const formData = new FormData();
      if (editImageFile) {
        formData.append("imageFile", editImageFile); // Append image file only if updated
      }
      formData.append("sku", selectedProduct.sku.toString());
      formData.append("name", selectedProduct.name.toString());
      formData.append("description", selectedProduct.description.toString());
      formData.append("SEOtags", selectedProduct.SEOtags.toString());
      formData.append("directions", selectedProduct.directions.toString());
      formData.append("ingredients", selectedProduct.ingredients.toString());
      formData.append("precautions", selectedProduct.precautions.toString());
      formData.append("price", selectedProduct.price.toString());
      formData.append("tax_rate", selectedProduct.tax_rate.toString());
      formData.append(
        "stock_quantity",
        selectedProduct.stock_quantity.toString()
      );
      formData.append("is_active", selectedProduct.is_active.toString());
      selectedProduct.category_ids.forEach((id) =>
        formData.append("category_ids[]", id)
      ); // Append category ids

      const response = await fetch(
        `/api/products/${selectedProduct.product_id}`,
        {
          method: "PUT",
          body: formData, // Send FormData instead of JSON
        }
      );

      if (!response.ok) {
        throw new Error(`Error updating product: ${response.statusText}`);
      }

      const updatedProduct = await response.json();
      setProducts(
        products.map((p) =>
          p.product_id === updatedProduct.product_id ? updatedProduct : p
        )
      );
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle deleting a product
  const handleDeleteProduct = async () => {
    try {
      const response = await fetch(
        `/api/products/${selectedProduct.product_id}`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error(`Error deleting product: ${response.statusText}`);
      }
      setProducts(
        products.filter((p) => p.product_id !== selectedProduct.product_id)
      );
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  // Handle toggling product active status
  const handleToggleActiveProduct = async (product) => {
    try {
      const updatedProduct = { ...product, is_active: !product.is_active };
      const response = await fetch(`/api/products/${product.product_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ is_active: updatedProduct.is_active }),
      });
      if (!response.ok) {
        throw new Error(`Error updating product: ${response.statusText}`);
      }
      const data = await response.json();
      setProducts(
        products.map((p) => (p.product_id === data.product_id ? data : p))
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Handle creating a new category
  const handleCreateCategory = async () => {
    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
      if (!response.ok) {
        throw new Error(`Error creating category: ${response.statusText}`);
      }
      const createdCategory = await response.json();
      setCategories([...categories, createdCategory]);
      setNewCategory({ name: "", description: "" }); // Reset form fields
    } catch (error) {
      console.error(error);
    }
  };

  // Handle deleting a category
  // Handle deleting a category
  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(`/api/categories/${categoryId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Error deleting category: ${response.statusText}`);
      }
      setCategories(
        categories.filter((category) => category.category_id !== categoryId)
      );
    } catch (error) {
      console.error(error);
    }
  };

  // Frontend JS
  // Open edit modal
  const handleOpenModal = (product) => {
    setSelectedProduct({
      ...product,
      category_ids: product.category_ids || [],
    });
    setEditImagePreview(product.image_url);
    setShowModal(true);
  };

  // Close edit modal
  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  // Open category modal
  const handleOpenCategoryModal = () => {
    setShowCategoryModal(true);
  };

  // Close category modal
  const handleCloseCategoryModal = () => {
    setShowCategoryModal(false);
  };

  // Open create product modal
  const handleOpenCreateModal = () => {
    setShowCreateModal(true);
  };

  // Close create product modal
  const handleCloseCreateModal = () => {
    setShowCreateModal(false);
  };

  return (
    <div>
      <Container className="my-4">
        <h1>Manage products</h1>
        <div className="CMSHeaderControls">
          <div className="CMSHeaderControlContainer w-[450px]">
            <h5>Search</h5>
            <div className="CMSHeaderControlGroup">
              {/* Search bar for searching a product */}

              <Form className="d-flex">
                <Form.Group
                  controlId="searchProduct"
                  className="flex-grow-1 me-2"
                >
                  <Form.Control
                    type="text"
                    placeholder="Search for a product..."
                  />
                </Form.Group>
                <Button type="submit" variant="primary">
                  Search
                </Button>
              </Form>
            </div>
          </div>
          <div className="CMSHeaderControlContainer w-[265px]">
            {/* Button to create a new product */}
            <h5>Add an product</h5>
            <div className="CMSHeaderControlGroup">
              <Button
                variant="primary"
                onClick={handleOpenCreateModal}
                className=""
              >
                Create Product
              </Button>
            </div>
          </div>

          <div className="CMSHeaderControlContainer w-[350px]">
            {/* Button to manage categories */}
            <h5>Categories</h5>
            <div className="CMSHeaderControlGroup">
              <Button
                variant="primary"
                onClick={handleOpenCategoryModal}
                className=""
              >
                Manage Categories
              </Button>
            </div>
          </div>
        </div>
        <div className="ASNspliiter mt-3 mb-5"></div>

        {/* Product Cards */}
        <Row>
          {products.map((product) => (
            <Col
              xs={12}
              sm={12}
              md={6}
              lg={3}
              className="mb-4"
              key={product.product_id}
            >
              <Card>
                <Card.Img
                  variant="top"
                  src={product.image_url || "/default-image.png"}
                  alt={product.name}
                  style={{ height: "200px", objectFit: "contain" }}
                />
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text className="mb-0">
                    <strong>SKU: </strong> {product.sku}
                  </Card.Text>
                  <Card.Text className="mb-0">
                    <strong>Price: </strong> R{product.price}
                  </Card.Text>
                  <Card.Text className="mb-0">
                    <strong>Categories: </strong>
                    {product.categories && product.categories.length > 0
                      ? product.categories
                          .map((category) => category.name)
                          .join(", ")
                      : "None"}
                  </Card.Text>

                  <Card.Text className="mb-3">
                    <strong>Status: </strong>
                    {product.is_active ? "Active" : "Inactive"}
                  </Card.Text>
                  {/* Button to open the modal */}
                  <Button
                    variant="dark"
                    className="d-block w-100 mb-2"
                    onClick={() => handleOpenModal(product)}
                  >
                    View/Edit
                  </Button>
                  <Button
                    variant="danger"
                    className="d-block w-100"
                    size="sm"
                    onClick={() => handleToggleActiveProduct(product)}
                  >
                    {product.is_active ? "Deactivate" : "Activate"}
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>

      {/* Modal for editing/viewing product details */}
      {selectedProduct && (
        <Modal show={showModal} onHide={handleCloseModal} size="lg">
          <Modal.Header closeButton className="sticky-modal-header">
            <Modal.Title>{`${selectedProduct.sku} - ${selectedProduct.name}`}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Row>
                {/* Left column for image */}
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Form.Group controlId="editProductImage" className="mb-3">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control
                      type="file"
                      onChange={(e) => {
                        const file = e.target.files[0];
                        setEditImageFile(file);
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setEditImagePreview(reader.result);
                          };
                          reader.readAsDataURL(file);
                        } else {
                          setEditImagePreview(selectedProduct.image_url);
                        }
                      }}
                    />
                    {editImagePreview && (
                      <div className="mt-3">
                        <Image
                          src={editImagePreview}
                          alt="Selected Image Preview"
                          width={300} // Set the width
                          height={300} // Set the height
                          style={{ objectFit: "contain" }}
                        />
                      </div>
                    )}
                  </Form.Group>

                  {/* Checkbox for is_active */}
                  <Form.Group controlId="productIsActive" className="mb-3">
                    <Form.Check
                      type="checkbox"
                      label="Active"
                      checked={selectedProduct.is_active}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          is_active: e.target.checked,
                        })
                      }
                    />
                  </Form.Group>
                </Col>

                {/* Right column for text fields */}
                <Col xs={12} sm={12} md={6} lg={6}>
                  <Form.Group controlId="productSKU" className="mb-3">
                    <Form.Label>SKU</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedProduct.sku}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          sku: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="productName" className="mb-3">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedProduct.name}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          name: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="productDescription" className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      value={selectedProduct.description}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          description: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="productSEOtags" className="mb-3">
                    <Form.Label>SEO Tags</Form.Label>
                    <Form.Control
                      type="text"
                      value={selectedProduct.SEOtags}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          SEOtags: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="productDirections" className="mb-3">
                    <Form.Label>Directions</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={selectedProduct.directions}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          directions: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="productIngredients" className="mb-3">
                    <Form.Label>Ingredients</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={selectedProduct.ingredients}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          ingredients: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="productPrecautions" className="mb-3">
                    <Form.Label>Precautions</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={2}
                      value={selectedProduct.precautions}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          precautions: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="productPrice" className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      value={selectedProduct.price}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          price: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="productTaxRate" className="mb-3">
                    <Form.Label>Tax Rate</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      value={selectedProduct.tax_rate}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          tax_rate: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="productStockQuantity" className="mb-3">
                    <Form.Label>Stock Quantity</Form.Label>
                    <Form.Control
                      type="number"
                      value={selectedProduct.stock_quantity}
                      onChange={(e) =>
                        setSelectedProduct({
                          ...selectedProduct,
                          stock_quantity: e.target.value,
                        })
                      }
                    />
                  </Form.Group>

                  <Form.Group controlId="productCategories" className="mb-3">
                    <Form.Label>Categories</Form.Label>
                    <Form.Control
                      as="select"
                      multiple
                      value={selectedProduct.category_ids}
                      onChange={(e) => {
                        const options = e.target.options;
                        const selectedCategories = [];
                        for (let i = 0; i < options.length; i++) {
                          if (options[i].selected) {
                            selectedCategories.push(options[i].value);
                          }
                        }
                        setSelectedProduct({
                          ...selectedProduct,
                          category_ids: selectedCategories,
                        });
                      }}
                    >
                      {categories.map((category) => (
                        <option
                          key={category.category_id}
                          value={category.category_id}
                        >
                          {category.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>

                  {/* Save Changes Button */}
                  <Button
                    variant="primary"
                    className="mt-3 me-2"
                    onClick={handleUpdateProduct}
                  >
                    Save Changes
                  </Button>
                  {/* Delete Product Button */}
                  <Button
                    variant="danger"
                    className="mt-3"
                    onClick={handleDeleteProduct}
                  >
                    Delete Product
                  </Button>
                </Col>
              </Row>
            </Form>
          </Modal.Body>
        </Modal>
      )}

      {/* Modal for creating a new product */}
      <Modal show={showCreateModal} onHide={handleCloseCreateModal} size="lg">
        <Modal.Header closeButton className="sticky-modal-header">
          <Modal.Title>Create New Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              {/* Left column for image */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Group controlId="newProductImage" className="mb-3">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      const file = e.target.files[0];
                      setImageFile(file);
                      if (file) {
                        const reader = new FileReader();
                        reader.onloadend = () => {
                          setImagePreview(reader.result);
                        };
                        reader.readAsDataURL(file);
                      } else {
                        setImagePreview(null);
                      }
                    }}
                  />
                  {imagePreview && (
                    <div className="mt-3">
                      <Image
                        src={imagePreview}
                        alt="Selected Image Preview"
                        width={300} // Set the width
                        height={300} // Set the height
                        style={{ objectFit: "contain" }}
                      />
                    </div>
                  )}
                </Form.Group>

                {/* Checkbox for is_active */}
                <Form.Group controlId="newProductIsActive" className="mb-3">
                  <Form.Check
                    type="checkbox"
                    label="Active"
                    checked={newProduct.is_active}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        is_active: e.target.checked,
                      })
                    }
                  />
                </Form.Group>
              </Col>

              {/* Right column for text fields */}
              <Col xs={12} sm={12} md={6} lg={6}>
                <Form.Group controlId="newProductSKU" className="mb-3">
                  <Form.Label>SKU</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProduct.sku}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, sku: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="newProductName" className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProduct.name}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, name: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="newProductDescription" className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    value={newProduct.description}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="newProductSEOtags" className="mb-3">
                  <Form.Label>SEO Tags</Form.Label>
                  <Form.Control
                    type="text"
                    value={newProduct.SEOtags}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, SEOtags: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="newProductDirections" className="mb-3">
                  <Form.Label>Directions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={newProduct.directions}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        directions: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="newProductIngredients" className="mb-3">
                  <Form.Label>Ingredients</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={newProduct.ingredients}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        ingredients: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="newProductPrecautions" className="mb-3">
                  <Form.Label>Precautions</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={2}
                    value={newProduct.precautions}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        precautions: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="newProductPrice" className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={newProduct.price}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, price: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="newProductTaxRate" className="mb-3">
                  <Form.Label>Tax Rate</Form.Label>
                  <Form.Control
                    type="number"
                    step="0.01"
                    value={newProduct.tax_rate}
                    onChange={(e) =>
                      setNewProduct({ ...newProduct, tax_rate: e.target.value })
                    }
                  />
                </Form.Group>

                <Form.Group
                  controlId="newProductStockQuantity"
                  className="mb-3"
                >
                  <Form.Label>Stock Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={newProduct.stock_quantity}
                    onChange={(e) =>
                      setNewProduct({
                        ...newProduct,
                        stock_quantity: e.target.value,
                      })
                    }
                  />
                </Form.Group>

                <Form.Group controlId="newProductCategories" className="mb-3">
                  <Form.Label>Categories</Form.Label>
                  <Form.Control
                    as="select"
                    multiple
                    value={newProduct.category_ids}
                    onChange={(e) => {
                      const options = e.target.options;
                      const selectedCategories = [];
                      for (let i = 0; i < options.length; i++) {
                        if (options[i].selected) {
                          selectedCategories.push(options[i].value);
                        }
                      }
                      setNewProduct({
                        ...newProduct,
                        category_ids: selectedCategories,
                      });
                    }}
                  >
                    {categories.map((category) => (
                      <option
                        key={category.category_id}
                        value={category.category_id}
                      >
                        {category.name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                {/* Create Product Button */}
                <Button
                  variant="primary"
                  className="mt-3"
                  onClick={handleCreateProduct}
                >
                  Create Product
                </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Category Management Modal */}
      <Modal show={showCategoryModal} onHide={handleCloseCategoryModal}>
        <Modal.Header closeButton>
          <Modal.Title>Manage Categories</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5>Create a new category</h5>
          <Form>
            <Form.Group className="mb-3" controlId="newCategoryName">
              <Form.Label>Category Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter category name"
                value={newCategory.name}
                onChange={(e) =>
                  setNewCategory({ ...newCategory, name: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="newCategoryDescription">
              <Form.Label>Category Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter category description"
                value={newCategory.description}
                onChange={(e) =>
                  setNewCategory({
                    ...newCategory,
                    description: e.target.value,
                  })
                }
              />
            </Form.Group>
            <Button variant="primary" onClick={handleCreateCategory}>
              Create Category
            </Button>
          </Form>

          <h5 className="mt-4">Existing Categories</h5>
          <ul>
            {categories.map((category) => (
              <li key={category.category_id}>
                {category.name} - {category.description}
                <Button
                  variant="danger"
                  size="sm"
                  className="ms-2"
                  onClick={() => handleDeleteCategory(category.category_id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        </Modal.Body>
      </Modal>
    </div>
  );
}
