document.getElementById("emailForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("userName").value;
    const email = document.getElementById("userEmail").value;
    const button = event.target.querySelector('button');
    button.disabled = true;
    button.style.backgroundColor = '#66bb6a';

    fetch("https://api.emailjs.com/api/v1.0/email/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            service_id: emailConfig.service_id,  // משתמש במפתחות מ-c42.js
            template_id: emailConfig.template_id, // משתמש במפתחות מ-c42.js
            user_id: emailConfig.user_id,         // משתמש במפתחות מ-c42.js
            template_params: { to_email: email, to_name: name }
        })
    })
    .then(response => {
        if (response.ok) {
            alert("✅ המייל נשלח בהצלחה!");
        } else {
            alert("❌ אירעה שגיאה בשליחת המייל.");
        }
        button.disabled = false;
        button.style.backgroundColor = '#45a049';
    })
    .catch(error => {
        console.error("Error:", error);
        button.disabled = false;
        button.style.backgroundColor = '#45a049';
    });
});
