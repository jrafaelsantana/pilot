import { uniq } from 'ramda'
import buildContent from './buildContent'
import exportPDF from './exportPDF'

const getRefundsBankAccounts = async (refunds, client) => {
  const bankAccountIds = refunds
    .filter(v => v.bank_account_id)
    .map(v => v.bank_account_id)

  if (bankAccountIds.length === 0) {
    return []
  }

  return client.bankAccounts.find({ id: uniq(bankAccountIds) })
}

const getRefunds = async (transaction, client) => {
  const refundsResponse = await client.refunds.find(
    { transaction_id: transaction.id }
  )
  const refunds = refundsResponse.filter(v => v.status === 'refunded')

  if (refunds.length) {
    return refunds
  }

  const gatewayOperations = await client.gatewayOperations.find(
    { transactionId: transaction.id }
  )

  return gatewayOperations
    .filter(operation => operation.type === 'refund' && operation.status === 'success')
    .map(operation => (
      {
        ...operation,
        amount: operation.metadata.environment.refunded_amount,
      }))
}

const refundReceiptExport = async ({
  client,
  companyName,
  t,
  transaction,
}) => {
  const refunds = await getRefunds(transaction, client)
  const bankAccounts = await getRefundsBankAccounts(refunds, client)

  // eslint-disable-next-line no-restricted-syntax
  for (const refund of refunds) {
    const bankAccount = bankAccounts.find(b => refund.bank_account_id === b.id)
    refunds.bank_account = bankAccount
  }

  const pdfContent = buildContent({
    companyName, refunds, t, transaction,
  })
  return exportPDF({
    content: pdfContent,
    isBoleto: transaction.payment.payment_method === 'boleto',
    transactionId: transaction.id,
  })
}

export default refundReceiptExport
