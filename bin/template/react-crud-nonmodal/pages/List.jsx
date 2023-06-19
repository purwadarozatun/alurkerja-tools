import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TableLowcode } from 'alurkerja-ui'

const List = () => {
  
  const [pageConfig, setPageConfig] = useState({ limit: 10, page: 0 })
  const [renderState, setRenderState] = useState(0)
  const [filterBy, setFilterBy] = useState()
  const [search, setSearch] = useState()

  const navigate = useNavigate()

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
      onClickCreate={() => navigate('create')}
      onClickEdit={(_,id) => navigate(`edit/${id}`)}
      onClickDetail={(id) => navigate(`detail/${id}`)}
    />
  )
}

export default List