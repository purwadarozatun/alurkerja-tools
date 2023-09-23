import React from 'react'
import { useForm } from 'react-hook-form'
import { AlurkerjaForm } from 'alurkerja-ui'

export const {{pageName}}= () => {
  const baseUrl = '{{baseUrl}}'
  const specPath = '{{specPath}}/spec'

  const { handleSubmit, setValue, control, formState } = useForm()
  return (
    <section>
      <AlurkerjaForm
        baseUrl={baseUrl}
        specPath={specPath}
        formState={formState}
        handleSubmit={handleSubmit}
        control={control}
        setValue={setValue}
        onSubmit={(data) => console.log(data)}
      />
    </section>
  )
}


