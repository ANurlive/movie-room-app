type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ children, className, ...rest }: Props) {
  return (
    <button
      {...rest}
      className={`inline-block w-fit rounded bg-red-500 px-3 text-white transition duration-200 hover:bg-red-700 ${className} `}
    >
      {children}
    </button>
  );
}
