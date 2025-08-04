function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-gray-800 mb-2">404</h1>
      <p className="text-lg text-gray-600 mb-4">Page not found</p>
      <a href="/" className="text-blue-600 hover:underline font-medium text-sm">
        Go back home
      </a>
    </div>
  );
}

export default NotFound;
