import { useState, useEffect } from 'react';
import { signIn, signUp, logOut, auth, onAuthStateChange } from '@/lib/firebase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isSignUp, setIsSignUp] = useState(window.location.pathname === '/signup');
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(auth.currentUser);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
    });
    return () => unsubscribe();
  }, []);

  const validateForm = () => {
    if (!email || !password) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please fill in all fields",
      });
      return false;
    }

    if (!email.includes('@')) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please enter a valid email address",
      });
      return false;
    }

    if (password.length < 6) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Password must be at least 6 characters long",
      });
      return false;
    }

    if (isSignUp && password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Passwords do not match",
      });
      return false;
    }

    return true;
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const { user, error } = await signUp(email, password);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error,
        });
      } else {
        toast({
          title: "Success",
          description: "Account created successfully!",
        });
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        navigate('/');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to create account",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    setLoading(true);
    try {
      const { user, error } = await signIn(email, password);
      
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error,
        });
      } else {
        toast({
          title: "Success",
          description: "Logged in successfully!",
        });
        setEmail('');
        setPassword('');
        navigate('/');
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to sign in",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleLogOut = async () => {
    setLoading(true);
    try {
      const { error } = await logOut();
      if (error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: error,
        });
      } else {
        toast({
          title: "Success",
          description: "Logged out successfully!",
        });
      }
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error",
        description: error.message || "Failed to log out",
      });
    } finally {
      setLoading(false);
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-4 p-4">
        <Avatar>
          <AvatarImage src={user.photoURL || undefined} />
          <AvatarFallback>{user.email?.charAt(0).toUpperCase()}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{user.email}</p>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={handleLogOut}
            disabled={loading}
            className="text-red-500 hover:text-red-700"
          >
            {loading ? "Logging out..." : "Log Out"}
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-card rounded-lg shadow-lg">
      <form className="space-y-4" onSubmit={isSignUp ? handleSignUp : handleSignIn}>
        <div className="space-y-2">
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
          {isSignUp && (
            <Input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
            />
          )}
        </div>
        <div className="flex flex-col space-y-2">
          <Button 
            type="submit"
            disabled={loading}
            className="w-full"
          >
            {loading ? (
              isSignUp ? "Creating Account..." : "Signing In..."
            ) : (
              isSignUp ? "Sign Up" : "Sign In"
            )}
          </Button>
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setIsSignUp(!isSignUp);
              setPassword('');
              setConfirmPassword('');
            }}
            disabled={loading}
          >
            {isSignUp ? "Already have an account? Sign In" : "Need an account? Sign Up"}
          </Button>
        </div>
      </form>
    </div>
  );
}