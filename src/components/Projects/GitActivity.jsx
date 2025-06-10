import React from 'react';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';

const GitActivity = ({ isVisible }) => {
    if (!isVisible) return null;

    // Sample activity data for the sparkline
    const activityData = [2, 1, 4, 5, 2, 3, 6, 4, 3, 7, 5, 8, 6, 4, 9, 7, 5, 6, 8, 4, 3, 5, 7, 6, 4, 8, 9, 5, 6, 7];
    const totalCommits = 101;

    // Sample recent commits data
    const recentCommits = [
        { message: "Merge pull request #6 from....", timestamp: "1 day ago" },
        { message: "Clean up wording and text", timestamp: "2 days ago" },
        { message: "General Pre Release Touch ups", timestamp: "4 days ago" }
    ];

    // Programming languages data colors
    const languages = [
        { name: "JavaScript", percentage: 68.7, color: "#f1e05a" },
        { name: "CSS", percentage: 11.2, color: "#563d7c" },
        { name: "HTML", percentage: 9.1, color: "#e34c26" },
        { name: "TypeScript", percentage: 7.8, color: "#2b7489" },
        { name: "Other", percentage: 3.2, color: "#8b949e" }
    ];

    return (
        <div className="fixed right-[50px] top-[70px] w-[240px] h-[480px] bg-white backdrop-blur-sm rounded-2xl shadow-lg border border-white/30">
            <div className="p-4 h-full flex flex-col">
                {/* Header with GitHub Icon, Title, and Activity Dot */}
                <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                        <div className="w-5 h-5">
                            <svg
                                viewBox="0 0 256 250"
                                width="20"
                                height="20"
                                fill="#24292f"
                                xmlns="http://www.w3.org/2000/svg"
                                preserveAspectRatio="xMidYMid"
                            >
                                <path
                                    d="M128.001 0C57.317 0 0 57.307 0 128.001c0 56.554 36.676 104.535 87.535 121.46 6.397 1.185 8.746-2.777 8.746-6.158 0-3.052-.12-13.135-.174-23.83-35.61 7.742-43.124-15.103-43.124-15.103-5.823-14.795-14.213-18.73-14.213-18.73-11.613-7.944.876-7.78.876-7.78 12.853.902 19.621 13.19 19.621 13.19 11.417 19.568 29.945 13.911 37.249 10.64 1.149-8.272 4.466-13.92 8.127-17.116-28.431-3.236-58.318-14.212-58.318-63.258 0-13.975 5-25.394 13.188-34.358-1.329-3.224-5.71-16.242 1.24-33.874 0 0 10.749-3.44 35.21 13.121 10.21-2.836 21.16-4.258 32.038-4.307 10.878.049 21.837 1.47 32.066 4.307 24.431-16.56 35.165-13.12 35.165-13.12 6.967 17.63 2.584 30.65 1.255 33.873 8.207 8.964 13.173 20.383 13.173 34.358 0 49.163-29.944 59.988-58.447 63.157 4.591 3.972 8.682 11.762 8.682 23.704 0 17.126-.148 30.91-.148 35.126 0 3.407 2.304 7.398 8.792 6.14C219.37 232.5 256 184.537 256 128.002 256 57.307 198.691 0 128.001 0Zm-80.06 182.34c-.282.636-1.283.827-2.194.39-.929-.417-1.45-1.284-1.15-1.922.276-.655 1.279-.838 2.205-.399.93.418 1.46 1.293 1.139 1.931Zm6.296 5.618c-.61.566-1.804.303-2.614-.591-.837-.892-.994-2.086-.375-2.66.63-.566 1.787-.301 2.626.591.838.903 1 2.088.363 2.66Zm4.32 7.188c-.785.545-2.067.034-2.86-1.104-.784-1.138-.784-2.503.017-3.05.795-.547 2.058-.055 2.861 1.075.782 1.157.782 2.522-.019 3.08Zm7.304 8.325c-.701.774-2.196.566-3.29-.49-1.119-1.032-1.43-2.496-.726-3.27.71-.776 2.213-.558 3.315.49 1.11 1.03 1.45 2.505.701 3.27Zm9.442 2.81c-.31 1.003-1.75 1.459-3.199 1.033-1.448-.439-2.395-1.613-2.103-2.626.301-1.01 1.747-1.484 3.207-1.028 1.446.436 2.396 1.602 2.095 2.622Zm10.744 1.193c.036 1.055-1.193 1.93-2.715 1.95-1.53.034-2.769-.82-2.786-1.86 0-1.065 1.202-1.932 2.733-1.958 1.522-.03 2.768.818 2.768 1.868Zm10.555-.405c.182 1.03-.875 2.088-2.387 2.37-1.485.271-2.861-.365-3.05-1.386-.184-1.056.893-2.114 2.376-2.387 1.514-.263 2.868.356 3.061 1.403Z" />
                                </svg>
                        </div>
                        <span className="text-sm font-medium text-gray-800">Github Activity</span>
                    </div>
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                </div>
                
                {/* Sparkline Chart */}
                <div className="mb-4">
                    <SparkLineChart
                        data={activityData}
                        width={200}
                        height={60}
                        showTooltip={true}
                        curve="monotoneX"
                        color="#22c55e"
                        sx={{ 
                            '& .MuiLineElement-root': { 
                                strokeWidth: 2.5, 
                                strokeLinecap: 'round' 
                            } 
                        }}
                    />
                </div>
                
                {/* Total Commits */}
                <div className="mb-4">
                    <span className="text-sm font-semibold text-black">
                        Total Commits: <span className="text-green-600">{totalCommits}</span>
                    </span>
                </div>
                
                {/* Latest Commits Section */}
                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-black mb-3">Latest Commits:</h4>
                    <div className="space-y-2">
                        {recentCommits.map((commit, index) => (
                            <div key={index} className="flex items-start gap-2">
                                {/* Bullet point and vertical line */}
                                <div className="flex flex-col items-center mt-1">
                                    <div className="w-1.5 h-1.5 bg-black rounded-full flex-shrink-0"></div>
                                    {index < recentCommits.length - 1 && (
                                        <div className="w-px h-6 bg-gray-300 mt-1"></div>
                                    )}
                                </div>
                                {/* Commit details */}
                                <div className="flex-1 min-w-0">
                                    <p className="text-xs text-black font-medium leading-tight mb-1">
                                        {commit.message}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        {commit.timestamp}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Languages Section */}
                <div className="flex-1">
                    <h4 className="text-sm font-semibold text-black mb-3">Languages</h4>
                    
                    {/* Language Percentage Bar */}
                    <div className="mb-3">
                        <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                            {languages.map((language, index) => (
                                <div
                                    key={index}
                                    className="h-full transition-all duration-500 ease-out"
                                    style={{
                                        width: `${language.percentage}%`,
                                        backgroundColor: language.color,
                                        animationDelay: `${index * 100}ms`
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                    
                    {/* Language List */}
                    <div className="grid grid-cols-2 gap-x-2 gap-y-1">
                        {languages.map((language, index) => (
                            <div key={index} className="flex items-center gap-2">
                                <div
                                    className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                                    style={{ backgroundColor: language.color }}
                                />
                                <span className="text-[10px] text-black font-medium">
                                    {language.name} {language.percentage}%
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GitActivity; 