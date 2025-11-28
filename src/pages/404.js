import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';

export default function NotFound() {
    return (
        <Layout title="Page Not Found">
            <main className="container margin-vert--xl">
                <div className="row">
                    <div className="col col--6 col--offset-3">
                        <div style={{ textAlign: 'center' }}>
                            <h1 className="hero__title">404 - Robot Lost! 🤖</h1>
                            <p style={{ fontSize: '1.2rem', margin: '20px 0' }}>
                                Beep boop! It seems my sensors cannot locate the page you are looking for.
                                It might have been moved or deleted.
                            </p>

                            <div style={{ margin: '40px 0', fontSize: '5rem' }}>
                                🚧 🦾 🚧
                            </div>

                            <div className="buttons" style={{ justifyContent: 'center' }}>
                                <Link
                                    className="button button--primary button--lg"
                                    to="/">
                                    Return to Base 🏠
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </main>
        </Layout>
    );
}
