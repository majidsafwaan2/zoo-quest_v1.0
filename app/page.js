export default function Home() {
  return (
    <main className="text-gray-800">
      {/* Hero Section */}
      <section
        className="h-[80vh] bg-cover bg-center flex flex-col justify-center items-center text-white text-center px-6"
        style={{
          backgroundImage: "url('/images/hero.jpg')",
        }}
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
          Talk to Endangered Animals. Inspire Action.
        </h1>
        <p className="text-xl md:text-2xl max-w-2xl mb-6 drop-shadow-lg">
          An AI-powered experience to build empathy and boost conservation support.
        </p>
        <a
          href="/chat"
          className="bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition"
        >
          Try the Demo
        </a>
      </section>

      {/* Mission Block */}
      <section className="max-w-4xl mx-auto px-6 py-16 text-center">
        <h2 className="text-3xl font-bold mb-4">Why This Exists</h2>
        <p className="text-lg leading-relaxed text-gray-700 mb-10">
          This project combines artificial intelligence with conservation psychology
          to offer a unique, interactive experience. By simulating conversations with
          endangered animals, we aim to build empathy, encourage deeper learning,
          and increase support for conservation efforts.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div>
            <div className="text-4xl mb-2">💚</div>
            <p className="font-semibold">Empathy-Driven</p>
          </div>
          <div>
            <div className="text-4xl mb-2">🛠️</div>
            <p className="font-semibold">Tech for Conservation</p>
          </div>
          <div>
            <div className="text-4xl mb-2">🤖</div>
            <p className="font-semibold">AI-Powered</p>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="bg-gray-100 py-12">
        <div className="max-w-5xl mx-auto grid gap-6 sm:grid-cols-3 px-6">
          <a
            href="/about"
            className="bg-white rounded-lg p-6 shadow hover:shadow-md transition"
          >
            📖 <strong>About the Project</strong>
          </a>
          <a
            href="/science"
            className="bg-white rounded-lg p-6 shadow hover:shadow-md transition"
          >
            🧠 <strong>Why It Works</strong>
          </a>
          <a
            href="/ngo-toolkit"
            className="bg-white rounded-lg p-6 shadow hover:shadow-md transition"
          >
            🔧 <strong>Use It on Your Site</strong>
          </a>
        </div>
      </section>
    </main>
  );
}
