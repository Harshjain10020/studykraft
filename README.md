# StudyKraft - FFCS Timetable Scheduler

> A visual and interactive web app to build your perfect university (FFCS) timetable, eliminating clashes and saving your lunch break!



This project is a simple, lightweight, and purely client-side tool built with vanilla HTML, CSS, and JavaScript.

## 🔗 Live Demo

You can try the scheduler live at: **[harshjain10020.github.io/studykraft](https://harshjain10020.github.io/studykraft/)**

---

## 🚀 The Problem

I built this project to solve a personal frustration. Every semester, planning my university's FFCS (Fully Flexible Credit System) timetable was a nightmare of pen, paper, and constant erasing. I'd try to juggle multiple "perfect" schedules, only to find a slot clash or realize I'd accidentally scheduled classes straight through my lunch break.

It was tedious, time-consuming, and easy to make mistakes.

**This tool is the solution.** It's a simple, visual scheduler that digitizes the entire process, automates clash detection, and reduces the time and effort of creating a perfect schedule from hours to minutes.

---

## ✨ Key Features

* **Interactive Visual Grid:** Click any slot on the weekly timetable to select it for a course.
* **Multi-Course Planning:** Add up to 10 different courses and assign slots to each one individually.
* **Automatic Slot Clash Detection:** The app prevents you from selecting the same slot for two different courses.
* **Intelligent Lunch Break Protection:** This is the most important feature! The app understands the FFCS lunch break (1:10 PM - 1:15 PM) and **prevents you from selecting *both* the pre-lunch and post-lunch slots** on the same day (e.g., C11 and A21 on Monday), ensuring you always have time to eat.
* **Selected Slots Summary:** Get a clean, at-a-glance view of all the slots you've chosen for each course.
* **Download as Image:** Instantly save a PNG screenshot of your final timetable to your device using the "Download" button.
* **Sleek, Responsive UI:** A modern "cosmic" theme that's easy to use on both desktop and mobile.

---

## 💻 Tech Stack

* **Frontend:** HTML5
* **Styling:** CSS3 (with custom animations)
* **Logic:** Vanilla JavaScript (ES6+)
* **Libraries:** [html2canvas.js](https://html2canvas.hertzen.com/) (for the screenshot download functionality)

---

## 🛠️ How to Use

1.  **Enter Course Count:** Input the total number of courses you're planning for (e.g., `5`) and click "Submit".
2.  **Select a Course:** Click on a "Course 1", "Course 2", etc. button. This is now your *active* course.
3.  **Build Your Timetable:** Click on any slot in the main grid. The app will assign it to your active course and highlight it.
4.  **Switch Courses:** Click on another course button (e.g., "Course 2") and start selecting its slots.
5.  **Review & Download:** Your choices will appear in the "Selected Slots" table. Once you're happy with your schedule, click "Download" to save it as a PNG.
6.  **Reset:** Click "Clear Changes" at any time to start over.

---

## 🚀 How to Run Locally

This is a simple static website. No complex setup is needed!

1.  **Clone the repository:**
    ```bash
    git clone [https://github.com/Harshjain10020/studykraft.git](https://github.com/Harshjain10020/studykraft.git)
    ```
2.  **Navigate to the directory:**
    ```bash
    cd studykraft
    ```
3.  **Open the file:**
    Simply open the `index.html` file in your favorite web browser.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
