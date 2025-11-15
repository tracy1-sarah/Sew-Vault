import { motion } from 'framer-motion';
import { useAtom } from 'jotai';
import { Card, CardContent } from '@/components/ui/card';
import { BadgeCent, Users, Ruler, TrendingUp } from 'lucide-react';
import { clientsAtom } from '@/store/clients';

export function StatsCards() {
  const [clients] = useAtom(clientsAtom);

  const totalClients = clients.length;
  const totalRevenue = clients.reduce((sum, client) => sum + (client.amountCharged || 0), 0);
  const totalBalance = clients.reduce((sum, client) => {
    if (client.isPaid) return sum;
    return sum + (client.balance || 0);
  }, 0);
  const clientsWithMeasurements = clients.filter((client) =>
    Object.values(client.measurements).some((val) => val !== undefined && val !== null)
  ).length;

  const stats = [
    {
      label: 'Total Clients',
      value: totalClients,
      icon: Users,
      color: 'text-primary',
    },
    {
      label: 'Total Revenue',
      value: `GHS ${totalRevenue.toFixed(2)}`,
      icon: BadgeCent,
      color: 'text-green-600',
    },
    {
      label: 'Outstanding Balance',
      value: `GHS ${totalBalance.toFixed(2)}`,
      icon: TrendingUp,
      color: totalBalance > 0 ? 'text-orange-600' : 'text-green-600',
    },
    {
      label: 'With Measurements',
      value: clientsWithMeasurements,
      icon: Ruler,
      color: 'text-purple-600',
    },
  ];

  if (totalClients === 0) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            whileHover={{ y: -4, scale: 1.02 }}
          >
            <Card className="border-l-4 border-l-primary/50">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-2 bg-primary/10 rounded-lg ${stat.color}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}

