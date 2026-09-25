import { useCallback, useRef, useState } from 'react'

// Minimal form state: values, per-field errors shown after blur, submit lifecycle.
// `validators` maps a field name to a function (value, values) => error message | ''.
export default function useForm(initialValues, validators, submit) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})
  const [status, setStatus] = useState('idle') // idle | submitting | success | error
  const [result, setResult] = useState(null)
  const formRef = useRef(null)

  const validateField = useCallback(
    (name, value, all = values) => (validators[name] ? validators[name](value, all) : ''),
    [validators, values],
  )

  const handleChange = (event) => {
    const { name, value } = event.target
    setValues((current) => ({ ...current, [name]: value }))
    if (touched[name]) setErrors((current) => ({ ...current, [name]: validateField(name, value) }))
  }

  const handleBlur = (event) => {
    const { name, value } = event.target
    setTouched((current) => ({ ...current, [name]: true }))
    setErrors((current) => ({ ...current, [name]: validateField(name, value) }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (status === 'submitting') return

    const nextErrors = Object.fromEntries(
      Object.keys(validators).map((name) => [name, validateField(name, values[name])]),
    )
    setErrors(nextErrors)
    setTouched(Object.fromEntries(Object.keys(validators).map((name) => [name, true])))

    const firstInvalid = Object.keys(validators).find((name) => nextErrors[name])
    if (firstInvalid) {
      formRef.current?.querySelector(`[name="${firstInvalid}"]`)?.focus()
      return
    }

    setStatus('submitting')
    try {
      const response = await submit(values)
      setResult(response)
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
    setStatus('idle')
    setResult(null)
  }

  const retry = () => setStatus('idle')

  return { values, errors, status, result, formRef, handleChange, handleBlur, handleSubmit, reset, retry }
}
