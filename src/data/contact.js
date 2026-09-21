// ================================
// VERA CONTACT CONFIG
// Replace contact information here.
// Every WhatsApp / Email / Social / Phone link reads from this single file.
// ================================

const CONTACT = {
  // e.g. "971501234567" (country code + number, no "+", no spaces)
  whatsapp: "7567685016",
  email: "wearevera1924@gmail.com",
  instagram: "the.vera.co",
  phone: "7567685016",
  // e.g. "https://forms.gle/xxxxxxxxxxxx"
  googleForm: "https://docs.google.com/forms/d/e/1FAIpQLSdBfUuwgR4C_dtqFrjD1DEQoH6hf1ZNM2N5FfrXxKczT_3zkg/viewform?usp=sharing&ouid=103565341668785331867"
};

// Prefixed URLs used across components — do not duplicate raw values elsewhere.
export const CONTACT_LINKS = {
  whatsapp: `https://wa.me/${CONTACT.whatsapp}?text=Hi%20VERA%2C%20I%20have%20a%20project%20in%20mind.`,
  email: `mailto:${CONTACT.email}`,
  instagram: `https://instagram.com/${CONTACT.instagram}`,
  phone: `tel:${CONTACT.phone}`,
  googleForm: CONTACT.googleForm
};

export default CONTACT;
