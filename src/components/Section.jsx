export default function Section({ id, children, className = "", ...rest }) {
  return (
    <section id={id} className={`min-h-screen flex items-center relative ${className}`} {...rest}>
      {children}
    </section>
  );
}
