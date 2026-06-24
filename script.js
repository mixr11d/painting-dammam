// رقم هاتف العميل المستهدف بالتتبع (بدون صفر البداية لتغطية الصيغ الدولية والمحلية)
const clientPhoneNumber = "500330612";

// ==========================================
// 1. دوال إرسال أحداث التحويل إلى قوقل إدز (مع تفعيل خاصية الـ Beacon)
// ==========================================

// تتبع النقر على زر الاتصال بالعميل (القيمة: 50 ريال سعودي)
function trackCallConversion() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'send_to': 'AW-xxxxxx/LABEL_CALL_xxxxxx',
      'value': 50.00,
      'currency': 'SAR',
      'transport_type': 'beacon' // إرسال الإشارة في الخلفية لضمان عدم ضياعها أثناء الاتصال
    });
  }
}

// تتبع النقر على زر الواتساب للعميل (القيمة: 45 ريال سعودي)
function trackWhatsAppConversion() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'send_to': 'AW-xxxxxx/LABEL_WA_xxxxxx',
      'value': 45.00,
      'currency': 'SAR',
      'transport_type': 'beacon' // إرسال الإشارة في الخلفية لضمان عدم ضياعها عند فتح الواتساب
    });
  }
}

// تتبع ملأ وإرسال نموذج الاتصال (القيمة: 40 ريال سعودي)
function trackFormConversion() {
  if (typeof gtag !== 'undefined') {
    gtag('event', 'conversion', {
      'send_to': 'AW-xxxxxx/LABEL_FORM_xxxxxx',
      'value': 40.00,
      'currency': 'SAR',
      'transport_type': 'beacon' // إرسال الإشارة فوراً حتى لو تم تحديث الشاشة أو الانتقال لصفحة شكر
    });
  }
}

// ==========================================
// 2. تتبع الأزرار عبر تفويض الأحداث (Event Delegation)
// معالجة مشاكل: النوافذ المنبثقة (Popups) + المسافات والرموز + حالة الأحرف (Case Sensitivity)
// ==========================================
document.addEventListener('click', function(event) {
  // العثور على أقرب رابط تم الضغط عليه
  const anchor = event.target.closest('a');
  if (!anchor) return;

  const href = anchor.getAttribute('href');
  if (!href) return;

  // تحويل الرابط بالكامل إلى أحرف صغيرة لتجنب مشاكل حساسية الأحرف الكبيرة
  const hrefLower = href.toLowerCase();

  // تنظيف الرابط من المسافات، الشرطات، الأقواس، والنقاط لضمان مطابقة دقيقة للرقم
  const cleanHref = hrefLower.replace(/[\s\-\(\)\.]/g, '');

  if (hrefLower.startsWith('tel:') && cleanHref.includes(clientPhoneNumber)) {
    trackCallConversion();
  } else if ((hrefLower.includes('wa.me') || hrefLower.includes('whatsapp.com')) && cleanHref.includes(clientPhoneNumber)) {
    trackWhatsAppConversion();
  }
});

// ==========================================
// 3. تتبع النماذج الفعلي والتلقائي عبر تفويض الأحداث
// معالجة مشاكل: التحويلات الوهمية (Validation) + النماذج الديناميكية + منع الإلغاء (preventDefault) + إرسال البيانات (Web3Forms)
// ==========================================
document.addEventListener('submit', function(event) {
  const form = event.target.closest('form');
  if (!form) return;

  // التحقق من استيفاء شروط البيانات (HTML5 Validation) لمنع احتساب تحويلات وهمية
  if (form.checkValidity()) {
    
    // منع المتصفح تماماً من إرسال النموذج وإعادة تحميل الصفحة لضمان استقرار طلب الـ fetch وإتمام الإرسال الفعلي
    event.preventDefault(); 
    
    // إرسال إشارة التحويل لقوقل إدز بشكل آمن
    trackFormConversion();
    
    // تحويل البيانات لإرسالها الفعلي عبر AJAX لتصلك على بريدك الإلكتروني
    const formData = new FormData(form);
    const apiEndpoint = "https://api.web3forms.com/submit"; 
    
    // أضف مفتاح الوصول الخاص بك من موقع web3forms.com مجاناً
    formData.append("access_key", "ضع_مفتاح_الوصول_المجاني_الخاص_بك_هنا");

    fetch(apiEndpoint, {
      method: "POST",
      body: formData
    })
    .then(response => {
      if (response.ok) {
        alert("شكراً لك! تم استلام طلبك بنجاح، وسنتواصل معك فوراً لتحديد موعد المعاينة.");
        form.reset(); // تفريغ حقول النموذج بعد الإرسال الناجح
      } else {
        alert("حدث خطأ أثناء إرسال البيانات، يرجى المحاولة مرة أخرى أو الاتصال بنا مباشرة.");
      }
    })
    .catch(error => {
      console.error("Error submitting form:", error);
      alert("تعذر الاتصال بالسيرفر، يرجى محاولة الاتصال الهاتفي مباشرة.");
    });

  } else {
    // المتصفح يعرض رسائل الخطأ الافتراضية للحقول الفارغة دون إرسال أي إشارة تحويل لقوقل
  }
});
