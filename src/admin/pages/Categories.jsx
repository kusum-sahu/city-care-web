import React, { useState, useMemo } from "react";
import {
  Plus,
  MoreHorizontal,
  Edit2,
  Power,
  Trash2,
  Search,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Categories = () => {
  // Mock Data
  const initialCategories = [
    {
      id: 1,
      title: "House Cleaning",
      group: "Home Services",
      services: 8,
      status: "Active",
      image: "https://images.unsplash.com/photo-1581578731117-104f8a33837d?w=500",
    },
    {
      id: 2,
      title: "Appliance Repair",
      group: "Appliance Repair",
      services: 4,
      status: "Inactive",
      image: "https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=500",
    },
    {
      id: 3,
      title: "Beauty & Spa",
      group: "Beauty",
      services: 4,
      status: "Inactive",
      image: "https://images.unsplash.com/photo-1600334089648-b0d9d3028eb2?w=500",
    },
    {
      id: 4,
      title: "Electronics Repair",
      group: "Electronics",
      services: 4,
      status: "Active",
      image: "https://images.unsplash.com/photo-1621905252507-b35a83013669?w=500",
    },
    {
      id: 5,
      title: "Packers & Movers",
      group: "Moving Services",
      services: 2,
      status: "Active",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500",
    },
    {
      id: 6,
      title: "Car Repair",
      group: "Automotive",
      services: 2,
      status: "Inactive",
      image: "https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?w=500",
    },
  ];

  const [categories, setCategories] = useState(initialCategories);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);

  // Filter states
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Form states
  const [formData, setFormData] = useState({
    title: "",
    group: "",
    services: 0,
    status: "Active",
    image: "",
  });

  // Get unique statuses
  const statuses = ["All Status", "Active", "Inactive"];

  // Filtered categories
  const filteredCategories = useMemo(() => {
    return categories.filter(category => {
      const matchesStatus = selectedStatus === "All Status" || category.status === selectedStatus;
      const matchesSearch = searchQuery === "" ||
        category.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.group.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesStatus && matchesSearch;
    });
  }, [categories, selectedStatus, searchQuery]);

  // Paginated categories
  const paginatedCategories = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredCategories.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredCategories, currentPage]);

  const totalPages = Math.ceil(filteredCategories.length / itemsPerPage);

  // Handle add category
  const handleAddCategory = () => {
    const newCategory = {
      id: categories.length + 1,
      ...formData,
    };
    setCategories([...categories, newCategory]);
    setShowAddModal(false);
    setFormData({ title: "", group: "", services: 0, status: "Active", image: "" });
    toast.success("Category added successfully!");
  };

  // Handle edit category
  const handleEditCategory = () => {
    setCategories(categories.map(category =>
      category.id === editingCategory.id ? { ...category, ...formData } : category
    ));
    setShowEditModal(false);
    setEditingCategory(null);
    setFormData({ title: "", group: "", services: 0, status: "Active", image: "" });
    toast.success("Category updated successfully!");
  };

  // Handle delete category
  const handleDeleteCategory = () => {
    setCategories(categories.filter(category => category.id !== deletingCategory.id));
    setShowDeleteModal(false);
    setDeletingCategory(null);
    toast.success("Category deleted successfully!");
  };

  // Handle toggle status
  const handleToggleStatus = (id) => {
    setCategories(categories.map(category =>
      category.id === id
        ? { ...category, status: category.status === "Active" ? "Inactive" : "Active" }
        : category
    ));
    toast.success("Category status updated!");
  };

  // Open edit modal
  const openEditModal = (category) => {
    setEditingCategory(category);
    setFormData({
      title: category.title,
      group: category.group,
      services: category.services,
      status: category.status,
      image: category.image,
    });
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (category) => {
    setDeletingCategory(category);
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
                placeholder="Category Title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <input
                type="text"
                placeholder="Group"
                value={formData.group}
                onChange={(e) => setFormData({ ...formData, group: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <input
                type="number"
                placeholder="Number of Services"
                value={formData.services}
                onChange={(e) => setFormData({ ...formData, services: parseInt(e.target.value) || 0 })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <input
                type="text"
                placeholder="Image URL"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
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
  const DeleteModal = ({ isOpen, onClose, onConfirm, category }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-sm">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Category</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete "{category?.title}"?</p>
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
    <div className="p-6">
      <Toaster position="top-right" />

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Categories</h1>
          <p className="text-gray-600">Manage service categories</p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-[#145A41] text-white px-4 py-2 rounded-lg hover:bg-[#0E3F2E] transition-colors"
        >
          <Plus size={20} />
          Add Category
        </button>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
          />
        </div>
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          {statuses.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </select>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        {paginatedCategories.length > 0 ? (
          paginatedCategories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-3 right-3">
                  <div className="relative">
                    <button
                      onClick={() => setActiveMenu(activeMenu === category.id ? null : category.id)}
                      className="bg-white p-2 rounded-full shadow-sm hover:bg-gray-50"
                    >
                      <MoreHorizontal size={16} />
                    </button>
                    {activeMenu === category.id && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-100 z-10">
                        <button
                          onClick={() => {
                            openEditModal(category);
                            setActiveMenu(null);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-green-50 text-gray-700"
                        >
                          <Edit2 size={16} />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            handleToggleStatus(category.id);
                            setActiveMenu(null);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-green-50 text-gray-700"
                        >
                          <Power size={16} />
                          {category.status === "Active" ? "Disable" : "Enable"}
                        </button>
                        <button
                          onClick={() => {
                            openDeleteModal(category);
                            setActiveMenu(null);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-left hover:bg-red-50 text-red-600"
                        >
                          <Trash2 size={16} />
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-gray-800">{category.title}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    category.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-red-100 text-red-800"
                  }`}>
                    {category.status}
                  </span>
                </div>
                <p className="text-gray-600 text-sm mb-3">{category.group}</p>
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {category.services} Services
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 mb-4">
              <Search size={48} />
            </div>
            <h3 className="text-lg font-medium text-gray-600 mb-2">No results found</h3>
            <p className="text-gray-500 text-center">
              Try adjusting your search criteria or filters to find what you're looking for.
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              onClick={() => setCurrentPage(page)}
              className={`px-3 py-1 border rounded-lg ${
                currentPage === page
                  ? "bg-[#145A41] text-white border-[#145A41]"
                  : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              {page}
            </button>
          ))}
          <button
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      )}

      {/* Add Modal */}
      <Modal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        title="Add New Category"
        onSubmit={handleAddCategory}
        submitText="Add Category"
      />

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Category"
        onSubmit={handleEditCategory}
        submitText="Update Category"
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteCategory}
        category={deletingCategory}
      />
    </div>
  );
};

export default Categories;
