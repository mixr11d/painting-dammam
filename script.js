// ==========================================
// بيانات العميل والمطور (المتحكم الموحد)
// قم بتعديل هذه القيم فقط لتحديث الموقع والتتبع بالكامل تلقائياً
// ==========================================
const clientPhoneMain = "500330612";   // الرقم المجرد بدون صفر أو مفتاح الدولة (يُستخدم لمطابقة السكربت)
const clientPhoneLocal = "0500330612"; // الرقم بالصيغة المحلية (يُستخدم للاتصال الهاتفي والعرض المرئي)
const clientPhoneInt = "966500330612"; // الرقم بالصيغة الدولية المعتمدة (يُستخدم لروابط الواتساب)

const googleAdsID = "AW-xxxxxx";
const labelCall = "LABEL_CALL_xxxxxx";
const labelWA = "LABEL_WA_xxxxxx";
const labelForm = "LABEL_FORM_xxxxxx";

const devPhone = "966578539687";      // رقم هاتف المطور (الرعد التقني)

// روابط الواتساب بالترميز المباشر السليم لمنع أي تداخل أو تشوه لغوي
const developerWhatsAppLink = `https://wa.me/${devPhone}?text=مرحباً%20الرعد%20التقني%20أرغب%20في%20طلب%20خدمة`;
const clientWhatsAppLink = `https://wa.me/${clientPhoneInt}?text=السلام%20عليكم%20جيتك%20من%20قوقل%20بستفسر%20عن%20خدمة`;

// ==========================================
// 1. تحميل وتهيئة كود قوقل تاغ ديناميكياً في رأس الصفحة (Head) لمنع التكرار
// ==========================================
(function() {
  const gTagScript = document.createElement('script');
  gTagScript.async = true;
  gTagScript.src = "https://www.googletagmanager.com/gtag/js?id=" + googleAdsID;
  document.head.appendChild(gTagScript);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', googleAdsID);
})();

// ==========================================
// 2. دوال إرسال أحداث التحويل إلى قوقل إدز (مع تفعيل خاصية الـ Beacon)
// ==========================================
function trackCallConversion() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'send_to': googleAdsID + '/' + labelCall,
      'value': 50.00,
      'currency': 'SAR',
      'transport_type': 'beacon'
    });
  }
}

function trackWhatsAppConversion() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'send_to': googleAdsID + '/' + labelWA,
      'value': 45.00,
      'currency': 'SAR',
      'transport_type': 'beacon'
    });
  }
}

function trackFormConversion() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'send_to': googleAdsID + '/' + labelForm,
      'value': 40.00,
      'currency': 'SAR',
      'transport_type': 'beacon'
    });
  }
}

