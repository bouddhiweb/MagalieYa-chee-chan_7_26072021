import { useState } from 'react'

const Form = () => {
    const name = useFormInput('Name')

    return (
        <>
            <input {...name} />
        </>
    )
}

function useFormInput(initialValue) {
    const [value, setValue] = useState(initialValue)

    function handleChange(e) {
        setValue(e.target.value)
    }

    return {
        value,
        onChange: handleChange
    }
}

export default Form