// رقم هاتف العميل المستهدف بالتتبع (بدون صفر البداية لتغطية الصيغ الدولية والمحلية)
const clientPhoneNumber = "500330612";

// 1. تتبع إحالة النقر على زر الاتصال بالعميل (القيمة: 50 ريال سعودي)
function trackCallConversion() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'send_to': 'AW-xxxxxx/LABEL_CALL_xxxxxx',
      'value': 50.00,
      'currency': 'SAR'
    });
  }
}

// 2. تتبع إحالة النقر على زر الواتساب للعميل (القيمة: 45 ريال سعودي)
function trackWhatsAppConversion() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'send_to': 'AW-xxxxxx/LABEL_WA_xxxxxx',
      'value': 45.00,
      'currency': 'SAR'
    });
  }
}

// 3. تتبع إحالة ملأ وإرسال نموذج الاتصال (القيمة: 40 ريال سعودي)
function trackFormConversion() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'send_to': 'AW-xxxxxx/LABEL_FORM_xxxxxx',
      'value': 40.00,
      'currency': 'SAR'
    });
  }
}

// 4. ربط التتبع الذكي بالأزرار والنماذج تلقائياً فور تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
  
  // تتبع الاتصال: يفحص فقط الروابط التي تحتوي على رقم العميل
  document.querySelectorAll('a[href^="tel:"]').forEach(btn => {
    const href = btn.getAttribute('href');
    if (href.includes(clientPhoneNumber)) {
      btn.addEventListener('click', trackCallConversion);
    }
  });
  
  // تتبع الواتساب: يفحص فقط الروابط التي تذهب لرقم العميل وتتجاهل المطور
  document.querySelectorAll('a[href*="wa.me"], a[href*="whatsapp.com"]').forEach(btn => {
    const href = btn.getAttribute('href');
    if (href.includes(clientPhoneNumber)) {
      btn.addEventListener('click', trackWhatsAppConversion);
    }
  });

  // تتبع النماذج: يتتبع تلقائياً أي نموذج اتصال يتم إرساله بنجاح في الموقع
  document.querySelectorAll('form').forEach(form => {
    form.addEventListener('submit', trackFormConversion);
  });
  
});
