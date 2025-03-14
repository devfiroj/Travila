



// Mobile view submenu
document.addEventListener("DOMContentLoaded", function () {
    // Navbar toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    menuToggle.addEventListener('click', function(event) {
        event.stopPropagation();
        mobileMenu.classList.toggle('hidden');  
    });


    // Mobile view submenu
    const menuItems = document.querySelectorAll(".menu-item");
    menuItems.forEach(item => {
      item.addEventListener("click", function (event) {
        event.stopPropagation();
        const submenu = this.nextElementSibling;
        const allSubmenus = document.querySelectorAll(".submenu");
        allSubmenus.forEach(sub => {
          if (sub !== submenu) {
            sub.classList.add("hidden");
          }
        });
        submenu.classList.toggle("hidden");
      });
    });
    // To hide the menu when click outside 
    document.addEventListener('click', function(event) {
        if (!mobileMenu.contains(event.target) && !menuToggle.contains(event.target)) {
            mobileMenu.classList.add('hidden');
            langOptions.classList.add("hidden");
            currencyOptions.classList.add("hidden");
            
        }
    });

    //Language Option Select
    const langBtn = document.getElementById("langBtn");
    const langOptions = document.getElementById("langOptions");
    const selectedLang = document.getElementById("selectedLang");
    
    langBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        langOptions.classList.toggle("hidden");
    });
    
    document.querySelectorAll("#langOptions li").forEach(option => {
      option.addEventListener("click", function () {
        selectedLang.textContent = this.textContent;
        setTimeout(() => {
            langOptions.classList.add("hidden");
          }, 100);
        //optionsList.classList.add("hidden");
      });
    });
    
    document.addEventListener("click", (event) => {
      if (!langBtn.contains(event.target) && !langOptions.contains(event.target)) {
        langOptions.classList.add("hidden");
      }
    });

    // Currency Option Select
    const currencyBtn = document.getElementById("currencyBtn");
    const currencyOptions = document.getElementById("currencyOptions");
    const selectedCurrency = document.getElementById("selectedCurrency");
    
    currencyBtn.addEventListener("click", (event) => {
        event.stopPropagation();
        currencyOptions.classList.toggle("hidden");
    });
    
    document.querySelectorAll("#currencyOptions li").forEach(option => {
      option.addEventListener("click", function () {
        selectedCurrency.textContent = this.textContent;
        setTimeout(() => {
            langOptions.classList.add("hidden");
          }, 100);
        //optionsList.classList.add("hidden");
      });
    });
    
    document.addEventListener("click", (event) => {
      if (!currencyBtn.contains(event.target) && !currencyOptions.contains(event.target)) {
        currencyOptions.classList.add("hidden");
      }
    });
});

let slides = []; // Declare slides globally
async function fetchSlides() {
    try {
        const response = await fetch("./jsonFiles/heroData.json"); // Fetch JSON data
        slides = await response.json(); // Store data in slides array

        console.log(slides); // Verify that data is loaded
    } catch (error) {
        console.error("Error fetching slides:", error);
    }
}
// Call the function to load slides
fetchSlides();

let currentSlide = 0;
const heroSlider = document.getElementById("hero-slider");
const heroBadge = document.getElementById("hero-badge");
const heroTitle = document.getElementById("hero-title");
const heroDescription = document.getElementById("hero-description");
const prevBtn = document.getElementById("prev-slide");
const nextBtn = document.getElementById("next-slide");
const indicatorsContainer = document.getElementById("slide-indicators");

// Create slide indicators
slides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("w-3", "h-3", "rounded-full", "bg-white/50", "cursor-pointer", "transition", "duration-300");
  if (index === 0) dot.classList.add("bg-white");
  dot.setAttribute("data-index", index);
  indicatorsContainer.appendChild(dot);
});

const updateSlide = (index) => {
  heroSlider.style.opacity = "0";

  setTimeout(() => {
    heroSlider.style.backgroundImage = `url('${slides[index].image}')`;
    heroBadge.textContent = slides[index].badge;
    heroTitle.textContent = slides[index].title;
    heroDescription.textContent = slides[index].description;
    heroSlider.style.opacity = "1";

    // Update indicators
    document.querySelectorAll("#slide-indicators div").forEach((dot, i) => {
      dot.classList.toggle("bg-white", i === index);
      dot.classList.toggle("bg-white/50", i !== index);
    });

  }, 800); // Matches transition duration
};

prevBtn.addEventListener("click", () => {
  currentSlide = (currentSlide - 1 + slides.length) % slides.length;
  updateSlide(currentSlide);
});

nextBtn.addEventListener("click", () => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide(currentSlide);
});

// Auto-slide every 4 seconds
setInterval(() => {
  currentSlide = (currentSlide + 1) % slides.length;
  updateSlide(currentSlide);
}, 6000);

// Click event for indicators
document.querySelectorAll("#slide-indicators div").forEach(dot => {
  dot.addEventListener("click", (e) => {
    currentSlide = parseInt(e.target.getAttribute("data-index"));
    updateSlide(currentSlide);
  });
});



// document.addEventListener('DOMContentLoaded', function() {
//   // Elements
//   const heroSection = document.getElementById('hero-slider');
//   const heroBadge = document.getElementById('hero-badge');
//   const heroTitle = document.getElementById('hero-title');
//   const heroDescription = document.getElementById('hero-description');
//   const prevButton = document.getElementById('prev-slide');
//   const nextButton = document.getElementById('next-slide');
//   const indicatorsContainer = document.getElementById('slide-indicators');
  
