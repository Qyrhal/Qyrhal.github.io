gapi.load("client:auth2", function() {
    gapi.auth2.init({
      client_id: "770203611137-01sj4p6oot3qcsbdbgem6p32v8ehf2p1.apps.googleusercontent.com",
      scope: "https://www.googleapis.com/auth/gmail.send"
    });
  });

  function sendEmail() {
    gapi.client.load("gmail", "v1", function() {
      const email = document.getElementById("email").value;
      const emailAddress = `${email}@example.com`;

      const request = gapi.client.gmail.users.messages.send({
        userId: "me",
        resource: {
          raw: btoa(
            "From: sender@example.com\r\n" +
              "To: " +
              emailAddress +
              "\r\n" +
              "Subject: Hello World\r\n\r\n" +
              "Hello World!"
          ).replace(/\+/g, "-").replace(/\//g, "_")
        }
      });

      request.execute(function(response) {
        console.log(response);
      });
    });
  }