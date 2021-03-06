import React from 'react'
import PropTypes from 'prop-types'

import Download32 from 'emblematic-icons/svg/Download32.svg'

import {
  applySpec,
  findIndex,
  prop,
  propEq,
} from 'ramda'

import {
  Card,
  CardActions,
  CardContent,
  CardTitle,
  Dropdown,
  Pagination,
} from 'former-kit'

import style from './style.css'

import ExportData from '../../../../components/ExportData'
import TableList from '../../../../components/TableList'
import useFileExporter from '../../../../hooks/useFileExporter'

import tableColumns from './tableColumns'

import itemsPerPage from '../../../../models/itemsPerPage'

import EmptyStateIcon from './EmptyStateIcon.svg'

const getExportOptions = onExport => ([
  {
    action: () => onExport('csv'),
    title: 'CSV',
  },
  {
    action: () => onExport('xls'),
    title: 'Excel',
  },
])

const exportHeaders = [
  'Data',
  'ID',
  'Nome',
  'Status',
  'Valor Pago',
  'Link',
]

const buildTotalPaid = ({
  amount,
  orders_paid: ordersPaid,
}) => ((ordersPaid * amount) / 100).toFixed(2)

const exportParser = applySpec({
  dateCreated: prop('date_created'),
  id: prop('id'),
  name: prop('name'),
  status: prop('status'),
  totalPaid: buildTotalPaid,
  url: prop('url'),
})

const exportPrefix = 'payment_links'

const PaymentLinksList = ({
  loading,
  onOrderChange,
  onPageChange,
  onPageCountChange,
  onRowClick,
  order,
  orderField,
  pageCount,
  pagination,
  rows,
  selectedPage,
  t,
}) => {
  const handleExport = useFileExporter({
    exportHeaders,
    exportParser,
    exportPrefix,
  })

  const onExport = exportType => handleExport(
    rows,
    exportType
  )

  const columns = tableColumns({ t })
  const orderColumn = findIndex(propEq('accessor', [orderField]), columns)
  const handleOrderChange = (
    columnIndex,
    tableOrder
  ) => onOrderChange(columns[columnIndex].accessor, tableOrder)

  const paginationElem = (
    <Pagination
      currentPage={selectedPage}
      disabled={loading}
      onPageChange={onPageChange}
      size="tiny"
      strings={{
        of: t('components.pagination.of'),
      }}
      totalPages={pagination.total}
    />
  )

  return (
    <Card>
      {(loading || rows.length > 0)
        ? (
          <>
            <CardTitle
              title={(
                <h2 className={style.customTitle}>
                  {t('pages.payment_links.list.title')}
                </h2>
                  )}
              subtitle={(
                <div className={style.toolBar}>
                  <>
                    <ExportData
                      disabled={loading}
                      exportOptions={getExportOptions(onExport)}
                      icon={<Download32 width={12} height={12} />}
                      placement="bottomEnd"
                      relevance="low"
                      size="tiny"
                      subtitle={t('export_to')}
                      title={t('export_table')}
                    />
                    <Dropdown
                      disabled={loading}
                      name="page-count"
                      onChange={({ target: { value } }) => (
                        onPageCountChange(parseInt(value, 10))
                      )}
                      options={itemsPerPage.map(i => ({
                        name: t('items_per_page', { count: i }),
                        value: `${i}`,
                      }))}
                      size="tiny"
                      value={pageCount.toString()}
                    />
                    {paginationElem}
                  </>
                </div>
                  )}
            />

            <CardContent>
              <TableList
                columns={columns}
                disabled={loading}
                loading={loading}
                maxColumns={6}
                onOrderChange={handleOrderChange}
                onRowClick={onRowClick}
                orderColumn={orderColumn}
                orderSequence={order}
                rows={rows}
              />
            </CardContent>

            <CardActions>
              {paginationElem}
            </CardActions>
          </>
        )
        : (
          <CardContent>
            <div className={style.emptyState}>
              <div>
                <EmptyStateIcon />
              </div>
              <div>
                <h1>
                  {t('pages.payment_links.list.empty_state_title')}
                </h1>
                <p>
                  {t('pages.payment_links.list.empty_state_message_1')}
                  <span>{t('pages.payment_links.list.empty_state_message_2')}</span>
                  {t('pages.payment_links.list.empty_state_message_3')}
                </p>
              </div>
            </div>
          </CardContent>
        )
    }
    </Card>
  )
}

PaymentLinksList.propTypes = {
  loading: PropTypes.bool.isRequired,
  onOrderChange: PropTypes.func.isRequired,
  onPageChange: PropTypes.func.isRequired,
  onPageCountChange: PropTypes.func.isRequired,
  onRowClick: PropTypes.func.isRequired,
  order: PropTypes.string,
  orderField: PropTypes.string,
  pageCount: PropTypes.number.isRequired,
  pagination: PropTypes.shape({
    offset: PropTypes.number,
    total: PropTypes.number,
  }).isRequired,
  rows: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedPage: PropTypes.number,
  t: PropTypes.func.isRequired,
}

PaymentLinksList.defaultProps = {
  order: 'descending',
  orderField: '',
  selectedPage: 1,
}

export default PaymentLinksList
