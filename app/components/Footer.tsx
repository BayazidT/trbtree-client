export default function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-gray-900 mt-20">
      <div className="max-w-6xl mx-auto px-6 py-6 text-center text-sm text-gray-500">
        © {new Date().getFullYear()} Bayazid Talukder · All Rights Reserved
      </div>
    </footer>
  );
}
