import { useForm } from 'react-hook-form'
import { AlurkerjaForm } from 'alurkerja-ui'

const Create = () => {

  const { formState, handleSubmit, control, setValue } = useForm()

  return (
    <AlurkerjaForm
      baseUrl=''
      tableName=''
      formState={formState}
      handleSubmit={handleSubmit}
      control={control}
      setValue={setValue}
    />
  )
}

export default Create