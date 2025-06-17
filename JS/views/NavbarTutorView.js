//imports
import * as tutors from "./models/TutorModel.js";

export function renderNavbarTutorDashboard() {
  const navbarTutorDashboard = `
    <nav class="bg-white border-gray-200 fixed w-full z-20 top-0 left-0 border-b border-gray-200">
      <div class="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        
        <!-- Logo -->
        <a href="/" class="flex items-center space-x-3">
          <img src="/media/img/logo-tutor.svg" class="h-5" alt="Brainiacs Logo" />
         
        </a>

        <!-- Avatar + Toggle Button (Mobile) -->
        <div class="flex items-center md:order-2 space-x-3">
          <button id="user-menu-button" aria-expanded="false" aria-haspopup="true" 
            class="flex text-sm bg-white rounded-full focus:ring-4 focus:ring-orange-300 border border-gray-300 hover:ring-4 hover:ring-orange-400 p-1" data-dropdown-toggle="user-dropdown" data-dropdown-placement="bottom">
            <span class="sr-only">Open user menu</span>
            <img class="w-8 h-8 rounded-full" src="https://placehold.co/200" alt="user photo" />
          </button>

          <!-- Mobile menu toggle -->
          <button data-collapse-toggle="navbar-dashboard" type="button" 
            class="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" 
            aria-controls="navbar-dashboard" aria-expanded="false">
            <span class="sr-only">Open main menu</span>
            <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>


        <!-- Dropdown menu do avatar -->
        <div class="hidden z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow-md absolute right-4 top-16 w-48" id="user-dropdown">
          <div class="px-4 py-3">
            <span class="block text-sm text-gray-900">João</span>
            <span class="block text-sm text-gray-500 truncate">joao@email.com</span>
          </div>
          <ul class="py-2" aria-labelledby="user-menu-button">
            <li>
              <a href="/html/dashboard.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-600">Dashboard</a>
            </li>
            <li>
              <a href="/html/settings.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-600">Settings</a>
            </li>
            <li>
              <a href="/html/earnings.html" class="block px-4 py-2 text-sm text-gray-700 hover:bg-orange-100 hover:text-orange-600">Earnings</a>
            </li>
            <li>
              <a href="/html/login.html" class="block px-4 py-2 text-sm text-red-600 hover:bg-red-100 hover:text-red-700">Sign out</a>
            </li>
          </ul>
        </div>

      </div>
    </nav>
  `;

  document.getElementById("navbarTutorDashboard").innerHTML =
    navbarTutorDashboard;
}
