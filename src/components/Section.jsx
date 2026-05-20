export default function Section({ id, children, className = "" }) {
  return (
    <section id={id} className={`min-h-screen flex items-center relative ${className}`}>
      {children}
    </section>
  );
}
