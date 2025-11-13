import React from 'react'

function Footer() {
  return (
    <footer className="bg-yellow-600 text-white text-center py-4">
        © {new Date().getFullYear()} CarpentryHub. All rights reserved.
      </footer>
  )
}

export default Footer