function AboutPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">About Our School</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
        <div>
          <h2 className="text-2xl font-bold mb-4">Our History</h2>
          <p className="mb-4">
            Founded in [year], School Name has a rich history of academic excellence and community
            service. What began as a small institution with just a handful of students has grown
            into one of the region's most respected educational establishments.
          </p>
          <p>
            Throughout our history, we have remained committed to our founding principles of
            fostering intellectual curiosity, personal growth, and social responsibility.
          </p>
        </div>
        <div className="bg-gray-200 rounded-lg">
          {/* Placeholder for school image */}
          <div className="h-full w-full flex items-center justify-center">
            <p className="text-gray-500">School Building Image</p>
          </div>
        </div>
      </div>

      <div className="mb-16">
        <h2 className="text-2xl font-bold mb-4 text-center">Our Mission & Vision</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-blue-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Mission</h3>
            <p>
              To provide a nurturing and challenging educational environment where students can
              develop intellectually, emotionally, and socially, preparing them to be responsible
              global citizens.
            </p>
          </div>
          <div className="bg-green-50 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-3">Vision</h3>
            <p>
              To be a leading educational institution that inspires a lifelong love of learning,
              fosters innovation, and cultivates leaders who will positively impact their
              communities and the world.
            </p>
          </div>
        </div>
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-6 text-center">Our Leadership Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Sample staff - replace with real data */}
          <div className="text-center">
            <div className="bg-gray-200 h-48 w-48 rounded-full mx-auto mb-4">
              {/* Placeholder for staff photo */}
            </div>
            <h3 className="text-xl font-bold">Jane Doe</h3>
            <p className="text-blue-700">Principal</p>
          </div>

          <div className="text-center">
            <div className="bg-gray-200 h-48 w-48 rounded-full mx-auto mb-4">
              {/* Placeholder for staff photo */}
            </div>
            <h3 className="text-xl font-bold">John Smith</h3>
            <p className="text-blue-700">Vice Principal</p>
          </div>

          <div className="text-center">
            <div className="bg-gray-200 h-48 w-48 rounded-full mx-auto mb-4">
              {/* Placeholder for staff photo */}
            </div>
            <h3 className="text-xl font-bold">Mary Johnson</h3>
            <p className="text-blue-700">Academic Director</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
