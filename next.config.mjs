/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds:true,
    },
    images: {
        domains: ["lh3.googleusercontent.com", "d1b14unh5d6w7g.cloudfront.net",
            "firebasestorage.googleapis.com"
        ]
    }
};

export default nextConfig;
