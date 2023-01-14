import React from 'react';
import { useNavigate } from 'react-router-dom';

export function Test() {
    let navigate = useNavigate();
    let [error, setError] = React.useState(null);

    async function handleSubmit(event) {
        event.preventDefault();
        let result = alert(event.target);
        if (result.error) {
            setError(result.error);
        } else {
            navigate('success');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type={'submit'} value='submit' />
        </form>
    );
}