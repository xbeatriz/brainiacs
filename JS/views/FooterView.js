export function renderFooter() {
  const footer = `
    <footer class="bg-[#FFF1CD] mt-20">
      <div class="max-w-7xl mx-auto px-6 py-10">
        <div class="flex flex-col md:flex-row justify-between items-start gap-10">
          <!-- Logo + Descrição -->
          <div class="flex-1">
            <a href="/" class="flex items-center space-x-2">
          <img src="/media/img/logo.svg" class="h-5" alt="Brainiacs Logo">
        </a>
            <p class="text-sm text-gray-700 max-w-sm">
              We provide a fun and effective way to grow personally and professionally anytime, anywhere.
            </p>
          </div>

          <!-- Links -->
          <div class="flex-1 grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm text-gray-700">
            <div>
              <h4 class="font-semibold mb-2 text-gray-900">Company</h4>
              <ul class="space-y-1">
                <li><a href="#" class="hover:underline">About us</a></li>
                <li><a href="#" class="hover:underline">Careers</a></li>
                <li><a href="#" class="hover:underline">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-2 text-gray-900">Support</h4>
              <ul class="space-y-1">
                <li><a href="#" class="hover:underline">Help Center</a></li>
                <li><a href="#" class="hover:underline">Terms of Service</a></li>
                <li><a href="#" class="hover:underline">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 class="font-semibold mb-2 text-gray-900">Contact</h4>
              <ul class="space-y-1">
                <li><a href="#" class="hover:underline">Email Us</a></li>
                <li><a href="#" class="hover:underline">+1 (555) 123-4567</a></li>
              </ul>
            </div>
          </div>
        </div>

        <hr class="my-8 border-white" />

        <div class="text-center text-xs text-gray-500">
          © 2025 Brainiacs. All rights reserved.
        </div>
      </div>
    </footer>
  `;

window.addEventListener("DOMContentLoaded", () => {
    const footerContainer = document.getElementById("footer");
    if (footerContainer) {
      footerContainer.innerHTML = footer;
    }
  });
}
