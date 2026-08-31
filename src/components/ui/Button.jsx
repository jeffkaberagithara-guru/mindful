import { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { buttonClass } from './buttonStyles';

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', to, isLoading, className, children, ...props },
  ref,
) {
  const classes = buttonClass({ variant, size, className });

  if (to) {
    return (
      <Link ref={ref} to={to} className={classes} {...props}>
        {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
        {children}
      </Link>
    );
  }

  return (
    <button ref={ref} className={classes} {...props}>
      {isLoading ? <Loader2 className="h-4 w-4 animate-spin" aria-hidden /> : null}
      {children}
    </button>
  );
});

export default Button;