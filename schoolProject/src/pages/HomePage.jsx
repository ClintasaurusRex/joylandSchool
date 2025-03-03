function HomePage() {
  return (
    <div>
      <section className="bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to School Name</h1>
          <p className="text-xl mb-8">Where Education Meets Excellence</p>
          <button className="bg-yellow-500 text-blue-900 px-6 py-3 rounded-lg font-bold hover:bg-yellow-400 transition">
            Apply Now
          </button>
        </div>
      </section>

      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose Our School</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 shadow-lg rounded-lg">
              <div className="text-4xl text-blue-600 mb-4">🎓</div>
              <h3 className="text-xl font-bold mb-2">Academic Excellence</h3>
              <p>
                Our students consistently achieve top results in standardized tests and
                competitions.
              </p>
            </div>

            <div className="text-center p-6 shadow-lg rounded-lg">
              <div className="text-4xl text-blue-600 mb-4">🏆</div>
              <h3 className="text-xl font-bold mb-2">Sports Programs</h3>
              <p>Comprehensive athletic programs that develop teamwork and leadership skills.</p>
            </div>

            <div className="text-center p-6 shadow-lg rounded-lg">
              <div className="text-4xl text-blue-600 mb-4">🌍</div>
              <h3 className="text-xl font-bold mb-2">Community Engagement</h3>
              <p>
                Students learn to become responsible citizens through various community projects.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Upcoming Events</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Sample events - replace with real data */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 font-bold mb-2">SEP 15, 2023</div>
              <h3 className="text-xl font-bold mb-2">Open House</h3>
              <p>Join us for a tour of our campus and meet our faculty members.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 font-bold mb-2">OCT 5, 2023</div>
              <h3 className="text-xl font-bold mb-2">Science Fair</h3>
              <p>Students showcase their innovative science projects.</p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-blue-600 font-bold mb-2">OCT 20, 2023</div>
              <h3 className="text-xl font-bold mb-2">Sports Day</h3>
              <p>Annual athletic competition with various sports activities.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
