document.addEventListener("DOMContentLoaded", () => {

  /* ===== EMAILJS INIT ===== */
  emailjs.init("kRVeqrx5cAXDTjpHO");

  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  if (!contactForm) return;

  /* ===== FORM SUBMIT ===== */
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    formStatus.textContent = "Sending request...";
    formStatus.className = "form-status";

    const templateParams = {
      from_name: document.getElementById("name").value.trim(),

      from_email: document.getElementById("email").value.trim(),

      business_type: document.getElementById("business").value.trim(),

      selected_package:
        document.getElementById("package").value,

      message:
        document.getElementById("message").value.trim()
    };

    emailjs.send(
      "service_csdp544",
      "template_msia68p",
      templateParams
    )

    .then(() => {

      formStatus.textContent =
        "Request sent successfully!";

      formStatus.className =
        "form-status success";

      contactForm.reset();
    })

    .catch((error) => {

      console.error("EmailJS Error:", error);

      formStatus.textContent =
        "Something went wrong. Please try again.";

      formStatus.className =
        "form-status error";
    });

  });

});