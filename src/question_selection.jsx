 



// Function to shuffle an array
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]]; // Swap
    }
    return array;
  }
  
  // Select 30 random questions
  export function getRandomQuestions(questions, numQuestions) {
    const shuffledQuestions = shuffle(questions);
    return shuffledQuestions.slice(0, numQuestions);
  }
  

  
  


 