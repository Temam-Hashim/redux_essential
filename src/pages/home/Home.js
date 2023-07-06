import React from "react";
import Center from "../../component/center/Center";
import LeftBar from "../../component/leftBar/LeftBar";
import RightBar from "../../component/rightBar/RightBar";
import Navbar from "../../component/design/navbar.js";

function Home() {
  return (
    <div className="home">
      <div className="col-md-12" style={{ marginBottom: "65px" }}>
        <Navbar />
      </div>

      <div class="row">
        <div class="col-md-3">
          <LeftBar />
        </div>
        <div class="col-md-6 h-100">
          <Center />
        </div>
        <div class="col-md-3">
          <RightBar />
        </div>
      </div>
    </div>
  );
}

export default Home;
