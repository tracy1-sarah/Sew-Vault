import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { User, Phone, Calendar, Ruler, Trash2, CheckCircle2 } from 'lucide-react';
import type { Client } from '@/types';
import { format } from 'date-fns';

interface ClientCardProps {
  client: Client;
  onView: (client: Client) => void;
  onEdit: (client: Client) => void;
  onDelete: (client: Client) => void;
  // onMarkPaid: (client: Client) => void; uncomment to show the mark for payment button
}

export function ClientCard({ client, onView, onEdit, onDelete}: ClientCardProps) {
  const hasMeasurements = Object.values(client.measurements).some(val => val !== undefined && val !== null);
  const amountCharged = client.amountCharged || 0;
  const advancePaid = client.advancePaid || 0;
  const balance = client.balance || 0;
  const isPaid = client.isPaid || false;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -4 }}
    >
      <Card className="hover:shadow-lg transition-shadow duration-200 border-l-4 border-l-primary">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold text-foreground flex items-center gap-2">
              <User className="h-5 w-5 text-primary" />
              {client.name}
            </CardTitle>
            <CardDescription className="mt-2 space-y-1">
              <div className="flex items-center gap-2 text-sm">
                <Phone className="h-4 w-4" />
                {client.phoneNumber}
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4" />
                {format(new Date(client.date), 'MMM dd, yyyy')}
              </div>
            </CardDescription>
          </div>
          {isPaid && (
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4" />
              Paid
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {amountCharged > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Amount Charged:</span>
              <span className="font-semibold">
                GHS {amountCharged.toFixed(2)}
              </span>
            </div>
          )}
          {advancePaid > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Advance Paid:</span>
              <span className="font-semibold">
                GHS {advancePaid.toFixed(2)}
              </span>
            </div>
          )}
          {!isPaid && balance > 0 && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Balance:</span>
              <span className="font-semibold text-orange-600">
                GHS {balance.toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm pt-2 border-t">
            <Ruler className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">
              {hasMeasurements ? 'Measurements recorded' : 'No measurements'}
            </span>
          </div>
          <div className="flex gap-2 pt-2">
            <Button variant="outline" size="sm" className="flex-1 cursor-pointer" onClick={() => onView(client)}>
              {hasMeasurements ? 'View Details' : 'Add Details'}
            </Button>
            <Button variant="default" size="sm" className="cursor-pointer bg-yellow-400 hover:bg-yellow-500 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200" onClick={() => onEdit(client)}>
              Edit
            </Button>
            {/*{!isPaid && (*/}
            {/*  <Button */}
            {/*    variant="default" */}
            {/*    size="sm" */}
            {/*    className="px-3 bg-green-600 hover:bg-green-700" */}
            {/*    onClick={() => onMarkPaid(client)}*/}
            {/*    title="Mark as paid"*/}
            {/*  >*/}
            {/*    <CheckCircle2 className="h-4 w-4" />*/}
            {/*  </Button>*/}
            {/*)}*/}
            <Button 
              variant="destructive"
              size="sm" 
              className="px-3 bg-red-500 cursor-pointer"
              onClick={() => onDelete(client)}
              title="Delete client"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
    </motion.div>
  );
}

