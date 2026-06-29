import { Button } from '@/shared/ui/Button';

interface LoginActionsProps {
  isLoading: boolean;
}

export const LoginActions = ({ isLoading }: LoginActionsProps) => {
  return (
    <div className="flex flex-col mt-3">
      <Button id="login-submit-btn" type="submit" size="lg" fullWidth isLoading={isLoading}>
        {isLoading ? 'Processing...' : 'Sign In'}
      </Button>

      <p className="text-sm text-slate-500 font-bold mt-5 text-center">
        Don't have an account?{' '}
        <a href="#" className="text-primary underline hover:text-primary-600 font-bold transition-colors">
          Create Account
        </a>
      </p>
    </div>
  );
};
