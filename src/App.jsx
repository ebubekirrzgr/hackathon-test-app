import React, { useState } from 'react';
import data from '../data.json';

import WebApp from '@twa-dev/sdk';

const BotApp = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedQuestion, setSelectedQuestion] = useState(null);

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setSelectedQuestion(null); // Yeni kategori seçildiğinde soruyu sıfırla
  };

  const handleQuestionSelect = (question) => {
    setSelectedQuestion(question);
  };

  return (
    <div>
      <button onClick={() => WebApp.showAlert(`Hello World!`)}>
        Show Alert
      </button>
      <h1>TON Bot</h1>
      {!selectedCategory && (
        <div>
          <h2>Kategori Seçin:</h2>
          {Object.keys(data).map((category) => (
            <button
              key={category}
              onClick={() => handleCategorySelect(category)}
            >
              {category}
            </button>
          ))}
        </div>
      )}

      {selectedCategory && !selectedQuestion && (
        <div>
          <h2>{selectedCategory} Soruları:</h2>
          {data[selectedCategory].map((question, index) => (
            <button
              key={index}
              onClick={() => handleQuestionSelect(question.question)}
            >
              {question.question}
            </button>
          ))}
        </div>
      )}

      {selectedQuestion && (
        <div>
          <h2>Cevap:</h2>
          <p>
            {
              data[selectedCategory].find(
                (q) => q.question === selectedQuestion
              )?.answer
            }
          </p>
        </div>
      )}
    </div>
  );
};

export default BotApp;
