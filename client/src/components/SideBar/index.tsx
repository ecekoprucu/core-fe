/* eslint-disable jsx-a11y/anchor-is-valid */

export const Sidebar = () => {
    return (
        <div className="col-auto col-md-3 col-xl-2 px-sm-2 px-0 bg-dark">
            <div className="d-flex flex-column align-items-center align-items-sm-start px-3 pt-2 text-white min-vh-100 justify-content-between">
                <hr />
                <h2 className="d-none d-sm-inline">Menu</h2>
                <hr />
                <ul className="nav nav-pills flex-column mb-sm-auto mb-0 align-items-center align-items-sm-start" id="menu">
                    <li className="nav-item">
                        <a href="/" className="nav-link align-middle px-0">
                            <i className="bi bi-house"></i> <span className="ms-1 d-none d-sm-inline">Main Screen</span>
                        </a>
                    </li>
                    <li>
                        <a href="#submenu1" data-bs-toggle="collapse" className="nav-link px-0 align-middle">
                            <i className="bi bi-ticket"></i> <span className="ms-1 d-none d-sm-inline">Tickets</span> 
                        </a>
                    </li>
                    <li>
                        <a href="#" className="nav-link px-0 align-middle">
                            <i className="bi bi-file-earmark"></i> <span className="ms-1 d-none d-sm-inline">Invoices</span></a>
                    </li>
                    <li>
                        <a href="#submenu2" data-bs-toggle="collapse" className="nav-link px-0 align-middle ">
                            <i className="bi bi-person"></i> <span className="ms-1 d-none d-sm-inline">Client Information</span></a>
                    </li>
                </ul>
                <hr />
                <div className="pb-4">
                    <a href="#" className="d-flex align-items-center text-white text-decoration-none dropdown-toggle" id="dropdownUser1" data-bs-toggle="dropdown" aria-expanded="false">
                        <span className="d-none d-sm-inline mx-1">loser</span>
                    </a>
                </div>
            </div>
        </div>
    )
}