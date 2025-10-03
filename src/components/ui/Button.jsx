export default function Button({ children, variant = "primary", ...props }) {
  const base =
    "px-6 py-3 rounded-lg font-medium transition focus:outline-none focus:ring-2 focus:ring-offset-2";

  const styles = {
    primary:
      "bg-teal-600 text-white hover:bg-teal-700 focus:ring-teal-600",
    secondary:
      "border border-teal-600 text-teal-600 hover:bg-teal-50 focus:ring-teal-600",
  };

  return (
    <button className={`${base} ${styles[variant]}`} {...props}>
      {children}
    </button>
  );
}