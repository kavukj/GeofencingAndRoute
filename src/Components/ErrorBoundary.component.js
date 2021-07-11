import React from 'react'
import './ErrorBoundary.styles.css'

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            hasErrorOccurred: false
        }
    }
    static getDerivedStateFromError(error) {
        return { hasErrorOccurred: true }
    }

    componentDidCatch(error, errorInfo) {
        console.log(error, errorInfo)

    }

    render() {
        if (this.state.hasErrorOccurred) {
            return (
                <div class="root">
                    <h1>404</h1>
                    <div class="info">
                        <h2> We can't find that page</h2>
                        <p>We're fairly sure that page used to be here, but seems to have gone missing. We do apologise on it's behalf.</p>
                    </div>
                </div>
            )
        }
        return this.props.children;
    }
}

export default ErrorBoundary;