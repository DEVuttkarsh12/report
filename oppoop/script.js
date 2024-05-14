document.addEventListener("DOMContentLoaded", function () {
  const studentSelect = document.getElementById("studentSelect");
  const daysAttendedInput = document.getElementById("daysAttended");

  const testStudentSelect = document.getElementById("testStudentSelect");
  const englishScoreInput = document.getElementById("englishScore");
  const mathsScoreInput = document.getElementById("mathsScore");
  const hindiScoreInput = document.getElementById("hindiScore");

  const generateReportCardButton = document.getElementById(
    "generateReportCardButton"
  );
  const reportCardContainer = document.getElementById("reportCard");

  // Mock data for 10 students
  const students = [
    { name: "Student 1", rollNumber: 101 },
    // Add 9 more students
  ];

  // Populate student selects
  students.forEach((student) => {
    const option = document.createElement("option");
    option.value = student.rollNumber;
    option.text = student.name;
    studentSelect.appendChild(option.cloneNode(true));
    testStudentSelect.appendChild(option.cloneNode(true));
  });

  window.saveAttendance = function () {
    const selectedStudent = studentSelect.value;
    const daysAttended = daysAttendedInput.value;
    localStorage.setItem(`attendance_${selectedStudent}`, daysAttended);
    alert("Attendance saved successfully!");
  };

  window.saveTestScores = function () {
    const selectedStudent = testStudentSelect.value;
    const englishScore = englishScoreInput.value;
    const mathsScore = mathsScoreInput.value;
    const hindiScore = hindiScoreInput.value;
    localStorage.setItem(`english_${selectedStudent}`, englishScore);
    localStorage.setItem(`maths_${selectedStudent}`, mathsScore);
    localStorage.setItem(`hindi_${selectedStudent}`, hindiScore);
    alert("Test scores saved successfully!");
  };

  window.generateReportCard = function () {
    const selectedStudent = testStudentSelect.value;
    const attendance =
      localStorage.getItem(`attendance_${selectedStudent}`) || 0;
    const englishScore =
      localStorage.getItem(`english_${selectedStudent}`) || 0;
    const mathsScore = localStorage.getItem(`maths_${selectedStudent}`) || 0;
    const hindiScore = localStorage.getItem(`hindi_${selectedStudent}`) || 0;

    // Display report card
    document.getElementById("reportName").textContent = `Name: ${
      students[selectedStudent - 101].name
    }`;
    document.getElementById(
      "reportRollNumber"
    ).textContent = `Roll Number: ${selectedStudent}`;
    document.getElementById(
      "reportAttendance"
    ).textContent = `Attendance: ${attendance} days`;
    document.getElementById(
      "reportEnglish"
    ).textContent = `English Score: ${englishScore}`;
    document.getElementById(
      "reportMaths"
    ).textContent = `Maths Score: ${mathsScore}`;
    document.getElementById(
      "reportHindi"
    ).textContent = `Hindi Score: ${hindiScore}`;

    // Show report card
    reportCardContainer.style.display = "block";
  };

  window.downloadPDF = function () {
    const reportCard = document.getElementById("reportCard");
    html2pdf(reportCard, {
      margin: 10,
      filename: "report_card.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { dpi: 192, letterRendering: true },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
    });
  };
});
