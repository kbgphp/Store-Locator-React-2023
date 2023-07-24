import React from 'react'
import DeatailsCard from '../DeatailsCard'

export const Citations = ({ userAvaiable }) => {
  return (
    <div>
      <DeatailsCard userAvaiable={userAvaiable} />


      <div>
        <h1>Citations</h1>
        <p>The Citations reports shows you where your Name , Address are #are listed across the web. it's important to have  many Citations as Google uses these as  trust signals.</p>
      </div>

      <div className='CitationTable'>
        <table className="table table-borderless">
          <thead>
            <tr>

              <th scope="col">LISTING</th>
              <th scope="col">STATUS</th>
              <th scope="col">
                VIEW LINK</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th >1</th>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            <tr>
              <th >2</th>
              <td>Thornton</td>
              <td>@fat</td>
            </tr>
            <tr>
              <th scope="row">3</th>
              <td colspan="2">Larry the Bird</td>
            </tr>
          </tbody>
        </table>

      </div>
    </div>
  )
}


