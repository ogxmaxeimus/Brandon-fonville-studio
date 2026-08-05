const discoveryForm = document.getElementById("discoveryForm");
const discoveryStatus = document.getElementById("discoveryStatus");
const discoverySubmit = document.getElementById("discoverySubmit");

function setDiscoveryStatus(message, kind) {
  if (!discoveryStatus) return;
  discoveryStatus.textContent = message;
  discoveryStatus.className = "form-status" + (kind ? " " + kind : "");
}

discoveryForm?.addEventListener("submit", async (e) => {
  e.preventDefault();

  if (discoveryForm.querySelector('[name="_gotcha"]')?.value) return;

  setDiscoveryStatus("Sending your questionnaire…", "pending");
  discoverySubmit.disabled = true;

  try {
    const res = await fetch(discoveryForm.action, {
      method: "POST",
      body: new FormData(discoveryForm),
      headers: { Accept: "application/json" },
    });

    if (res.ok) {
      discoveryForm.reset();
      setDiscoveryStatus(
        "Thank you! Your discovery questionnaire was submitted. I'll review your answers and follow up with a proposal.",
        "success"
      );
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const data = await res.json().catch(() => ({}));
      const msg = data?.errors?.map((x) => x.message).join(", ");
      setDiscoveryStatus(msg || "Something went wrong. Please email hello@brandonfonville.com.", "error");
    }
  } catch {
    setDiscoveryStatus("Network error. Please try again or email hello@brandonfonville.com.", "error");
  } finally {
    discoverySubmit.disabled = false;
  }
});
