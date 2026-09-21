// ================================
// VERA - Error boundary
// Prevents a silent white screen if any child component throws.
// If something breaks, it shows a visible error message instead of nothing.
// ================================
import { Component } from 'react';

export default class ErrorBoundary extends Component {
  state = { hasError: false, error: null };

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error('[VERA ErrorBoundary]', error, info);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh', display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center',
          fontFamily: 'system-ui, sans-serif', color: '#141414',
          background: '#f6f1e8', padding: 32, textAlign: 'center'
        }}>
          <h1 style={{ fontSize: 28, marginBottom: 12 }}>Something in VERA broke.</h1>
          <p style={{ color: '#7a756a', maxWidth: 520 }}>
            The page caught a rendering error. Open the browser console for the full message.
          </p>
          <pre style={{
            marginTop: 18, padding: 14, background: '#fff', border: '1px solid rgba(20,20,20,0.15)',
            borderRadius: 12, maxWidth: 640, overflow: 'auto', fontSize: 12, color: '#b03a2e'
          }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
