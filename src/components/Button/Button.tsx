type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`inline-block w-fit border border-white rounded-2xl px-3 hover:bg-gray-400 transition duration-300 ${className}`}
    >
      {children}
    </button>
  );
}
