import { useState, useEffect } from 'react';
import lunr from 'lunr';

const faqData = [
  {
    id: 1,
    category: 'General',
    question: 'What is React?',
    answer: 'React is a JavaScript library for building user interfaces.',
  },
  {
    id: 2,
    category: 'General',
    question: 'What is Vite?',
    answer:
      'Vite is a build tool that aims to provide a faster and leaner development experience for modern web projects.',
  },
  {
    id: 3,
    category: 'Setup',
    question: 'How to install React?',
    answer: 'You can install React using npm or yarn with create-react-app.',
  },
];

const index = lunr(function () {
  this.ref('id');
  this.field('question', { boost: 10 });
  this.field('answer');

  this.pipeline.remove(lunr.stemmer);
  this.searchPipeline.remove(lunr.stemmer);

  faqData.forEach((doc) => this.add(doc));
});

export default function FAQApp() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [results, setResults] = useState(faqData);
  const [expanded, setExpanded] = useState(null);

  useEffect(() => {
    if (searchQuery === '') {
      setResults(
        category === 'All'
          ? faqData
          : faqData.filter((faq) => faq.category === category)
      );
    } else {
      handleSearch();
    }
  }, [searchQuery, category]);

  const handleSearch = () => {
    const searchResults = index.search(`*${searchQuery}*`);
    const matchedIds = searchResults.map((result) => parseInt(result.ref));
    setResults(faqData.filter((faq) => matchedIds.includes(faq.id)));
  };

  const highlightText = (text, query) => {
    if (!query) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.split(regex).map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-yellow-300">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <input
        type="text"
        placeholder="Search FAQs..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border p-2 w-full rounded mb-2"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full rounded mb-4"
      >
        <option value="All">All Categories</option>
        <option value="General">General</option>
        <option value="Setup">Setup</option>
      </select>
      <div>
        {results.map(({ id, question, answer }) => (
          <div key={id} className="border-b p-2">
            <div
              className="cursor-pointer font-bold"
              onClick={() => setExpanded(expanded === id ? null : id)}
            >
              {highlightText(question, searchQuery)}
            </div>
            {expanded === id && (
              <p className="text-gray-700 mt-2">
                {highlightText(answer, searchQuery)}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
