import React from 'react'
import { useForm } from 'react-hook-form'
import { AlurkerjaForm } from 'alurkerja-ui'

export const {{usertaskName}} = () => {
  const baseUrl = '{{baseUrl}}'
  const specPath = '{{specPath}}/spec'

  const { handleSubmit, setValue, control, formState } = useForm()
  return (
    <section>
       {{usertaskName}}
    </section>
  )
}


