var chatLog = [];
    var chatContainer = document.getElementById('chatContainer');
    var startBtn = document.getElementById('startBtn');
    var deleteChatBtn = document.getElementById('deleteChatBtn');
    var userName = "User";

    startBtn.addEventListener('click', function() {
      chatContainer.classList.remove('hidden');
      startBtn.style.display = 'none';

      setTimeout(function() {
        addMessage('Tajbir Islam', 'Hello! How can I assist you?');
      }, 1000);
    });

    document.getElementById('chatForm').addEventListener('submit', function(event) {
      event.preventDefault();

      var userInput = document.getElementById('userInput').value;
      addMessage(userName, userInput);
      document.getElementById('userInput').value = '';

      // Simulated chatbot response
      setTimeout(function() {
        if (userInput.toLowerCase().includes('my name is')) {
          userName = userInput.substring(userInput.indexOf('my name is') + 11).trim();
          addMessage('Tajbir Islam', 'Nice to meet you, ' + userName + '! How can I assist you?');
        } else {
          performGoogleSearch(userInput);
        }
      }, 1000);
    });

    deleteChatBtn.addEventListener('click', function() {
      var chatLogElement = document.getElementById('chatLog');
      chatLogElement.innerHTML = '';
      chatLog = [];
      localStorage.removeItem('chatLog');
    });

    function addMessage(sender, message) {
      var messageObj = {
        sender: sender,
        message: message
      };

      chatLog.push(messageObj);
      localStorage.setItem('chatLog', JSON.stringify(chatLog));

      var chatLogElement = document.getElementById('chatLog');
      var messageDiv = document.createElement('div');
      messageDiv.innerHTML = '<strong>' + sender + ':</strong> ' + message;
      chatLogElement.appendChild(messageDiv);
    }

    function performGoogleSearch(query) {
      if (query.toLowerCase().includes("founder") || query.toLowerCase().includes("owner") || query.toLowerCase().includes("creator")) {
        // Respond with the founder's name
        addMessage('Hi, i am Tajbir. I am owner and creator of this chatbot');
        return;
      }

      // Replace 'YOUR_API_KEY' with your actual Google Search API key
      var apiKey = 'AIzaSyAiMXmH4JFOyI1S6I9YqU1sixKeUKCnGsw';

      // Make an API request to the Google Search API with the user's query
      var apiUrl = 'https://www.googleapis.com/customsearch/v1?key=' + apiKey + '&cx=957bab57822fa415f&q=' + encodeURIComponent(query);

      // Use fetch or other AJAX methods to retrieve the search results
      fetch(apiUrl)
        .then(function(response) {
          return response.json();
        })
        .then(function(data) {
          // Extract and display the top search result
          if (data.items && data.items.length > 0) {
            var topResult = data.items[0];
            var resultMessage = 'Here is the top search result for "' + query + '":<br>';
            resultMessage += '<a href="' + topResult.link + '">' + topResult.title + '</a><br>';
            resultMessage += topResult.snippet + '<br>';

            addMessage('Tajbir Islam', resultMessage);
          } else {
            addMessage('Tajbir Islam', 'Sorry, no search results found for "' + query + '".');
          }
        })
        .catch(function(error) {
          console.log('Error:', error);
          addMessage('Tajbir Islam', 'Sorry, an error occurred while performing the search.');
        });
    }

    // Load chat history from localStorage if available
    if (localStorage.getItem('chatLog')) {
      chatLog = JSON.parse(localStorage.getItem('chatLog'));
      var chatLogElement = document.getElementById('chatLog');

      chatLog.forEach(function(messageObj) {
        var messageDiv = document.createElement('div');
        messageDiv.innerHTML = '<strong>' + messageObj.sender + ':</strong> ' + messageObj.message;
        chatLogElement.appendChild(messageDiv);
      });
    }