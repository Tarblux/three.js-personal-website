import React, { useState, useEffect } from 'react';
import { SparkLineChart } from '@mui/x-charts/SparkLineChart';
import { LANGUAGE_COLORS } from '../../data/languageColors';
import { GIT_FALLBACK_DATA } from '../../data/gitFallbackData';

const extractRepoNameFromGithubUrl = (githubUrl) => {
    if (!githubUrl) return null;
    
    try {
        const url = new URL(githubUrl);
        const pathParts = url.pathname.split('/').filter(part => part.length > 0);
        
        // GitHub URL format: https://github.com/username/repo-name
        if (pathParts.length >= 2) {
            return pathParts[1];
        }
    } catch (error) {
        console.error('Invalid GitHub URL:', githubUrl);
    }
    
    return null;
};

// Custom component for the gradient line
const GradientLine = (props) => {
  const { d, skipAnimation, ownerState, ...other } = props;
  return (
    <>
      <defs>
        <linearGradient id="line-gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="#5FDD74" />
          <stop offset="100%" stopColor="#008000" />
        </linearGradient>
      </defs>
      <path d={d} {...other} stroke="url(#line-gradient)" fill="none" strokeWidth={2} />
    </>
  );
};

// Custom component for the gradient area
const GradientArea = (props) => {
  const { d, skipAnimation, ownerState, ...other } = props;
  return (
    <>
      <defs>
        <linearGradient id="area-gradient" gradientTransform="rotate(90)">
          <stop offset="0%" stopColor="#d4ffb2" stopOpacity={0.4} />
          <stop offset="100%" stopColor="#008000" stopOpacity={0} />
        </linearGradient>
      </defs>
      <path d={d} {...other} fill="url(#area-gradient)" />
    </>
  );
};

