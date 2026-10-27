import { Scissors, Plus, Ruler, Wallet, Search } from 'lucide-react';

const clients = [
  { name: 'Akosua Mensah', item: 'Kaba & slit', balance: 'GHS 150.00', paid: false },
  { name: 'Kwame Boateng', item: 'Agbada', balance: 'Paid', paid: true },
  { name: 'Efua Asante', item: 'Bridal gown', balance: 'GHS 600.00', paid: false },
];

/** A static mock of the SewVault dashboard, used as hero art. */
export function PhoneMockup({ className = '' }: { className?: string }) {
  return (
    <div
      className={`relative w-[200px] sm:w-[230px] lg:w-[250px] rounded-[2.4rem] bg-[#0b0f0d] p-[7px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.7)] ring-1 ring-white/15 ${className}`}
    >
      <div className="relative overflow-hidden rounded-[2rem] bg-[#F6F7F2] text-[#0C2A22]">
        {/* Notch */}
        <div className="absolute left-1/2 top-2 h-5 w-20 -translate-x-1/2 rounded-full bg-[#0b0f0d]" />

        <div className="px-4 pb-4 pt-9 text-[10px] sm:text-[11px]">
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-1.5 font-bold">
              <Scissors className="h-3.5 w-3.5" />
              SewVault
            </div>
            <div className="grid h-6 w-6 place-items-center rounded-full bg-[#0C2A22] text-[9px] font-semibold text-[#C8F169]">
              AA
            </div>
          </div>

          <div className="rounded-2xl bg-gradient-to-br from-[#0C2A22] to-[#1C5A45] p-3 text-white">
            <p className="text-white/60">Outstanding balance</p>
            <p className="mt-0.5 text-lg font-bold tracking-tight sm:text-xl">GHS 2,450.00</p>
            <div className="mt-3 grid grid-cols-3 gap-1.5 text-center text-[9px]">
              {[
                { icon: Plus, label: 'Client' },
                { icon: Ruler, label: 'Measure' },
                { icon: Wallet, label: 'Payment' },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <span className="grid h-7 w-7 place-items-center rounded-full bg-[#C8F169] text-[#0C2A22]">
                    <Icon className="h-3.5 w-3.5" />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-3 flex items-center gap-1.5 rounded-xl bg-white px-2.5 py-2 text-[#0C2A22]/40 ring-1 ring-black/5">
            <Search className="h-3 w-3" />
            Search name or phone
          </div>

          <div className="mt-3 flex items-center justify-between font-semibold">
            <span>Clients</span>
            <span className="text-[9px] font-medium text-[#0C2A22]/50">24 total</span>
          </div>
          <div className="mt-1.5 space-y-1.5">
            {clients.map((c) => (
              <div key={c.name} className="flex items-center justify-between rounded-xl bg-white px-2.5 py-2 ring-1 ring-black/5">
                <div>
                  <p className="font-semibold leading-tight">{c.name}</p>
                  <p className="text-[9px] text-[#0C2A22]/50">{c.item}</p>
                </div>
                <span
                  className={`rounded-full px-2 py-0.5 text-[9px] font-semibold ${
                    c.paid ? 'bg-[#C8F169] text-[#0C2A22]' : 'bg-orange-100 text-orange-700'
                  }`}
                >
                  {c.balance}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