// ==========================================
// 3. حقن الهيدر، الفوتر، الأزرار العائمة، وزر الصعود ديناميكياً لجميع الصفحات
// تم ربط المتغيرات ديناميكياً لتجنب الحشو اليدوي (Hardcoding)
// ==========================================
document.addEventListener('DOMContentLoaded', function() {
  
  // أ. حقن الهيدر المشترك ديناميكياً
  const headerElement = document.getElementById('globalHeader');
  if (headerElement) {
    headerElement.innerHTML = `
      <div class="container">
          <div class="header-wrap">
              <div class="logo-box">
                  <div class="logo-badge">الشرقية</div>
                  <div class="logo-text">
                      <span style="font-size: 18px; font-weight: 700; color: var(--brand-blue); display: block;">أصباغ وديكورات الشرقية</span>
                      <p>دقة ممتازة وجودة مضمونة</p>
                  </div>
              </div>
              <a href="tel:${clientPhoneLocal}" id="headerCallBtn" aria-label="اتصال سريع بالهاتف" class="header-btn">
                  <svg viewBox="0 0 24 24"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" fill="#FFF"/></svg>
                  اتصل الآن
              </a>
          </div>
      </div>
    `;
  }

  // ب. حقن الفوتر المشترك ديناميكياً
  const footerElement = document.getElementById('globalFooter');
  if (footerElement) {
    footerElement.innerHTML = `
      <div class="container">
          <h3>أصباغ دهانات الشرقية</h3>
          <p>الخيار الأفضل والمجرب بالمنطقة الشرقية لتشطيب وترميم المباني السكنية والتجارية بدقة متناهية.</p>
          <div class="footer-regions">
              <span>📍 الدمام</span>
              <span>📍 الخبر</span>
              <span>📍 القطيف</span>
              <span>📍 العزيزية</span>
          </div>
          <div class="footer-cta">
              <span>للتواصل وتحديد موعد المعاينة فوراً:</span>
              <a href="tel:${clientPhoneLocal}" id="footerCallBtn" aria-label="اتصال سريع بالهاتف">${clientPhoneLocal}</a>
          </div>
          
          <div class="footer-links" style="margin-top: 25px; margin-bottom: 15px; font-size: 13px;">
              <a href="index.html" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">الرئيسية</a> | 
              <a href="privacy.html" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">سياسة الخصوصية</a> | 
              <a href="terms.html" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">الشروط والأحكام</a> |
              <a href="warranty-faq.html" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">الضمان والأسئلة الشائعة</a> |
              <a href="contact.html" style="color: #94a3b8; text-decoration: none; margin: 0 8px;">تواصل معنا</a>
          </div>
          
          <p class="developer-text" style="font-size: 12px; color: #64748b; margin-top: 15px;">
              تطوير مواقع وإعلانات قوقل: 
              <a href="${developerWhatsAppLink}" target="_blank" style="color: var(--brand-gold); text-decoration: none; font-weight: bold;">
                  الرعد التقني 0578539687
              </a>
          </p>

          <p class="copy-text">جميع الحقوق محفوظة © 2026. الكود محمي ومحسن برمجياً لسرعة فائقة بالتحميل.</p>
      </div>
    `;
  }

  // ج. حقن الأزرار العائمة تلقائياً
  const floatingActions = document.createElement('div');
  floatingActions.className = 'floating-actions';
  floatingActions.innerHTML = `
    <a href="tel:${clientPhoneLocal}" id="floatCallBtn" aria-label="اتصال سريع بالهاتف" class="float-btn f-call">
        <svg viewBox="0 0 24 24"><path fill="#FFF" d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>
    </a>
    <a href="${clientWhatsAppLink}" id="floatWhatsAppBtn" aria-label="مراسلة واتساب" class="float-btn f-wa">
        <svg viewBox="0 0 24 24"><path fill="#FFF" d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.559 5.338-11.894 11.893-11.894 3.18 0 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.657zm4.733-3.782l.34.202c1.4.83 3.014 1.267 4.664 1.268h.005c5.648 0 10.245-4.596 10.248-10.244.001-2.737-1.062-5.31-2.993-7.243-1.93-1.933-4.492-3-7.228-3.001-5.652 0-10.25 4.598-10.253 10.247-.001 1.701.444 3.364 1.29 4.86l.22.385-.989 3.61 3.693-.969zm13.725-7.802c-.274-.138-1.62-.8-1.874-.891-.254-.092-.44-.138-.625.138-.185.277-.714.891-.875 1.076-.162.185-.324.208-.598.07-.274-.138-1.16-.427-2.21-1.366-.817-.729-1.37-1.629-1.53-1.892-.161-.277-.017-.426.121-.563.125-.124.275-.323.412-.483.137-.161.183-.276.274-.459.092-.185.046-.346-.023-.483-.069-.138-.625-1.507-.856-2.062-.225-.542-.47-.468-.646-.477-.167-.008-.36-.009-.553-.009-.193 0-.507.073-.77.36-.264.288-1.008.985-1.008 2.4 0 1.417 1.031 2.784 1.175 2.977.145.193 2.03 3.1 4.917 4.346.686.297 1.223.474 1.64.607.69.219 1.319.188 1.815.114.553-.082 1.62-.662 1.848-1.27.228-.607.228-1.127.16-1.236-.068-.109-.253-.185-.527-.323z"/></svg>
    </a>
  `;
  document.body.appendChild(floatingActions);

  // د. حقن زر الصعود للأعلى وتفعيل برمجته بشكل ديناميكي كامل
  const scrollToTopBtn = document.createElement('button');
  scrollToTopBtn.id = 'scrollToTop';
  scrollToTopBtn.setAttribute('aria-label', 'الرجوع للأعلى');
  scrollToTopBtn.innerHTML = `<svg viewBox="0 0 24 24"><path fill="#FFF" d="M7.41 15.41L12 10.83l4.59 4.58L18 14l-6-6-6 6z"/></svg>`;
  document.body.appendChild(scrollToTopBtn);

  window.addEventListener("scroll", () => {
    if (window.scrollY > 300) { scrollToTopBtn.classList.add("show"); } 
    else { scrollToTopBtn.classList.remove("show"); }
  });
  scrollToTopBtn.addEventListener("click", () => { window.scrollTo({ top: 0, behavior: "smooth" }); });
});

// ==========================================
// 4. تتبع الأزرار عبر تفويض الأحداث (Event Delegation)
// معالجة مشاكل: النوافذ المنبثقة (Popups) + المسافات والرموز + حالة الأحرف (Case Sensitivity)
// ==========================================
document.addEventListener('click', function(event) {
  const anchor = event.target.closest('a');
  if (!anchor) return;

  const href = anchor.getAttribute('href');
  if (!href) return;

  const hrefLower = href.toLowerCase();
  const cleanHref = hrefLower.replace(/[\s\-\(\)\.]/g, '');

  if (hrefLower.startsWith('tel:') && cleanHref.includes(clientPhoneMain)) {
    trackCallConversion();
  } else if ((hrefLower.includes('wa.me') || hrefLower.includes('whatsapp.com')) && cleanHref.includes(clientPhoneMain)) {
    trackWhatsAppConversion();
  }
});

// ==========================================
// 5. تتبع النماذج الفعلي والتلقائي عبر تفويض الأحداث
// معالجة مشاكل: التحويلات الوهمية (Validation) + النماذج الديناميكية + منع الإلغاء (preventDefault) + إرسال البيانات (Web3Forms)
// ==========================================
document.addEventListener('submit', function(event) {
  const form = event.target.closest('form');
  if (!form) return;

  if (form.checkValidity()) {
    event.preventDefault(); // منع إعادة تحميل الصفحة
    trackFormConversion();  // إرسال إشارة الإحالة لقوقل
    
    const formData = new FormData(form);
    const apiEndpoint = "https://api.web3forms.com/submit"; 
    
    formData.append("access_key", "ضع_مفتاح_الوصول_المجاني_الخاص_بك_هنا");

    fetch(apiEndpoint, {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (response.ok) {
        alert("شكراً لك! تم استلام طلبك بنجاح، وسنتواصل معك فوراً لتحديد موعد المعاينة.");
        form.reset();
      } else {
        alert("حدث خطأ أثناء إرسال البيانات، يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.");
      }
    })
    .catch(error => {
      console.error("Error submitting form:", error);
      alert("تعذر الاتصال بالسيرفر، يرجى محاولة الاتصال الهاتفي مباشرة.");
    });

  }
});
