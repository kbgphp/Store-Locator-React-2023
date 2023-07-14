import React from 'react'

export const Citations =   () => {
  return (
    <div>
      <div className='card'>

        <h4>Patient First Primary and Urgent Care - Abington</h4>
        <p>Address:- 938 Old York Road, Abington PA, US 19001</p>
        <p>Phone:- (267) 620-0237</p>
        <p>Website:- https://www.patientfirst.com/locations/1_NTI1NTU1NzktNzE1LWxvY2F0aW9uLndlYnNpdGU%3D</p>
        <p>Email Address:- kit12kum@gmail.com</p>
      </div>

      <div>
        <h1>Citations</h1>
        <p>The Citations reports shows you where your Name , Address are #are listed across the web. it's important to have  many Citations as Google uses these as  trust signals.</p>
      </div>

      <div className='CitationTable'>
        <table class="table table-borderless">
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


