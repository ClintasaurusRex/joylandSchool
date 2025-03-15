const useDownload = () => {
  const handleDownloadHTML = ({ isAdmission, submission, formatDate }) => {
    let htmlContent = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>${isAdmission ? "Admission Request" : "Contact Message"}</title>
          <style>
            body { font-family: Arial, sans-serif; }
            table { border-collapse: collapse; width: 100%; margin-bottom: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; }
            th { width: 30%; background-color: #f2f2f2; text-align: left; }
            h2 { margin-top: 20px; }
          </style>
        </head>
        <body>
      `;

    if (isAdmission) {
      htmlContent += `
          <h1>Admission Request: ${submission.firstName} ${submission.lastName}</h1>
          
          <h2>Student Information</h2>
          <table>
            <tr><th>Full Name</th><td>${submission.firstName} ${submission.lastName}</td></tr>
            <tr><th>Date of Birth</th><td>${submission.dateOfBirth}</td></tr>
            <tr><th>Gender</th><td>${submission.gender}</td></tr>
            <tr><th>Email</th><td>${submission.email}</td></tr>
            <tr><th>Phone</th><td>${submission.phone}</td></tr>
            <tr><th>Address</th><td>${submission.address}</td></tr>
            <tr><th>Previous School</th><td>${submission.previousSchool}</td></tr>
            <tr><th>Grade Applying For</th><td>${submission.gradeApplying}</td></tr>
          </table>
          
          <h2>Parent Information</h2>
          <table>
            <tr><th>Parent Name</th><td>${submission.parentName}</td></tr>
            <tr><th>Parent Phone</th><td>${submission.parentPhone}</td></tr>
            <tr><th>Parent Email</th><td>${submission.parentEmail}</td></tr>
          </table>
          
          <h2>Status Information</h2>
          <table>
            <tr><th>Status</th><td>${submission.status}</td></tr>
            <tr><th>Submitted At</th><td>${
              submission.submittedAt ? formatDate(submission.submittedAt) : "N/A"
            }</td></tr>
          </table>
        `;
    } else {
      htmlContent += `
          <h1>Contact Message: ${submission.name}</h1>
          
          <h2>Contact Information</h2>
          <table>
            <tr><th>Name</th><td>${submission.name}</td></tr>
            <tr><th>Email</th><td>${submission.email}</td></tr>
            <tr><th>Phone</th><td>${submission.phone}</td></tr>
            <tr><th>Subject</th><td>${submission.subject}</td></tr>
            <tr><th>Date Submitted</th><td>${
              submission.createdAt ? formatDate(submission.createdAt) : "N/A"
            }</td></tr>
            <tr><th>Status</th><td>${submission.status}</td></tr>
          </table>
          
          <h2>Message Content</h2>
          <div style="border: 1px solid #ddd; padding: 15px; white-space: pre-wrap;">
            ${submission.message}
          </div>
        `;
    }

    htmlContent += `
        </body>
        </html>
      `;

    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = isAdmission
      ? `admission_${submission.firstName}_${submission.lastName}.html`
      : `contact_${submission.name.replace(/\s+/g, "_")}.html`;

    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };
  return { handleDownloadHTML };
};

export default useDownload;
