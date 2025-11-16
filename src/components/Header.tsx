import { Button } from '@/components/ui/button';
import {Scissors, LogOut, User, Plus} from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

interface addClientProps {
    onAddClient: () => void;
    hasClients?: boolean;
}

export function Header({ onAddClient, hasClients }: addClientProps) {
  const { user, userProfile, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  // Get first name from user profile or email
  const getDisplayName = () => {
    if (userProfile?.name) {
      return userProfile.name.split(' ')[0];
    }
    if (user?.displayName) {
      return user.displayName.split(' ')[0];
    }
    if (user?.email) {
      return user.email.split('@')[0];
    }
    return 'User';
  };

  return (
    <header className="border-b bg-card sticky top-0 z-50 backdrop-blur-sm bg-card/95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 rounded-lg">
              <Scissors className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">SewVault</h1>
              {/*<p className="text-sm text-muted-foreground">Client Measurement Manager</p>*/}
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!hasClients && (
                <Button onClick={onAddClient} className="ml-4 gap-2 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
                  <Plus className="h-4 w-4" />
                  Add Client
                </Button>
            )}
            {user && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{getDisplayName()}</span>
              </div>
            )}
            <Button variant="destructive" onClick={handleLogout} className="gap-2 text-red-700">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}

