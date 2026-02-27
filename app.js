// ✅ Initialize Supabase client (fixed variable name + URL)
const SUPABASE_URL = 'https://xcpxvwioysbxoxeisinj.supabase.co'  // ✅ Full URL
const SUPABASE_KEY = 'sb_publishable_n_o-QTxWJdj-xJ39_xRO4A__MNM1mus'  // ✅ Re-copy if needed

const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY)

// ✅ Handle form submission
document.getElementById('contactForm').addEventListener('submit', async (e) => {
  e.preventDefault()
  
  const statusEl = document.getElementById('status')
  const submitBtn = e.target.querySelector('button[type="submit"]')
  
  submitBtn.disabled = true
  submitBtn.textContent = 'Sending...'
  statusEl.textContent = ''
  statusEl.style.color = ''
  
  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  }
  
  try {
    const { data, error } = await supabaseClient  // ✅ Fixed variable name
      .from('submissions')
      .insert([formData])
    
    if (error) throw error
    
    statusEl.textContent = '✅ Message sent successfully!'
    statusEl.style.color = 'green'
    e.target.reset()
  } catch (err) {
    statusEl.textContent = '❌ Error: ' + err.message
    statusEl.style.color = 'red'
    console.error('Submission error:', err)
  } finally {
    submitBtn.disabled = false
    submitBtn.textContent = 'Submit'
  }
})
