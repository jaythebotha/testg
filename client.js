document.getElementById('roblox-form').addEventListener('submit', async (event) => {
    event.preventDefault();
  
    const username = document.getElementById('username').value;
  
    try {
      const response = await fetch('/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: `username=${encodeURIComponent(username)}`
      });
  
      if (!response.ok) {
        throw new Error('Error sending info to server.');
      }
  
      alert('Info sent to Discord!');
    } catch (error) {
      console.error(error);
      alert('Error sending info to Discord.');
    }
  });