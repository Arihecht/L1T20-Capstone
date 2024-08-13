// JQuery 
$(document).ready(function () {

  // Function to animate the header, navbar, and h3 on page load
  const animateHeaderNavbar = () => {
    $('.header').addClass('header-show'); // Add class to show header
    $('.navbar').addClass('navbar-show'); // Add class to show navbar
    $('.navbar h3').addClass('h3-show'); // Add class to show h3
  }

  // Call the function to animate the header and navbar
  animateHeaderNavbar();

  // Function to handle saving items
  $('.save-button').click(function () {
    try {
      const title = $(this).data('title');
      const id = $(this).data('content');
      const url = window.location.href; // Get the URL of the current page
      const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
      savedItems.push({ title: title, id: id, url: url }); // Store the URL along with title and ID
      localStorage.setItem('savedItems', JSON.stringify(savedItems));

      const numSavedItems = savedItems.length; // Count the number of saved items
      alert('Item saved for later! You now have ' + numSavedItems + ' item(s) in your "Saved for later" folder.');
      loadSavedItems(); // Reload saved items list
    } catch (error) {
      console.error('Error saving item:', error);
      alert('Failed to save the item. Please try again.');
    }
  });

  // Function to remove saved items
  $(document).on('click', '.remove-button', function () {
    const index = $(this).data('index'); // Get the index of the item to remove
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    savedItems.splice(index, 1); // Remove the item at the specified index
    localStorage.setItem('savedItems', JSON.stringify(savedItems)); // Update the saved items in local storage
    loadSavedItems(); // Reload saved items list
  });

  // Function to load saved items
  const loadSavedItems = () => {
    const savedItems = JSON.parse(localStorage.getItem('savedItems')) || [];
    const savedList = $('#saved-list');

    savedList.empty(); // Clear existing list
    if (savedItems.length === 0) {
      savedList.append('<li>No items saved yet.</li>');
    } else {
      savedItems.forEach(function (item, index) {
        // Create a link back to the original item using the stored URL
        const link = $('<a>').attr('href', item.url).text(item.title);
        const removeButton = $('<button>').addClass('remove-button').text('Remove').data('index', index);
        savedList.append($('<li>').append(link).append(removeButton));
      });
    }
  };

  loadSavedItems(); // Load saved items on page load

  // Like button click event handler
  $('.likeThisBtn').click(function () {
    const likedItems = JSON.parse(sessionStorage.getItem('likedItems')) || [];
    const target = $(this).closest('.exercise').attr('id');
    const name = $(this).closest('.exercise-content').find('h1').text();
    const page = window.location.pathname;

    // Check if the item is already liked
    const alreadyLiked = likedItems.some(function (item) {
      return item.name === name;
    });

    if (alreadyLiked) {
      alert("You've already liked this item.");
    } else {
      const link = page + "#" + target;
      const newLike = { name: name, link: link };
      likedItems.push(newLike);
      sessionStorage.setItem('likedItems', JSON.stringify(likedItems));
      alert('Item liked!');
    }
  });

  // Function to handle contact form submission
  $('#contactForm').submit(function (event) {
    event.preventDefault(); // Prevent form submission

    const formData = {
      name: $('#name').val(), // Get value of name input field
      email: $('#email').val(), // Get value of email input field
      message: $('#message').val() // Get value of message input field
    };

    // Retrieve existing contact form data from session storage or initialize an empty array
    const contactFormData = JSON.parse(sessionStorage.getItem('contactFormData')) || [];

    // Add new form data to the array
    contactFormData.push(formData);

    // Store the updated contact form data in session storage
    sessionStorage.setItem('contactFormData', JSON.stringify(contactFormData));

    // Alert the user that the form has been submitted
    alert('Form submitted successfully!');

    // Optionally, clear the form fields
    $('#name').val('');
    $('#email').val('');
    $('#message').val('');
  });

  // Function for the toggle button at footer of index.html
  $('#toggleFooterButton').click(function () {
    $('.footer').toggleClass('hidden'); // Toggle the 'hidden' class on the footer element
  });
});







