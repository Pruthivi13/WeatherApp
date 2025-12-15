import { useTheme } from '../context/ThemeContext';
import profileImage from '../assets/profile-image.png';

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex flex-col md:flex-row items-center justify-between py-4 px-4 md:px-8 border-b border-gray-300/50 dark:border-gray-700/50 gap-4 transition-colors duration-300">
      {/* Profile Image */}
      <div className="flex-shrink-0">
        <a
          href="https://pruthivi13.github.io/personal-website/"
          className="inline-flex"
        >
          <img
            className="w-10 h-10 rounded-full hover:ring-2 hover:ring-sky-400 transition-all"
            src={profileImage}
            alt="Profile"
          />
        </a>
      </div>

      {/* Navigation */}
      <nav className="flex items-center gap-6">
        <a
          href="https://pruthivi13.github.io/personal-website/"
          className="text-gray-800 dark:text-gray-200 hover:text-sky-600 dark:hover:text-sky-400 transition-colors font-medium"
        >
          About the Developer
        </a>
      </nav>

      {/* Actions */}
      <div className="flex items-center gap-4">
        {/* Contact Button */}
        <a
          href="mailto:mail.to.pruthivi@gmail.com"
          className="hidden md:block bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 px-5 py-2 rounded-lg hover:bg-gray-700 dark:hover:bg-gray-300 transition-colors font-medium"
        >
          Contact Me
        </a>
        
        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all border border-gray-200 dark:border-gray-700"
          aria-label="Toggle Dark Mode"
        >
          {theme === 'light' ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278M4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286"/>
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path d="M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708"/>
            </svg>
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;
