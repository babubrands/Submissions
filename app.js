// 🔐 Supabase credentials
const SUPABASE_URL = "https://YOUR_PROJECT_ID.supabase.co";
const SUPABASE_ANON_KEY = "YOUR_PUBLIC_ANON_KEY";

const supabase = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const form = document.getElementById("contactForm");
const status = document.getElementById("status");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  status.textContent = "Submitting...";

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  const { error } = await supabase
    .from("submissions")
    .insert([{ name, email, message }]);

  if (error) {
    console.error(error);
    status.textContent = "❌ Failed to submit";
    status.style.color = "red";
  } else {
    status.textContent = "✅ Submitted successfully";
    status.style.color = "lime";
    form.reset();
  }
});
