import React, { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { runUserLogic } from '../../utils/sandbox'

export default function FormBlock({ block }) {
  const { props = {}, onSubmit: onSubmitStr } = block
  const { fields = [], submitText = 'Submit' } = props
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const [message, setMessage] = useState(null)

  const fieldList = useMemo(() => fields, [fields])

  async function onSubmit(values) {
    setMessage(null)
    console.log('form submit raw values', values)
    if (onSubmitStr) {
      try {
        const res = await runUserLogic(onSubmitStr, values)
        // Expect user logic to return object: { _error: 'msg' } or { _ok: true }
        if (res && res._error) {
          setMessage({ type: 'error', text: res._error })
          return
        }
        if (res && res._ok) {
          setMessage({ type: 'success', text: 'Success' })
          console.log('User-logic passed', res)
          return
        }
        // if user returned custom payload, show it
        setMessage({ type: 'info', text: JSON.stringify(res) })
      } catch (e) {
        setMessage({ type: 'error', text: 'Logic error: ' + (e.message || e) })
      }
    } else {
      setMessage({ type: 'success', text: 'Form submitted — see console for values' })
      console.log('Submitted values:', values)
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
        {fieldList.map((f) => (
          <div key={f.name}>
            <label className="block text-sm font-medium">{f.label || f.name}</label>
            <input
              {...register(f.name, { required: f.required })}
              type={f.type || 'text'}
              min={f.min}
              className="mt-1 block w-full border rounded p-2"
            />
            {errors[f.name] && <div className="text-red-600 text-sm">This field is required</div>}
          </div>
        ))}
        <div className="flex items-center gap-2">
          <button className="px-3 py-1 bg-green-600 text-white rounded" type="submit">{submitText}</button>
          <button type="button" className="px-3 py-1 border rounded" onClick={() => { reset(); setMessage(null) }}>Reset</button>
        </div>
      </form>

      {message && (
        <div className={`mt-3 p-2 rounded ${message.type === 'error' ? 'bg-red-50 text-red-700' : message.type === 'success' ? 'bg-green-50 text-green-700' : 'bg-blue-50 text-blue-700'}`}>
          {message.text}
        </div>
      )}
    </div>
  )
}