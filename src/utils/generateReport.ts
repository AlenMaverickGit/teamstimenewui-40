import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { format } from "date-fns";

interface ResourceAllocation {
  project: string;
  employeeName: string;
  role: string;
  startDate: string;
  endDate: string;
  rate: number;
  cost: number;
}

export const generateResourceReport = () => {
  // Create a new PDF document with better default font
  const doc = new jsPDF();
  doc.setFont("helvetica");

  const currentDate = format(new Date(), "dd/MM/yyyy");
  const fromDate = "01/01/2024";
  const toDate = "31/12/2024";
  const businessGroup = "Organizational Unit Practise";

  const pageWidth = doc.internal.pageSize.getWidth();

  // Add a subtle header background
  doc.setFillColor(248, 250, 252);
  doc.rect(0, 0, pageWidth, 40, "F");
  doc.addImage("/images/w.png", "PNG", 15, 12, 20, 20);

  const title = "Resource Allocation Report";
  const textWidth = doc.getTextWidth(title);
  const centerX = (pageWidth - 20 - textWidth) / 2;

  doc.setFont("courier", "bold");
  doc.setFontSize(17);
  doc.setTextColor(33, 37, 41);
  doc.text(title, centerX, 26);

  // Add additional fields
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(71, 85, 105);

  const leftColumnX = 15;
  const rightColumnX = pageWidth / 2 + 10;
  let currentY = 45;

  // Add generated date
  currentY += 12;
  doc.text(`Generated on: ${currentDate}`, leftColumnX, currentY);
  currentY += 5;
  doc.text(`From Date: ${fromDate}`, leftColumnX, currentY);
  currentY += 5;
  doc.text(`To Date: ${toDate}`, leftColumnX, currentY);
  currentY += 5;
  doc.text(`Business Group: ${businessGroup}`, leftColumnX, currentY);

  // Add a subtle separator line
  doc.setDrawColor(226, 232, 240);
  doc.setLineWidth(0.5);
  doc.line(15, currentY + 5, pageWidth - 15, currentY + 5);

  // Sample data
  const data: ResourceAllocation[] = [
    {
      project: "Whizible Version 24",
      employeeName: "John Doe",
      role: "Project Manager",
      startDate: "01-01-2024",
      endDate: "31-12-2024",
      rate: 120.0,
      cost: 240000.0,
    },
    {
      project: "Whizible Version 24",
      employeeName: "Jane Smith",
      role: "UI/UX Designer",
      startDate: "15-01-2024",
      endDate: "30-09-2024",
      rate: 95.0,
      cost: 152000.0,
    },
    {
      project: "Client Portal",
      employeeName: "Michael Brown",
      role: "Frontend Developer",
      startDate: "01-02-2024",
      endDate: "31-10-2024",
      rate: 110.0,
      cost: 176000.0,
    },
    {
      project: "Client Portal",
      employeeName: "Sarah Wilson",
      role: "Backend Developer",
      startDate: "15-02-2024",
      endDate: "31-10-2024",
      rate: 115.0,
      cost: 184000.0,
    },
    {
      project: "Whizible Version 24",
      employeeName: "John Doe",
      role: "Project Manager",
      startDate: "01-01-2024",
      endDate: "31-12-2024",
      rate: 120.0,
      cost: 240000.0,
    },
    {
      project: "Whizible Version 24",
      employeeName: "Jane Smith",
      role: "UI/UX Designer",
      startDate: "15-01-2024",
      endDate: "30-09-2024",
      rate: 95.0,
      cost: 152000.0,
    },
    {
      project: "Client Portal",
      employeeName: "Michael Brown",
      role: "Frontend Developer",
      startDate: "01-02-2024",
      endDate: "31-10-2024",
      rate: 110.0,
      cost: 176000.0,
    },
    {
      project: "Client Portal",
      employeeName: "Sarah Wilson",
      role: "Backend Developer",
      startDate: "15-02-2024",
      endDate: "31-10-2024",
      rate: 115.0,
      cost: 184000.0,
    },
    {
      project: "Whizible Version 24",
      employeeName: "John Doe",
      role: "Project Manager",
      startDate: "01-01-2024",
      endDate: "31-12-2024",
      rate: 120.0,
      cost: 240000.0,
    },
    {
      project: "Whizible Version 24",
      employeeName: "Jane Smith",
      role: "UI/UX Designer",
      startDate: "15-01-2024",
      endDate: "30-09-2024",
      rate: 95.0,
      cost: 152000.0,
    },
    {
      project: "Client Portal",
      employeeName: "Michael Brown",
      role: "Frontend Developer",
      startDate: "01-02-2024",
      endDate: "31-10-2024",
      rate: 110.0,
      cost: 176000.0,
    },
    {
      project: "Client Portal",
      employeeName: "Sarah Wilson",
      role: "Backend Developer",
      startDate: "15-02-2024",
      endDate: "31-10-2024",
      rate: 115.0,
      cost: 184000.0,
    },
    {
      project: "Whizible Version 24",
      employeeName: "John Doe",
      role: "Project Manager",
      startDate: "01-01-2024",
      endDate: "31-12-2024",
      rate: 120.0,
      cost: 240000.0,
    },
    {
      project: "Whizible Version 24",
      employeeName: "Jane Smith",
      role: "UI/UX Designer",
      startDate: "15-01-2024",
      endDate: "30-09-2024",
      rate: 95.0,
      cost: 152000.0,
    },
    {
      project: "Client Portal",
      employeeName: "Michael Brown",
      role: "Frontend Developer",
      startDate: "01-02-2024",
      endDate: "31-10-2024",
      rate: 110.0,
      cost: 176000.0,
    },
    {
      project: "Client Portal",
      employeeName: "Sarah Wilson",
      role: "Backend Developer",
      startDate: "15-02-2024",
      endDate: "31-10-2024",
      rate: 115.0,
      cost: 184000.0,
    },
  ];

  // Set rows per page limit (you can adjust this value)
  const rowsPerPage = 10; // Number of rows per page
  const chunks = [];
  for (let i = 0; i < data.length; i += rowsPerPage) {
    chunks.push(data.slice(i, i + rowsPerPage)); // Split data into chunks
  }

  // Generate the table for each chunk (each page)
  chunks.forEach((chunk, index) => {
    autoTable(doc, {
      head: [
        [
          "Project",
          "Employee Name",
          "Role",
          "Start Date",
          "End Date",
          "Rate ($)",
          "Cost ($)",
        ],
      ],
      body: chunk.map((row) => [
        row.project,
        row.employeeName,
        row.role,
        row.startDate,
        row.endDate,
        row.rate.toLocaleString("en-US", { minimumFractionDigits: 2 }),
        row.cost.toLocaleString("en-US", { minimumFractionDigits: 2 }),
      ]),
      startY: currentY + 10 + index * 270, // Adjust Y position for each page
      styles: {
        fontSize: 9,
        cellPadding: 1.3,
        lineColor: [226, 232, 240],
        lineWidth: 0.1,
        minCellHeight: 4,
        valign: "middle",
        overflow: "linebreak",
      },
      headStyles: {
        fillColor: [59, 130, 246],
        textColor: 255,
        fontSize: 9.5,
        fontStyle: "bold",
        halign: "left",
        cellPadding: 1.5,
        minCellHeight: 2,
        valign: "middle",
      },
      columnStyles: {
        0: { cellWidth: "auto", overflow: "linebreak" },
        1: { cellWidth: "auto", overflow: "linebreak" },
        2: { cellWidth: "auto", overflow: "linebreak" },
        3: { cellWidth: "auto", overflow: "linebreak" },
        4: { cellWidth: "auto", overflow: "linebreak" },
        5: { halign: "right", cellWidth: 30 },
        6: { halign: "right", cellWidth: 30 },
      },
      pageBreak: "auto",
      margin: { left: 15, right: 15 },
    });
  });

  // Add page numbers and confidential watermark
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(120, 120, 120);
    doc.text(`Page ${i} of ${pageCount}`, pageWidth - 20, 285, {
      align: "right",
    });

    doc.setTextColor(180, 180, 180);
    doc.text("CONFIDENTIAL", pageWidth / 2, 285, { align: "center" });
  }

  // Save the PDF
  doc.save("resource-allocation-report.pdf");
};
