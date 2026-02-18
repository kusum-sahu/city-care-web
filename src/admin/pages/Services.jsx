import React, { useState, useMemo } from "react";
import {
  Plus,
  Calendar,
  Search,
  Eye,
  Edit2,
  Trash2,
  Power,
  ChevronDown,
  ArrowLeft,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  X,
} from "lucide-react";
import { Link } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

export default function Services () {
  // Mock Data
  const initialServices = [
    {
      id: 1,
      category: 'Electrician',
      categoryIcon: '⚡',
      service: 'Fan Installation',
      provider: 'Ashok Electricals',
      location: 'Bhubaneswar',
      price: '299',
      status: 'Active'
    },
    {
      id: 2,
      category: 'Priest',
      categoryIcon: '🙏',
      service: 'Home Puja Ceremony',
      provider: 'Pandit Sharma',
      location: 'Cuttack',
      price: '1,500',
      status: 'Active'
    },
    {
      id: 3,
      category: 'Driver',
      categoryIcon: '🚗',
      service: 'Taxi Service',
      provider: 'CityCab Agency',
      location: 'Bhubaneswar',
      price: '100/hour',
      status: 'Active'
    },
    {
      id: 4,
      category: 'AC Repair',
      categoryIcon: '❄️',
      service: 'AC Repairing',
      provider: 'Sharma Cooling Services',
      location: 'Cuttack',
      price: '499',
      status: 'Active'
    },
    {
      id: 5,
      category: 'Beauty Spa',
      categoryIcon: '💆‍♀️',
      service: 'Home Massage',
      provider: 'Radha Beauty Spa',
      location: 'Puri',
      price: '999',
      status: 'Inactive'
    },
    {
      id: 6,
      category: 'Plumber',
      categoryIcon: '🔧',
      service: 'Pipe Repair',
      provider: 'QuickFix Plumbing',
      location: 'Bhubaneswar',
      price: '350',
      status: 'Active'
    },
    {
      id: 7,
      category: 'Carpenter',
      categoryIcon: '🔨',
      service: 'Furniture Assembly',
      provider: 'WoodMaster Carpentry',
      location: 'Cuttack',
      price: '800',
      status: 'Inactive'
    },
    {
      id: 8,
      category: 'House Cleaning',
      categoryIcon: '🧹',
      service: 'Deep Cleaning',
      provider: 'SparkleClean Services',
      location: 'Puri',
      price: '1,200',
      status: 'Active'
    },
  ];

  const [services, setServices] = useState(initialServices);
  const [activeMenu, setActiveMenu] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [deletingService, setDeletingService] = useState(null);

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [selectedStatus, setSelectedStatus] = useState("All Status");
  const [selectedLocation, setSelectedLocation] = useState("All Locations");
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
    service: "",
    provider: "",
    location: "",
    price: "",
    status: "Active",
  });

  // Get unique categories, statuses, and locations
  const categories = useMemo(() => ["All Categories", ...new Set(services.map(service => service.category))], [services]);
  const statuses = ["All Status", "Active", "Inactive"];
  const locations = useMemo(() => ["All Locations", ...new Set(services.map(service => service.location))], [services]);

  // Filtered and sorted services
  const filteredServices = useMemo(() => {
    let filtered = services.filter(service => {
      const matchesCategory = selectedCategory === "All Categories" || service.category === selectedCategory;
      const matchesStatus = selectedStatus === "All Status" || service.status === selectedStatus;
      const matchesLocation = selectedLocation === "All Locations" || service.location === selectedLocation;
      const matchesSearch = searchQuery === "" ||
        service.service.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
        service.category.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesStatus && matchesLocation && matchesSearch;
    });

    if (sortField) {
      filtered.sort((a, b) => {
        let aVal = a[sortField];
        let bVal = b[sortField];
        if (sortField === 'price') {
          aVal = parseFloat(aVal.replace(/,/g, '').replace(/\/hour/g, ''));
          bVal = parseFloat(bVal.replace(/,/g, '').replace(/\/hour/g, ''));
        }
        if (sortDirection === 'asc') {
          return aVal > bVal ? 1 : aVal < bVal ? -1 : 0;
        } else {
          return aVal < bVal ? 1 : aVal > bVal ? -1 : 0;
        }
      });
    }

    return filtered;
  }, [services, selectedCategory, selectedStatus, selectedLocation, searchQuery, sortField, sortDirection]);

  // Paginated services
  const paginatedServices = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return filteredServices.slice(startIndex, startIndex + itemsPerPage);
  }, [filteredServices, currentPage]);

  const totalPages = Math.ceil(filteredServices.length / itemsPerPage);

  // Get category icon
  const getCategoryIcon = (category) => {
    const icons = {
      'Electrician': '⚡',
      'Priest': '🙏',
      'Driver': '🚗',
      'AC Repair': '❄️',
      'Beauty Spa': '💆‍♀️',
      'Plumber': '🔧',
      'Carpenter': '🔨',
      'House Cleaning': '🧹'
    };
    return icons[category] || '🔧';
  };

  // Handle add service
  const handleAddService = () => {
    const newService = {
      id: services.length + 1,
      categoryIcon: getCategoryIcon(formData.category),
      ...formData,
    };
    setServices([...services, newService]);
    setShowAddModal(false);
    setFormData({ category: "", service: "", provider: "", location: "", price: "", status: "Active" });
    toast.success("Service added successfully!");
  };

  // Handle edit service
  const handleEditService = () => {
    setServices(services.map(service =>
      service.id === editingService.id ? { ...service, ...formData } : service
    ));
    setShowEditModal(false);
    setEditingService(null);
    setFormData({ category: "", service: "", provider: "", location: "", price: "", status: "Active" });
    toast.success("Service updated successfully!");
  };

  // Handle delete service
  const handleDeleteService = () => {
    setServices(services.filter(service => service.id !== deletingService.id));
    setShowDeleteModal(false);
    setDeletingService(null);
    toast.success("Service deleted successfully!");
  };

  // Handle toggle status
  const handleToggleStatus = (id) => {
    setServices(services.map(service =>
      service.id === id
        ? { ...service, status: service.status === "Active" ? "Inactive" : "Active" }
        : service
    ));
    toast.success("Service status updated!");
  };

  // Handle status change from dropdown
  const handleStatusChange = (id, newStatus) => {
    setServices(services.map(service =>
      service.id === id ? { ...service, status: newStatus } : service
    ));
    toast.success("Service status updated!");
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
  const openEditModal = (service) => {
    setEditingService(service);
    setFormData({
      category: service.category,
      service: service.service,
      provider: service.provider,
      location: service.location,
      price: service.price,
      status: service.status,
    });
    setShowEditModal(true);
  };

  // Open delete modal
  const openDeleteModal = (service) => {
    setDeletingService(service);
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
                placeholder="Service Name"
                value={formData.service}
                onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <input
                type="text"
                placeholder="Provider Name"
                value={formData.provider}
                onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-1 focus:ring-green-500"
                required
              />
              <input
                type="text"
                placeholder="Location"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
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
  const DeleteModal = ({ isOpen, onClose, onConfirm, service }) => {
    if (!isOpen) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl p-6 w-full max-w-sm">
          <div className="text-center">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Delete Service</h2>
            <p className="text-gray-600 mb-6">Are you sure you want to delete "{service?.service}"?</p>
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

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <Link to="/admin" className="hover:text-green-700 flex items-center gap-1">
          <ArrowLeft size={16} /> Dashboard
        </Link>
        <span>{">"}</span>
        <span className="text-gray-800 font-medium">Services</span>
      </div>

      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Services</h1>
        <button onClick={() => setShowAddModal(true)} className="flex items-center gap-2 bg-[#145A41] text-white px-4 py-2 rounded-lg hover:bg-[#0E3F2E] transition shadow-sm">
          <Plus size={18} />
          Add Service
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

        {/* Location Filter */}
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2 bg-gray-50 text-sm text-gray-600 min-w-[140px] focus:outline-none focus:ring-1 focus:ring-green-500"
        >
          {locations.map(location => (
            <option key={location} value={location}>
              {location}
            </option>
          ))}
        </select>

        {/* Search */}
        <div className="flex-1 min-w-[200px] relative">
          <input
            type="text"
            placeholder="Search by Service Name or Provider"
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
                  Service
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Provider
                </th>
                <th className="px-6 py-4 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                  Location
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
              {paginatedServices.length > 0 ? (
                paginatedServices.map((service) => (
                  <tr key={service.id} className="hover:bg-gray-50/50 transition">
                    <td className="px-6 py-4 text-sm font-medium text-gray-600">
                      #{service.id}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">{service.categoryIcon}</span>
                        <span className="text-sm font-medium text-gray-800">
                          {service.category}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {service.service}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {service.provider}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {service.location}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      ₹{service.price}
                    </td>
                    <td className="px-6 py-4">
                      <select
                        value={service.status}
                        onChange={(e) => handleStatusChange(service.id, e.target.value)}
                        className={`px-3 py-1 rounded-full text-xs font-medium border focus:outline-none focus:ring-1 focus:ring-green-500 cursor-pointer ${
                          service.status === 'Active'
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
                          onClick={() => openEditModal(service)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 border border-blue-200 rounded-md transition-colors"
                          title="View"
                        >
                          <Eye size={16} />
                        </button>
                        <button
                          onClick={() => openEditModal(service)}
                          className="p-1.5 text-green-600 hover:bg-green-50 border border-green-200 rounded-md transition-colors"
                          title="Edit"
                        >
                          <Edit2 size={16} />
                        </button>
                        <button
                          onClick={() => openDeleteModal(service)}
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
                  <td colSpan="8" className="px-6 py-8 text-center text-gray-500">
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
            Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredServices.length)} of {filteredServices.length} Services
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
        title="Add New Service"
        onSubmit={handleAddService}
        submitText="Add Service"
      />

      {/* Edit Modal */}
      <Modal
        isOpen={showEditModal}
        onClose={() => setShowEditModal(false)}
        title="Edit Service"
        onSubmit={handleEditService}
        submitText="Update Service"
      />

      {/* Delete Modal */}
      <DeleteModal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={handleDeleteService}
        service={deletingService}
      />
    </div>
  );
}