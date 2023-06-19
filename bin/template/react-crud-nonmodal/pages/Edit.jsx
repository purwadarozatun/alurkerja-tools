import React from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Edit = () => {

  let { id } = useParams();
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
    />
  )
}

export default Edit