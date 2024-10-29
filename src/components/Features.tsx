export const Feature = () => {
    return (
        <div className="px-4 py-16 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl md:px-24 lg:px-8 lg:py-20">
            <div className="max-w-xl mb-10 md:mx-auto sm:text-center lg:max-w-2xl md:mb-12">
                <div>
                    <p className="inline-block px-3 py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
                        Latest Projects
                    </p>
                </div>
                <h2 className="max-w-lg mb-6 font-sans text-3xl font-bold leading-none tracking-tight text-gray-900 sm:text-4xl md:mx-auto">
                    <span className="relative inline-block">
                        <span className="relative">Innovative Solutions</span>
                    </span>{' '}
                    for Today’s Digital Landscape
                </h2>
                <p className="text-base text-gray-700 md:text-lg">
                    A showcase of impactful projects designed to solve real-world problems and streamline digital experiences.
                </p>
            </div>
            <div className="grid gap-8 row-gap-10 lg:grid-cols-2">

                {/* Project 1 */}
                <div className="max-w-md sm:mx-auto sm:text-center">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
                        {/* Project icon */}
                    </div>
                    <h6 className="mb-3 text-xl font-bold leading-5">Project 1: Dynamic Web Platform</h6>
                    <p className="mb-3 text-sm text-gray-900">
                        A web application built with React and Next.js that dynamically renders content for high user engagement. Features include real-time data display and user authentication.
                    </p>
                    <a
                        href="/projects/dynamic-web-platform"
                        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                    >
                        Learn more
                    </a>
                </div>

                {/* Project 2 */}
                <div className="max-w-md sm:mx-auto sm:text-center">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
                        {/* Project icon */}
                    </div>
                    <h6 className="mb-3 text-xl font-bold leading-5">Project 2: Scalable Backend System</h6>
                    <p className="mb-3 text-sm text-gray-900">
                        Leveraging Node.js and Express, this backend system supports thousands of requests per second, utilizing efficient data caching and optimized database queries.
                    </p>
                    <a
                        href="/projects/scalable-backend-system"
                        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                    >
                        Learn more
                    </a>
                </div>

                {/* Project 3 */}
                <div className="max-w-md sm:mx-auto sm:text-center">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
                        {/* Project icon */}
                    </div>
                    <h6 className="mb-3 text-xl font-bold leading-5">Project 3: Interactive User Dashboard</h6>
                    <p className="mb-3 text-sm text-gray-900">
                        A highly customizable dashboard created using React and Chart.js, providing users with real-time analytics and data visualization features for enhanced decision-making.
                    </p>
                    <a
                        href="/projects/interactive-user-dashboard"
                        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                    >
                        Learn more
                    </a>
                </div>

                {/* Project 4 */}
                <div className="max-w-md sm:mx-auto sm:text-center">
                    <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-indigo-50 sm:mx-auto sm:w-24 sm:h-24">
                        {/* Project icon */}
                    </div>
                    <h6 className="mb-3 text-xl font-bold leading-5">Project 4: E-Commerce Platform</h6>
                    <p className="mb-3 text-sm text-gray-900">
                        A full-stack e-commerce application featuring a React frontend and Node.js backend, equipped with secure payment gateways, product management, and order tracking.
                    </p>
                    <a
                        href="/projects/ecommerce-platform"
                        className="inline-flex items-center font-semibold transition-colors duration-200 text-deep-purple-accent-400 hover:text-deep-purple-800"
                    >
                        Learn more
                    </a>
                </div>
            </div>
        </div>

    );
};