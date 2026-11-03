import { Link } from 'react-router-dom';
import { Scissors } from 'lucide-react';

export function AuthNavbar() {
  return (
    <nav className="absolute inset-x-0 top-0 z-20 border-b border-gray-200 bg-white/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center px-4 py-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2 text-lg font-bold text-[#0C2A22]" aria-label="SewVault home">
          <span className="grid h-8 w-8 place-items-center rounded-full bg-[#C8F169] text-[#0C2A22]">
            <Scissors className="h-4 w-4" />
          </span>
          SewVault
        </Link>
      </div>
    </nav>
  );
}
