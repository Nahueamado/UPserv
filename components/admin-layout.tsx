import React from 'react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </header>
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
