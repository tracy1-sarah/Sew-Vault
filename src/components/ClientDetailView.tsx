import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { User, Phone, Calendar, Ruler, ArrowLeft, Edit, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import type { Client, Measurements } from '@/types';
import { MeasurementForm } from './MeasurementForm';

interface ClientDetailViewProps {
  client: Client;
  onBack: () => void;
  onEdit: () => void;
  onUpdateMeasurements: (measurements: Measurements) => void;
  onMarkPaid: () => void;
}

export function ClientDetailView({ client, onBack, onEdit, onUpdateMeasurements, onMarkPaid }: ClientDetailViewProps) {
  const hasMeasurements = Object.values(client.measurements).some(val => val !== undefined && val !== null);
  const amountCharged = client.amountCharged || 0;
  const advancePaid = client.advancePaid || 0;
  const balance = client.balance || 0;
  const isPaid = client.isPaid || false;

  const measurementFields = [
    { key: 'bust' as keyof Measurements, label: 'Bust' },
    { key: 'waist' as keyof Measurements, label: 'Waist' },
    { key: 'shoulderToWaist' as keyof Measurements, label: 'Shoulder to Waist' },
    { key: 'hip' as keyof Measurements, label: 'Hip' },
    { key: 'shoulderToHip' as keyof Measurements, label: 'Shoulder to Hip' },
    { key: 'shoulderToNipple' as keyof Measurements, label: 'Shoulder to Nipple' },
    { key: 'fullLength' as keyof Measurements, label: 'Full Length' },
  ];

  return (
    <div className="space-y-6 pt-4">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <h1 className="text-3xl font-bold">Client Details</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5 text-primary" />
                Client Information
              </CardTitle>
              <Button variant="default" size="sm" onClick={onEdit} className="bg-primary hover:bg-primary/90">
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Name:</span>
                <span className="font-semibold">{client.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Phone className="h-4 w-4" />
                  Phone:
                </span>
                <span className="font-semibold">{client.phoneNumber}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Date:
                </span>
                <span className="font-semibold">{format(new Date(client.date), 'MMM dd, yyyy')}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                Financial Information
              </CardTitle>
              {!isPaid && (amountCharged > 0 || advancePaid > 0) && (
                <Button 
                  variant="default" 
                  size="sm" 
                  onClick={onMarkPaid}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <CheckCircle2 className="h-4 w-4 mr-2" />
                  Mark as Paid
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              {amountCharged > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Amount Charged:</span>
                  <span className="font-semibold">GHS {amountCharged.toFixed(2)}</span>
                </div>
              )}
              {advancePaid > 0 && (
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Advance Paid:</span>
                  <span className="font-semibold">GHS {advancePaid.toFixed(2)}</span>
                </div>
              )}
              {isPaid ? (
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-muted-foreground">Status:</span>
                  <div className="flex items-center gap-2 text-green-600 font-semibold">
                    <CheckCircle2 className="h-5 w-5" />
                    Paid
                  </div>
                </div>
              ) : balance > 0 && (
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="text-muted-foreground">Balance:</span>
                  <span className="font-semibold text-orange-600">GHS {balance.toFixed(2)}</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {hasMeasurements && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Ruler className="h-5 w-5 text-primary" />
              Current Measurements
            </CardTitle>
            <CardDescription>All measurements are in inches</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Measurement</TableHead>
                  <TableHead className="text-right">Value (inches)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {measurementFields.map((field) => {
                  const value = client.measurements[field.key];
                  if (value === undefined || value === null) return null;
                  return (
                    <TableRow key={field.key}>
                      <TableCell className="font-medium">{field.label}</TableCell>
                      <TableCell className="text-right">{value.toFixed(1)}"</TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <MeasurementForm measurements={client.measurements} onSubmit={onUpdateMeasurements} />
    </div>
  );
}

