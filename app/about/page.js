export default function About() {
    return (
      <main className="px-6 py-16 max-w-4xl mx-auto text-gray-200">
        <h1 className="text-4xl font-bold mb-6 text-center">About the Project</h1>
  
        {/* Intro Paragraph */}
        <p className="text-lg mb-8 leading-relaxed text-center">
          This app was created to explore how emotionally engaging, AI-driven storytelling
          can increase involvement in wildlife conservation. By interacting with simulated
          animal personas, users build a stronger emotional connection to wildlife, gaining
          insight into their daily lives, challenges, and the threats they face.
        </p>
  
        {/* Development Story */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-3">Where the Idea Came From</h2>
          <p className="text-md leading-relaxed text-gray-300">
            This concept emerged from a simple question: <em>What if people could hear
            directly from the animals themselves?</em> With advances in AI language models, we saw
            an opportunity to build a tool that speaks with the voice of the voiceless,
            making animal conservation more personal and emotional.
          </p>
        </div>
  
        {/* Timeline */}
        <div className="mb-0">
          <h2 className="text-2xl font-semibold mb-4">Project Timeline</h2>
          <ul className="border-l-2 border-green-600 pl-4 space-y-6">
            <li>
              <div className="text-green-700 font-semibold">April 2025</div>
              <div>Conceptualized and brainstormed the idea of AI-driven animal empathy</div>
            </li>
            <li>
              <div className="text-green-700 font-semibold">May 2025</div>
              <div>User research, psychological grounding, and UX design sketches</div>
            </li>
            <li>
              <div className="text-green-700 font-semibold">June 2025</div>
              <div>Demo chatbot and website built</div>
            </li>
            <li>
              <div className="text-green-700 font-semibold">June 2025+</div>
              <div>Outreach and pilot testing with conservation organizations</div>
            </li>
          </ul>
        </div>
  
        {/* Our Team Section */}
        <section className="pt-16 bg-transparent p-6 rounded-lg text-gray-200">
          <hr className="border-t border-white mb-8" />
          <h2 className="text-3xl font-bold text-center mb-6">Our Team</h2>
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <img
              src="/images/founder.png"
              alt="Founder"
              className="w-32 h-32 object-cover rounded-md"
            />
            <div>
              <h3 className="text-lg font-semibold mb-2">Safwaan Majid</h3>
              <p>
                Safwaan is the creator of ZooQuest, built during a student hackathon to explore the power
                of empathy in conservation. As a high school student passionate about AI and sustainability,
                he hopes to help others connect emotionally with wildlife. In his free time, he mentors students
                in coding and leads youth service initiatives in his community.
              </p>
            </div>
          </div>
          <hr className="border-t border-white mt-8" />
        </section>
      </main>
    );
  }
  