import React from "react";
import { Link } from "react-router-dom";


function Mid(){

    return (
        <main className="main-content" style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start", // Align items to the top (text and image start at the same line)
            padding: "80px 0", // Top and bottom padding
            maxWidth: "100%", // Content max width
            margin: "0 auto",
            backgroundColor: "#f6f3edff", // Light cream background for consistency
            minHeight: "calc(100vh - 75px - 100px)", // Roughly fill remaining vertical space (header height + footer height)
            width: "100%"
        }}>
            <div className="text-content" style={{
                flexBasis: "55%", // Adjusted width for text
                paddingRight: "40px", // More space between text and image
                paddingLeft: "24px", // Padding on the left
                alignSelf: "center" // Vertically center the text within its flex container
            }}>
                <h2 className="headline" style={{
                    fontFamily: "'Spectral', serif", // Font similar to the image
                    fontSize: "106px", // Much larger font size
                    lineHeight: "100px", // Adjusted line height
                    letterSpacing: "-0.05em", // Tighten letter spacing slightly
                    marginBottom: "20px",
                    fontWeight: "normal" // Not bold
                }}>Human stories &amp; ideas</h2>
                <p className="subtitle" style={{
                    fontFamily: "'Inter', sans-serif", // Font similar to the image
                    fontSize: "24px",
                    marginBottom: "40px", // More space below subtitle
                    lineHeight: "30px",
                    color: "#292929"
                }}>
                    A place to read, write, and deepen your understanding
                </p>
                <Link className="start-reading-btn" style={{
                    backgroundColor: "black",
                    color: "white",
                    padding: "12px 24px", // Larger button padding
                    borderRadius: "999em",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "18px"
                }} to={"/viewAll"}>Start reading</Link>

            </div>

            <div className="image-content" style={{
                flexBasis: "45%", // Adjusted width for image
                paddingRight: "24px", // Padding on the right
                position: "relative", // For precise positioning if needed
                minHeight: "500px", // Ensure image container has enough height
                display: "flex",
                justifyContent: "flex-end", // Push image to the right within its flex container
                alignItems: "center"
            }}>
                <img
                    src="https://miro.medium.com/v2/format:webp/4*SdjkdS98aKH76I8eD0_qjw.png"
                    style={{
                        width: "550px", // Significantly larger image width
                        height: "auto",
                        objectFit: "cover",
                        position: "relative", // Ensure it's not absolutely positioned out of flow
                        // No border radius in the new image
                    }}
                    alt="Medium header graphic"
                />
        </div>

        </main>
    );
}

export default Mid;