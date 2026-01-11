(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Sticky Navbar
    $(window).scroll(function () {
        if ($(this).scrollTop() > 40) {
            $('.navbar').addClass('sticky-top');
        } else {
            $('.navbar').removeClass('sticky-top');
        }
    });
    
    // Dropdown on mouse hover
    const $dropdown = $(".dropdown");
    const $dropdownToggle = $(".dropdown-toggle");
    const $dropdownMenu = $(".dropdown-menu");
    const showClass = "show";
    
    $(window).on("load resize", function() {
        if (this.matchMedia("(min-width: 992px)").matches) {
            $dropdown.hover(
            function() {
                const $this = $(this);
                $this.addClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "true");
                $this.find($dropdownMenu).addClass(showClass);
            },
            function() {
                const $this = $(this);
                $this.removeClass(showClass);
                $this.find($dropdownToggle).attr("aria-expanded", "false");
                $this.find($dropdownMenu).removeClass(showClass);
            }
            );
        } else {
            $dropdown.off("mouseenter mouseleave");
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Date and time picker
    $('.date').datetimepicker({
        format: 'L'
    });
    $('.time').datetimepicker({
        format: 'LT'
    });


    // Image comparison
    $(".twentytwenty-container").twentytwenty({});


    // Price carousel
    $(".price-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1500,
        margin: 45,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: true,
        smartSpeed: 1000,
        items: 1,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
    });
    
})(jQuery);


   document.addEventListener('DOMContentLoaded', () => {
      const themeBtn = document.getElementById('themeBtn');
      const body = document.body;
      const STORAGE_KEY = 'sanad-theme';

      // Apply stored theme (if any)
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved === 'dark') {
        body.classList.add('dark-mode');
        themeBtn.textContent = '☀️';
      } else {
        // ensure consistent initial label
        themeBtn.textContent = '🌙';
      }

      // Toggle handler
      themeBtn.addEventListener('click', () => {
        const nowDark = body.classList.toggle('dark-mode');
        themeBtn.textContent = nowDark ? '☀️' : '🌙';
        localStorage.setItem(STORAGE_KEY, nowDark ? 'dark' : 'light');
      });

      // Debug helper (open console if still not working)
      // Uncomment to log state:
      // console.log('theme:', localStorage.getItem(STORAGE_KEY));
    });







      /* ===== small helpers ===== */
const el = (sel) => document.querySelector(sel);
const els = (sel) => Array.from(document.querySelectorAll(sel));

/* ===== theme & year setup ===== */



/* ===== sidebar collapse & hamburger for mobile ===== */
const collapseBtn = el('#collapseBtn');
const sidebar = el('#sidebar');
const hamburger = el('#hamburger');
const app = el('#app');

collapseBtn && collapseBtn.addEventListener('click', () => {
  sidebar.style.width = sidebar.style.width === '80px' ? '' : '80px';
  // hide labels when collapsed
  const labels = els('.menu-item .label');
  labels.forEach(l => l.style.display = (l.style.display === 'none' ? '' : 'none'));
});

hamburger && hamburger.addEventListener('click', () => {
  app.classList.toggle('show-sidebar');
});

/* ===== Chart (Chart.js) ===== */
const usersCtx = document.getElementById('usersChart');
if (usersCtx) {
  const usersChart = new Chart(usersCtx, {
    type: 'line',
    data: {
      labels: ['Nov','Dec','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov'],
      datasets: [{
        label: 'New Users',
        data: [40,55,50,65,80,70,90,95,100,110,120,130],
        borderColor: '#0BA29D',
        backgroundColor: 'rgba(11,162,157,0.08)',
        fill: true,
        tension: 0.35,
        pointRadius: 3,
        pointHoverRadius:6
      }]
    },
    options: {
      responsive:true,
      plugins:{legend:{display:false}},
      scales:{
        y:{beginAtZero:true, grid:{color:'rgba(0,0,0,0.03)'}},
        x:{grid:{display:false}}
      }
    }
  });
}
/*****modal hidden*/
/* ===== Table actions: Edit + Delete (UI only) ===== */
const modal = el('#modal');
const mName = el('#mName');
const mEmail = el('#mEmail');
const mRole = el('#mRole');
let editingRow = null;

els('.edit').forEach(btn => btn.addEventListener('click', (e) => {
  const row = e.target.closest('tr');
  editingRow = row;
  const cells = row.children;
  mName.value = cells[0].textContent.trim();
  mEmail.value = cells[1].textContent.trim();
  mRole.value = cells[2].textContent.trim();
  modal.classList.remove('hidden');
}));

el('#mCancel') && el('#mCancel').addEventListener('click', () => {
  modal.classList.add('hidden');
});

el('#mSave') && el('#mSave').addEventListener('click', () => {
  if (!editingRow) return;
  editingRow.children[0].textContent = mName.value;
  editingRow.children[1].textContent = mEmail.value;
  editingRow.children[2].textContent = mRole.value;
  modal.classList.add('hidden');
});

/* Delete row */
els('.delete').forEach(btn => btn.addEventListener('click', (e) => {
  const row = e.target.closest('tr');
  row.animate([{opacity:1},{opacity:0}],{duration:220,fill:'forwards'});
  setTimeout(()=> row.remove(), 240);
}));

/* small entry animation */
window.addEventListener('load',()=>{
  requestAnimationFrame(()=> {
    document.querySelector('.app').classList.add('page-enter-active');
  });
});

/* search filter */
el('#searchInput') && el('#searchInput').addEventListener('input', (e) => {
  const q = e.target.value.toLowerCase();
  els('#usersTable tbody tr').forEach(r => {
    const txt = r.textContent.toLowerCase();
    r.style.display = txt.includes(q) ? '' : 'none';
  });
});
