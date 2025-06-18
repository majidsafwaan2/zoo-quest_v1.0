export default function Science() {
    return (
      <main className="px-6 py-16 max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold mb-6 text-center">Why It Works</h1>
  
        {/* Psychological Background */}
        <section className="mb-10">
          <p className="text-lg leading-relaxed text-center">
            Research shows that emotionally engaging, narrative-based experiences — especially
            those that foster empathy — significantly increase conservation behavior.
            This chatbot builds empathy by allowing users to interact with AI-simulated animal
            perspectives, creating a personal connection with wildlife.
          </p>
        </section>
  
        {/* Linked Sources */}
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4 text-center">Key Research</h2>
          <ul className="space-y-4 text-blue-700 underline text-md text-center">
            <li>
              <a href="https://doi.org/10.1111/0022-4537.00174" target="_blank" rel="noopener noreferrer">
                Schultz, P. W. (2000). *Empathizing with Nature: Effects of Perspective‑Taking on Environmental Concern*
              </a>
            </li>
            <li>
              <a href="https://doi.org/10.1002/zoo.21086" target="_blank" rel="noopener noreferrer">
                Skibins, J. C. & Powell, R. B. (2013). *Conservation Caring: Influence of Zoo Visitors’ Connection to Wildlife on Behavior*
              </a>
            </li>
            <li>
              <a href="https://files.eric.ed.gov/fulltext/EJ1280995.pdf" target="_blank" rel="noopener noreferrer">
                Skibins & Powell (2013) – Full-text version of emotional connection research in conservation
              </a>
            </li>
          </ul>
        </section>
  
        {/* Optional Stat Block */}
        <section className="bg-green-100 rounded-lg px-6 py-10 text-center shadow">
          <p className="text-xl font-semibold text-green-800 mb-2">
            🐢 42% more likely to donate
          </p>
          <p className="text-gray-700 max-w-xl mx-auto">
            Emotional, story-based engagement — especially when it includes perspective-taking —
            has been shown to significantly increase pro-environmental behavior and conservation support.
          </p>
        </section>
      </main>
    );
  }
  