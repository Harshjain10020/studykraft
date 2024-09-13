document.addEventListener("DOMContentLoaded", function () {
  const timetable = document.getElementById("timetable");
  const selectedTable = document.getElementById("selectedTable");
  const selectedSlotsBody = document.getElementById("selectedSlots");
  const saveButton = document.getElementById("saveButton");
  const clearButton = document.getElementById("clearButton");
  const courseCountInput = document.getElementById("courseCount");
  const submitCourseCountButton = document.getElementById("submitCourseCount");
  const courseInputsContainer = document.getElementById("courseInputs");
  const errorMessage = document.getElementById("errorMessage");
  const flashMessage = document.getElementById("flashMessage"); // New element for flash messages
  const downloadScreenshotButton = document.getElementById("downloadScreenshotButton");
  const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT"];
  const timeSlots = [
      "8:30 AM - 10:00 AM",
      "10:05 AM - 11:35 AM",
      "11:40 AM - 1:10 PM",
      "1:15 PM - 2:45 PM",
      "2:50 PM - 4:20 PM",
      "4:25 PM - 5:55 PM",
      "6:00 PM - 7:30 PM"
  ];

  let selectedSlotsByCourse = {}; // Store selected slots for each course
  let currentCourse = 1; // Track the current course number
  let courseCount = 1; // Default course count
   // Function to show a flash message for Save Changes
  function showSaveChangesMessage() {
      flashMessage.textContent = "Changes saved successfully!";
      flashMessage.style.display = "block";
      flashMessage.classList.remove("error");

      setTimeout(() => {
          flashMessage.style.display = "none";
      }, 2000); // Hide the message after 2 seconds (adjust as needed)
  }

  // Function to show a flash message for Clear Changes
  function showClearChangesMessage() {
      flashMessage.textContent = "Changes cleared!";
      flashMessage.style.display = "block";
      flashMessage.classList.remove("error");

      setTimeout(() => {
          flashMessage.style.display = "none";
      }, 2000); // Hide the message after 2 seconds (adjust as needed)
  }


  // Function to show a flash message
  function showFlashMessage(message, isError = false) {
      flashMessage.textContent = message;
      flashMessage.style.display = "block";
      flashMessage.classList.toggle("error", isError);

      setTimeout(() => {
          flashMessage.style.display = "none";
          flashMessage.classList.remove("error");
      }, 2000); // Hide the message after 2 seconds (adjust as needed)
  }

  // Function to toggle a time slot
  function toggleSlot(event) {
      const td = event.target;

      // Check if the slot is already selected
      if (td.classList.contains("selected")) {
          // Remove the slot from the current course
          selectedSlotsByCourse[currentCourse] = selectedSlotsByCourse[currentCourse].filter(slot => slot !== td.textContent);
          td.classList.remove("selected");
      } else {
          // Check if the slot clashes with any selected slots
          const clashes = Object.values(selectedSlotsByCourse).some(slots => slots.includes(td.textContent));

          if (!clashes) {
              // Add the slot to the current course
              if (!selectedSlotsByCourse[currentCourse]) {
                  selectedSlotsByCourse[currentCourse] = [];
              }
              selectedSlotsByCourse[currentCourse].push(td.textContent);
              td.classList.add("selected");

              // Ensure mutual exclusion between C11 and A21
              if (td.textContent === "C11") {
                  const a21Slot = timetable.querySelector("td.slot.selected[data-day='MON'][data-start='1:15'][data-end='2:45']");
                  if (a21Slot) {
                      a21Slot.classList.remove("selected");
                      selectedSlotsByCourse[currentCourse] = selectedSlotsByCourse[currentCourse].filter(slot => slot !== a21Slot.textContent);
                      showFlashMessage("Slot clash: C11 and A21 cannot be selected together", true);
                  }
              } else if (td.textContent === "A21") {
                  const c11Slot = timetable.querySelector("td.slot.selected[data-day='MON'][data-start='11:40'][data-end='1:10']");
                  if (c11Slot) {
                      c11Slot.classList.remove("selected");
                      selectedSlotsByCourse[currentCourse] = selectedSlotsByCourse[currentCourse].filter(slot => slot !== c11Slot.textContent);
                      showFlashMessage("Slot clash: C11 and A21 cannot be selected together", true);
                  }
              } else if (td.textContent === "F11") {
                  const d21Slot = timetable.querySelector("td.slot.selected[data-day='TUE'][data-start='1:15'][data-end='2:45']");
                  if (d21Slot) {
                      d21Slot.classList.remove("selected");
                      selectedSlotsByCourse[currentCourse] = selectedSlotsByCourse[currentCourse].filter(slot => slot !== d21Slot.textContent);
                      showFlashMessage("Slot clash: F11 and D21 cannot be selected together", true);
                  }
              } else if (td.textContent === "D21") {
                  const f11Slot = timetable.querySelector("td.slot.selected[data-day='TUE'][data-start='11:40'][data-end='1:10']");
                  if (f11Slot) {
                      f11Slot.classList.remove("selected");
                      selectedSlotsByCourse[currentCourse] = selectedSlotsByCourse[currentCourse].filter(slot => slot !== f11Slot.textContent);
                      showFlashMessage("Slot clash: F11 and D21 cannot be selected together", true);
                  }
              } else if (td.textContent === "C12") {
                  const a22Slot = timetable.querySelector("td.slot.selected[data-day='WED'][data-start='1:15'][data-end='2:45']");
                  if (a22Slot) {
                      a22Slot.classList.remove("selected");
                      selectedSlotsByCourse[currentCourse] = selectedSlotsByCourse[currentCourse].filter(slot => slot !== a22Slot.textContent);
                      showFlashMessage("Slot clash: C12 and A22 cannot be selected together", true);
                  }
              } else if (td.textContent === "A22") {
                  const c12Slot = timetable.querySelector("td.slot.selected[data-day='WED'][data-start='11:40'][data-end='1:10']");
                  if (c12Slot) {
                      c12Slot.classList.remove("selected");
                      selectedSlotsByCourse[currentCourse] = selectedSlotsByCourse[currentCourse].filter(slot => slot !== c12Slot.textContent);
                      showFlashMessage("Slot clash: C12 and A22 cannot be selected together", true);
                  }
              } else if (td.textContent === "F12") {
                  const d22Slot = timetable.querySelector("td.slot.selected[data-day='THU'][data-start='1:15'][data-end='2:45']");
                  if (d22Slot) {
                      d22Slot.classList.remove("selected");
                      selectedSlotsByCourse[currentCourse] = selectedSlotsByCourse[currentCourse].filter(slot => slot !== d22Slot.textContent);
                      showFlashMessage("Slot clash: F12 and D22 cannot be selected together", true);
                  }
              } else if (td.textContent === "D22") {
                  const f12Slot = timetable.querySelector("td.slot.selected[data-day='THU'][data-start='11:40'][data-end='1:10']");
                  if (f12Slot) {
                      f12Slot.classList.remove("selected");
                      selectedSlotsByCourse[currentCourse] = selectedSlotsByCourse[currentCourse].filter(slot => slot !== f12Slot.textContent);
                      showFlashMessage("Slot clash: F12 and D22 cannot be selected together", true);
                  }
              } else if (td.textContent === "C13") {
                  const a23Slot = timetable.querySelector("td.slot.selected[data-day='FRI'][data-start='1:15'][data-end='2:45']");
                  if (a23Slot) {
                      a23Slot.classList.remove("selected");
                      selectedSlotsByCourse[currentCourse] = selectedSlotsByCourse[currentCourse].filter(slot => slot !== a23Slot.textContent);
                      showFlashMessage("Slot clash: C13 and A23 cannot be selected together", true);
                  }
              } else if (td.textContent === "A23") {
                  const c13Slot = timetable.querySelector("td.slot.selected[data-day='FRI'][data-start='11:40'][data-end='1:10']");
                  if (c13Slot) {
                      c13Slot.classList.remove("selected");
                      selectedSlotsByCourse[currentCourse] = selectedSlotsByCourse[currentCourse].filter(slot => slot !== c13Slot.textContent);
                      showFlashMessage("Slot clash: C13 and A23 cannot be selected together", true);
                  }
              } else if (td.textContent === "F13") {
                  const d23Slot = timetable.querySelector("td.slot.selected[data-day='SAT'][data-start='1:15'][data-end='2:45']");
                  if (d23Slot) {
                      d23Slot.classList.remove("selected");
                      selectedSlotsByCourse[currentCourse] = selectedSlotsByCourse[currentCourse].filter(slot => slot !== d23Slot.textContent);
                      showFlashMessage("Slot clash: F13 and D23 cannot be selected together", true);
                  }
              } else if (td.textContent === "D23") {
                  const f13Slot = timetable.querySelector("td.slot.selected[data-day='SAT'][data-start='11:40'][data-end='1:10']");
                  if (f13Slot) {
                      f13Slot.classList.remove("selected");
                      selectedSlotsByCourse[currentCourse] = selectedSlotsByCourse[currentCourse].filter(slot => slot !== f13Slot.textContent);
                      showFlashMessage("Slot clash: F13 and D23 cannot be selected together", true);
                  }
              } else {
                  // Clear the flash message if other slots are selected
                  showFlashMessage("", false);
              }
          }
      }
  }

  // Function to update the selected slots table
  function updateSelectedTable() {
      // Clear the existing selected slots
      selectedSlotsBody.innerHTML = "";

      // Iterate over selected slots by course and display them in the selected table
      for (const [course, slots] of Object.entries(selectedSlotsByCourse)) {
          const tr = document.createElement("tr");
          const courseSlot = document.createElement("td");
          courseSlot.textContent = `Course ${course}: Slots: ${slots.join(', ')}`;
          tr.appendChild(courseSlot);
          selectedSlotsBody.appendChild(tr);
      }
  }

  // Function to handle saving changes
  function saveChanges() {
      // Display the selected slots in the selected table
      updateSelectedTable();
      showSaveChangesMessage(); // Show Save Changes flash message
  }

  // Function to handle clearing selected slots
  function clearChanges() {
      // Clear the selected slots
      selectedSlotsByCourse = {};
      const selectedSlotsElements = timetable.querySelectorAll("td.slot.selected");
      selectedSlotsElements.forEach(slot => {
          slot.classList.remove("selected");
      });

       // Clear the flash message
      showClearChangesMessage(); // Show Clear Changes flash message

      // Update the selected slots table
      updateSelectedTable();
  }

  // Function to handle the submission of the course count
  function submitCourseCount() {
      // Get the course count from the input field
      courseCount = parseInt(courseCountInput.value, 10);

      // Generate input fields for each course
    courseInputsContainer.innerHTML = "";
    for (let i = 1; i <= courseCount; i++) {
      const courseInput = document.createElement("div");
      courseInput.textContent = `Course ${i}`;
      courseInput.classList.add("button");
      courseInput.id = `courseButton${i}`
      courseInputsContainer.appendChild(courseInput);
    }

      // Reset the selected slots and current course
      selectedSlotsByCourse = {};
      currentCourse = 1;

      // Clear the existing selected slots in the timetable
      const selectedSlotsElements = timetable.querySelectorAll("td.slot.selected");
      selectedSlotsElements.forEach(slot => {
          slot.classList.remove("selected");
      });

      // Clear the flash message
      showFlashMessage("", false);

      // Display the selected slots table
      updateSelectedTable();
  }

  // Function to switch between courses when a course button is clicked
  function switchCourse(course) {
      currentCourse = course;
  }
  downloadScreenshotButton.addEventListener("click", () => {
    // Capture the screenshot of the timetable container
    html2canvas(document.getElementById("timetable-container")).then(function (canvas) {
        // Create a temporary link element to trigger the download
        const link = document.createElement("a");
        link.href = canvas.toDataURL("image/png"); // Convert canvas to PNG format
        link.download = "timetable_screenshot.png"; // Set the filename for the downloaded image
        link.click();
    });
});
  // Initialize the timetable
  const cells = timetable.querySelectorAll("td.slot[data-day][data-start][data-end]");
  cells.forEach(cell => {
      cell.addEventListener("click", toggleSlot);
  });

  // Add click event listener to the "Save Changes" button
  saveButton.addEventListener("click", saveChanges);

  // Add click event listener to the "Clear Changes" button
  clearButton.addEventListener("click", clearChanges);

  // Add click event listener to the "Submit" button for course count
  submitCourseCountButton.addEventListener("click", submitCourseCount);

  // Add click event listener to course buttons for switching
  courseInputsContainer.addEventListener("click", (event) => {
      if (event.target.classList.contains("button")) {
          switchCourse(parseInt(event.target.textContent.split(" ")[1]));
      }
  });
}); 
