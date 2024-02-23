import { memo, useEffect, useState } from 'react';
import '../assets/style/Alert.scss'
function AlertMessage({ message, setMessage }) {
    const [show, setShow] = useState(false);
    useEffect(() => {
        let timer;

        async function handleShow() {
            setShow(true);
            timer = setTimeout(() => {
                setMessage('');
                setShow(false);
            }, 5000);
        }

        handleShow();

        return () => clearTimeout(timer);
    }, [message, setMessage]);

    useEffect(() => {
        if (show) {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'main__alert';
            alertDiv.innerHTML = `
                <div class="alert alert-success" role="alert">
                    ${message}
                </div>
            `;
            const main = document.getElementsByTagName('main')[0]
            main.appendChild(alertDiv);

            return () => main.removeChild(alertDiv);
        }
    }, [show, message]);

    return null;
}

export default memo(AlertMessage);
