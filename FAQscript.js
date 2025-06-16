document.addEventListener('DOMContentLoaded', function() {
  const faqAccordion = document.getElementById('faq-accordion');
  // Fetch FAQ data from JSON file
  fetch('./jsonFiles/travelFAQ.json')
    .then(response => response.json())
    .then((data) => {
      // Create FAQ items
      data.forEach(faq => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq-item border border-gray-200 rounded-lg overflow-hidden';
        faqItem.innerHTML = `
          <button class="faq-question w-full flex justify-between items-center p-5 text-left bg-white hover:bg-gray-50 transition-colors">
            <span class="font-medium text-lg">${faq.question}</span>
            <svg class="faq-icon w-5 h-5 transition-transform duration-300" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          <div class="faq-answer overflow-hidden max-h-0 transition-all duration-300">
            <div class="p-5 bg-gray-50 border-t border-gray-200">
              <p>${faq.answer}</p>
            </div>
          </div>
        `;
        
        faqAccordion.appendChild(faqItem);
      });
      
      // Add click event listeners to FAQ questions
      const faqItems = document.querySelectorAll('.faq-item');
      
      faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer') ;
        const icon = item.querySelector('.faq-icon') ;
        
        question.addEventListener('click', () => {
          // Check if this item is already open
          const isOpen = answer.classList.contains('active');
          
          // Close all items
          faqItems.forEach(otherItem => {
            const otherAnswer = otherItem.querySelector('.faq-answer');
            const otherIcon = otherItem.querySelector('.faq-icon');
            
            otherAnswer.classList.remove('active');
            otherAnswer.style.maxHeight = '0';
            otherIcon.style.transform = 'rotate(0)';
          });
          
          // If the clicked item wasn't open, open it
          if (!isOpen) {
            answer.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + 'px';
            icon.style.transform = 'rotate(180deg)';
          }
        });
      });
    })
    .catch(error => console.error('Error loading FAQ data:', error));
  });