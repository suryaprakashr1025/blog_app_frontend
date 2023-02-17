import React from 'react'

function Home() {
  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
    <div className="col-lg-8 welcome">
        <h4 className='mb-4' style={{ pointerEvents: "none", fontWeight: "bold", color: "white" }}>Welcome to our blog app site</h4>
        <h6 className='mb-3 text-center' style={{ pointerEvents: "none", fontWeight: "bold", color: "white", lineHeight: "30px" }}>Our blog app will help you to share your knowledge with others and to develop your knowledge by using other's knowledge.</h6>
    </div>

</div>
  )
}

export default Home