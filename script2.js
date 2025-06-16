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

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js').then((registration) => {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch((error) => {
      console.log('Service Worker registration failed:', error);
    });
  });
}


//Slides
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


//const categoryButtons = document.querySelectorAll(".selectBtn");
document.addEventListener("DOMContentLoaded", () => {
// Category Buttons Active State
const categoryButtons = document.querySelectorAll(".selectBtn");
//console.log(categoryButtons);
let currentCategory="tours";
let resultsContainer=document.getElementById("searchResults");

const toursForm = document.getElementById("toursForm");
const hotelsForm = document.getElementById("hotelsForm");
const ticketsForm = document.getElementById("ticketsForm");
const rentalForm = document.getElementById("rentalForm");
const activitiesForm = document.getElementById("activitiesForm");

setupDateInputs(currentCategory);


categoryButtons.forEach(button => {
  button.addEventListener("click", () => {
    resultsContainer.innerHTML = '';
    // Update button styles
    categoryButtons.forEach(btn => {
      btn.classList.remove("bg-black", "text-white", "px-2", "md:px-4", "py-2", "rounded-xl", "md:rounded-3xl", "font-semibold");
      btn.classList.add("text-gray-600", "px-1.5", "md:px-4", "rounded-md", "hover:text-black");
      let formId =btn.textContent.trim().toLowerCase()+"Form";
      //console.log(formId);
      document.getElementById(formId).setAttribute("hidden","true");
    });

    let formId = button.textContent.trim().toLowerCase()+"Form";
    console.log(formId);
    document.getElementById(formId).removeAttribute("hidden");
    button.classList.remove("text-gray-600", "px-1.5", "rounded-md", "hover:text-black");
    button.classList.add("bg-black", "text-white", "px-2", "md:px-4", "py-2", "rounded-xl", "md:rounded-3xl", "font-semibold");
    
    // Update current category and rebuild form
    currentCategory = button.textContent.trim().toLowerCase();
    setupDateInputs(currentCategory);
    //buildFormForCategory(currentCategory);
  });

});
function setupDateInputs(currentCategory) {
    const today = new Date();
    today.setMinutes(today.getMinutes() - today.getTimezoneOffset()); // Adjust for time zone
    const formattedToday = today.toISOString().split("T")[0]; // Get local date
    if(currentCategory=="tours"||currentCategory=="hotels"||currentCategory=="rental"){
        const checkInInput = document.querySelector(`#${currentCategory}checkIn`);
        const checkOutInput = document.querySelector(`#${currentCategory}checkOut`);
        checkInInput.value="";
        checkOutInput.value="";
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
    else if(currentCategory=="tickets" || currentCategory=="activities"){
        const checkInInput = document.querySelector(`#${currentCategory}checkIn`);
        checkInInput.setAttribute("min", formattedToday);
        checkInInput.value="";
    }
    
}


//setup Location
async function setupLocation() {
  const toursLoc = document.querySelector("#toursLocation");
  const hotelsLoc = document.querySelector("#hotelsLocation");
  const ticketsFromLoc = document.querySelector("#ticketsFromLoc");
  const ticketsToLoc = document.querySelector("#ticketsToLoc");
  const rentalLoc = document.querySelector("#pickUpLoc");
  const activitiesLoc = document.querySelector("#activitiesLoc");

  try {
      const response = await fetch('./jsonFiles/locations.json'); // Make sure the path is correct
      if (!response.ok) {
          throw new Error("Failed to fetch locations.");
      }
      
      const locations = await response.json(); // Await the JSON parsing
      console.log(locations);

      const optionsHTML = locations.map(option => `<option value="${option.location}">${option.location}</option>`).join("");

      // Populate all dropdowns
      [toursLoc, hotelsLoc, ticketsFromLoc, ticketsToLoc, rentalLoc, activitiesLoc].forEach(dropdown => {
          if (dropdown) dropdown.innerHTML = optionsHTML;
      });

  } catch (error) {
      console.error("Error loading locations:", error);
  }
}

// Call the function after DOM loads
setupLocation();


setupLocation();

toursForm.addEventListener("submit",async function(e){
    e.preventDefault();
    try {
        //clear previous result
        resultsContainer.innerHTML = '';

        // Get location value
        const locationSelect = document.querySelector("#toursLocation");
        const location = locationSelect ? locationSelect.value : "Unknown";
        console.log(location);
        try {
          const response = await fetch('./jsonFiles/tours.json');
          if (!response.ok) {
            throw new Error(`Failed to fetch ${jsonFile}`);
          }
          const tourData = await response.json();
          console.log(typeof tourData);
          
          let locFilteredTours= tourData?.filter(item =>
            item.location && item.location.includes(location.split(',')[0])
          );
          if(locFilteredTours.length===0){
            renderNoResult();
          }
          else{
            // Add heading
            const heading = document.createElement('h2');
            heading.textContent = `Tours Search Results for ${location}`;
            heading.className = 'text-2xl font-bold mb-8';
            resultsContainer.appendChild(heading);
            // Create results grid with your specific layout
            const resultsGrid = document.createElement('section');
            resultsGrid.className = 'flex justify-center flex-wrap items-center sm:w-[100%] lg:w-[75%] gap-6 mb-20';
            // Render cards based on current category
            locFilteredTours.forEach(item => {
            let card;
            card = renderTourCard(item);
            resultsGrid.appendChild(card);
            });
            resultsContainer.appendChild(resultsGrid);
    
            // Scroll to results
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
          }
    
        } catch (error) {
          console.error("Error fetching data:", error);
          // If JSON fetch fails, just show a simple alert
          alert(`Searching for ${currentCategory} in ${location}`);
        }
      } catch (error) {
        console.error("Search error:", error);
        alert("An error occurred during search. Please try again.");
    }
})
    //render No result found
    function renderNoResult(){
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


  hotelsForm.addEventListener("submit",async function (e) {
    e.preventDefault();
    try {
        //clear previous result
        resultsContainer.innerHTML = '';

        // Get location value
        const locationSelect = document.querySelector("#hotelsLocation");
        const location = locationSelect ? locationSelect.value : "Unknown";

        const hotelsCheckIn=document.querySelector("#hotelscheckIn").value;
        console.log(hotelsCheckIn);

        const hotelsCheckOut=document.querySelector("#hotelscheckOut").value;
        console.log(hotelsCheckOut);
        try {
          const response = await fetch('./jsonFiles/hotels.json');
          if (!response.ok) {
            throw new Error(`Failed to fetch ${jsonFile}`);
          }
          const hotelsData = await response.json();
          console.log(typeof hotelsData);
          
          let filteredHotels= hotelsData?.filter(hotel =>
            hotel.location && hotel.location.includes(location.split(',')[0])
            && isHotelAvailable(hotel, hotelsCheckIn, hotelsCheckOut)
          );
          //console.log(filteredHotels);
          if(filteredHotels.length===0){
            renderNoResult();
          }
          else{
            // Add heading
            const heading = document.createElement('h2');
            heading.textContent = `Available Hotels in ${location}`;
            heading.className = 'text-2xl font-bold mb-8';
            resultsContainer.appendChild(heading);
            // Create results grid with your specific layout
            const resultsGrid = document.createElement('section');
            resultsGrid.className = 'flex justify-center flex-wrap items-center sm:w-[100%] lg:w-[75%] gap-6 mb-20';
            // Render cards based on current category
            filteredHotels.forEach(hotel => {
            let card;
            card = renderHotelCard(hotel);
            resultsGrid.appendChild(card);
            });
            resultsContainer.appendChild(resultsGrid);
    
            // Scroll to results
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
          }
        } catch (error) {
          console.error("Error fetching data:", error);
          // If JSON fetch fails, just show a simple alert
          alert(`Searching for ${currentCategory} in ${location}`);
        }
      } catch (error) {
        console.error("Search error:", error);
        alert("An error occurred during search. Please try again.");
    }    
  })

  //Checks in Hotel is available
  function isHotelAvailable(hotel, checkIn, checkOut) {
    const checkInDate = parseDate(checkIn);
    const checkOutDate = parseDate(checkOut);
  
    return !hotel.bookings.some(booking => {
      const bookedStartDate = parseDate(booking[0]); // Correct first element
      const bookedEndDate = parseDate(booking[1]);   // Correct second element
        console.log(bookedStartDate,bookedEndDate);
      // Proper overlap check
      return (
        (checkInDate >= bookedStartDate && checkInDate < bookedEndDate) || // Check-in falls within a booked range
        (checkOutDate > bookedStartDate && checkOutDate <= bookedEndDate) || // Check-out falls within a booked range
        (checkInDate <= bookedStartDate && checkOutDate >= bookedEndDate) // Requested range fully covers a booked range
      );
    });
  }
  
  //
  function parseDate(dateStr) {
    const [day, month, year] = dateStr.split("/").map(Number);
    return new Date(year, month - 1, day); // Month is 0-based in JS
  }
  
    function renderHotelCard(hotel){
    console.log("At render hotel");

    const card = document.createElement('article');
    card.className = 'shadow-lg w-70 rounded-3xl overflow-hidden border-2 border-[#E4E6E8] bg-white hover:scale-105 transform transition';
    
    // Determine badge color class based on badge text
    let badgeColorClass = 'text-[#F09814]'; // Default to orange/gold
    let badgeText = 'Top Rated';
    
    if (hotel.badge) {
      badgeText = hotel.badge.text;
      if (badgeText === 'Best Sale') {
        badgeColorClass = 'text-[#3DC262]'; // Green for "Best Sale"
      }
    }
    
    card.innerHTML = `
      <section class="relative">
        <figure><img src="${hotel.image || '/public/images/journey2.png.png'}" alt="${hotel.name}" class="w-full h-48 object-cover"></figure>
        <span class="absolute top-2 left-2 bg-white ${badgeColorClass} px-3 py-1 text-xs font-semibold rounded-lg">${badgeText}</span>
        <button aria-label="Wishlist" class="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
          <img src="./public/Icon/love.svg" alt="love icon">
        </button>
        <div class="z-10 absolute bottom-1 right-3 bg-white text-black border-2 border-[#E4E6E8] px-2 py-1 text-xs font-semibold rounded-xl">
          ⭐ ${hotel.rating || '4.96'} <span class="text-[#737373]">(${hotel.reviewCount || '672'} reviews)</span>
        </div>
      </section>
      <section class="p-4 pt-6 bg-white rounded-t-3xl -translate-y-4 gap-2">
        <h3 class="text-lg font-semibold">${hotel.name}</h3>
        <p class="text-gray-500 text-sm flex items-center mt-1.5">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 22 18"> <path fill="black" fill-rule="evenodd" d="M18.67 9.038a10.705 10.705 0 0 0-15.388 0 .585.585 0 0 1-.86 0 .617.617 0 0 1 0-.88 11.917 11.917 0 0 1 17.108 0 .617.617 0 0 1 0 .88c-.099.125-.246.176-.418.176a.623.623 0 0 1-.443-.176zm-2.926 3.293a6.437 6.437 0 0 0-4.621-1.96c-1.745 0-3.368.703-4.621 1.96a.585.585 0 0 1-.86 0 .617.617 0 0 1 0-.88 7.65 7.65 0 0 1 5.48-2.313c2.066 0 4.008.83 5.482 2.313a.617.617 0 0 1 0 .88c-.098.126-.27.176-.417.176a.623.623 0 0 1-.443-.176zm5.187-6.888a13.859 13.859 0 0 0-19.886 0 .585.585 0 0 1-.86 0 .617.617 0 0 1 0-.88c5.948-6.084 15.657-6.084 21.63 0a.617.617 0 0 1-.442 1.056.623.623 0 0 1-.442-.176zM9.796 17.233a2.128 2.128 0 0 1 0-2.941c.762-.78 2.113-.78 2.876 0a2.128 2.128 0 0 1 0 2.941 2.006 2.006 0 0 1-1.426.604c-.541 0-1.057-.227-1.45-.604zm.86-2.061a.848.848 0 0 0 0 1.181c.32.327.86.327 1.155 0a.848.848 0 0 0 0-1.181.705.705 0 0 0-.565-.252.79.79 0 0 0-.59.252z"></path> </svg>
            Free Wifi &nbsp; &nbsp;
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="12" viewBox="0 0 22 17"> <path fill="black" fill-rule="evenodd" d="M20.172 0H1.832C.823 0 0 .792 0 1.767v6.422c0 .971.823 1.763 1.832 1.763h18.336C21.177 9.952 22 9.16 22 8.189V1.767C22.004.792 21.181 0 20.172 0zm.712 8.277a.61.61 0 0 1-.617.604H1.737a.61.61 0 0 1-.617-.604V1.683a.61.61 0 0 1 .617-.604h18.526a.61.61 0 0 1 .617.604v6.594h.004zm-2.315-1.85H3.435c-.338 0-.61.218-.61.49 0 .27.272.49.61.49h15.13c.338 0 .61-.22.61-.49 0-.272-.272-.49-.606-.49zm-4.965-3.001H8.049c-.124 0-.224.219-.224.49 0 .27.1.49.224.49h5.553c.124 0 .224-.22.224-.49 0-.271-.1-.49-.222-.49zm-9.03 8.996a3.31 3.31 0 0 0-.291-.559c-.148-.213-.08-.495.154-.63a.529.529 0 0 1 .69.14c.1.145.242.392.38.72.488 1.153.55 2.383-.103 3.545a4.304 4.304 0 0 1-.666.885.534.534 0 0 1-.706.04.43.43 0 0 1-.044-.645 3.39 3.39 0 0 0 .526-.697c.503-.896.454-1.866.06-2.8zm3.599 0a3.31 3.31 0 0 0-.292-.559c-.148-.213-.079-.495.155-.63a.529.529 0 0 1 .69.14c.1.145.241.392.38.72.487 1.153.55 2.383-.103 3.545a4.304 4.304 0 0 1-.667.885.534.534 0 0 1-.706.04.43.43 0 0 1-.043-.645 3.39 3.39 0 0 0 .526-.697c.503-.896.454-1.866.06-2.8zm9.002 0c-.394.933-.443 1.903.06 2.8.135.24.309.472.525.696a.43.43 0 0 1-.043.645.534.534 0 0 1-.706-.04 4.304 4.304 0 0 1-.666-.885c-.653-1.162-.59-2.392-.104-3.545.14-.328.28-.575.38-.72a.529.529 0 0 1 .69-.14c.234.135.303.417.155.63a3.31 3.31 0 0 0-.291.559zm-3.603 0c-.395.933-.443 1.903.06 2.8.135.24.309.472.525.696a.43.43 0 0 1-.043.645.534.534 0 0 1-.706-.04 4.304 4.304 0 0 1-.666-.885c-.653-1.162-.59-2.392-.104-3.545.14-.328.28-.575.38-.72a.529.529 0 0 1 .69-.14c.234.135.303.417.155.63a3.31 3.31 0 0 0-.291.559z"></path> </svg>
           AC</p>
        <div class="flex justify-between items-center gap-1.5">
          <p class="mt-2 font-bold">$${hotel.price || '48.25'} <span class="text-gray-500 text-sm font-normal">/ night</span></p>
          <button aria-label="Book Now" class="mt-2 bg-[#F2F4F6] border-[#E4E6E8] border-2 text-black p-2 rounded-2xl transition-all duration-300 hover:border-black hover:bg-white hover:text-black hover:border-[2px] hover:scale-105">Book Now</button>
        </div>
      </section>
    `;
    
    return card;
  }


// Tikets Form

ticketsForm.addEventListener("submit",async function(e){
    e.preventDefault();
    try {
        //clear previous result
        resultsContainer.innerHTML = '';

        // Get location value
        const fromLocation = document.querySelector("#ticketsFromLoc").value;
        const toLocation = document.querySelector("#ticketsToLoc").value;
        //console.log(location);
        try {
          const response = await fetch('./jsonFiles/tickets.json');
          if (!response.ok) {
            throw new Error(`Failed to fetch tickets jsonFile`);
          }
          const ticketsData = await response.json();
          console.log(ticketsData);
          
          let locFilteredTickets= ticketsData?.filter(item =>
           item.from===fromLocation && item.to===toLocation
          );
          if(locFilteredTickets.length===0){
            renderNoResult();
          }
          else{
            // Add heading
            const heading = document.createElement('h2');
            heading.textContent = `Tickets from ${fromLocation} to ${toLocation}`;
            heading.className = 'text-2xl font-bold mb-8';
            resultsContainer.appendChild(heading);
            // Create results grid with your specific layout
            const resultsGrid = document.createElement('section');
            resultsGrid.className = 'flex justify-center flex-wrap items-center sm:w-[100%] lg:w-[75%] gap-6 mb-20';
            // Render cards based on current category
            locFilteredTickets.forEach(item => {
            let card;
            card = renderTicketCard(item);
            resultsGrid.appendChild(card);
            });
            resultsContainer.appendChild(resultsGrid);
    
            // Scroll to results
            resultsContainer.scrollIntoView({ behavior: 'smooth' });
          }
    
        } catch (error) {
          console.error("Error fetching data:", error);
          // If JSON fetch fails, just show a simple alert
          alert(`Searching for ${currentCategory} in ${location}`);
        }
      } catch (error) {
        console.error("Search error:", error);
        alert("An error occurred during search. Please try again.");
    }
})  


    //render Ticket Card

    function renderTicketCard(flight){
        console.log("At render ticket");

    const card = document.createElement('article');
    card.className = 'shadow-lg w-80 rounded-3xl overflow-hidden border-2 border-[#E4E6E8] bg-white hover:scale-105 transform transition';
    
    card.innerHTML = `
      <section class="relative h-52">
            <figure>
                <img src="${flight.image}" w-full h-48>
            </figure>
            <!-- Heart icon -->
            <button class="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                </svg>
            </button>
        </section>
        <!-- Details Section -->
        <section class="p-4 pt-6 bg-white rounded-t-3xl -translate-y-4 gap-2">
            <div class="text-md text-gray-600 flex justify-between">
                <span>${flight.time}</span>
                <span>${flight.time}</span>
            </div>
            <div class="flex items-center justify-between mt-2">
                <span class="font-semibold text-gray-800 text-xl">${flight.from}</span>
                <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_1_11956)">
                    <path d="M19.6602 5L21.6602 7M21.6602 7L19.6602 9M21.6602 7H7.66016" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M5.66016 19L3.66016 17M3.66016 17L5.66016 15M3.66016 17H17.6602" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M3.66016 11C3.66016 8.79086 5.45102 7 7.66016 7" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                    <path d="M21.6602 13C21.6602 15.2091 19.8693 17 17.6602 17" stroke="black" stroke-width="1.5" stroke-linecap="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_1_11956">
                    <rect width="24" height="24" fill="white" transform="translate(0.660156)"/>
                    </clipPath>
                    </defs>
                  </svg>
                <span class="font-semibold text-gray-800 text-xl">${flight.to}</span>
            </div>
            <div class="flex justify-between">
                <div>
                    <p class="text-gray-500 text-sm mt-2">Business</p>
                    <p class="mt-2 font-bold text-lg">$${flight.bPrice}</p>
                </div>
                <div>
                    <p class="text-gray-500 text-sm mt-2">Economy</p>
                    <p class="mt-2 font-bold text-lg">$${flight.ePrice}</p>
                </div>
            </div>
            <div class="flex justify-between items-center">
                <p class="text-gray-600 mt-1">18 Seats left</p>
                <button aria-label="Book Now" class="mt-4 bg-[#F2F4F6] border-[#E4E6E8] border-2 text-black text-semibold px-4 py-2 rounded-2xl transition-all duration-300 hover:border-black hover:bg-white hover:text-black hover:scale-105 w-fit">Book Now</button>
            </div>
        </section>
    `;
    
    return card;
    }







//Top Searched Destination
  async function renderTopSearchedDestination(){
    const topSearchDestinationContainer = document.querySelector("#topSearchedDestination");

    const tsdResultsGrid=document.createElement("section");
    tsdResultsGrid.className="flex flex-wrap justify-center items-center w-[80%] gap-2 mt-1";

    try {
        const response = await fetch('./jsonFiles/topSearchedDestination.json');
        if (!response.ok) {
          throw new Error(`Failed to fetch jsonFile`);
        }
        const tsdData =await response.json();
        //console.log(typeof hotelsData);

        if(tsdData.length===0)console.log("No Data on Top Search destination");

        else{
            // Render cards based on current category
            tsdData.forEach(data => {
                let card;
                card = rendertsdCard(data);
                tsdResultsGrid.appendChild(card);
            });
            topSearchDestinationContainer.appendChild(tsdResultsGrid); 
        }

    }catch(error){
        console.error(error);
    }

    // 
    
  }
    function rendertsdCard(data){
    const card = document.createElement('section');
    card.className = 'flex items-center justify-between p-3 bg-white rounded-2xl border-[#E4E6E8] border-2 w-60 hover:scale-105 transition';
    card.innerHTML=`
            <section class="flex items-center gap-2.5">
              <!-- Circular Image -->
              <img
                src="${data.image}"
                alt="${data.destination} image"
                class="w-16 h-16 rounded-full object-cover"
              />

              <!-- Text Content -->
              <article>
                <h2 class="font-semibold">${data.destination}</h2>
                <p class="text-gray-500 text-sm flex items-center gap-1">
                  <img src="./public/Icon/flag.svg" alt="flag icon">
                  ${data.tours} Tours
                </p>
              </article>
            </section>

            <!-- Arrow Button -->
            <button aria-label="Arrow Button"
              class="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full cursor-pointer"
            >
            <img src="./public/Icon/rightArrow.svg" alt="right arrow icon">
            </button>`;
        return card;
    }
    renderTopSearchedDestination();



    //Filter Section


  const categorySelect = document.getElementById("oftCategories");
  const durationSelect = document.getElementById("oftDuration");
  const ratingSelect = document.getElementById("oftRatings");
  const priceSelect = document.getElementById("oftPrice");
  const tourContainer = document.getElementById("oftResultContainer");

  let toursData = [];

  // Fetch tour data from JSON file
  fetch("./jsonFiles/tours.json")
    .then((response) => response.json())
    .then((data) => {
      toursData = data;
      displayTours(toursData);
    })
    .catch((error) => console.error("Error loading tour data:", error));


    function displayTours(filteredTours) {
        tourContainer.innerHTML = "";
        
        if (filteredTours.length === 0) {
          tourContainer.innerHTML = "<p>No tours found.</p>";
          return;
        }
        filteredTours.forEach((tour) => {
            let card;
            //call render tours
            card= renderTourCard(tour);
            tourContainer.appendChild(card);
            
        })
    } 
    
    
    function filterTours() {
        let filtered = toursData.filter((tour) => {
          const matchesCategory = categorySelect.value === "Categories" || tour.category === categorySelect.value;
          const matchesDuration = durationSelect.value === "Duration" || tour.duration.includes(durationSelect.value);
          const matchesRating = ratingSelect.value === "Review/Rating" || Math.floor(tour.rating) == ratingSelect.value;
          const matchesPrice = priceSelect.value === "Price Range" || tour.price <= parseFloat(priceSelect.value);
          
          return matchesCategory && matchesDuration && matchesRating && matchesPrice;
        });
        displayTours(filtered);
    }

    categorySelect.addEventListener("change", filterTours);
    durationSelect.addEventListener("change", filterTours);
    ratingSelect.addEventListener("change", filterTours);
    priceSelect.addEventListener("change", filterTours);




    // Top Categories Of Tours


    // document.getElementById("tctViewMore").addEventListener("click", async function () {
    //     const response = await fetch("./jsonFiles/topCategoriesOfTours.json");
    //     const categories = await response.json();
    //     const container = document.getElementById("tctResultContainer");
        
    //     categories.forEach(category => {
    //         const card = document.createElement("article");
    //         card.className = "bg-white rounded-xl shadow-md overflow-hidden p-3 border-[#E4E6E8] border-[1px] hover:scale-105 transition w-40 md:w-auto opacity-0 transition-opacity duration-500";
            
    //         card.innerHTML = `
    //             <img src="${category.image}" alt="${category.category}" class="w-full h-20 object-cover rounded-xl">
    //             <h3 class="text-lg font-semibold">${category.category}</h3>
    //             <section class="flex justify-between items-center">
    //                 <p class="text-gray-500 text-xs">${category.tour} Tours, ${category.activities} Activities</p>
    //                 <button aria-label="Right Arrow" class="w-4 h-4 bg-gray-100 flex justify-center items-center rounded-full hover:bg-gray-200 cursor-pointer">
    //                     <img src="./public/Icon/rightArrow.svg" alt="rightArrow">
    //                 </button>
    //             </section>
    //         `;
            
    //         container.appendChild(card);
    //         setTimeout(() => {
    //             card.classList.remove("opacity-0");
    //         }, 100);
    //     });
    //     this.innerHTML="View Less"
    //     //this.style.display = "none"; // Hide the button after loading more cards
    // });

  const viewMoreBtn = document.getElementById("tctViewMore");
  const resultContainer = document.getElementById("tctResultContainer");
  let isExpanded = false;
  let extraCards = [];

  async function fetchCategories() {
    try {
      const response = await fetch("./jsonFiles/topCategoriesOfTours.json");
      if (!response.ok) throw new Error("Failed to load categories");
      return await response.json();
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  function createCategoryCard(category) {
    const card = document.createElement("article");
    card.className =
      "bg-white rounded-xl shadow-md overflow-hidden p-3 border-[#E4E6E8] border-[1px] hover:scale-105 transition w-40 md:w-auto opacity-0";
    card.innerHTML = `
      <img src="${category.image}" alt="${category.category}" class="w-full h-20 object-cover rounded-xl">
      <h3 class="text-lg font-semibold">${category.category}</h3>
      <section class="flex justify-between items-center">
        <p class="text-gray-500 text-xs">${category.tour} Tours, ${category.activities} Activities</p>
        <button aria-label="Right Arrow" class="w-4 h-4 bg-gray-100 flex justify-center items-center rounded-full hover:bg-gray-200 cursor-pointer">
          <img src="./public/Icon/rightArrow.svg" alt="rightArrow">
        </button>
      </section>
    `;
    return card;
  }

  async function toggleCategories() {
    if (!isExpanded) {
      // Fetch and show additional categories
      const categories = await fetchCategories();
      extraCards = categories.map(createCategoryCard);
      extraCards.forEach((card) => resultContainer.appendChild(card));

      // Apply fade-in effect
      setTimeout(() => {
        extraCards.forEach((card) => (card.style.opacity = "1"));
      }, 50);

      viewMoreBtn.innerHTML = `View Less
            <img src="./public/Icon/whiteRightArrow.svg" alt="white right arrow icon">`;
    } else {
      // Remove added cards with fade-out effect
      extraCards.forEach((card) => {
        card.style.opacity = "0";
        setTimeout(() => card.remove(), 300);
      });
      extraCards = [];

      viewMoreBtn.innerHTML = `View More
            <img src="./public/Icon/whiteRightArrow.svg" alt="white right arrow icon">`;
    }

    isExpanded = !isExpanded;
  }

  viewMoreBtn.addEventListener("click", toggleCategories);




  //Trending Destination

  async function renderTrendingDestination() {
    const container = document.getElementById("tdResultContainer");
    container.innerHTML = "";
    const response = await fetch("./jsonFiles/trendingDestination.json");
    const destinations = await response.json();

    if (destinations.length === 0) return;

    // Featured promotional card
    const promo = destinations[0];
    const promoCard = document.createElement("article");
    promoCard.className = "relative sm:col-span-2 lg:col-span-2 hover:scale-105 transition";
    promoCard.innerHTML = `
        <figure><img src="${promo.image}" alt="${promo.location}" class="w-full h-64 object-cover rounded-lg"></figure>
        <div class="absolute top-3 right-3 bg-white text-sm px-3 py-1 rounded-full shadow-md">
            <span class="font-semibold">${promo.promotions || 0} promotions</span>
        </div>
        <section class="hidden md:block md:absolute md:bottom-3 md:right-3 md:bg-white md:text-sm md:px-3 md:py-1 md:rounded shadow-md">
            <span class="text-gray-700">Promotion will end in</span>
            <div id="promo-timer" class="flex space-x-1 text-black font-bold"></div>
        </section>
        <article class="absolute bottom-3 left-3 bg-white p-3 rounded-lg shadow-md">
            <h3 class="font-semibold">${promo.location}</h3>
            <p class="text-gray-500 text-sm">${promo.tour} Tours, ${promo.activities} Activities</p>
        </article>
    `;
    container.appendChild(promoCard);

    // Countdown Timer (Based on endDate)
    const timerElement = document.getElementById("promo-timer");
    const endDate = new Date(promo.endDate);

    function updateTimer() {
        const now = new Date();
        now.setMinutes(now.getMinutes() - now.getTimezoneOffset());
        let timeRemaining = Math.floor((endDate - now) / 1000);

        if (timeRemaining <= 0) {
            timerElement.innerHTML = `<span>00</span>:<span>00</span>:<span>00</span>`;
            return;
        }

        const hours = String(Math.floor(timeRemaining / 3600)).padStart(2, "0");
        const minutes = String(Math.floor((timeRemaining % 3600) / 60)).padStart(2, "0");
        const seconds = String(timeRemaining % 60).padStart(2, "0");

        timerElement.innerHTML = `<span>${hours}</span>:<span>${minutes}</span>:<span>${seconds}</span>`;
    }

    setInterval(updateTimer, 1000);
    updateTimer();

    // Other destination cards
    destinations.slice(1).forEach(dest => {
        const card = document.createElement("article");
        card.className = "relative hover:scale-105 transition";
        card.innerHTML = `
            <figure><img src="${dest.image}" alt="${dest.location}" class="w-full h-64 object-cover rounded-lg"></figure>
            <div class="absolute bottom-3 left-3 bg-white p-3 rounded-lg shadow-md">
                <h3 class="font-semibold">${dest.location}</h3>
                <p class="text-gray-500 text-sm">${dest.tour} Tours, ${dest.activities} Activities</p>
            </div>
        `;
        container.appendChild(card);
    });
}

renderTrendingDestination();



//Get Inspiration

fetch('./jsonFiles/inspiration.json')
.then(response => response.json())
.then(articles => {
  const articlesContainer = document.getElementById('articles-container');
  
  // Generate article cards
  articles.forEach(article => {
    const articleCard = createArticleCard(article);
    articlesContainer.appendChild(articleCard);
  });
  
  // Set up scroll functionality
  const scrollLeftBtn = document.getElementById('scroll-left');
  const scrollRightBtn = document.getElementById('scroll-right');
  const cardWidth = 320; // Approximate width of a card + gap
  
  scrollLeftBtn.addEventListener('click', () => {
    articlesContainer.scrollBy({
      left: -cardWidth,
      behavior: 'smooth'
    });
  });
  
  scrollRightBtn.addEventListener('click', () => {
    articlesContainer.scrollBy({
      left: cardWidth,
      behavior: 'smooth'
    });
  });
})
.catch(error => console.error('Error loading articles:', error));

//
  // Function to create an article card
  function createArticleCard(article) {
    const card = document.createElement('article');
    card.className = 'shadow-lg w-[300px] flex-shrink-0 rounded-3xl overflow-hidden border-2 border-[#E4E6E8] bg-white hover:scale-105 transition';
    
    card.innerHTML = `
      <section class="relative">
        <figure><img src="${article.image}" alt="${article.title}" class="w-full h-48 object-cover"></figure>
        <span class="absolute top-2 left-2 bg-white px-3 py-1 text-xs font-semibold rounded-lg">${article.category}</span>
        <button aria-label="Wishlist" class="absolute top-2 right-2 bg-white p-1 rounded-full shadow-md">
          <img src="./public/Icon/love.svg" alt="love icon">
        </button>
      </section>
      <article class="p-4 pt-6 bg-white rounded-t-3xl -translate-y-4 gap-2">
        <p class="text-xs flex items-center">
          <img src="./public/Icon/calender.svg" alt="calender icon">
          ${article.date} &nbsp; &nbsp;
          <img src="./public/Icon/duration.svg" alt="duration icon">
          ${article.readTime} &nbsp; &nbsp;
          <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clip-path="url(#clip0_1_7340)">
            <mask id="mask0_1_7340" style="mask-type:luminance" maskUnits="userSpaceOnUse" x="0" y="0" width="17" height="17">
            <path d="M16.8604 0.0898438H0.860352V16.0898H16.8604V0.0898438Z" fill="white"/>
            </mask>
            <g mask="url(#mask0_1_7340)">
            <path d="M8.86035 14.0898C12.1741 14.0898 14.8604 11.4035 14.8604 8.08984C14.8604 4.77613 12.1741 2.08984 8.86035 2.08984C5.54664 2.08984 2.86035 4.77613 2.86035 8.08984C2.86035 9.08159 3.10097 10.0172 3.52702 10.8413L2.86035 14.0898L6.10888 13.4231C6.93304 13.8492 7.8686 14.0898 8.86035 14.0898Z" stroke="#8E8E8E" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M5.86702 8.08984H5.86035V8.09651H5.86702V8.08984Z" stroke="#8E8E8E" stroke-width="2.25" stroke-linejoin="round"/>
            <path d="M8.86702 8.08984H8.86035V8.09651H8.86702V8.08984Z" stroke="#8E8E8E" stroke-width="2.25" stroke-linejoin="round"/>
            <path d="M11.867 8.08984H11.8604V8.09651H11.867V8.08984Z" stroke="#8E8E8E" stroke-width="2.25" stroke-linejoin="round"/>
            </g>
            </g>
            <defs>
            <clipPath id="clip0_1_7340">
            <rect width="16" height="16" fill="white" transform="translate(0.860352 0.0898438)"/>
            </clipPath>
            </defs>
          </svg>
          ${article.comments} comments
        </p>
        <h3 class="text-lg font-semibold my-2">${article.title}</h3>  
        <section class="flex justify-between items-center gap-1.5">
          <section class="flex justify-center items-center gap-2">
            <img src="${article.authorImage}" alt="${article.author} image">
            <span class="text-sm font-normal">${article.author}</span>
          </section>
          
          <button aria-label="Keep Reading" class="mt-2 text-sm bg-[#F2F4F6] border-[#E4E6E8] border-2 text-black p-2 rounded-2xl transition-all duration-300 hover:border-black hover:bg-white hover:text-black hover:border-[2px] hover:scale-105">Keep Reading</button>
        </section>
      </article>
    `;
    
    return card;
  }

  document.getElementById("emailSubmitForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevents form submission
    let button = document.getElementById("emailSubmitBtn");
    button.value = "Subscribed!"; // Change button text
    
    setTimeout(() => {
        button.value = "Subscribe"; // Revert back after 2 sec
    }, 2000);

  });

  
  
})