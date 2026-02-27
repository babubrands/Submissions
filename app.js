// Initialize Supabase client
const supabaseUrl = 'xcpxvwioysbxoxeisinj'
const supabaseAnonKey = 'sb_publishable_n_o-QTxWJdj-xJ39_xRO4A__MNM1mus'
const supabase = window.supabase.createClient(supabaseUrl, supabaseAnonKey)

// Handle form submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  
  const statusEl = document.getElementById('status')
  const submitBtn = e.target.querySelector('button[type="submit"]')
  
  // Disable button while submitting
  submitBtn.disabled = true
  submitBtn.textContent = 'Sending...'
  statusEl.textContent = ''
  
  // Get form values
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  }
  
  // Insert into Supabase
  const { data, error } = await supabase
    .from('submissions')
    .insert([formData])
  
  // Handle response
  if (error) {
    statusEl.textContent = '❌ Error: ' + error.message
    statusEl.style.color = 'red'
  } else {
    statusEl.textContent = '✅ Message sent successfully!'
    statusEl.style.color = 'green'
    e.target.reset() // Clear form
  }
  
  // Re-enable button
  submitBtn.disabled = false
  submitBtn.textContent = 'Submit'
})
