import React from 'react'
import { useForm } from 'react-hook-form'

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