const GitActivity = ({ 
    isVisible, 
    project = null, // project object instead of individual props , maybe refactor this idk
    repo = null,
    showComponent = true,
    position = { right: '50px', top: '70px' }, // Default positioning, can be overridden by parent
}) => {
    const [gitData, setGitData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const repoName = project?.github 
        ? extractRepoNameFromGithubUrl(project.github) 
        : repo || "three.js-personal-website";
    
    const API_BASE_URL = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000' 
        : 'https://threejs-backend.tariqwill.com';

    useEffect(() => {
        const fetchGitData = async () => {
            // Don't fetch if no repo name or if project has no github
            if (!repoName || (project && !project.github)) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await fetch(`${API_BASE_URL}/git-repos?repo=${repoName}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch git data');
                }
                const data = await response.json();
                setGitData(data);
                setError(null);
            } catch (err) {
                console.error('Error fetching git data:', err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchGitData();
    }, [API_BASE_URL, repoName, project?.github]);

    const getFallbackData = (repoName) => {
        return GIT_FALLBACK_DATA[repoName] || GIT_FALLBACK_DATA["three.js-personal-website"];
    };

    if (!isVisible) return null;
    
    if (project && !project.github) {
        return null;
    }

    // If no repo name could be determined, don't show the component
    if (!repoName) {
        return null;
    }

    // Use real data if available, otherwise fallback
    const currentData = gitData || getFallbackData(repoName);
    const activityData = currentData.commits_per_week?.commitsPerWeek || getFallbackData(repoName).commits_per_week.commitsPerWeek;
    const totalCommits = currentData.total_commits || getFallbackData(repoName).total_commits;
    const recentCommits = currentData.latest_commits?.commits || getFallbackData(repoName).latest_commits.commits;

    // Process language data with decoupled colors
    const languages = currentData.language_percentages 
        ? Object.entries(currentData.language_percentages).map(([name, percentage]) => ({
            name,
            percentage: parseFloat(percentage),
            color: LANGUAGE_COLORS[name] || LANGUAGE_COLORS["Other"]
        })).sort((a, b) => b.percentage - a.percentage)
        : Object.entries(getFallbackData(repoName).language_percentages).map(([name, percentage]) => ({
            name,
            percentage: parseFloat(percentage),
            color: LANGUAGE_COLORS[name] || LANGUAGE_COLORS["Other"]
        })).sort((a, b) => b.percentage - a.percentage);

    return (
        <div 
            className={`fixed w-[240px] min-h-[350px] max-h-[600px] bg-white backdrop-blur-sm rounded-2xl shadow-lg border border-white/30 transition-all duration-300 hover:scale-[1.03] hover:shadow-xl ${showComponent ? 'opacity-100' : 'opacity-0'}`}
            style={{
                right: position.right,
                top: position.top,
                left: position.left,
                bottom: position.bottom
            }}
        >
            <div className="p-3 flex flex-col">
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
                    <div className={`w-2 h-2 rounded-full ${loading ? 'bg-yellow-500' : error ? 'bg-red-500' : 'bg-green-500'} animate-pulse`}></div>
                </div>
                
                {/* Sparkline Chart */}
                <div className="mb-1 -mt-4">
                    {loading ? (
                        <div className="w-[200px] h-[30px] bg-gray-200 rounded animate-pulse"></div>
                    ) : !activityData || !Array.isArray(activityData) ? null : activityData.every((v) => v === 0) ? (
                        <div className="flex items-center justify-center w-[200px] h-[60px] mt-2">
                            <span className="text-gray-400 text-xs">No Commits This Year🥲</span>
                        </div>
                    ) : (
                        <SparkLineChart
                            data={activityData}
                            width={200}
                            height={50}
                            showTooltip={false}
                            curve="monotoneX"
                            area
                            slots={{
                                line: GradientLine,
                                area: GradientArea,
                            }}
                            sx={{
                                '& .MuiSparkLine-line': {
                                    stroke: 'none',
                                },
                                '& .MuiSparkLine-area': {
                                    fill: 'none',
                                }
                            }}
                        />
                    )}
                </div>
                
                {/* Total Commits */}
                <div className="mb-1.5">
                    <span className="text-sm font-semibold text-black">
                        Total Commits: <span className="text-green-600">{loading ? '...' : totalCommits}</span>
                    </span>
                </div>
                
                {/* Latest Commits Section */}
                <div className="mb-4">
                    <h4 className="text-sm font-semibold text-black mb-3">Latest Commits</h4>
                    <div className="relative">
                        {/* Vertical dashed line - only shown when not loading and there are commits */}
                        {!loading && recentCommits && recentCommits.length > 0 &&
                            <div className="absolute top-1.5 left-[3px] w-px h-full border-[1px] border-dashed border-gray-300"></div>
                        }
                        
                        <div className="space-y-4">
                            {loading ? (
                                // Loading skeleton
                                Array.from({ length: 3 }).map((_, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <div className="flex flex-col items-center mt-1">
                                            <div className="w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse"></div>
                                            {index < 2 && <div className="w-px h-6 bg-gray-200 mt-1"></div>}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <div className="w-full h-3 bg-gray-200 rounded animate-pulse mb-1"></div>
                                            <div className="w-16 h-2 bg-gray-200 rounded animate-pulse"></div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                recentCommits.slice(0, 3).map((commit, index) => (
                                    <div key={commit.sha || `commit-${index}`} className="flex items-start gap-2.5 relative">
                                        {/* Bullet point - sits on top of the line */}
                                        <div className="w-[8px] h-[8px] bg-gray-500 rounded-[40%] flex-shrink-0 mt-1 z-10"></div>
                                        
                                        {/* Commit details */}
                                        <div className="flex-1 min-w-0">
                                            <p className="text-[12px] text-black font-medium leading-tight">
                                                {commit.message.length > 50 ? `${commit.message.substring(0, 50)}...` : commit.message}
                                            </p>
                                            <p className="text-[10px] text-gray-500">
                                                {commit.timeAgo}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>

                {/* Languages Section */}
                <div className="pb-2">
                    <h4 className="text-sm font-semibold text-black mb-3">Languages</h4>
                    
                    {/* Language Percentage Bar */}
                    <div className="mb-3">
                        {loading ? (
                            <div className="h-2 bg-gray-200 rounded-full animate-pulse"></div>
                        ) : (
                            <div className="flex h-2 bg-gray-200 rounded-full overflow-hidden">
                                {languages.map((language, index) => (
                                    <div
                                        key={`${language.name}-${index}`}
                                        className="h-full transition-all duration-500 ease-out"
                                        style={{
                                            width: `${language.percentage}%`,
                                            backgroundColor: language.color,
                                            animationDelay: `${index * 100}ms`
                                        }}
                                    />
                                ))}
                            </div>
                        )}
                    </div>
                    
                    {/* Language List */}
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1">
                        {loading ? (
                            // Loading skeleton
                            Array.from({ length: 4 }).map((_, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <div className="w-[5px] h-[5px] bg-gray-300 rounded-full animate-pulse"></div>
                                    <div className="w-12 h-2 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            ))
                        ) : (
                            languages.map((language, index) => (
                                <div key={`${language.name}-list-${index}`} className="flex items-center gap-2">
                                    <div
                                        className="w-[5px] h-[5px] rounded-full flex-shrink-0"
                                        style={{ backgroundColor: language.color }}
                                    />
                                    <span className="text-[11px] text-black font-medium whitespace-nowrap">
                                        <b>{language.name.length > 10 ? `${language.name.substring(0, 10)}...` : language.name}</b> {language.percentage.toFixed(1)}%
                                    </span>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GitActivity; 