//   let heroData = [];
//   let currentSlide = 0;
//   let slideInterval;
//   const autoSlideDelay = 5000; // 5 seconds
  
//   // Fetch the hero data from JSON
//   fetch('jsonFileheroData.json')
//     .then(response => {
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
//       return response.json();
//     })
//     .then(data => {
//       heroData = data;
//       initializeSlider();
//     })
//     .catch(error => {
//       console.error('Error loading hero data:', error);
//       // Fallback to a default slide if fetch fails
//       heroData = [{
//         badge: "🌎 Explore the World",
//         title: "Your Gateway to Extraordinary Adventures",
//         description: "Pack your bags and let Travila redefine your travel experience. Where every journey is a story waiting to be told",
//         image: "./public/images/Background.png"
//       }];
//       initializeSlider();
//     });
  
//   function initializeSlider() {
//     // Create slide indicators
//     heroData.forEach((_, index) => {
//       const indicator = document.createElement('button');
//       indicator.classList.add('h-2', 'w-2', 'rounded-full', 'bg-white/50');
//       indicator.addEventListener('click', () => goToSlide(index));
//       indicatorsContainer.appendChild(indicator);
//     });
    
//     // Set up event listeners for navigation
//     prevButton.addEventListener('click', prevSlide);
//     nextButton.addEventListener('click', nextSlide);
    
//     // Initialize the first slide
//     updateSlide();
    
//     // Start auto-sliding
//     startAutoSlide();
//   }
  
//   function updateSlide() {
//     const slide = heroData[currentSlide];
    
//     // Update content
//     heroBadge.textContent = slide.badge;
//     heroTitle.textContent = slide.title;
//     heroDescription.textContent = slide.description;
    
//     // Update background image with fade effect
//     heroSection.style.backgroundImage = `url('${slide.image}')`;
    
//     // Update indicators
//     const indicators = indicatorsContainer.querySelectorAll('button');
//     indicators.forEach((indicator, index) => {
//       if (index === currentSlide) {
//         indicator.classList.remove('bg-white/50');
//         indicator.classList.add('bg-white');
//       } else {
//         indicator.classList.remove('bg-white');
//         indicator.classList.add('bg-white/50');
//       }
//     });
//   }
  
//   function nextSlide() {
//     currentSlide = (currentSlide + 1) % heroData.length;
//     updateSlide();
//     resetAutoSlide();
//   }
  
//   function prevSlide() {
//     currentSlide = (currentSlide - 1 + heroData.length) % heroData.length;
//     updateSlide();
//     resetAutoSlide();
//   }
  
//   function goToSlide(index) {
//     currentSlide = index;
//     updateSlide();
//     resetAutoSlide();
//   }
  
//   function startAutoSlide() {
//     slideInterval = setInterval(nextSlide, autoSlideDelay);
//   }
  
//   function resetAutoSlide() {
//     clearInterval(slideInterval);
//     startAutoSlide();
//   }
  
//   // Add keyboard navigation
//   document.addEventListener('keydown', function(e) {
//     if (e.key === 'ArrowLeft') {
//       prevSlide();
//     } else if (e.key === 'ArrowRight') {
//       nextSlide();
//     }
//   });
// });

//Search form
document.addEventListener("DOMContentLoaded", () => {
  // Category Buttons Active State
  const categoryButtons = document.querySelectorAll(".selectBtn");
  
  categoryButtons.forEach(button => {
      button.addEventListener("click", () => {
          categoryButtons.forEach(btn => {
              btn.classList.remove("bg-black", "text-white", "px-2", "md:px-4", "py-2", "rounded-xl", "md:rounded-3xl", "font-semibold");
              btn.classList.add("text-gray-600", "px-1.5", "md:px-4", "rounded-md", "hover:text-black");
          });
          button.classList.remove("text-gray-600", "px-1.5", "rounded-md", "hover:text-black");
          button.classList.add("bg-black", "text-white", "px-2", "md:px-4", "py-2", "rounded-xl", "md:rounded-3xl", "font-semibold");
      });
  });

  // Date Inputs: Prevent Past Dates
  const today = new Date();
  today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); // Adjust for time zone
  const formattedToday = today.toISOString().split("T")[0]; // Get local date
  
  const checkInInput = document.querySelector("#checkIn");
  const checkOutInput = document.querySelector("#checkOut");
  console.log(checkInInput);
  // Ensure both inputs have a valid min value at the start
  checkInInput.setAttribute("min", formattedToday);
  checkOutInput.setAttribute("min", formattedToday);
  
  // Update checkout min date dynamically when check-in changes
  checkInInput.addEventListener("change", () => {
      const checkInDate = checkInInput.value;
      checkOutInput.setAttribute("min", checkInDate);
  
      // If checkout date is before the selected check-in date, reset it
      if (checkOutInput.value < checkInDate) {
          checkOutInput.value = checkInDate;
      }
  });
  
  

  // Guest Selection: Dynamic Options
  const guestSelect = document.querySelector("select[aria-label='select guest']");
  const guestOptions = [
      "1 Adult",
      "2 Adults",
      "2 Adults, 1 Child",
      "2 Adults, 2 Children",
      "3 Adults, 1 Child",
      "4 Adults"
  ];

  guestSelect.innerHTML = guestOptions.map(option => `<option value="${option}">${option}</option>`).join("");

  // Search Button Action
  document.querySelector("#searchBtn").addEventListener("click", (e) => {
      e.preventDefault();
      alert(`Searching for trips in ${document.querySelector("select[aria-label='select location']").value}`);
  });
});
