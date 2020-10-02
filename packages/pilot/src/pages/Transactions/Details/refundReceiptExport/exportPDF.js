import pdfMake from 'pdfmake'
import pdfFonts from 'pdfmake/build/vfs_fonts'

pdfMake.vfs = pdfFonts.pdfMake.vfs

const pdfStyles = {
  field: {
    fontSize: 15,
    margin: [70, 0, 70, 0],
  },
  outer: {
    fontSize: 15,
    margin: [50, 0, 50, 0],
  },
  outerSeparator: {
    margin: [35, 10, 35, 10],
  },
  separator: {
    margin: [45, 10, 45, 10],
  },
  title: {
    bold: true,
    fontSize: 15,
    margin: [70, 20, 0, 20],
  },
}

const exportPDF = ({ content, isBoleto, transactionId }) => {
  const pageSize = {
    height: isBoleto ? 1045 : 1090,
    width: 792,
  }

  const dd = {
    content,
    pageMargins: [0, 0, 0, 0],
    pageOrientation: 'portrait',
    pageSize,
    styles: pdfStyles,
  }

  const pdfName = `comprovante-cancelamento-${transactionId}.pdf`

  return pdfMake.createPdf(dd).download(pdfName)
}

export default exportPDF
