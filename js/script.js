// Wait until the page is fully loaded
document.addEventListener("DOMContentLoaded", function () {

  // Get form and table elements
  const joinForm = document.getElementById("joinForm");
  const resultTableBody = document.querySelector("#resultTable tbody");

  // =========================
  // FORM SUBMISSION SECTION
  // =========================
  if (joinForm) {
    joinForm.addEventListener("submit", function (event) {
      event.preventDefault(); // Prevent page refresh

      // Get user input values
      const fullName = document.getElementById("fullName").value.trim();
      const email = document.getElementById("email").value.trim();
      const age = document.getElementById("age").value.trim();
      const phone = document.getElementById("phone").value.trim();
      const plan = document.getElementById("plan").value;
      const visitTime = document.getElementById("visitTime").value;
      const message = document.getElementById("message").value.trim();

      // Get selected gender
      const genderInput = document.querySelector('input[name="gender"]:checked');
      const gender = genderInput ? genderInput.value : "Not selected";

      // Get selected interests
      const interestInputs = document.querySelectorAll('input[name="interests"]:checked');
      const interestsArray = [];

      interestInputs.forEach(function (item) {
        interestsArray.push(item.value);
      });

      const interests = interestsArray.length > 0 
        ? interestsArray.join(", ") 
        : "None selected";

      // Create structured data
      const formData = [
        { field: "Full Name", value: fullName },
        { field: "Email Address", value: email },
        { field: "Age", value: age },
        { field: "Phone Number", value: phone },
        { field: "Gender", value: gender },
        { field: "Fitness Interests", value: interests },
        { field: "Membership Plan", value: plan },
        { field: "Preferred Visit Time", value: visitTime },
        { field: "Fitness Goal / Message", value: message }
      ];

      // Save data to localStorage
      localStorage.setItem("fitzoneFormData", JSON.stringify(formData));

      // Redirect to result page
      window.location.href = "page5.html";
    });
  }

  // =========================
  // DISPLAY DATA ON PAGE 5
  // =========================
  if (resultTableBody) {
    const savedData = localStorage.getItem("fitzoneFormData");

    if (savedData) {
      const parsedData = JSON.parse(savedData);

      // Create table rows dynamically
      parsedData.forEach(function (item) {
        const row = document.createElement("tr");

        const fieldCell = document.createElement("td");
        fieldCell.textContent = item.field;

        const valueCell = document.createElement("td");
        valueCell.textContent = item.value;

        row.appendChild(fieldCell);
        row.appendChild(valueCell);
        resultTableBody.appendChild(row);
      });
    } else {
      // Show message if no data found
      const row = document.createElement("tr");

      const fieldCell = document.createElement("td");
      fieldCell.textContent = "Notice";

      const valueCell = document.createElement("td");
      valueCell.textContent = "No submitted form data found.";

      row.appendChild(fieldCell);
      row.appendChild(valueCell);
      resultTableBody.appendChild(row);
    }
  }

});