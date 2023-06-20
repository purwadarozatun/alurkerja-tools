import {useState} from 'react'
import { TableLowcode } from 'alurkerja-ui'

const List = () => {
  
  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState()
  const [search, setSearch] = useState()

  return (
    <TableLowcode
      baseUrl=''
      tableName=''
      renderState={renderState}
      setRenderState={setRenderState}
      pageConfig={pageConfig}
      setPageConfig={setPageConfig}
      filterBy={filterBy}
      setFilterBy={setFilterBy}
      search={search}
      setSearch={setSearch}
    />
  )
}

export default List