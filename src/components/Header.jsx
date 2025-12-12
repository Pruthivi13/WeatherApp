import profileImage from '../assets/profile-image.png';

const Header = () => {
  return (
    <header className="flex flex-col md:flex-row items-center justify-between py-4 px-4 md:px-8 border-b border-gray-300/50 gap-4">
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
      <nav className="flex items-center">
        <a
          href="https://pruthivi13.github.io/personal-website/"
          className="text-gray-800 hover:text-sky-600 transition-colors font-medium"
        >
          About the Developer
        </a>
      </nav>

      {/* Contact Button */}
      <div className="flex-shrink-0">
        <a
          href="mailto:mail.to.pruthivi@gmail.com"
          className="bg-gray-900 text-white px-5 py-2 rounded-lg hover:bg-gray-700 transition-colors font-medium"
        >
          Contact Me
        </a>
      </div>
    </header>
  );
};

export default Header;
