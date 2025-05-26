const path = require("path");
const fs = require("fs");
const ExcelJS = require("exceljs");
const { transporter, mailOptions } = require("../config/mailer");


const sendEmail = async (req, res) => {
  const {
    employee_name,
    reviewer_name,
    monthlyReview,
    designation,
    work_quality,
    work_quality_comment,
    productivity,
    productivity_comment,
    punctuality,
    punctuality_comment,
    teamwork,
    teamwork_comment,
    initiative,
    initiative_comment,
    adaptability,
    adaptability_comment,
    supervisor_summary,
    overall_rating,
    recommendation
  } = req.body;

  console.log(req.body);

const fileName = `performance-review-${employee_name}.xlsx`;
const filePath = path.join(__dirname, "../public", fileName);

try {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Employee Performance Review');

  worksheet.mergeCells('C1:F1');
  worksheet.getCell('C1').value = 'Employee Details';
  worksheet.getCell('C1').alignment = { horizontal: 'center' };
  worksheet.getCell('C1').font = { bold: true };
  worksheet.getCell('C1').fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'D9E1F2' },
  };

  worksheet.getCell('B2').value = 'Reviewer Name';
  worksheet.getCell('B2').font = { bold: true };
  worksheet.getCell('B3').value = reviewer_name;

  worksheet.getCell('D2').value = 'Employee Name';
  worksheet.getCell('D2').font = { bold: true };
  worksheet.getCell('D3').value = employee_name;

  worksheet.getCell('F2').value = 'Monthly Review';
  worksheet.getCell('F2').font = { bold: true };
  worksheet.getCell('F3').value = monthlyReview;

  worksheet.getCell('H2').value = 'Designation';
  worksheet.getCell('H2').font = { bold: true };
  worksheet.getCell('H3').value = designation;

  worksheet.mergeCells('B4:C4');
  worksheet.mergeCells('D4:E4');
  worksheet.mergeCells('F4:G4');
  worksheet.mergeCells('H4:I4');

  worksheet.getCell('B4').value = 'Work Quality';
  worksheet.getCell('D4').value = 'Productivity';
  worksheet.getCell('F4').value = 'Punctuality';
  worksheet.getCell('H4').value = 'Team Work';
  worksheet.getCell('J4').value = 'Initiative';
  worksheet.getCell('L4').value = 'Adaptability';

  ['B4', 'D4', 'F4', 'H4', 'J4', 'L4'].forEach(cell => {
    worksheet.getCell(cell).font = { bold: true };
    worksheet.getCell(cell).fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'D9E1F2' },
    };
    worksheet.getCell(cell).alignment = { horizontal: 'center' };
  });

  const headers = [
    ['B5', 'Criteria'], ['C5', 'Comments'],
    ['D5', 'Criteria'], ['E5', 'Comments'],
    ['F5', 'Criteria'], ['G5', 'Comments'],
    ['H5', 'Criteria'], ['I5', 'Comments'],
    ['J5', 'Criteria'], ['K5', 'Comments'],
    ['L5', 'Criteria'], ['M5', 'Comments']
  ];

  headers.forEach(([cell, text]) => {
    worksheet.getCell(cell).value = text;
    worksheet.getCell(cell).font = { bold: true };
  });

  worksheet.getCell('B6').value = work_quality;
  worksheet.getCell('C6').value = work_quality_comment;

  worksheet.getCell('D6').value = productivity;
  worksheet.getCell('E6').value = productivity_comment;

  worksheet.getCell('F6').value = punctuality;
  worksheet.getCell('G6').value = punctuality_comment;

  worksheet.getCell('H6').value = teamwork;
  worksheet.getCell('I6').value = teamwork_comment;

  worksheet.getCell('J6').value = initiative;
  worksheet.getCell('K6').value = initiative_comment;

  worksheet.getCell('L6').value = adaptability;
  worksheet.getCell('M6').value = adaptability_comment;

  worksheet.getCell('D8').value = 'Employment Decision Summary';
  worksheet.getCell('D8').alignment = { horizontal: 'center' };
  worksheet.getCell('D8').font = { bold: true };
  worksheet.getCell('D8').fill = {
    type: 'pattern',
    pattern: 'solid',
    fgColor: { argb: 'D9E1F2' },
  };

  worksheet.getCell('B9').value = 'Comments';
  worksheet.getCell('B9').font = { bold: true };
  worksheet.getCell('B10').value = supervisor_summary;

  worksheet.getCell('C9').value = 'Final Recommendation';
  worksheet.getCell('C9').font = { bold: true };
  worksheet.getCell('C10').value = recommendation;

  worksheet.getCell('D9').value = 'Overall Rating (out of 10)';
  worksheet.getCell('D9').font = { bold: true };
  worksheet.getCell('D10').value = overall_rating;

  await workbook.xlsx.writeFile(filePath);

  await transporter.sendMail({
    ...mailOptions,
    subject: `Performance Review - ${employee_name}`,
    text: `Good Morning,
Please find attached the performance review for  ${employee_name}.
Kindly review the details and let me know if any further information or clarification is required.
Thank you for your time and support.
Best regards,
${reviewer_name}.`,
    attachments: [
      {
        filename: fileName,
        path: filePath,
      },
    ],
  });

  fs.unlink(filePath, (err) => {
    if (err) {
      console.warn("Could not delete temporary Excel file:", err.message);
    }
    else{
      console.log("Filecreated sucessfully");
    }
  });
  return res.sendFile(path.join(__dirname, "../public/success.html"));
  } catch (error) {
    return res.status(500).json({
      error: "Failed to send email",
      details: error.message,
    });
  }
};

module.exports = { sendEmail };
