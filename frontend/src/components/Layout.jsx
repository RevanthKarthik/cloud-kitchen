export default function Layout({ children }) {
  return (
    <div className="pt-20 min-h-screen flex justify-center">
      <div className="w-full max-w-6xl px-4">
        {children}
      </div>
    </div>
  );
}