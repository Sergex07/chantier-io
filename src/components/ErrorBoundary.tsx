'use client'
import { Component, ReactNode } from 'react'

export default class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: string | null }
> {
  constructor(props: any) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error: Error) {
    return { error: error.message }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '40px', background: 'red', color: 'white', fontSize: '1.2rem', fontFamily: 'monospace' }}>
          ERREUR REACT: {this.state.error}
        </div>
      )
    }
    return this.props.children
  }
}
