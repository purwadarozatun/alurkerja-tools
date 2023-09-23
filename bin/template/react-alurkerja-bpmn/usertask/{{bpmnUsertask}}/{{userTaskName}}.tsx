import { AlurkerjaForm } from 'alurkerja-ui'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'

export const TaskACreate = () => {
  const { formState, handleSubmit, control, setValue } = useForm()
  const { id, task_id } = useParams()
  const navigate = useNavigate()

  return (
    <section className="bg-white p-6">
      {id && task_id && (
        <AlurkerjaForm
          id={id}
          isUsertask
          taskId={task_id}
          baseUrl={import.meta.env.VITE_API_BASEURL}
          specPath="/api/simple-b/task-a"
          formState={formState}
          handleSubmit={handleSubmit}
          control={control}
          setValue={setValue}
          onSuccess={() => navigate('/simple-b')}
        />
      )}
    </section>
  )
}
