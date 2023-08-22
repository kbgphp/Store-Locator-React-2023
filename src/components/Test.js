import React from 'react'

const Test = () => {

  console.log("test", window.Wix.Dashboard.openMediaDialog)


  const handlemedia = () => {

    window.Wix.Dashboard.openMediaDialog(window.Wix.Settings.MediaType.IMAGE, false,
      (data) => {
        const imageurl = window.Wix.Utils.Media.getImageUrl(data.relativeUri);
        console.log("imgurl", imageurl)
      }
    );

  }


  return (
    <div style={{ display: "flex", justifyContent: "center" }}>

      <button className='btn btn-primary ' onClick={handlemedia} >Open Media box</button>

      test
    </div>
  )
}

export default Test
