import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import type { Client, ClientFormData } from '@/types';

interface ClientFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: ClientFormData) => void;
  client?: Client | null;
}

const initialFormData = (client?: Client | null): ClientFormData =>
  client
    ? {
        name: client.name,
        date: client.date,
        phoneNumber: client.phoneNumber,
        amountCharged: client.amountCharged,
        advancePaid: client.advancePaid,
        measurements: client.measurements,
      }
    : {
        name: '',
        date: new Date().toISOString().split('T')[0],
        phoneNumber: '',
        amountCharged: undefined,
        advancePaid: undefined,
        measurements: {},
      };

export function ClientFormDialog({ open, onOpenChange, onSubmit, client }: ClientFormDialogProps) {
  const [formData, setFormData] = useState<ClientFormData>(() => initialFormData(client));

  // Reset the form whenever the dialog opens or switches to another client.
  const [prev, setPrev] = useState({ client, open });
  if (prev.client !== client || prev.open !== open) {
    setPrev({ client, open });
    setFormData(initialFormData(client));
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const safeData = {
      ...formData,
      amountCharged: formData.amountCharged ?? null,
      advancePaid: formData.advancePaid ?? null,
    };

    try {
      onSubmit(safeData);
      onOpenChange(false);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };


  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby={undefined} className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{client ? 'Edit Client' : 'Add New Client'}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Client Name *</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date *</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number *</Label>
              <Input
                id="phoneNumber"
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="amountCharged">Amount Charged (GHS)</Label>
              <Input
                id="amountCharged"
                type="number"
                step="0.01"
                min="0"
                value={formData.amountCharged || ''}
                onChange={(e) => setFormData({ ...formData, amountCharged: e.target.value ? parseFloat(e.target.value) : undefined })}
                placeholder="0.00"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="advancePaid">Advance Paid (GHS)</Label>
              <Input
                id="advancePaid"
                type="number"
                step="0.01"
                min="0"
                value={formData.advancePaid || ''}
                onChange={(e) => setFormData({ ...formData, advancePaid: e.target.value ? parseFloat(e.target.value) : undefined })}
                placeholder="0.00"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-[#0C2A22] hover:bg-[#164034] text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">Save Client</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

