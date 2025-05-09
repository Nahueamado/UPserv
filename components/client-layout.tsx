import React from 'react';

interface ClientLayoutProps {
  children: React.ReactNode;
}

const ClientLayout: React.FC<ClientLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow p-4">
        <h1 className="text-xl font-bold">Client Panel</h1>
      </header>
      <main className="p-6">
        {children}
      </main>
    </div>
  );
};

export default ClientLayout;
