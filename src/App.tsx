import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { ClientList } from '@/components/ClientList';
import { ClientFormDialog } from '@/components/ClientFormDialog';
import { ClientDetailView } from '@/components/ClientDetailView';
import { StatsCards } from '@/components/StatsCards';
import { useClients } from '@/hooks/useClients';

function App() {
  const {
    selectedClient,
    isFormDialogOpen,
    editingClient,
    viewMode,
    isLoading,
    handleAddClient,
    handleEditClient,
    handleViewClient,
    handleBackToList,
    handleSaveClient,
    handleUpdateMeasurements,
    handleDeleteClient,
    handleMarkPaid,
    setIsFormDialogOpen,
    closeFormDialog,
  } = useClients();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading clients...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-background relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, 100, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-96 h-96 bg-secondary/10 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, -100, 0],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="relative z-10">
        <Header />
        <main className="container mx-auto px-4 py-8">
          {viewMode === 'list' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <StatsCards />
              <ClientList 
                onViewClient={handleViewClient} 
                onEditClient={handleEditClient}
                onDeleteClient={handleDeleteClient}
                // onMarkPaid={handleMarkPaid}
                onAddClient={handleAddClient}
              />
            </motion.div>
          ) : selectedClient ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ClientDetailView
                client={selectedClient}
                onBack={handleBackToList}
                onEdit={() => {
                  if (selectedClient) {
                    handleEditClient(selectedClient);
                  }
                }}
                onUpdateMeasurements={handleUpdateMeasurements}
                onMarkPaid={() => {
                  if (selectedClient) {
                    handleMarkPaid(selectedClient);
                  }
                }}
              />
            </motion.div>
          ) : null}
        </main>

        <ClientFormDialog
          open={isFormDialogOpen}
          onOpenChange={(open) => {
            setIsFormDialogOpen(open);
            if (!open) {
              closeFormDialog();
            }
          }}
          onSubmit={handleSaveClient}
          client={editingClient}
        />
      </div>
    </div>
  );
}

export default App;
