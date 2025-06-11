export function renderNavbar() {
  const navbar = `
    <nav class="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-2">
        <a href="/" class="flex items-center space-x-2">
          <img src="/media/img/logo.svg" class="h-5" alt="Brainiacs Logo">
        </a>
        <div class="flex md:order-2 space-x-2 md:space-x-0">
          <a href="/html/login.html" class="text-white bg-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-full text-sm px-8 py-1.5 text-center">
  Login
</a>
          <button data-collapse-toggle="navbar-sticky" type="button" 
            class="inline-flex items-center p-2 w-9 h-9 justify-center text-sm text-gray-500 rounded-lg 
            md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" 
            aria-controls="navbar-sticky" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" 
                    d="M1 1h15M1 7h15M1 13h15" />
            </svg>
          </button>
        </div>
        <div class="items-center justify-between hidden w-full md:flex md:w-auto md:order-1" id="navbar-sticky">
          <ul class="flex flex-col p-2 md:p-0 mt-3 font-medium border border-gray-100 rounded-lg bg-gray-50 
                     md:space-x-6 md:flex-row md:mt-0 md:border-0 md:bg-white text-sm">
            <li><a href="/html/courses.html" class="block py-1.5 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:p-0">Courses</a></li>
            <li><a href="/html/be-a-tutor.html" class="block py-1.5 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:p-0">Be a Tutor</a></li>
            <li><a href="/html/comunity.html" class="block py-1.5 px-3 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:hover:text-orange-500 md:p-0">Community</a></li>
          </ul>
        </div>
      </div>
    </nav>
  `;

  document.getElementById("navbar").innerHTML = navbar;
}
