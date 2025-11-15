import { useState } from 'react';
import { useAtom } from 'jotai';
import { Input } from '@/components/ui/input';
import { clientsAtom } from '@/store/clients';
import { ClientCard } from './ClientCard';
import { Search, Users, Plus } from 'lucide-react';
import type { Client } from '@/types';
import { Button } from '@/components/ui/button';

interface ClientListProps {
  onViewClient: (client: Client) => void;
  onEditClient: (client: Client) => void;
  onDeleteClient: (client: Client) => void;
  onMarkPaid: (client: Client) => void;
  onAddClient?: () => void;
}

export function ClientList({ onViewClient, onEditClient, onDeleteClient, onMarkPaid, onAddClient }: ClientListProps) {
  const [clients] = useAtom(clientsAtom);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredClients = clients.filter((client) =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phoneNumber.includes(searchQuery)
  );

  if (clients.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="p-4 bg-primary/10 rounded-full mb-4">
          <Users className="h-12 w-12 text-primary" />
        </div>
        <h2 className="text-2xl font-semibold mb-2">No clients yet</h2>
        <p className="text-muted-foreground max-w-md">
          Get started by adding your first client. You'll be able to store their measurements and track payments.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
        <div className="flex items-center justify-between mb-4">
            {/* Search bar */}
            <div className="relative w-full max-w-sm">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search clients by name or phone number..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                />
            </div>

            {/* Add Client button */}
            <Button onClick={onAddClient} className="ml-4 gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                <Plus className="h-4 w-4" />
                Add Client
            </Button>
        </div>

        {filteredClients.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No clients found matching your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredClients.map((client) => (
            <ClientCard
              key={client.id}
              client={client}
              onView={onViewClient}
              onEdit={onEditClient}
              onDelete={onDeleteClient}
              onMarkPaid={onMarkPaid}
            />
          ))}
        </div>
      )}
    </div>
  );
}

