import { useEffect, useState } from 'react';

function LinkCssJs({ onLoaded }) {
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const loadResources = async () => {
            try {
                // Load CSS files dynamically
                const cssFiles = [
                    // Home
                    '/css/open-iconic-bootstrap.min.css',
                    '/css/animate.css',
                    '/css/owl.carousel.min.css',
                    '/css/owl.theme.default.min.css',
                    '/css/magnific-popup.css',
                    '/css/aos.css',
                    '/css/ionicons.min.css',
                    '/css/bootstrap-datepicker.css',
                    '/css/jquery.timepicker.css',
                    '/css/flaticon.css',
                    '/css/icomoon.css',
                    '/css/signin.css',
                    '/css/style.css',

                    // Admin
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

                // Load Google Fonts
                const fontLink1 = document.createElement('link');
                fontLink1.href = 'https://fonts.googleapis.com/css?family=Poppins:200,300,400,500,600,700';
                fontLink1.rel = 'stylesheet';
                document.head.appendChild(fontLink1);

                const fontLink2 = document.createElement('link');
                fontLink2.href = 'https://fonts.googleapis.com/css?family=Abril+Fatface';
                fontLink2.rel = 'stylesheet';
                document.head.appendChild(fontLink2);

                const fontAwesome = document.createElement('link');
                fontAwesome.href = 'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/7.0.1/css/all.min.css';
                fontAwesome.rel = 'stylesheet';
                fontAwesome.crossOrigin = 'anonymous';
                document.head.appendChild(fontAwesome);

                // Load JavaScript files
                const jsFiles = [
                    // Home
                    '/js/jquery.min.js',
                    '/js/jquery-migrate-3.0.1.min.js',
                    '/js/popper.min.js',
                    '/js/bootstrap.min.js',
                    '/js/jquery.easing.1.3.js',
                    '/js/jquery.waypoints.min.js',
                    '/js/jquery.stellar.min.js',
                    '/js/owl.carousel.min.js',
                    '/js/jquery.magnific-popup.min.js',
                    '/js/aos.js',
                    '/js/jquery.animateNumber.min.js',
                    '/js/bootstrap-datepicker.js',
                    '/js/jquery.timepicker.min.js',
                    '/js/scrollax.min.js',
                    '/js/sign-in.js',
                    '/js/main.js'
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

                // Hide loader after everything loads
                setTimeout(() => {
                    const loader = document.getElementById('ftco-loader');
                    if (loader) {
                        loader.classList.remove('show');
                    }
                }, 1000);

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

export default LinkCssJs;