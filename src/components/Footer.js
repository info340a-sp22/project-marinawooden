import React from "react";

export function Footer(props){
    return (
        <footer className="footer mt-auto py-5 bg-dark">
            <div className="container">
                <div class="row align-items-start">
                    <div className="col text-center">
                        <p><span className="text-muted">Copyright &copy;2022 MusicRoom</span></p>
                    </div>
                    {/* Contact info here */}
                    {/* <div className="col text-center">
                        <p><span className="text-muted"></span></p>
                    </div> */}
                </div>
            </div>
        </footer>
    )
}