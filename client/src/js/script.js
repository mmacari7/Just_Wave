const url = 'http://localhost:3000';

// Set up data we will append to the post/result section for each post/search
const resultBox = res => 
   `<div class="message-container">
      <div class="message-text">${res.message}</div>
      <div class="message-sender">${res.user}</div>
   </div>`;


window.onload = () => {
   socket = io(url);

   socket.on('receive', data => {
      let newElem = document.createElement('div');
      newElem.className = 'elem';
      newElem.innerHTML = resultBox(data);
      posts.appendChild(newElem);
   });

   socket.on('failed', data => {
      alert("failed" + data);
   });

   socket.on('valid', () => {
      username.disabled = true;  // Once the username is submitted the first time, prevent user from changing it.
   });

   // Listen for data to be sumbitted through form.
   searchForm.addEventListener('submit', element => {
      element.preventDefault();
      // Make sure fields have data.
      if (username.value && message.value) {
         // Send the query.
         socket.emit('search', {
            username: username.value,
            message: message.value
         });
         // Reset
         message.value = "";
      } 
      else {
         alert('You must fill out both fields before submitting.');
      }
   });
};