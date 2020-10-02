import { omit } from 'ramda'
import moment from 'moment-timezone'
import assets from './assets'
import getReceiptTemplate from './getReceiptTemplate'
import currency from '../../../../formatters/currency'
import cpfCnpj from '../../../../formatters/cpfCnpj'

const buildValueColumn = ({ label, name, value }) => ({
  columns: [
    { text: label, width: '*' },
    { text: value, width: 'auto' },
  ],
  name,
  style: 'field',
})

const buildContentStructure = (
  elements,
  template
) => template.map(
  templateItem => elements.find(v => v.name === templateItem)
)

const formatDocumentType = (type) => {
  switch (type) {
    case 'conta_poupanca':
      return 'Conta poupança'
    case 'conta_corrente':
      return 'Conta corrente'
    case 'conta_corrente_conjunta':
      return 'Conta corrente conjunta'
    case 'conta_poupanca_conjunta':
      return 'Conta poupança conjunta'
    default:
      return undefined
  }
}

function buildReceiptPage ({
  company, refund, t, transaction,
}) {
  const { images } = assets

  const bank = refund.bank_account && {
    account: refund.bank_account.conta,
    accountDv: refund.bank_account.conta_dv,
    accountType: refund.bank_account.type,
    agency: refund.bank_account.agencia,
    agencyDv: refund.bank_account.agencia_dv || '',
    bankCode: refund.bank_account.bank_code,
    documentNumber: refund.bank_account.document_number,
    documentType: refund.bank_account.document_type,
    legalName: refund.bank_account.legal_name,
  }

  const card = transaction.payment.payment_method !== 'boleto' && {
    brand: transaction.card.brand_name.toUpperCase(),
    holderName: transaction.card.holder_name,
    number: `${transaction.card.first_digits}******${transaction.card.last_digits}`,
  }

  const elements = [
    {
      image: images.header,
      name: 'header-image',
    },
    {
      marginTop: 40,
      name: 'text-introduction',
      style: 'outer',
      text: t('pages.transaction.export.introduction', { company }),
    },
    {
      image: images.separator,
      name: 'separator',
      style: 'separator',
    },
    {
      image: images.separator,
      name: 'outer-separator',
      style: 'outerSeparator',
      width: 720,
    },
    {
      name: 'refund-title',
      style: 'title',
      text: t('pages.transaction.export.title'),
    },
    {
      marginTop: 70,
      name: 'favored-title',
      style: 'title',
      text: t('pages.transaction.export.favored_title'),
    },
    buildValueColumn({
      label: t('pages.transaction.export.transaction_id'),
      name: 'field-transaction-id',
      value: transaction.id,
    }),
    buildValueColumn({
      label: t('pages.transaction.export.date_created'),
      name: 'field-date-created',
      value: moment(transaction.created_at).format('DD/MM/YYYY'),
    }),
    buildValueColumn({
      label: t('pages.transaction.export.field_amount'),
      name: 'field-amount',
      value:
          transaction.payment.paid_amount === 0
            ? currency(transaction.payment.authorized_amount)
            : currency(transaction.payment.paid_amount),
    }),
    buildValueColumn({
      label: t('pages.transaction.export.refunded_amount'),
      name: 'field-refunded-amount',
      value: currency(refund.amount),
    }),
    buildValueColumn({
      label: t('pages.transaction.export.date_refunded'),
      name: 'field-date-refunded',
      value: moment(refund.date_created).format('DD/MM/YYYY'),
    }),
    buildValueColumn({
      label: t('pages.transaction.export.bank_code'),
      name: 'field-bank-account-name',
      value: bank && bank.bankCode,
    }),
    buildValueColumn({
      label: t('pages.transaction.export.bank_agency'),
      name: 'field-bank-account-agency',
      value: bank && `${bank.agency}${bank.agencyDv && `-${bank.agencyDv}`}`,
    }),
    buildValueColumn({
      label: t('pages.transaction.export.bank_account'),
      name: 'field-bank-account-number',
      value:
          bank && `${bank.account}${bank.accountDv && `-${bank.accountDv}`}`,
    }),
    buildValueColumn({
      label: t('pages.transaction.export.bank_account_type'),
      name: 'field-bank-account-type',
      value: bank && `${formatDocumentType(bank.accountType)}`,
    }),
    {
      name: 'field-bank-account-legal-name',
      style: 'field',
      text: bank && bank.legalName,
    },
    buildValueColumn({
      label: bank && `${bank.documentType.toUpperCase()}:`,
      name: 'field-bank-account-document',
      value: bank && cpfCnpj(bank.documentNumber),
    }),
    buildValueColumn({
      label: t('pages.transaction.export.authorization_id'),
      name: 'field-authorization-id',
      value: transaction.authorization_code,
    }),
    buildValueColumn({
      label: t('pages.transaction.export.card_number'),
      name: 'field-card-number',
      value: card.number,
    }),
    buildValueColumn({
      label: t('pages.transaction.export.card_holder_name'),
      name: 'field-card-holder-name',
      value: card.holderName,
    }),
    buildValueColumn({
      label: t('pages.transaction.export.card_brand'),
      name: 'field-card-brand',
      value: card.brand,
    }),
    {
      marginTop: 40,
      name: 'warning-credit-card',
      style: 'outer',
      text: [
        {
          bold: true,
          text: t('pages.transaction.export.attention'),
        },
        {
          text: t('pages.transaction.export.attention_message'),
        },
      ],
    },
    {
      marginBottom: 40,
      marginTop: 20,
      name: 'farewell',
      style: 'outer',
      text: t('pages.transaction.export.farewall', { date: moment().format('DD/MM/YYYY') }),
    },
    {
      color: '#808285',
      name: 'footer',
      style: 'outer',
      text: t('pages.transaction.export.footer'),
    },
  ]

  const paymentMethodTemplate = getReceiptTemplate(
    transaction.payment_method
  )

  const removeNameProperty = content => content.map(c => omit(['name'], c))
  const pageContent = buildContentStructure(elements, paymentMethodTemplate)

  return removeNameProperty(pageContent)
}

const buildContent = ({
  companyName, refunds, t, transaction,
}) => {
  const company = companyName || ''

  return [
    ...refunds.map(refund => buildReceiptPage({
      company,
      refund,
      t,
      transaction,
    })),
  ]
}

export default buildContent
