(function () {
  const opts = document.querySelectorAll(".opt");
  const timeline = document.getElementById("timelineSelect");
  const notes = document.getElementById("notesInput");
  const checkbox = document.getElementById("seriousCheckbox");
  const helper = document.getElementById("helperText");
  const whatsapp = document.getElementById("whatsappLink");

  const answers = { stage: "", need: "", timeline: "", notes: "", ok: false };

  function updateButton() {
    const valid = answers.stage && answers.need && answers.timeline && answers.ok;

    if (!valid) {
      whatsapp.classList.add("disabled");
      whatsapp.href = "#";
      helper.textContent = "Please complete all required fields.";
      return;
    }

    helper.textContent = "";

    const text =
      `Hi Evolvo, here are my project details:\n\n` +
      `• Stage: ${answers.stage}\n` +
      `• Need: ${answers.need}\n` +
      `• Timeline: ${answers.timeline}\n` +
      (answers.notes ? `\nNotes: ${answers.notes}` : "");

    whatsapp.href =
      `${whatsapp.dataset.baseUrl}?text=${encodeURIComponent(text)}`;

    whatsapp.classList.remove("disabled");
  }

  opts.forEach((o) => {
    o.addEventListener("click", () => {
      const parent = o.closest(".options");
      const field = parent.dataset.field;

      parent.querySelectorAll(".opt").forEach(b => b.classList.remove("selected"));
      o.classList.add("selected");

      answers[field] = o.dataset.value;
      updateButton();
    });
  });

  timeline.addEventListener("change", () => {
    answers.timeline = timeline.value;
    updateButton();
  });

  notes.addEventListener("input", () => {
    answers.notes = notes.value;
    updateButton();
  });

  checkbox.addEventListener("change", () => {
    answers.ok = checkbox.checked;
    updateButton();
  });

  document.getElementById("year").textContent = new Date().getFullYear();

  /* Scroll reveal */
  const revealEls = document.querySelectorAll(".reveal");
  function revealOnScroll() {
    const trigger = window.innerHeight * 0.85;
    revealEls.forEach((el) => {
      if (el.getBoundingClientRect().top < trigger) {
        el.classList.add("visible");
      }
    });
  }

  window.addEventListener("scroll", revealOnScroll);
  window.addEventListener("load", revealOnScroll);
})();
