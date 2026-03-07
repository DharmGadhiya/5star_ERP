import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
import dayjs from 'dayjs';
import storePersist from '@/redux/storePersist';
import { BASE_URL } from '@/config/serverApiConfig';
import { notification } from 'antd';

// Utility to convert image URL to base64
const getBase64ImageFromUrl = async (imageUrl) => {
    try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    } catch (err) {
        console.error("Failed to load image", err);
        return null;
    }
};

/**
 * Generate a PDF document
 * @param {string} type - 'Quote', 'PurchaseOrder', 'SalesOrder', 'Invoice'
 * @param {object} data - the object containing header info (e.g. quoteId, date) and an items array
 * @param {array} columns - array of strings for table headers
 * @param {array} rows - array of arrays for table rows corresponding to columns
 * @param {object} settings - the app settings retrieved from API (containing company_logo, company_name)
 */
export const generatePDF = async (type, data, columns, rows, settings) => {
    try {
        const doc = new jsPDF();
        let startY = 20;

        // 1. Add Company Logo if exists
        if (settings?.company_logo) {
            // The logo from settings is typically a relative path. Build the full URL:
            const logoUrl = settings.company_logo.startsWith('http') ? settings.company_logo : `${BASE_URL}${settings.company_logo.replace(/^\//, '')}`;
            const base64Img = await getBase64ImageFromUrl(logoUrl);

            if (base64Img) {
                // Assuming logo is rectangular, width 40, height 20 as an example aspect ratio
                doc.addImage(base64Img, 'JPEG', 14, startY, 40, 20);
                startY += 25; // drop down below the logo
            }
        } else if (settings?.company_name) {
            doc.setFontSize(22);
            doc.text(settings.company_name, 14, startY + 10);
            startY += 20;
        }

        // 2. Add Title
        doc.setFontSize(20);
        doc.setTextColor(40);
        doc.text(`${type} Document`, 14, startY);
        startY += 10;

        // 3. Add Header Details (e.g., ID, Date, Customer)
        doc.setFontSize(10);
        doc.setTextColor(100);

        Object.keys(data).forEach((key) => {
            if (key !== 'items' && key !== 'id') {
                // Format property names (e.g. quoteId -> Quote ID)
                const formattedKey = key.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase());
                const value = typeof data[key] === 'object' && data[key] !== null
                    ? JSON.stringify(data[key])
                    : String(data[key]);

                doc.text(`${formattedKey}: ${value}`, 14, startY);
                startY += 6;
            }
        });

        startY += 4;

        // 4. Add the Table using autotable
        autoTable(doc, {
            startY: startY,
            head: [columns],
            body: rows,
            theme: 'grid',
            headStyles: { fillColor: [82, 0, 140] }, // a nice purple theme matching 5star ERP
            margin: { top: 10 },
        });

        // 5. Add Footer (e.g. Grand Total) if passed in data.grandTotal or total
        const finalY = doc.lastAutoTable?.finalY || startY + 10;

        if (data.grandTotal !== undefined || data.total !== undefined) {
            const total = data.grandTotal !== undefined ? data.grandTotal : data.total;
            doc.setFontSize(12);
            doc.setFont("helvetica", "bold");
            doc.setTextColor(0);
            doc.text(`Grand Total: Rs. ${total}`, 14, finalY + 10);
        }

        // Save the PDF
        doc.save(`${type}_${data.id || dayjs().format('YYYYMMDD')}.pdf`);
    } catch (e) {
        console.error("PDF Generation Error: ", e);
        notification.error({
            message: 'PDF Generation Failed',
            description: e.message || String(e),
            duration: 10,
        });
    }
};
