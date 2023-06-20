import { useParams, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { AlurkerjaForm } from 'alurkerja-ui'

const Edit = () => {

  let { id } = useParams();
  const navigate = useNavigate()
  const { formState, handleSubmit, control, setValue } = useForm()

  return (
    <AlurkerjaForm
      baseUrl=''
      tableName=''
      id={id}
      formState={formState}
      handleSubmit={handleSubmit}
      control={control}
      setValue={setValue}
      onCancel={() => navigate(-1)}    
    />
  )
}

export default Edit