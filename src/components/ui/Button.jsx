export default function Button({ children, variant = 'primary', className = '', ...props }) {
  const base = 'inline-block px-6 py-3 rounded-lg font-semibold transition-colors duration-200 text-center cursor-pointer';
  const variants = {
    primary: 'bg-blue-700 text-white hover:bg-blue-800 active:bg-blue-900',
    secondary: 'border-2 border-blue-700 text-blue-700 hover:bg-blue-50 active:bg-blue-100',
    ghost: 'text-blue-700 hover:underline',
  };
  return (
    <button className={`${base} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
}
