import React, { useState, useMemo } from "react";
import {
  Plus,
  Search,
  Eye,
  Edit2,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
  Package,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";

export default function Products() {
  // Mock Data - Vendor's own products
  const initialProducts = [
    {
      id: 1,
      category: "Electrical",
      product: "LED Bulb 9W",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=80",
      price: "₹250",
      stock: 42,
      status: "Active",
    },
    {
      id: 2,
      category: "Electrical",
      product: "Extension Cord 5m",
      image: "https://images.unsplash.com/photo-1581092160560-1c1e428e9d65?w=80",
      price: "₹320",
      stock: 18,
      status: "Active",
    },
    {
      id: 3,
      category: "Plumbing",
      product: "PVC Pipe 1 inch (3m)",
      image: null,
      price: "₹180",
      stock: 65,
      status: "Active",
    },
    {
      id: 4,
      category: "Electrical",
      product: "Ceiling Fan 1200mm",
      image: "https://images.unsplash.com/photo-1581092160560-1c1e428e9d65?w=80",
      price: "₹1,850",
      stock: 7,
      status: "Low Stock",
    },
    {
      id: 5,
      category: "Cleaning",
      product: "Floor Cleaner 1L",
      image: null,
      price: "₹220",
      stock: 0,
      status: "Out of Stock",
    },
    {
      id: 6,
      category: "Plumbing",
      product: "Tap Mixer",
      image: null,
      price: "₹950",
      stock: 12,
      status: "Active",
    },
    {
      id: 7,
      category: "Electrical",
      product: "Switch Board 6 way",
      image: null,
      price: "₹480",
      stock: 31,
      status: "Active",
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);   // ← NEW
  const [viewingProduct, setViewingProduct] = useState(null);  // ← NEW

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sorting
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState("asc");

  // Form state
  const [formData, setFormData] = useState({
    category: "",
    product: "",
    price: "",
    stock: "",
    status: "Active",
  });

  // Open View Modal (NEW function)
  const openViewModal = (product) => {
    setViewingProduct(product);
    setShowViewModal(true);
  };

  // Derived filter options
  const categories = useMemo(
    () => ["All Categories", ...new Set(products.map((p) => p.category))],
    [products]
  );
  const statuses = ["All Status", "Active", "Low Stock", "Out of Stock"];

  // Filtered + Sorted + Searched products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter((product) => {
      const matchesCategory =
        selectedCategory === "All Categories" ||
        product.category === selectedCategory;
      const matchesStatus =
        selectedStatus === "All Status" || product.status === selectedStatus;
      const matchesSearch =
        searchQuery === "" ||
        product.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];

        if (sortField === "price") {
          aVal = parseFloat(aVal.replace(/[^0-9]/g, ""));
          bVal = parseFloat(bVal.replace(/[^0-9]/g, ""));
        }
        if (sortField === "stock") {
          aVal = Number(aVal);
          bVal = Number(bVal);
        }

        if (sortDirection === "asc") {
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        } else {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
      });
    }

    return filtered;
  }, [
    products,
    selectedCategory,
    selectedStatus,
    searchQuery,
    sortField,
    sortDirection,
  ]);

  const paginatedProducts = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(start, start + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handlers
  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      ...formData,
      image: null, // can be extended later
    };
    setProducts([...products, newProduct]);
    setShowAddModal(false);
    setFormData({
      category: "",
      product: "",
      price: "",
      stock: "",
      status: "Active",
    });
    toast.success("Product added successfully!");
  };

  const handleEditProduct = () => {
    setProducts(
      products.map((p) =>
        p.id === editingProduct.id ? { ...p, ...formData } : p
      )
    );
    setShowEditModal(false);
    setEditingProduct(null);
    setFormData({
      category: "",
      product: "",
      price: "",
      stock: "",
      status: "Active",
    });
    toast.success("Product updated successfully!");
  };

  const handleDeleteProduct = () => {
    setProducts(products.filter((p) => p.id !== deletingProduct.id));
    setShowDeleteModal(false);
    setDeletingProduct(null);
    toast.success("Product deleted successfully!");
  };

  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      category: product.category,
      product: product.product,
      price: product.price,
      stock: product.stock.toString(),
      status: product.status,
    });
    setShowEditModal(true);
  };

  const openDeleteModal = (product) => {
    setDeletingProduct(product);
    setShowDeleteModal(true);
  };

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  // Modal Component (same as admin)
  const Modal = ({ isOpen, onClose, title, onSubmit, submitText }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              <X size={24} />
            </button>
          </div>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              onSubmit();
            }}
          >
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <input
                type="text"
                placeholder="Product Name"
                value={formData.product}
                onChange={(e) =>
                  setFormData({ ...formData, product: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <input
                type="text"
                placeholder="Price (e.g. ₹450)"
                value={formData.price}
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <input
                type="number"
                placeholder="Stock Quantity"
                value={formData.stock}
                onChange={(e) =>
                  setFormData({ ...formData, stock: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
                min="0"
              />
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="Active">Active</option>
                <option value="Low Stock">Low Stock</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 px-4 py-2 bg-[#145A41] text-white rounded-lg hover:bg-[#0E3F2E]"
              >
                {submitText}
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };

  // 👇 YAHAN PASTE KARO (DeleteModal se pehle)

const ViewModal = ({ isOpen, onClose, product }) => {
  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">View Product</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X size={24} />
          </button>
        </div>

        <div className="space-y-5">
          <div className="flex justify-center">
            {product.image ? (
              <img
                src={product.image}
                alt={product.product}
                className="w-32 h-32 object-cover rounded-lg border border-gray-200"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-100 rounded-lg flex items-center justify-center">
                <Package size={48} className="text-gray-400" />
              </div>
            )}
          </div>

          <div>
            <label className="text-sm text-gray-600">Category</label>
            <p className="font-medium">{product.category}</p>
          </div>

          <div>
            <label className="text-sm text-gray-600">Product Name</label>
            <p className="font-medium">{product.product}</p>
          </div>

          <div>
            <label className="text-sm text-gray-600">Price</label>
            <p className="font-medium">{product.price}</p>
          </div>

          <div>
            <label className="text-sm text-gray-600">Stock</label>
            <p
              className={`font-medium ${
                product.stock === 0
                  ? "text-red-600"
                  : product.stock <= 10
                  ? "text-orange-600"
                  : "text-gray-900"
              }`}
            >
              {product.stock}
            </p>
          </div>

          <div>
            <label className="text-sm text-gray-600">Status</label>
            <span
              className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
                product.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : product.status === "Low Stock"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {product.status}
            </span>
          </div>
        </div>

        <div className="mt-8 text-right">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};


  const DeleteModal = ({ isOpen, onClose, onConfirm, product }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-sm">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">
              Delete Product
            </h2>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete "{product?.product}"?
            </p>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="flex-1 px-4 py-2 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={onConfirm}
                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">My Products</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#145A41] text-white px-4 py-2 rounded-lg hover:bg-[#0E3F2E] transition shadow-sm"
        >
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-600 min-w-[160px] focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          {categories.map((cat) => (
            <option key={cat} value={cat}>
              {cat}
            </option>
          ))}
        </select>

        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-600 min-w-[140px] focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>

        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            placeholder="Search by Product Name"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full border border-gray-200 rounded-lg pl-3 pr-10 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-green-500 bg-gray-50"
          />
          <Search
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
          />
        </div>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  ID
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th
                  onClick={() => handleSort("stock")}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer group"
                >
                  <div className="flex items-center gap-1">
                    Stock
                    <ArrowUpDown
                      size={12}
                      className="text-gray-400 group-hover:text-gray-600"
                    />
                  </div>
                </th>
                <th
                  onClick={() => handleSort("status")}
                  className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer group"
                >
                  <div className="flex items-center gap-1">
                    Status
                    <ArrowUpDown
                      size={12}
                      className="text-gray-400 group-hover:text-gray-600"
                    />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product) => (
                  <tr
                    key={product.id}
                    className="hover:bg-gray-50/50 transition"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                      #{product.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {product.category}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.product}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {product.price}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      <span
                        className={
                          product.stock === 0
                            ? "text-red-600"
                            : product.stock <= 10
                            ? "text-orange-600"
                            : "text-gray-800"
                        }
                      >
                        {product.stock}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={product.status}
                        onChange={(e) => {
                          setProducts(
                            products.map((p) =>
                              p.id === product.id
                                ? { ...p, status: e.target.value }
                                : p
                            )
                          );
                          toast.success("Status updated!");
                        }}
                        className={`px-3 py-1 rounded-full text-xs font-medium border focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer min-w-[110px] ${
                          product.status === "Active"
                            ? "bg-green-100 text-green-700 border-green-200"
                            : product.status === "Low Stock"
                            ? "bg-orange-100 text-orange-700 border-orange-200"
                            : "bg-red-100 text-red-700 border-red-200"
                        }`}
                      >
                        <option value="Active">Active</option>
                        <option value="Low Stock">Low Stock</option>
                        <option value="Out of Stock">Out of Stock</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
            onClick={() => openViewModal(product)}
            className="p-1.5 text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-md transition-colors"
            title="View"
          >
            <Eye size={16} />
          </button>
                        <button
                          onClick={() => openEditModal(product)}
                          className="p-1.5 text-green-600 hover:bg-green-50 border border-green-200 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(product)}
                          className="p-1.5 text-red-600 hover:bg-red-50 border border-red-200 rounded-md transition-colors"
                          title="Delete"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="7"
                    className="px-6 py-12 text-center text-gray-500"
                  >
                    No products found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination - same style as admin */}
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing{" "}
            {filteredProducts.length === 0
              ? "0"
              : (currentPage - 1) * itemsPerPage + 1}{" "}
            to{" "}
            {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of{" "}
            {filteredProducts.length} Products
          </p>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} /> Previous
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-[#145A41] text-white"
                    : "border border-gray-200 text-gray-600 hover:bg-gray-50"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Modals */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Product"
        onSubmit={handleAddProduct}
        submitText="Add Product"
      />

      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Product"
        onSubmit={handleEditProduct}
        submitText="Update Product"
      />

      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteProduct}
        product={deletingProduct}
      />

      <ViewModal
        isOpen={showViewModal}
        onClose={() => setShowViewModal(false)}
        product={viewingProduct}
      />
    </div>
  );
}