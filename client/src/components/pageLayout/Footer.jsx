import React from 'react'

export default function Footer() {
  const currentYear = new Date().getFullYear();


  return (
    <footer className="mt-auto d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
      <div className="col-md-4 d-flex align-items-center">
        <a href="/" className="mb-3 me-2 mb-md-0 text-muted text-decoration-none lh-1">
          <svg className="bi" width="30" height="24"><use xlink:href="#bootstrap"></use></svg>
        </a>
        <span className="mb-3 mb-md-0 text-muted">© 2022 Company - {currentYear} Inc.</span>
      </div>

      <ul className="nav col-md-4 justify-content-end list-unstyled d-flex">
        <li className="ms-3">
          <a className="text-muted" href="#">
            <i className="fab fa-twitter" style={{ fontSize: '24px' }}></i>
          </a>
        </li>
        <li className="ms-3">
          <a className="text-muted" href="#">
            <i className="fab fa-instagram" style={{ fontSize: '24px' }}></i>
          </a>
        </li>
        <li className="ms-3 ">
          <a className="text-muted" href="#">
            <i className="fab fa-facebook" style={{ fontSize: '24px' }}></i>
          </a>
        </li>
      </ul>
    </footer>
  )
}
