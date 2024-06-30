function loadImage(url) {
    return new Promise((resolve, reject) => {
        let timeout;

        function attemptLoadImage(retry = false) {
            const img = new Image();
            const loadTimeout = retry ? 5000 : 3000;

            img.onload = () => {
                clearTimeout(timeout);
                resolve(img);
            };

            img.onerror = () => {
                if (!retry) {
                    console.log('First attempt failed, retrying...');
                    attemptLoadImage(true);
                } else {
                    clearTimeout(timeout);
                    reject(new Error(`Failed to load image at ${url}`));
                }
            };

            timeout = setTimeout(() => {
                img.src = ''; // Cancel the image load
                if (!retry) {
                    console.log('First attempt timed out, retrying...');
                    attemptLoadImage(true);
                } else {
                    reject(new Error(`Image load timed out at ${url}`));
                }
            }, loadTimeout);

            img.src = url;
        }

        // Set a global timeout for the whole loadImage process
        const globalTimeout = setTimeout(() => {
            reject(new Error(`Overall image load timeout for ${url}`));
        }, 5000);

        // Start the image loading process
        attemptLoadImage();

        // Clear the global timeout if the image loads successfully
        resolve.then(() => clearTimeout(globalTimeout)).catch(() => clearTimeout(globalTimeout));
    });
}

// 示例
const imageUrl = 'https://example.com/path/to/image.jpg';

loadImage(imageUrl)
    .then(img => {
        console.log('Image loaded successfully:', img);
        document.body.appendChild(img);
    })
    .catch(error => {
        console.error('Error loading image:', error);
    });
