



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

let slides=[];
async function fetchSlides() {
  try{
    const response=await fetch("./jsonFiles/heroData.json");
    slides=await response.json();
  }
  catch(error){
    console.error("Error Fetching Slides:",error);
  }
}

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
// 
const resultsContainer = document.getElementById('searchResults');
document.addEventListener("DOMContentLoaded", () => {
  // Store form configurations for each category
  const categoryConfigs = {
    Tours: {
      fields: [
        { type: "location", label: "Location", icon: "./public/Icon/location.svg" },
        { type: "date", label: "Check In", icon: "public/Icon/calender.svg", id: "checkIn" },
        { type: "date", label: "Check Out", icon: "./public/Icon/calender.svg", id: "checkOut" },
        { type: "guests", label: "Guests", icon: "./public/Icon/user.svg" },
      ],
      jsonFile: "tours.json",
      cardTemplate: renderTourCard
    },
    Hotels: {
      fields: [
        { type: "location", label: "Destination", icon: "./public/Icon/location.svg" },
        { type: "date", label: "Check In", icon: "public/Icon/calender.svg", id: "checkIn" },
        { type: "date", label: "Check Out", icon: "./public/Icon/calender.svg", id: "checkOut" },
        { type: "rooms", label: "Rooms & Guests", icon: "./public/Icon/user.svg" },
      ],
      jsonFile: "hotels.json",
      cardTemplate:renderHotelCard
    },
    Tickets: {
      fields: [
        { type: "location", label: "From", icon: "./public/Icon/location.svg" },
        { type: "location", label: "To", icon: "./public/Icon/location.svg" },
        { type: "date", label: "Departure", icon: "public/Icon/calender.svg", id: "checkIn" },
        { type: "passengers", label: "Passengers", icon: "./public/Icon/user.svg" },
      ],
      jsonFile: "tickets.json"
    },
    Rental: {
      fields: [
        { type: "location", label: "Pick-up Location", icon: "./public/Icon/location.svg" },
        { type: "date", label: "Pick-up Date", icon: "public/Icon/calender.svg", id: "checkIn" },
        { type: "date", label: "Drop-off Date", icon: "./public/Icon/calender.svg", id: "checkOut" },
        { type: "vehicle", label: "Vehicle Type", icon: "./public/Icon/user.svg" },
      ],
      jsonFile: "rental.json"
    },
    Activities: {
      fields: [
        { type: "location", label: "Location", icon: "./public/Icon/location.svg" },
        { type: "date", label: "Date", icon: "public/Icon/calender.svg", id: "checkIn" },
        { type: "activity", label: "Activity Type", icon: "./public/Icon/user.svg" },
        { type: "participants", label: "Participants", icon: "./public/Icon/user.svg" },
      ],
      jsonFile: "activities.json"
    }
  };

  // Current active category
  let currentCategory = "Tours";

  // Category Buttons Active State
  const categoryButtons = document.querySelectorAll(".selectBtn");
  
  categoryButtons.forEach(button => {
    button.addEventListener("click", () => {
      resultsContainer.innerHTML = '';
      // Update button styles
      categoryButtons.forEach(btn => {
        btn.classList.remove("bg-black", "text-white", "px-2", "md:px-4", "py-2", "rounded-xl", "md:rounded-3xl", "font-semibold");
        btn.classList.add("text-gray-600", "px-1.5", "md:px-4", "rounded-md", "hover:text-black");
      });
      button.classList.remove("text-gray-600", "px-1.5", "rounded-md", "hover:text-black");
      button.classList.add("bg-black", "text-white", "px-2", "md:px-4", "py-2", "rounded-xl", "md:rounded-3xl", "font-semibold");
      
      // Update current category and rebuild form
      currentCategory = button.textContent.trim();
      buildFormForCategory(currentCategory);
    });
  });

  // Function to build form fields based on selected category
  function buildFormForCategory(category) {
    const formElement = document.querySelector('form');
    const config = categoryConfigs[category];
    
    // Store the original search button HTML
    const searchButtonHTML = `
      <section onclick="document.getElementById('searchBtn').click()" class="border-4 font-bold text-white ml-4 rounded-full bg-black flex justify-center items-center w-max gap-1 p-4 hover:scale-105 hover:cursor-pointer transition">
        <img src="./public/Icon/search.svg" alt="search icon">
        <input id="searchBtn" type="submit" value="Search" aria-label="Search Button">
      </section>
    `;
    
    // Clear the form
    formElement.innerHTML = '';
    
    // Create and append form fields
    config.fields.forEach((field, index) => {
      const fieldSection = createFormField(field, index > 0);
      formElement.appendChild(fieldSection);
    });
    
    // Add the search button back
    const searchButtonContainer = document.createElement('div');
    searchButtonContainer.innerHTML = searchButtonHTML;
    formElement.appendChild(searchButtonContainer.firstElementChild);
    
    // Re-initialize date inputs functionality
    setupDateInputs();
    
    // Re-initialize guest options
    setupGuestOptions();
  }

  // Create a form field based on field configuration
  function createFormField(field, addBorder = false) {
    const section = document.createElement('section');
    section.className = `flex flex-col justify-center items-start gap-2 ${addBorder ? 'border-[#E4E6E8] md:border-l-2 md:px-4' : ''}`;
    
    const label = document.createElement('div');
    label.className = 'font-semibold text-[#737373] md:text-xs';
    label.textContent = field.label;
    
    const inputContainer = document.createElement('section');
    inputContainer.className = 'flex justify-center items-center gap-1';
    
    const icon = document.createElement('img');
    icon.src = field.icon;
    icon.alt = `${field.label.toLowerCase()} icon`;
    
    let input;
    
    switch (field.type) {
      case 'date':
        input = document.createElement('input');
        input.type = 'date';
        input.className = 'font-semibold md:text-xs';
        input.setAttribute('aria-label', 'date input');
        if (field.id) {
          input.id = field.id;
        }
        input.required = true;
        break;
        
      case 'location':
        input = document.createElement('select');
        input.className = 'md:text-xs font-semibold';
        input.setAttribute('aria-label', 'select location');
        addOptions(input, ['New York,USA', 'Tokyo,JAPAN', 'Delhi,INDIA']);
        break;
        
      case 'guests':
      case 'passengers':
      case 'participants':
        input = document.createElement('select');
        input.className = 'md:text-xs font-semibold';
        input.setAttribute('aria-label', 'select guest');
        // Options will be added in setupGuestOptions()
        break;
        
      case 'rooms':
        input = document.createElement('select');
        input.className = 'md:text-xs font-semibold';
        input.setAttribute('aria-label', 'select rooms');
        addOptions(input, ['1 Room, 2 Guests', '2 Rooms, 4 Guests', 'Suite, 2 Guests']);
        break;
        
      case 'vehicle':
        input = document.createElement('select');
        input.className = 'md:text-xs font-semibold';
        input.setAttribute('aria-label', 'select vehicle');
        addOptions(input, ['Economy', 'SUV', 'Luxury', 'Van']);
        break;
        
      case 'activity':
        input = document.createElement('select');
        input.className = 'md:text-xs font-semibold';
        input.setAttribute('aria-label', 'select activity');
        addOptions(input, ['Sightseeing', 'Adventure', 'Cultural', 'Relaxation']);
        break;
        
      default:
        input = document.createElement('input');
        input.type = 'text';
        input.className = 'font-semibold md:text-xs';
        break;
    }
    
    inputContainer.appendChild(icon);
    inputContainer.appendChild(input);
    
    section.appendChild(label);
    section.appendChild(inputContainer);
    
    return section;
  }

  // Helper to add options to select elements
  function addOptions(selectElement, options) {
    options.forEach(option => {
      const optionElement = document.createElement('option');
      optionElement.value = option;
      optionElement.textContent = option;
      optionElement.className = 'md:text-xs font-semibold';
      optionElement.setAttribute('aria-label', option);
      selectElement.appendChild(optionElement);
    });
  }

  // Date Inputs: Prevent Past Dates
  function setupDateInputs() {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); // Adjust for time zone
    const formattedToday = today.toISOString().split("T")[0]; // Get local date
    
    const checkInInput = document.querySelector("#checkIn");
    const checkOutInput = document.querySelector("#checkOut");
    
    if (checkInInput) {
      checkInInput.setAttribute("min", formattedToday);
      
      // Update checkout min date dynamically when check-in changes
      checkInInput.addEventListener("change", () => {
        if (checkOutInput) {
          const checkInDate = checkInInput.value;
          checkOutInput.setAttribute("min", checkInDate);
      
          // If checkout date is before the selected check-in date, reset it
          if (checkOutInput.value < checkInDate) {
            checkOutInput.value = checkInDate;
          }
        }
      });
    }
    
    if (checkOutInput) {
      checkOutInput.setAttribute("min", formattedToday);
    }
  }

  // Guest Selection: Dynamic Options
  function setupGuestOptions() {
    const guestSelect = document.querySelector("select[aria-label='select guest']");
    
    if (guestSelect) {
      const guestOptions = [
        "1 Adult",
        "2 Adults",
        "2 Adults, 1 Child",
        "2 Adults, 2 Children",
        "3 Adults, 1 Child",
        "4 Adults"
      ];
      
      guestSelect.innerHTML = guestOptions.map(option => `<option value="${option}">${option}</option>`).join("");
    }
  }

  // Set up search button event listener
  function setupSearchButton() {
    const searchBtn = document.querySelector("#searchBtn");
    if (searchBtn) {
      searchBtn.addEventListener("click", async (e) => {
        e.preventDefault();
        
        try {
          // Get location value
          const locationSelect = document.querySelector("select[aria-label='select location']");
          const location = locationSelect ? locationSelect.value : "Unknown";
          
          // Try to fetch data from the appropriate JSON file
          const jsonFile = categoryConfigs[currentCategory].jsonFile;
          
          try {
            const response = await fetch(jsonFile);
            
            if (!response.ok) {
              throw new Error(`Failed to fetch ${jsonFile}`);
            }
            
            const data = await response.json();
            
            // Display search results
            displaySearchResults(data, location);
          } catch (error) {
            console.error("Error fetching data:", error);
            // If JSON fetch fails, just show a simple alert
            alert(`Searching for ${currentCategory} in ${location}`);
          }
        } catch (error) {
          console.error("Search error:", error);
          alert("An error occurred during search. Please try again.");
        }
      });
    }
  }

  // Display search results
  function displaySearchResults(data, location) {
    // Get the existing results container
    
    
    if (!resultsContainer) {
      console.error("Search results container not found!");
      return;
    }
    
    // Clear previous results
    resultsContainer.innerHTML = '';
    
    // Add heading
    const heading = document.createElement('h2');
    heading.textContent = `${currentCategory} Search Results for ${location}`;
    heading.className = 'text-2xl font-bold mb-4';
    resultsContainer.appendChild(heading);
    
    // Filter data by location if possible
    let filteredData = data;
    try {
      filteredData = data.filter(item => 
        item.location && item.location.includes(location.split(',')[0])
      );
      
      // If no results after filtering, use all data
      if (filteredData.length === 0) {
        filteredData = data.slice(0, 6); // Show first 6 items
      }
    } catch (e) {
      console.error("Error filtering data:", e);
      filteredData = data.slice(0, 6);
    }
    
    // Check if we have results
    if (filteredData.length === 0) {
      const noResults = document.createElement('div');
      noResults.className = 'text-center py-12 bg-gray-50 rounded-lg';
      noResults.innerHTML = `
        <svg class="w-16 h-16 mx-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
        </svg>
        <h3 class="mt-4 text-lg font-medium text-gray-900">No results found</h3>
        <p class="mt-2 text-gray-500">Try adjusting your search criteria or explore other options.</p>
      `;
      resultsContainer.appendChild(noResults);
      return;
    }
    
    // Create results grid with your specific layout
    const resultsGrid = document.createElement('section');
    resultsGrid.className = 'flex justify-center flex-wrap items-center sm:w-[100%] lg:w-[75%] gap-6 mb-20';
    
    // Render cards based on current category
    filteredData.forEach(item => {
      let card;
      
      switch(currentCategory) {
        case 'Tours':
          card = renderTourCard(item);
          break;
        case 'Hotels':
          card = renderHotelCard(item);
          break;
        case 'Tickets':
          card = renderTicketCard(item);
          break;
        case 'Rental':
          card = renderRentalCard(item);
          break;
        case 'Activities':
          card = renderActivityCard(item);
          break;
        default:
          card = renderTourCard(item); // Default to tour card
      }
      
      resultsGrid.appendChild(card);
    });
    
    resultsContainer.appendChild(resultsGrid);
    
    // Scroll to results
    resultsContainer.scrollIntoView({ behavior: 'smooth' });
  }
  
  // Tour card renderer
  function renderTourCard(tour) {
    const card = document.createElement('article');
    card.className = 'shadow-lg w-70 rounded-3xl overflow-hidden border-2 border-[#E4E6E8] bg-white hover:scale-105 transform transition';
    
    // Determine badge color class based on badge text
    let badgeColorClass = 'text-[#F09814]'; // Default to orange/gold
    let badgeText = 'Top Rated';
    
    if (tour.badge) {
      badgeText = tour.badge.text;
      if (badgeText === 'Best Sale') {
        badgeColorClass = 'text-[#3DC262]'; // Green for "Best Sale"
      }
    }
    
    card.innerHTML = `
      <section class="relative">
        <figure><img src="${tour.image || '/public/images/journey2.png.png'}" alt="${tour.name}" class="w-full h-48 object-cover"></figure>
        <span class="absolute top-2 left-2 bg-white ${badgeColorClass} px-3 py-1 text-xs font-semibold rounded-lg">${badgeText}</span>
        <button aria-label="Wishlist" class="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
          <img src="./public/Icon/love.svg" alt="love icon">
        </button>
        <div class="z-10 absolute bottom-1 right-3 bg-white text-black border-2 border-[#E4E6E8] px-2 py-1 text-xs font-semibold rounded-xl">
          ⭐ ${tour.rating || '4.96'} <span class="text-[#737373]">(${tour.reviewCount || '672'} reviews)</span>
        </div>
      </section>
      <section class="p-4 pt-6 bg-white rounded-t-3xl -translate-y-4 gap-2">
        <h3 class="text-lg font-semibold">${tour.name}</h3>
        <p class="text-gray-500 text-sm flex items-center mt-1.5">
          <img src="./public/Icon/duration.svg" alt="clock icon">
          ${tour.duration || '2 days 3 nights'} &nbsp; &nbsp;
          <img src="./public/Icon/user.svg" alt="user icon">
          ${tour.guests || '4-6 guest'}</p>
        <div class="flex justify-between items-center gap-1.5">
          <p class="mt-2 font-bold">$${tour.price || '48.25'} <span class="text-gray-500 text-sm font-normal">/ person</span></p>
          <button aria-label="Book Now" class="mt-2 bg-[#F2F4F6] border-[#E4E6E8] border-2 text-black p-2 rounded-2xl transition-all duration-300 hover:border-black hover:bg-white hover:text-black hover:border-[2px] hover:scale-105">Book Now</button>
        </div>
      </section>
    `;
    
    return card;
  }

  function renderHotelCard(hotel) {
    const card = document.createElement('article');
    card.className = 'shadow-lg w-70 rounded-3xl overflow-hidden border-2 border-[#E4E6E8] bg-white hover:scale-105 transform transition';
    
    // Determine badge color class based on hotel rating
    let badgeColorClass = 'text-[#3DC262]'; // Green for high ratings
    let badgeText = 'Popular';
    
    if (hotel.rating && hotel.rating >= 4.8) {
      badgeText = 'Top Rated';
      badgeColorClass = 'text-[#F09814]';
    } else if (hotel.price && hotel.price < 100) {
      badgeText = 'Best Deal';
      badgeColorClass = 'text-[#3DC262]';
    }
    
    const amenities = hotel.amenities ? hotel.amenities.slice(0, 3).join(' • ') : 'WiFi • Parking • Breakfast';
    
    card.innerHTML = `
      <section class="relative">
        <figure><img src="${hotel.image || '/public/images/journey3.png.png'}" alt="${hotel.name}" class="w-full h-48 object-cover"></figure>
        <span class="absolute top-2 left-2 bg-white ${badgeColorClass} px-3 py-1 text-xs font-semibold rounded-lg">${badgeText}</span>
        <button aria-label="Wishlist" class="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
          <img src="./public/Icon/love.svg" alt="love icon">
        </button>
        <div class="z-10 absolute bottom-1 right-3 bg-white text-black border-2 border-[#E4E6E8] px-2 py-1 text-xs font-semibold rounded-xl">
          ⭐ ${hotel.rating || '4.7'} <span class="text-[#737373]">(${hotel.reviewCount || '452'} reviews)</span>
        </div>
      </section>
      <section class="p-4 pt-6 bg-white rounded-t-3xl -translate-y-4 gap-2">
        <h3 class="text-lg font-semibold">${hotel.name}</h3>
        <p class="text-gray-500 text-sm flex items-center mt-1.5">
          <img src="./public/Icon/location.svg" alt="location icon">
          ${hotel.location} &nbsp; &nbsp;
          <span class="text-xs bg-gray-100 px-2 py-1 rounded">${amenities}</span>
        </p>
        <div class="flex justify-between items-center gap-1.5">
          <p class="mt-2 font-bold">$${hotel.price || '120'} <span class="text-gray-500 text-sm font-normal">/ night</span></p>
          <button aria-label="Book Now" class="mt-2 bg-[#F2F4F6] border-[#E4E6E8] border-2 text-black p-2 rounded-2xl transition-all duration-300 hover:border-black hover:bg-white hover:text-black hover:border-[2px] hover:scale-105">Book Now</button>
        </div>
      </section>
    `;
    
    return card;
  }

  // Initialize the form with the default category (Tours)
  setupDateInputs();
  setupGuestOptions();
  
  // Add event listener for the search button after initial page load
  document.addEventListener('DOMContentLoaded', () => {
    setupSearchButton();
  });
  
  // Also set up the search button now in case the page is already loaded
  setupSearchButton();
  
  // Create mock JSON data if files don't exist
  function createMockData() {
    // Sample data for each category
    const mockData = {
      tours: [
        { id: 1, name: "City Exploration Tour", location: "New York, USA", price: 149, duration: "3 hours", rating: 4.8 },
        { id: 2, name: "Central Park Walking Tour", location: "New York, USA", price: 79, duration: "2 hours", rating: 4.6 },
        { id: 3, name: "Tokyo Historical District Tour", location: "Tokyo, JAPAN", price: 120, duration: "4 hours", rating: 4.9 },
        { id: 4, name: "Delhi Heritage Walk", location: "Delhi, INDIA", price: 65, duration: "3 hours", rating: 4.7 }
      ],
      hotels: [
        { id: 1, name: "Grand Plaza Hotel", location: "New York, USA", price: 299, rating: 4.5, amenities: ["Pool", "Spa", "Restaurant"] },
        { id: 2, name: "Tokyo Skyline Hotel", location: "Tokyo, JAPAN", price: 350, rating: 4.8, amenities: ["Pool", "Gym", "Restaurant"] },
        { id: 3, name: "Delhi Comfort Inn", location: "Delhi, INDIA", price: 120, rating: 4.3, amenities: ["Restaurant", "WiFi"] }
      ],
      tickets: [
        { id: 1, name: "New York to Tokyo", location: "New York → Tokyo", price: 1200, duration: "14 hours" },
        { id: 2, name: "Tokyo to Delhi", location: "Tokyo → Delhi", price: 950, duration: "8 hours" },
        { id: 3, name: "Delhi to New York", location: "Delhi → New York", price: 1100, duration: "16 hours" }
      ],
      rental: [
        { id: 1, name: "Economy Car", location: "New York, USA", price: 49, type: "Economy" },
        { id: 2, name: "Luxury Sedan", location: "Tokyo, JAPAN", price: 120, type: "Luxury" },
        { id: 3, name: "Family SUV", location: "Delhi, INDIA", price: 85, type: "SUV" }
      ],
      activities: [
        { id: 1, name: "Broadway Show", location: "New York, USA", price: 150, type: "Cultural", duration: "3 hours" },
        { id: 2, name: "Mount Fuji Hike", location: "Tokyo, JAPAN", price: 95, type: "Adventure", duration: "8 hours" },
        { id: 3, name: "Taj Mahal Visit", location: "Delhi, INDIA", price: 75, type: "Sightseeing", duration: "5 hours" }
      ]
    };
    
    // Store mock data in localStorage for use during search
    localStorage.setItem('mockTravelData', JSON.stringify(mockData));
    
    return mockData;
  }
  
  // Override fetch to use mock data if needed
  const originalFetch = window.fetch;
  window.fetch = function(url, options) {
    if (url.endsWith('.json')) {
      // Extract category from URL
      const category = url.split('.')[0].toLowerCase();
      
      // Try to get mock data
      const mockDataString = localStorage.getItem('mockTravelData');
      if (mockDataString) {
        const mockData = JSON.parse(mockDataString);
        if (mockData[category]) {
          console.log(`Using mock data for ${category}`);
          return Promise.resolve({
            ok: true,
            json: () => Promise.resolve(mockData[category])
          });
        }
      }
    }
    
    // Fall back to original fetch
    return originalFetch.apply(this, arguments);
  };
  
  // Create mock data on page load
  createMockData();
});
