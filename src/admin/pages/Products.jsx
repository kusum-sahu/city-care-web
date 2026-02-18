import React, { useState, useMemo } from "react";
import {
  Plus,
  Calendar,
  Search,
  Eye,
  Edit2,
  Trash2,
  ChevronDown,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Products = () => {
  // Mock Data
  const initialProducts = [
    {
      id: 1,
      category: 'Electrician',
      categoryIcon: '⚡',
      product: 'LED Bulb',
      vendor: 'Ashok Electricals',
      price: '249',
      status: 'Active'
    },
    {
      id: 2,
      category: 'Grocery',
      categoryIcon: '🛒',
      product: 'Rice Bag',
      vendor: 'Ganesh Provision',
      price: '1,099',
      status: 'Active'
    },
    {
      id: 3,
      category: 'Driver',
      categoryIcon: '🚗',
      product: 'Engine Oil',
      vendor: 'Gupta Auto Parts',
      price: '499',
      status: 'Inactive'
    },
    {
      id: 4,
      category: 'Electrician',
      categoryIcon: '⚡',
      product: 'Screwdriver Set',
      vendor: 'Ashok Electricals',
      price: '350',
      status: 'Active'
    },
    {
      id: 5,
      category: 'Grocery',
      categoryIcon: '🛒',
      product: 'Moong Dal',
      vendor: 'Ganesh Provision',
      price: '200',
      status: 'Active'
    },
    {
      id: 6,
      category: 'Beauty Spa',
      categoryIcon: '💆‍♀️',
      product: 'Home Massage',
      vendor: 'Radha Beauty Spa',
      price: '200',
      status: 'Active'
    },
  ];

  const [products, setProducts] = useState(initialProducts);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [deletingProduct, setDeletingProduct] = useState(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Sorting states
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Form states
  const [formData, setFormData] = useState({
    category: "",
    product: "",
    vendor: "",
    price: "",
    status: "Active",
  });

  // Get unique categories and statuses
  const categories = useMemo(() => ["All Categories", ...new Set(products.map(product => product.category))], [products]);
  const statuses = ["All Status", "Active", "Inactive"];

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesCategory = selectedCategory === "All Categories" || product.category === selectedCategory;
      const matchesStatus = selectedStatus === "All Status" || product.status === selectedStatus;
      const matchesSearch = searchQuery === "" ||
        product.product.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.vendor.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesSearch;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aValue = a[sortField];
        let bValue = b[sortField];

        if (sortField === 'price') {
          aValue = parseFloat(aValue.replace(/,/g, ''));
          bValue = parseFloat(bValue.replace(/,/g, ''));
        }

        if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return filtered;
  }, [products, selectedCategory, selectedStatus, searchQuery, sortField, sortDirection]);

  // Paginated products
  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredProducts.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredProducts, currentPage]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  // Handle add product
  const handleAddProduct = () => {
    const newProduct = {
      id: products.length + 1,
      categoryIcon: '🔧', // Default icon
      ...formData,
    };
    setProducts([...products, newProduct]);
    setShowAddModal(false);
    setFormData({ category: "", product: "", vendor: "", price: "", status: "Active" });
    toast.success("Product added successfully!");
  };

  // Handle edit product
  const handleEditProduct = () => {
    setProducts(products.map(product =>
      product.id === editingProduct.id ? { ...product, ...formData } : product
    ));
    setShowEditModal(false);
    setEditingProduct(null);
    setFormData({ category: "", product: "", vendor: "", price: "", status: "Active" });
    toast.success("Product updated successfully!");
  };

  // Handle delete product
  const handleDeleteProduct = () => {
    setProducts(products.filter(product => product.id !== deletingProduct.id));
    setShowDeleteModal(false);
    setDeletingProduct(null);
    toast.success("Product deleted successfully!");
  };

  // Handle status change from dropdown
  const handleStatusChange = (id, newStatus) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, status: newStatus } : product
    ));
    toast.success("Product status updated!");
  };

  // Handle sort
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Open edit modal
  const openEditModal = (product) => {
    setEditingProduct(product);
    setFormData({
      category: product.category,
      product: product.product,
      vendor: product.vendor,
      price: product.price,
      status: product.status,
    });
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (product) => {
    setDeletingProduct(product);
    setShowDeleteModal(true);
  };

  // Modal Component
  const Modal = ({ isOpen, onClose, title, onSubmit, submitText }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-md">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-800">{title}</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X size={24} />
            </button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); onSubmit(); }}>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Category"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <input
                type="text"
                placeholder="Product Name"
                value={formData.product}
                onChange={(e) => setFormData({ ...formData, product: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <input
                type="text"
                placeholder="Vendor Name"
                value={formData.vendor}
                onChange={(e) => setFormData({ ...formData, vendor: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <input
                type="text"
                placeholder="Price"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
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

  // Delete Confirmation Modal
  const DeleteModal = ({ isOpen, onClose, onConfirm, product }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-sm">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Product</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete "{product?.product}"?</p>
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
      <Toaster position="top-right" />

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/admin" className="hover:text-green-700 flex items-center gap-1">
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <span>{">"}</span>
        <span className="text-gray-800 font-medium">Products</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Products</h1>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-[#145A41] text-white px-4 py-2 rounded-lg hover:bg-[#0E3F2E] transition shadow-sm">
          <Plus size={18} />
          Add Product
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-wrap items-center gap-4">
        {/* Category Filter */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-600 min-w-[160px] focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          {categories.map(category => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-600 min-w-[140px] focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          {statuses.map(status => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            placeholder="Search by Product Name or Vendor"
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
        {/* Table */}
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
                  Vendor
                </th>
                <th onClick={() => handleSort('price')} className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer group">
                  <div className="flex items-center gap-1">
                    Price
                    <ArrowUpDown size={12} className="text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th onClick={() => handleSort('status')} className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider cursor-pointer group">
                  <div className="flex items-center gap-1">
                    Status
                    <ArrowUpDown size={12} className="text-gray-400 group-hover:text-gray-600" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {paginatedProducts.length > 0 ? (
                paginatedProducts.map((product, index) => (
                  <tr key={index} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                      #{product.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{product.categoryIcon}</span>
                        <span className="text-sm font-medium text-gray-800">
                          {product.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.product}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {product.vendor}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      ₹{product.price}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={product.status}
                        onChange={(e) => handleStatusChange(product.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer ${
                          product.status === 'Active'
                            ? 'bg-green-100 text-green-700 border-green-200'
                            : 'bg-red-100 text-red-700 border-red-200'
                        }`}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </select>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => openEditModal(product)}
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
                  <td colSpan="7" className="px-6 py-8 text-center text-gray-500">
                    No results found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-gray-100 px-6 py-4 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredProducts.length)} of {filteredProducts.length} Products
          </p>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} /> Previous
            </button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 flex items-center justify-center rounded-lg text-sm font-medium transition ${
                  currentPage === page
                    ? 'bg-[#145A41] text-white'
                    : 'border border-gray-200 text-gray-600 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg border border-gray-200 text-sm text-gray-600 hover:bg-gray-50 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Product"
        onSubmit={handleAddProduct}
        submitText="Add Product"
      />

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Product"
        onSubmit={handleEditProduct}
        submitText="Update Product"
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteProduct}
        product={deletingProduct}
      />
    </div>
  );
};

export default Products;