document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("form");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = new FormData(form);

    // Honeypot check (in case you also want client-side filtering)
    if (formData.get("_gotcha")) {
      return; // Do nothing if spam
    }

    fetch(form.action, {
      method: "POST",
      body: formData,
      headers: { Accept: "application/json" },
    })
      .then(response => {
        if (response.ok) {
          form.innerHTML = "<p>✅ Thanks for your message! I'll get back to you soon.</p>";
        } else {
          form.innerHTML = "<p>❌ Something went wrong. Please try again later.</p>";
        }
      })
      .catch(() => {
        form.innerHTML = "<p>❌ Network error. Please try again later.</p>";
      });
  });
});
