require('dotenv').config();
const PdfDocument = require('hummus-recipe');
async function superImpose(filename) {
    const pdfDoc = new PdfDocument('/tmp/downloads/' + filename);
    const len = pdfDoc.metadata.pages;
    for (let i = 1; i <= len; i++) {
        pdfDoc.editPage(i);
        pdfDoc.overlay('Report Template L3.pdf');
        pdfDoc.endPage();
    }
    pdfDoc.endPDF();
}

exports.superImpose = superImpose;