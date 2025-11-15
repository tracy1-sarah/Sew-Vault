import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Scissors, Mail, ArrowLeft, CheckCircle, Ruler, CircleDot, Grid, Square, Hexagon } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const { resetPassword, error } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setIsSuccess(false);
    try {
      await resetPassword(email);
      setIsSuccess(true);
    } catch (err) {
      // Error is handled by useAuth hook
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 relative overflow-hidden">
      {/* Minimalistic floating sewing icons */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 text-gray-400/70"
          animate={{
            y: [0, 20, 0],
            rotate: [0, 5, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Scissors className="h-10 w-10" />
        </motion.div>
        <motion.div
          className="absolute top-40 right-20 text-gray-400/60"
          animate={{
            y: [0, -15, 0],
            rotate: [0, -5, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <CircleDot className="h-8 w-8" />
        </motion.div>
        <motion.div
          className="absolute bottom-32 left-1/4 text-gray-400/65"
          animate={{
            x: [0, 15, 0],
            rotate: [0, 10, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <Ruler className="h-9 w-9" />
        </motion.div>
        <motion.div
          className="absolute bottom-20 right-1/3 text-gray-400/55"
          animate={{
            y: [0, 25, 0],
            rotate: [0, -8, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
        >
          <Scissors className="h-7 w-7" />
        </motion.div>
        <motion.div
          className="absolute top-1/3 right-10 text-gray-400/60"
          animate={{
            x: [0, -20, 0],
            rotate: [0, 12, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
        >
          <CircleDot className="h-6 w-6" />
        </motion.div>
        <motion.div
          className="absolute top-1/2 left-20 text-gray-400/50"
          animate={{
            y: [0, -30, 0],
            rotate: [0, -15, 0],
          }}
          transition={{
            duration: 11,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.8,
          }}
        >
          <Grid className="h-8 w-8" />
        </motion.div>
        <motion.div
          className="absolute bottom-40 left-1/3 text-gray-400/60"
          animate={{
            x: [0, 25, 0],
            rotate: [0, 20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2.5,
          }}
        >
          <Square className="h-7 w-7" />
        </motion.div>
        <motion.div
          className="absolute top-16 right-1/4 text-gray-400/55"
          animate={{
            y: [0, 18, 0],
            rotate: [0, -10, 0],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.2,
          }}
        >
          <Ruler className="h-6 w-6" />
        </motion.div>
        <motion.div
          className="absolute bottom-16 left-1/2 text-gray-400/65"
          animate={{
            x: [0, -22, 0],
            rotate: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <Hexagon className="h-7 w-7" />
        </motion.div>
        <motion.div
          className="absolute top-2/3 left-10 text-gray-400/50"
          animate={{
            y: [0, 20, 0],
            rotate: [0, -12, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.8,
          }}
        >
          <CircleDot className="h-5 w-5" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative z-10 w-full max-w-md"
      >
        <Card className="bg-white border border-gray-200 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mb-4 p-3 bg-gray-100 rounded-full w-fit"
            >
              <Scissors className="h-8 w-8 text-gray-700" />
            </motion.div>
            <CardTitle className="text-3xl font-bold text-gray-900">
              Reset Password
            </CardTitle>
            <CardDescription className="text-base text-gray-600">
              Enter your email to receive a password reset link
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {error && !isSuccess && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-3 bg-destructive/10 border border-destructive/20 rounded-md text-sm text-destructive"
              >
                {error}
              </motion.div>
            )}

            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4 text-center"
              >
                <div className="mx-auto p-3 bg-green-500/10 rounded-full w-fit">
                  <CheckCircle className="h-8 w-8 text-green-500" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-2">Check your email</h3>
                  <p className="text-sm text-muted-foreground">
                    We've sent a password reset link to <strong>{email}</strong>
                  </p>
                </div>
                <Link to="/login">
                  <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="pl-10"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </Button>

                <Link to="/login">
                  <Button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold border border-gray-300 shadow-md hover:shadow-lg transition-all duration-200">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Sign In
                  </Button>
                </Link>
              </form>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}

