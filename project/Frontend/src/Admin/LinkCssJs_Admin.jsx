import { useEffect, useState } from 'react';

function LinkCssJs_Admin({ onLoaded }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadResources = async () => {
            try {
                // Load CSS files dynamically
                const cssFiles = [
                    '/css/style.css',

                    // Admin Manage
                    '/css/css_admin_manage/css_admin_add.css',

                    '/vendor/bootstrap/css/bootstrap.min.css',
                    '/vendor/font-awesome/css/font-awesome.min.css',
                    '/vendor/datatables/dataTables.bootstrap4.css',
                    '/css/sb-admin.css'
                ];

                // Load all CSS files
                const cssPromises = cssFiles.map(href => {
                    return new Promise((resolve) => {
                        if (document.querySelector(`link[href="${href}"]`)) {
                            resolve();
                        } else {
                            const link = document.createElement('link');
                            link.rel = 'stylesheet';
                            link.href = href;
                            link.onload = resolve;
                            link.onerror = resolve; // Continue even if CSS fails
                            document.head.appendChild(link);
                        }
                    });
                });

                await Promise.all(cssPromises);


                // Load JavaScript files
                const jsFiles = [
                    '/js/jquery.min.js',
                    '/js/bootstrap.min.js',

                    // Admin
                    '/vendor/jquery/jquery.min.js',
                    '/vendor/bootstrap/js/bootstrap.bundle.min.js',
                    '/vendor/jquery-easing/jquery.easing.min.js',
                    '/vendor/datatables/jquery.dataTables.js',
                    '/vendor/datatables/dataTables.bootstrap4.js',
                    '/vendor/chart.js/Chart.min.js',
                    '/js/sb-admin.min.js',
                    '/js/sb-admin-datatables.min.js',
                    '/js/sb-admin-charts.min.js'
                ];

                // Load scripts sequentially
                for (const src of jsFiles) {
                    if (!document.querySelector(`script[src="${src}"]`)) {
                        await new Promise((resolve, reject) => {
                            const script = document.createElement('script');
                            script.src = src;
                            script.async = false;
                            script.onload = resolve;
                            script.onerror = reject;
                            document.body.appendChild(script);
                        });
                    }
                }

                // Wait a bit for scripts to initialize
                await new Promise(resolve => setTimeout(resolve, 500));

                // Mark as loaded
                setIsLoaded(true);
                if (onLoaded) {
                    onLoaded();
                }


            } catch (error) {
                console.error('Error loading resources:', error);
                // Still mark as loaded to prevent infinite loading
                setIsLoaded(true);
                if (onLoaded) {
                    onLoaded();
                }
            }
        };

        loadResources();
    }, [onLoaded]);

    return null;
}

export default LinkCssJs_Admin;