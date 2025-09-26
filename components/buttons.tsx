export function ButtonPrimary({ children, ...props }: any) {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded-xl font-medium shadow bg-tpb-green text-white hover:bg-tpb-slate transition"
    >
      {children}
    </button>
  );
}

export function ButtonSecondary({ children, ...props }: any) {
  return (
    <button
      {...props}
      className="px-4 py-2 rounded-xl font-medium shadow bg-tpb-orange text-white hover:bg-tpb-dark transition"
    >
      {children}
    </button>
  );
}
