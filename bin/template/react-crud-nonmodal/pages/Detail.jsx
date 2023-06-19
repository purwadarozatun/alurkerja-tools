import React from 'react'
import { useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

const Detail = () => {

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
      asDetail    
    />
  )
}

export default Detail