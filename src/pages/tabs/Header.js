import React from 'react'
import logoheader from "../../assets/images/index_logoleft.svg"

const Header = () => {

  const openBillingPage = () => {
    const instence_id = window?.Wix?.Utils?.getInstanceId();

    const url = `https://www.wix.com/apps/upgrade/${process.env.REACT_APP_WIX_APP_ID}?appInstanceId=${instence_id}`;
    window.open(url, '_blank');

  }

  return (
    <header className='TabsHeader'>
      <div class="container">
        <div className='row justify-content-end'>
          <div className='col-md-9'>
            <div className="row ">
              <div className='col'>
                <img src={logoheader} alt="" style={{ height: "60px" }} />
              </div>
              <div className='col-auto'>
                <button className='btn btn-primary'
                  onClick={openBillingPage}
                  style={{ width: '180px' }}
                >Upgrade</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  )
}

export default Header
