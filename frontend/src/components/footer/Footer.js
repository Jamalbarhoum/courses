import React from "react";

function Footer() {
  return (
    <div style={{width:"100%",marginTop:"40px"}}>
      <div style={{width:"100%"}}>
        <footer
          class="text-center text-lg-start text-white"
          style={{backgroundColor:"#45526e"}}
        >
          <div class="container p-4 pb-0">
            <section class="">
              <div class="row">
                <div class="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6 class="text-uppercase mb-4 font-weight-bold">
                    pp code 
                  </h6>
                  <p>
                  Discover a world of programming with our comprehensive courses designed for all levels, from beginners to professionals.
                  </p>
                </div>

                <hr class="w-100 clearfix d-md-none" />

                <div class="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                  <h6 class="text-uppercase mb-4 font-weight-bold">Products</h6>
                  <p>
                    <a class="text-white">js</a>
                  </p>
                  <p>
                    <a class="text-white">php</a>
                  </p>
                  <p>
                    <a class="text-white">node</a>
                  </p>
                  <p>
                    <a class="text-white">react</a>
                  </p>
                </div>

                <hr class="w-100 clearfix d-md-none" />

                <div class="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 class="text-uppercase mb-4 font-weight-bold">info</h6>
                  <p>
                    <a class="text-white">jamallbarhoum@gmail.com</a>
                  </p>
                  <p>
                    <a class="text-white">jamal barhoum</a>
                  </p>
                 
                  <p>
                    <a class="text-white">PP</a>
                  </p>
                </div>

                <hr class="w-100 clearfix d-md-none" />

                <div class="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                  <h6 class="text-uppercase mb-4 font-weight-bold">Contact</h6>
                  <p>
                    <i class="fas fa-home mr-3"></i> jordan 
                  </p>
                  <p>
                    <i class="fas fa-envelope mr-3"></i> jamallbarhoum@gmail.com
                  </p>
                  <p>
                    <i class="fas fa-phone mr-3"></i>0795956217
                  </p>
                  <p>
                    <i class="fas fa-print mr-3"></i> 0795956217
                  </p>
                </div>
              </div>
            </section>

            <hr class="my-3" />

            <section class="p-3 pt-0">
              <div class="row d-flex align-items-center">
                <div class="col-md-7 col-lg-8 text-center text-md-start">
                  <div class="p-3">
                    © 2020 Copyright:
                    <a class="text-white" href="https://jamallbarhoum.netlify.app/#home">
                    jamallbarhoum
                    </a>
                  </div>
                </div>

              </div>
            </section>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default Footer;
