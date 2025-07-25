
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MainLayout from '@/components/layout/MainLayout';
import SuppliersTable from '@/components/suppliers/SuppliersTable';
import SupplierFilters from '@/components/suppliers/SupplierFilters';
import SupplierPagination from '@/components/suppliers/SupplierPagination';
import SupplierBulkActions from '@/components/suppliers/SupplierBulkActions';
import useSuppliers from '@/hooks/useSuppliers';
import { Supplier } from '@/hooks/useSuppliers';

// Mock data for inactive suppliers
const supplierData: Supplier[] = [
  {
    id: 'SP003',
    name: 'Global Shipping LLC',
    contact_person: 'Michael Chen',
    phone: '(555) 345-6789',
    email: 'michael@globalshipping.com',
    address: '789 Harbor Blvd, Port City, TX',
    status: 'Inactive',
    category: 'Logistics',
    balance: 8200.75,
    created_at: '2023-12-15T00:00:00Z',
    is_active: false
  },
  {
    id: 'SP006',
    name: 'Creative Designs Agency',
    contact_person: 'Amanda Lee',
    phone: '(555) 678-9012',
    email: 'amanda@creativedesigns.com',
    address: '303 Art Avenue, Brooklyn, NY',
    status: 'Inactive',
    category: 'Services',
    balance: 4200.30,
    created_at: '2023-12-15T00:00:00Z',
    is_active: false
  },
  {
    id: 'SP009',
    name: 'Electronics Wholesale Corp.',
    contact_person: 'Kevin Zhang',
    phone: '(555) 234-5678',
    email: 'kevin@electronicswhsl.com',
    address: '123 Circuit Ave, San Jose, CA',
    status: 'Inactive',
    category: 'Technology',
    balance: 7850.25,
    created_at: '2023-11-10T00:00:00Z',
    is_active: false
  },
  {
    id: 'SP012',
    name: 'Furniture Depot Ltd.',
    contact_person: 'Jessica Taylor',
    phone: '(555) 345-6789',
    email: 'jessica@furnituredepot.com',
    address: '456 Chair Street, Grand Rapids, MI',
    status: 'Inactive',
    category: 'Office Supplies',
    balance: 2340.60,
    created_at: '2024-03-01T00:00:00Z',
    is_active: false
  }
];

const InactiveSuppliers = () => {
  const navigate = useNavigate();
  const {
    searchTerm,
    setSearchTerm,
    selectedCategory,
    setSelectedCategory,
    currentPage,
    setCurrentPage,
    selectedSuppliers,
    paginatedSuppliers,
    requestSort,
    toggleSelectAll,
    toggleSelectSupplier,
    itemsPerPage,
    totalPages,
    uniqueCategories,
    filteredSuppliers
  } = useSuppliers();

  // Use mock data for inactive suppliers - in a real app we'd filter from the database
  const inactiveSuppliers = supplierData.filter(supplier => !supplier.is_active);

  return (
    <MainLayout>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="p-6 space-y-6"
      >
        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-600 to-red-500 rounded-lg p-6 shadow-lg">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <h1 className="text-2xl font-semibold text-white mb-1">Inactive Suppliers</h1>
              <p className="text-white/80">View and manage your inactive supplier accounts</p>
            </div>
            <div className="flex gap-3">
              <Button 
                variant="secondary"
                className="bg-white text-red-600 hover:bg-white/90 shadow"
                onClick={() => navigate('/suppliers')}
              >
                Back to Menu
              </Button>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <SupplierFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={uniqueCategories}
          isActiveView={false}
        />

        {/* Bulk Actions Bar */}
        <SupplierBulkActions 
          selectedCount={selectedSuppliers.length}
          isActiveView={false}
        />

        {/* Suppliers Table */}
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <SuppliersTable
            suppliers={inactiveSuppliers}
            selectedSuppliers={selectedSuppliers}
            toggleSelectAll={toggleSelectAll}
            toggleSelectSupplier={toggleSelectSupplier}
            requestSort={requestSort}
            isActiveView={false}
          />

          {/* Pagination */}
          <SupplierPagination
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            totalPages={totalPages}
            itemsPerPage={itemsPerPage}
            filteredCount={filteredSuppliers.length}
            itemName="inactive suppliers"
          />
        </div>
      </motion.div>
    </MainLayout>
  );
};

export default InactiveSuppliers;
