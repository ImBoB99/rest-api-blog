function Footer() {
  return (
    <footer className="bg-gray-100 border-t border-gray-200 mt-12">
      <div className="max-w-6xl mx-auto px-4 py-6 text-sm text-gray-600 flex justify-between items-center">
        <p>&copy; {new Date().getFullYear()} All rights reserved.</p>
        <div className="space-x-3">
          <a href="#" className="hover:text-gray-800">
            Privacy
          </a>
          <a href="#" className="hover:text-gray-800">
            Terms
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
