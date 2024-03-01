import { memo, useEffect } from 'react';
import '../assets/style/pageStyle/Alert.scss'
function AlertMessage({ message, setMessage }) {

    useEffect(() => {
        let timer;

        async function handleShow() {
            timer = setTimeout(() => {
                setMessage([]);
            }, 5000);
        }

        handleShow();

        return () => clearTimeout(timer);
    }, [message, setMessage]);

    useEffect(() => {
        if (message) {
            const alertDiv = document.createElement('div');
            alertDiv.className = 'main__alert';
            alertDiv.innerHTML = `
                <div class="alert alert-success" role="alert">
                    ${message[0]}
                </div>
            `;
            const main = document.getElementsByTagName('main')[0]
            main.appendChild(alertDiv);

            return () => main.removeChild(alertDiv);
        }
    }, [message]);

    return null;
}

export default memo(AlertMessage);
